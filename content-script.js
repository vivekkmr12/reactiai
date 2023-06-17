function debug(msg) {
    console.log("Debug message: ", msg);
  }
  const htmlSnippet = `  <div class="_rp_wrapper">
  <div class="_rp_row  _rp_language_picker_row">
    <label for="">Generate reply in:</label>
    <select
      name="_rp_lang_picker "
      class="_rp_button  _rp_lang_picker"
      id="_rp_lang_picker"
    >
      <option value="hindi">Hindi</option>
      <option value="english" selected>English</option>
    </select>
  </div>
  <div class="_rp_row">
    <div class="_rp_tone_buttons_wrapper">
      <button
        class="_rp_button _rp_tone_button"
        data-tone="agreeable"
      >
        Agree
      </button>
      <button
        class="_rp_button _rp_tone_button"
        data-tone="disagreeable"
      >
        Disagree
      </button>
      <button
        class="_rp_button _rp_tone_button "
        data-tone="angry"
      >
        Neutral
      </button>
      <button
        class="_rp_button _rp_tone_button"
        data-tone="sarcastic"
      >
        Friendly
      </button>
      <button
        class="_rp_button _rp_tone_button"
        data-tone="insightful"
      >
        Serious
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="cautious"
      >
        Cautious
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="encouraging"
      >
        Encouraging
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="fascinated"
      >
        Fascinated
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="sympathetic"
      >
        Sympathetic
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="humble"
      >
        Humble
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="inquisitive"
      >
        Fuuny
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="lilting"
      >
        Sarcastic
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="pleading"
      >
        congratulate
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="supportive"
      >
        Supportive
      </button>
      <button
        class="_rp_button _rp_tone_button hidden other"
        data-tone="understanding"
      >
        Understanding
      </button>
     
    </div>
  </div>
  <div class="_rp_row">
    <button class="_rp_button _rp_show_more_button other">
      Show More Tones
    </button>
  </div>
  <div class="_rp_row">
    <div class="_rp_prompt_input_wrapper">
      <label for="_rp_prompt_input">Custom Prompt</label>
      <textarea
        name="_rp_prompt_input"
        id="_rp_prompt_input"
        placeholder="Type your thoughts"
      ></textarea>
    </div>
  </div>
  <div class="_rp_row _rp_flex_row">
    <button
      id="_rp_submit_button"
      class="_rp_button _rp_submit_button"
    >
      Get Reply
    </button>
    <button
      id="_rp_save_button"
      class="_rp_button _rp_save_button"
    >
      Save Comment
    </button>
    <button
      id="_rp_view_saved_button"
      class="_rp_button _rp_view_saved_button"
    >
      View Saved
    </button>
    <div class="_rp_flex_row">
      <div class="_rp_range_container">
        <div><label class="_rp_limit_label">Max char:250</label></div>
        <input
          type="range"
          name=""
          id=""
          min="10"
          max="500"
          initial="10"
          value="250"
        />
      </div>
    </div>
    
  </div>
  <div class="_rp_row _rp_comments_container hidden">
    <label for="">Saved Comments</label>
    <div class="_rp_comment _rp_comment_warning">
      <h5>No saved comments!</h5>
     
    </div>
   
  </div>
  </div>`;
  function populateOptionsAndListeners(linkedinEditor) {
    const toneBtns = document.querySelectorAll("._rp_tone_button");
    toneBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // change color
        btn.classList.add("_rp_clicked");
        const selectedTone = btn.dataset.tone;
        if (linkedinEditor) {
          return handleLinkedinSubmit(
            { tone: selectedTone },
            linkedinEditor,
            e.target
          );
        }
        handleSubmit({ tone: selectedTone });
      });
    });
    // submit button
    document
      .querySelector("#_rp_submit_button")
      .addEventListener("click", (e) => {
        const customComment = document
          .querySelector("#_rp_prompt_input")
          .value.trim();
  
        if (!customComment ) {
          return alert("Please write a comment!");
        }
  
        if (linkedinEditor) {
          return handleLinkedinSubmit({ prompt }, linkedinEditor, e.target);
        }
        handleSubmit({ tone: "normal", comment: customComment });
      });
    // other tones
    function showOtherTonesButtons() {
      document.querySelectorAll("._rp_tone_button.other").forEach((button) => {
        button.classList.remove("hidden");
      });
    }
  
    function hideOtherTonesButtons() {
      document.querySelectorAll("._rp_tone_button.other").forEach((button) => {
        button.classList.add("hidden");
      });
    }
    const showMoreButton = document.querySelector("._rp_show_more_button");
  
    showMoreButton.addEventListener("click", () => {
      if (showMoreButton.classList.contains("showing")) {
        showMoreButton.classList.remove("showing");
        showMoreButton.textContent = "Show more tones";
        hideOtherTonesButtons(showMoreButton);
      } else {
        showMoreButton.textContent = "Hide tones";
        showMoreButton.classList.add("showing");
  
        showOtherTonesButtons(showMoreButton);
      }
    });
    // comments
    const viewCommentsButton = document.getElementById("_rp_view_saved_button");
    viewCommentsButton.addEventListener("click", () => {
      const commentsContainer = document.querySelector("._rp_comments_container");
      if (commentsContainer.classList.contains("hidden")) {
        commentsContainer.classList.remove("hidden");
        viewCommentsButton.textContent = "Hide Saved";
      } else {
        commentsContainer.classList.add("hidden");
        viewCommentsButton.textContent = "View Saved";
      }
    });
    // limits
    const limitLabel = document.querySelector("._rp_limit_label");
    const limitRangeInput = document.querySelector("._rp_range_container input");
    limitRangeInput.addEventListener("input", (e) => {
      const newLimit = e.target.value;
      limitLabel.textContent = "Max char: " + newLimit;
    });
    // custom comments
    const saveCommentBtn = document.querySelector("._rp_save_button");
    saveCommentBtn.addEventListener("click", () => {
      const commentTextarea = document.querySelector("#_rp_prompt_input");
      const enteredText = commentTextarea.value;
      console.log({ enteredText });
      saveCustomComment(enteredText);
    });
    fetchCustomComment();
  }
  function sendServerRequest(data, editorEl) {
    addLoading();
    chrome.runtime.sendMessage(data, function (response) {
      updateInput(response.reply, editorEl);
      document
        .querySelectorAll("._rp_clicked")
        .forEach((btn) => btn.classList.remove("_rp_clicked"));
      removeLoading();
    });
  }
  
  function saveCustomComment(cmt) {
    addLoading();
    chrome.runtime.sendMessage(
      {
        type: "saveComment",
        comment: cmt,
      },
      function (response) {
        if (response.success) {
        
          const commentsContainer = document.querySelector(
            "._rp_comments_container"
          );
     appendComment(commentsContainer,{comment:cmt, index:document.querySelectorAll("._rp_comment").length});
        }
        removeLoading();
      }
    );
  }
  
  function fetchCustomComment() {
    chrome.runtime.sendMessage(
      {
        type: "fetchComments",
      },
      function (response) {
        const comments = response.data;
        if (!comments || comments?.length == 0) {
          return;
        }
        const commentsContainer = document.querySelector(
          "._rp_comments_container"
        );
        comments.forEach((cmt, i) => {
          appendComment(commentsContainer,{comment:cmt, index:i});
        });
      }
    );
  }
  
  function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType == 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
  
    return all;
  }
  
  function findCurrentTweetText() {
    let modalText = document.querySelector('[aria-labelledby="modal-header"]');
    modalText = modalText
      ? modalText.querySelector('[data-testid="tweetText"]') ||
        modalText.querySelector('[data-testid="tweet"]')
      : null;
    let textRaw = null;
    if (modalText) {
      textRaw = textNodesUnder(modalText);
    } else {
      //select twit text (there could be a lot of them if its a thread)
      const tweetTextNodeList = document.querySelectorAll(
        '[data-testid="tweetText"]'
      );
      // check if it's active tweet (node has font size 14px)
      const tweetTextNode = Array.from(tweetTextNodeList).filter((node) => {
        const styles = getComputedStyle(node);
        return parseInt(styles.fontSize) > 14;
      });
  
      if (tweetTextNode.length > 0) {
        textRaw = textNodesUnder(tweetTextNode[0]);
      }
    }
    // get text from text object
    const text = textRaw
      ? textRaw
          .map((node) => node.data)
          .join(" ")
          .trim()
      : "";
  
    return text;
  }
  
  function addLoading() {
    if (document.querySelector("._rp_wrapper")) {
      document.querySelector("._rp_wrapper").classList.add("loading");
    }
  }
  
  function removeLoading() {
    if (document.querySelector("._rp_wrapper")) {
      document.querySelector("._rp_wrapper").classList.remove("loading");
    }
    
    const commentBox = document.querySelector("#_rp_prompt_input");
    if (commentBox) {
      commentBox.value = "";
    }
    const generateButton = document.querySelector("#_rp_submit_button");
    if (generateButton) {
      commentBox.classList.add("disabled");
    }
  }
  
  function handleLinkedinSubmit(req, editorEl, clickedButton) {
    debug("Data submitted :" + req);
    const { tone, prompt } = req;
    let data = { tone, prompt };
    text = getLinkedInText(clickedButton);
  
    if (!text) {
      debug("No text available during submission!");
      return;
    }
    data.text = text;
    const languageSelector = document.getElementById("_rp_lang_picker");
    data.language =
      languageSelector && languageSelector.value
        ? languageSelector.value
        : "english";
    sendServerRequest(data, editorEl);
  }
  function handleSubmit({ tone, comment }) {
    debug("Data submitted: " + tone + " | " + comment);
  
    let data = { tone, comment };
  
    text = findCurrentTweetText();
  
    if (!text) {
      debug("No text available during submission!");
      return;
    }
    data.text = text;
    const languageSelector = document.getElementById("_rp_lang_picker");
    const rangeInput = document.querySelector("._rp_range_container input");
    data.language =
      (languageSelector && languageSelector.value)
        ? languageSelector.value
        : "english";
      data.characterLimit= 
      (rangeInput && rangeInput.value)
        ? rangeInput.value
        : 250;
    sendServerRequest(data);
  }
  const embedButtons = () => {
    let isContainerEmbedded = document.getElementById("_rp_container");
    const toolBars = document.querySelectorAll('[data-testid="toolBar"]');
    if (
      toolBars.length === 1 &&
      window.location.href.includes("twitter.com/home")
    ) {
      if (isContainerEmbedded) {
        isContainerEmbedded.remove();
      }
      return;
    }
    if (isContainerEmbedded) {
      return;
    }
    const toolbar = document.querySelector('[data-testid="toolBar"]');
    const text = findCurrentTweetText(); // twitt's text
  
    if (!toolbar) {
      requestAnimationFrame(embedButtons);
      return;
    }
  
    if (!text) {
      return;
    }
  
    isLoading = false;
    removeLoading();
    const container = document.createElement("div");
    container.id = "_rp_container";
    const isDarkMode =
      document.body.style === "rgb(0,0,0)" && document.body.style === "#FFFFFF";
    if (isDarkMode) {
      container.classList.add("dark_mode");
    }
    container.innerHTML = htmlSnippet;
    toolbar.parentNode.prepend(container);
  
    populateOptionsAndListeners();
  };
  
  const updateInput = (newText, linkedinElem) => {
    if (linkedinElem) {
      let text = "";
      newText.split(" ").forEach((word, i) => {
        setTimeout(() => {
          text += word + " ";
          linkedinElem.innerHTML = "<p>" + text + "</p>";
        }, i * 150);
      });
  
      return;
    }
    const input = document.querySelector('[data-testid="tweetTextarea_0"]');
  
    const func = (text) => {
      const data = new DataTransfer();
      data.setData("text/plain", text);
      input.dispatchEvent(
        new ClipboardEvent("paste", {
          dataType: "text/plain",
          data: text,
          bubbles: true,
          clipboardData: data,
          cancelable: true,
        })
      );
    };
    newText.split(" ").forEach((text, i) => {
      setTimeout(() => {
        func(text + " ");
      }, i * 150);
    });
  };
  
  // linkedin
  
  function getLinkedInText(elem) {
    const text = elem
      .closest(".feed-shared-update-v2")
      .querySelector(".feed-shared-update-v2__description")
      .textContent.trim()
      .replaceAll("\n", "")
      .replaceAll("…see more", "");
    return text;
  }
  const embedLinkedinButtons = () => {
    const commentButtons = document.querySelectorAll(
      "form.comments-comment-box__form"
    );
  
    Array.from(commentButtons).forEach((b) => {
      if (b.querySelector("#_rp_container")) {
        return;
      }
  
      const container = document.createElement("div");
      container.id = "_rp_container";
      container.innerHTML = htmlSnippet;
      b.appendChild(container);
      populateOptionsAndListeners(b.querySelector(".ql-editor"));
    });
  };
  
  // check whether it's linkedin or twitter
  chrome.runtime.sendMessage({ type: "getCookie" }, function (res) {
    if (!res) {
      return;
    }
    if (window.location.origin.includes("twitter.com")) {
      setInterval(embedButtons, 500);
    } else if (window.location.origin.includes("linkedin.com")) {
      setInterval(() => {
        embedLinkedinButtons();
      }, 500);
    }
  });
  function appendComment(container, data) {
    if(document.querySelector("._rp_comment_warning")){
      document.querySelector("._rp_comment_warning").remove()
    }
    const newComment = document.createElement("div");
    newComment.classList.add("_rp_comment");
    newComment.innerHTML = `<div class="_rp_flex_row"><h5>Comment ${data.index+1}</h5> <button >USE</button></div>
  <p>
   ${data.comment}
   
  </p>`;
  newComment.addEventListener("click",()=>{
    document.querySelector("#_rp_prompt_input").value=data.comment
  })
    container.appendChild(newComment);
  }
  // function onCommentClick=(e)=>{
  
  // }
