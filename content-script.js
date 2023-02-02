let lastText = null
let isLoading = false;

let isLinkedIn = window.location.origin.includes('linkedin.com');


function sendServerRequest(data,editorEl) {
      addLoading()
      chrome.runtime.sendMessage(data, function (response) {
        updateInput(response,editorEl );
        removeLoading()
      })
}


function textNodesUnder(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }

  return all;
}

function findCurrentTweetText() {
  let modalText = document.querySelector('[aria-labelledby="modal-header"]')
  modalText = modalText ? modalText.querySelector('[data-testid="tweetText"]') || modalText.querySelector('[data-testid="tweet"]')  : null
  let textRaw = null

  if(modalText){
    textRaw = textNodesUnder(modalText)
  }else {
    //select twit text (there could be a lot of them if its a thread)
    const tweetTextNodeList = document.querySelectorAll('[data-testid="tweetText"]')
    // check if it's active tweet (node has font size 14px)
    const tweetTextNode = Array.from(tweetTextNodeList).filter(node => {
      const styles = getComputedStyle(node);
      return parseInt(styles.fontSize) > 20
    })

    if(tweetTextNode.length > 0){
      textRaw = textNodesUnder(tweetTextNode[0])
    }
  }
  // get text from text object
  const text = textRaw ? textRaw.map(node => node.data).join(' ').trim() : ''

  return text;
}

function addLoading () {
  const func = (button) => {
    if (!button) {
      return null
    }

    button.style.opacity = 0.6;
    button.style.pointerEvents = 'none';
    button.textContent="Composing..."
  }

  
    const button = document.querySelector('._responsively_submit_btn')
    func(button)
}

function removeLoading () {
  const func = (button) => {
    if (!button) {
      return null
    }

    button.style.opacity = 1;
    button.style.pointerEvents = 'auto';
    button.textContent="Compose"

  }
    const button =  document.querySelector('._responsively_submit_btn')
    func(button)
}
function handleLinkedinSubmit(btn,editorEl){
  const container = btn.closest("#_responsively_container")
  if(!container){
    return console.log("No parent found");
  }
  let data = {}
  const sentimentBtn= container.querySelectorAll(".sentiment_input")
  sentimentBtn.forEach((btn)=>{
    if(btn.checked){
      data.sentiment=btn.value
    }
  })
  if(!data.sentiment){
    return console.log("Not selected");
  }
  data.tone = container.querySelector("#_responsively_tone_picker").value
  text = getLinkedInText(btn) 

  if(!text){
    return;
  }
data.text = text
  sendServerRequest(data,editorEl) 
}
function handleSubmit(){
  let data = {}
  const sentimentBtn= document.querySelectorAll(".sentiment_input")
  sentimentBtn.forEach((btn)=>{
    if(btn.checked){
      data.sentiment=btn.value
    }
  })
  if(!data.sentiment){
    return console.log("Not selected");
  }
  data.tone = document.querySelector("#_responsively_tone_picker").value
  text = findCurrentTweetText() 

  if(!text){
    return;
  }
data.text = text
  sendServerRequest(data)
}
const embedButtons = () => {
  const isContainerEmbedded = document.getElementById('_responsively_container')
  if(isContainerEmbedded){
    return;
  }
  const toolbar = document.querySelector('[data-testid="toolBar"]');
  const text = findCurrentTweetText() // twitt's text

  if(!toolbar){
    requestAnimationFrame(embedButtons)
    return;
  }

  if(!text){
    return;
  }

  isLoading = false;
  removeLoading();
  const container = document.createElement('div')
  container.id = '_responsively_container';
  container.innerHTML=`
  <div class="_responsively_sentiment_picker_container">
    <label for="_responsively_sentiment_picker">Sentiment</label>
    <form class="_responsively_sentiment_picker">
      <input
        type="checkbox"
        class="sentiment_input"
        id="sentiment_1"
        name="sentiment"
        value="positive"
        checked
      />
      <label for="sentiment_1">Positive</label>
      <input type="checkbox" id="sentiment_2" name="sentiment" value="negative" class="sentiment_input"/>
      <label for="sentiment_2">Negative</label>
      <input type="checkbox" id="sentiment_3" name="sentiment" value="neutral" class="sentiment_input"/>
      <label for="sentiment_3">Neutral</label>
    </form>
  </div>
  <div class="_responsively_tone_picker_container">
    <label for="_responsively_tone_picker">Tone</label>
    <select name="_responsively_tone_picker" id="_responsively_tone_picker">
      <option value="insightful" selected>Insightful</option>
      <option value="sarcastic">Sarcastic</option>
      <option value="questions">Questions</option>
      <option value="idea">Idea</option>
      <option value="angry">Angry</option>
    </select>
  </div>



  `
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("_responsively_submit_btn")
  submitBtn.textContent="Compose"
  submitBtn.addEventListener("click",()=>{
    handleSubmit();
  })
 container.append(submitBtn);
  toolbar.parentNode.prepend(container)
  // only one checkbox can be selected
  var group_=(el,callback)=>{
    el.forEach((checkbox)=>{
    callback(checkbox)
         })
    }
    
    group_(document.getElementsByName('sentiment'),(item)=>{
    item.onclick=(e)=>{
    group_(document.getElementsByName('sentiment'),(item)=>{
    item.checked=false;
    })
    e.target.checked=true;
    
    }
    })

 
}

const updateInput = (newText,linkedinElem) => {
  if(linkedinElem){
    linkedinElem.innerHTML = "<p>"+ newText + "</p>"
    return;
  }
  const input = document.querySelector('[data-testid="tweetTextarea_0"]')

  const data = new DataTransfer();
  data.setData(
    'text/plain',
    newText
  );
  input.dispatchEvent(new ClipboardEvent("paste", {
    dataType: "text/plain",
    data: newText,
    bubbles: true,
    clipboardData: data,
    cancelable: true
  }));
}


// linkedin

function getLinkedInText(elem) {
  const text =  elem.closest('.feed-shared-update-v2').querySelector('.feed-shared-update-v2__description').textContent.trim().replaceAll('\n', '').replaceAll('…see more', '');
  return text;
}
const embedLinkedinButtons = () => {

  const commentButtons = document.querySelectorAll('form.comments-comment-box__form');

  Array.from(commentButtons).forEach(b => {
    if(b.querySelector(('#_responsively_container'))){
      return
    }

    const container = document.createElement('div')
    container.id = '_responsively_container';
    container.innerHTML=`
    <div class="_responsively_sentiment_picker_container">
      <label for="_responsively_sentiment_picker">Sentiment</label>
      <form class="_responsively_sentiment_picker">
        <input
          type="checkbox"
          class="sentiment_input"
          id="sentiment_1"
          name="sentiment"
          value="positive"
          checked
        />
        <label for="sentiment_1">Positive</label>
        <input type="checkbox" id="sentiment_2" name="sentiment" value="negative" class="sentiment_input"/>
        <label for="sentiment_2">Negative</label>
        <input type="checkbox" id="sentiment_3" name="sentiment" value="neutral" class="sentiment_input"/>
        <label for="sentiment_3">Neutral</label>
      </form>
    </div>
    <div class="_responsively_tone_picker_container">
      <label for="_responsively_tone_picker">Tone</label>
      <select name="_responsively_tone_picker" id="_responsively_tone_picker">
        <option value="insightful" selected>Insightful</option>
        <option value="sarcastic">Sarcastic</option>
        <option value="questions">Questions</option>
        <option value="idea">Idea</option>
        <option value="angry">Angry</option>
      </select>
    </div>
  
  
  
    `
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("_responsively_submit_btn")
    submitBtn.textContent="Compose"
    submitBtn.setAttribute("type","button")
    submitBtn.addEventListener("click",(e)=>{
      const editor = b.querySelector('.ql-editor')
      // sendServerRequest({text, style: 'positive'}, elem)
      handleLinkedinSubmit(e.target,editor);
    })
   container.append(submitBtn);
  b.appendChild(container)
    // only one checkbox can be selected
    var group_=(el,callback)=>{
      el.forEach((checkbox)=>{
      callback(checkbox)
           })
      }
      
      group_(document.getElementsByName('sentiment'),(item)=>{
      item.onclick=(e)=>{
      group_(document.getElementsByName('sentiment'),(item)=>{
      item.checked=false;
      })
      e.target.checked=true;
      
      }
      })
  


  })
}

// check whether it's linkedin or twitter
if(window.location.origin.includes('twitter.com')){
  setInterval(embedButtons, 100);
}
else if(window.location.origin.includes('linkedin.com')){
  setInterval(() => {
    embedLinkedinButtons();
  }, 100)
}