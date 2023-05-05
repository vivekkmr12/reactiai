let lastText = null;
let isLoading = false;

let isLinkedIn = window.location.origin.includes("linkedin.com");
const optionData = [
  {
    value: "agree",
    label: "Agree",
    description:
      "A person speaking with admiration and affection, often because they are expressing love for someone.",
  },
  {
    value: "disagree",
    label: "Disagree",
    description:
      "A person speaking with admiration and affection, often because they are expressing love for someone.",
  },
  {
    value: "adoring",
    label: "Adoring",
    description:
      "A person speaking with admiration and affection, often because they are expressing love for someone.",
  },
  {
    value: "adventurous",
    label: "Adventurous",
    description:
      "A person speaking with excitement and enthusiasm, often because they are looking forward to a new experience or challenge.",
  },
  {
    value: "amiable",
    label: "Amiable",
    description:
      "A person speaking in a friendly or warm manner, often because they want to make a good impression or get along with someone.",
  },
  {
    value: "amused",
    label: "Amused",
    description:
      "A person speaking with amusement or laughter, often because they find something funny or entertaining.",
  },
  {
    value: "angry",
    label: "Angry",
    description:
      "A person expressing anger or frustration through their words, tone of voice, or body language.",
  },
  {
    value: "apologetic",
    label: "Apologetic",
    description:
      "A person expressing regret or remorse, often to apologize for something they have done wrong.",
  },
  {
    value: "appreciative",
    label: "Appreciative",
    description:
      "A person speaking with gratitude and appreciation, often to thank someone for something they have done.",
  },
  {
    value: "assertive",
    label: "Assertive",
    description:
      "A person speaking confidently and directly, often in order to stand up for themselves or make a request.",
  },
  {
    value: "astonished",
    label: "Astonished",
    description:
      "A person speaking in a surprised or shocked manner, often because they are amazed or impressed by something.",
  },
  {
    value: "boomer",
    label: "Boomer",
    description:
      "A person speaking in a wise and experienced manner, often because they are older and have seen a lot in their life.",
  },
  {
    value: "calm",
    label: "Calm",
    description:
      "A person speaking in a relaxed and collected manner, often in order to ease tension or stress in a situation.",
  },
  {
    value: "cautious",
    label: "Cautious",
    description:
      "A person speaking in a careful or measured way, often because they are unsure of how the other person will react.",
  },
  {
    value: "complimentary",
    label: "Complimentary",
    description:
      "A person praising or complimenting someone for their achievements, talents, or appearance.",
  },
  {
    value: "condescending",
    label: "Condescending",
    description:
      "A person speaking in a way that implies they think they are superior to the person they are talking to.",
  },
  {
    value: "condescending",
    label: "Condescending",
    description:
      "A person speaking in a way that implies they think they are superior to the person they are talking to.",
  },
  {
    value: "condolent",
    label: "Condolent",
    description:
      "A person expressing sorrow or sympathy, often in response to someone’s loss or misfortune.",
  },
  {
    value: "confident",
    label: "Confident",
    description:
      "A person speaking with assurance or self-belief, often because they have faith in themselves or their abilities.",
  },
  {
    value: "confused",
    label: "Confused",
    description:
      "A person speaking in a hesitant or uncertain manner, often because they dont understand something.",
  },
  {
    value: "contemplative",
    label: "Contemplative",
    description:
      "A person speaking in a thoughtful or introspective manner, often because they are considering a difficult decision or problem.",
  },
  {
    value: "content",
    label: "Content",
    description:
      "A person speaking in a satisfied or peaceful manner, often because they are happy with how things are going.",
  },
  {
    value: "critical",
    label: "Critical",
    description:
      "A person pointing out flaws or shortcomings in someones ideas, actions, or performance.",
  },
  {
    value: "desperate",
    label: "Desperate",
    description:
      "A person speaking urgently or desperately, often because they want something to happen quickly or they are in a difficult situation.",
  },
  {
    value: "despondent",
    label: "Despondent",
    description:
      "A person speaking in a hopeless or despairing manner, often because they feel like they have no options or solutions.",
  },
  {
    value: "determined",
    label: "Determined",
    description:
      "A person speaking with resolve and perseverance, often because they are committed to achieving something.",
  },
  {
    value: "dignified",
    label: "Dignified",
    description:
      "A person speaking with poise or grace, often because they are trying to maintain a sense of composure or respect.",
  },
  {
    value: "disappointed",
    label: "Disappointed",
    description:
      "A person expressing dissatisfaction or discouragement, often because something didnt happen or turn out the way they wanted.",
  },
  {
    value: "disdainful",
    label: "Disdainful",
    description:
      "A person speaking with contempt or scorn, often to express disapproval of someone or something.",
  },
  {
    value: "disinterested",
    label: "Disinterested",
    description:
      "A person speaking in a bored or uninterested tone, often because they dont care about the topic of conversation.",
  },
  {
    value: "dismissive",
    label: "Dismissive",
    description:
      "A person speaking in a dismissive or contemptuous manner, often because they dont think something is important or worth discussing.",
  },
  {
    value: "doubtful",
    label: "Doubtful",
    description:
      "A person speaking skeptically or hesitantly, often because they are uncertain about something.",
  },
  {
    value: "dreamy",
    label: "Dreamy",
    description:
      "A person speaking in a thoughtful or romantic manner, often because they are lost in thought or imagining something.",
  },
  {
    value: "dubious",
    label: "Dubious",
    description:
      "A person speaking skeptically or doubtfully, often because they dont trust or believe something.",
  },
  {
    value: "earnest",
    label: "Earnest",
    description:
      "A person speaking sincerely and with genuine emotion, often about something they care deeply about.",
  },
  {
    value: "encouraging",
    label: "Encouraging",
    description:
      "A person speaking with support and positivity, often in order to motivate or inspire someone.",
  },
  {
    value: "energetic",
    label: "Energetic",
    description:
      "A person speaking with enthusiasm, often because they are excited or motivated by something.",
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    description:
      "A person speaking with energy and enthusiasm, often because they are excited about something.",
  },
  {
    value: "envious",
    label: "Envious",
    description:
      "A person expressing jealousy or resentment towards someone who has something they want or admire.",
  },
  {
    value: "exasperated",
    label: "Exasperated",
    description:
      "A person speaking in an irritated or frustrated manner, often because they are fed up with something.",
  },
  {
    value: "fascinated",
    label: "Fascinated",
    description:
      "A person speaking with excitement and wonder, often because they are learning about something new or interesting.",
  },
  {
    value: "firm",
    label: "Firm",
    description:
      "A person speaking in a determined and resolute manner, often to make a point or defend a position.",
  },
  {
    value: "flirtatious",
    label: "Flirtatious",
    description:
      "A person using playful or suggestive language to express romantic or sexual interest in someone.",
  },
  {
    value: "forgiving",
    label: "Forgiving",
    description:
      "A person expressing compassion or understanding, often to forgive someone for something they have done wrong.",
  },
  {
    value: "formal",
    label: "Formal",
    description:
      "A businessperson speaking to a client, a teacher addressing a student, or a politician giving a speech.",
  },
  {
    value: "friendly",
    label: "Friendly",
    description:
      "A person speaking in a warm and welcoming manner, often to make someone feel comfortable or welcome.",
  },
  {
    value: "frightened",
    label: "Frightened",
    description:
      "A person speaking in a scared or nervous tone, often because they are in a dangerous or threatening situation.",
  },
  {
    value: "genZ",
    label: "Gen Z",
    description:
      "A person speaking in a casual and relaxed manner, often because they are young and up to date on the latest trends and technology.",
  },
  {
    value: "gloomy",
    label: "Gloomy",
    description:
      "A person speaking in a depressed or pessimistic manner, often because they are feeling down or pessimistic.",
  },
  {
    value: "grateful",
    label: "Grateful",
    description:
      "A person expressing thanks or appreciation, often because they are deeply thankful for something.",
  },
  {
    value: "guarded",
    label: "Guarded",
    description:
      "A person speaking cautiously or carefully, often because they are trying to avoid saying something they shouldnt.",
  },
  {
    value: "hesitant",
    label: "Hesitant",
    description:
      "A person speaking uncertainly or hesitantly, often because they are afraid or unsure of what to do or say.",
  },
  {
    value: "honest",
    label: "Honest",
    description:
      "A person speaking openly and truthfully, often because they are being sincere or direct.",
  },
  {
    value: "hopeful",
    label: "Hopeful",
    description:
      "A person speaking optimistically, often because they believe something good will happen.",
  },
  {
    value: "humble",
    label: "Humble",
    description:
      "A person speaking modestly or humbly, often to recognize their limitations or the achievements of others.",
  },
  {
    value: "humorous",
    label: "Humorous",
    description:
      "A person speaking with humor or wit, often in order to entertain or amuse the other person.",
  },
  {
    value: "impatient",
    label: "Impatient",
    description:
      "A person speaking in a hurried or frustrated manner, often because they want something to happen quickly.",
  },
  {
    value: "indignant",
    label: "Indignant",
    description:
      "A person expressing outrage or disbelief, often because they feel they have been wronged or treated unfairly.",
  },
  {
    value: "informal",
    label: "Informal",
    description:
      "Friends chatting with each other, a family member catching up with a relative, or coworkers discussing a project.",
  },
  {
    value: "inquisitive",
    label: "Inquisitive",
    description:
      "A person speaking in a curious or investigative manner, often because they want to learn more about something.",
  },
  {
    value: "insulting",
    label: "Insulting",
    description:
      "A person using hurtful or offensive language to belittle or disrespect someone.",
  },
  {
    value: "intimate",
    label: "Intimate",
    description:
      "A person speaking in a soft or tender tone, often because they are sharing personal or emotional information with someone.",
  },
  {
    value: "intimidating",
    label: "Intimidating",
    description:
      "A person speaking in a threatening or aggressive manner, often in order to scare or bully someone.",
  },
  {
    value: "intrigued",
    label: "Intrigued",
    description:
      "A person speaking in a curious or interested tone, often because they want to learn more about something.",
  },
  {
    value: "lilting",
    label: "Lilting",
    description:
      "A person speaking in a soft and melodic manner, often because they are trying to soothe or comfort someone.",
  },
  {
    value: "millenial",
    label: "Millenial",
    description:
      "A person speaking in a confident and optimistic manner, often because they are young and open to new experiences.",
  },
  {
    value: "nervous",
    label: "Nervous",
    description:
      "A person speaking in a shaky or jittery manner, often because they are anxious or afraid.",
  },
  {
    value: "passionate",
    label: "Passionate",
    description:
      "A person speaking with intensity or emotion, often because they are strongly invested in something.",
  },
  {
    value: "patient",
    label: "Patient",
    description:
      "A person speaking calmly and patiently, often because they are willing to wait or take their time with something.",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    description:
      "A person trying to convince another person to believe or do something, often by providing evidence or reasoning.",
  },
  {
    value: "playful",
    label: "Playful",
    description:
      "A person speaking in a lighthearted or teasing manner, often in order to have fun or make someone laugh.",
  },
  {
    value: "pleading",
    label: "Pleading",
    description:
      "A person begging or imploring someone to do something, often in a desperate or emotional way.",
  },
  {
    value: "polite",
    label: "Polite",
    description:
      "A customer thanking a shopkeeper, a guest thanking a host, or a colleague asking for a favor in a respectful manner.",
  },
  {
    value: "quizzical",
    label: "Quizzical",
    description:
      "A person speaking in a puzzled or bewildered manner, often because they dont understand something.",
  },
  {
    value: "reflective",
    label: "Reflective",
    description:
      "A person speaking in a contemplative or introspective manner, often to think about something or consider a decision.",
  },
  {
    value: "resigned",
    label: "Resigned",
    description:
      "A person speaking with acceptance or resignation, often because they have accepted a difficult situation or decision.",
  },
  {
    value: "reverent",
    label: "Reverent",
    description:
      "A person speaking with respect or reverence, often because they are in a holy or sacred place or talking about something important.",
  },
  {
    value: "romantic",
    label: "Romantic",
    description:
      "A person expressing love or admiration, often in a poetic or heartfelt way.",
  },
  {
    value: "rude",
    label: "Rude",
    description:
      "Someone interrupting another person, speaking in a condescending tone, or using offensive language.",
  },
  {
    value: "sarcastic",
    label: "Sarcastic",
    description:
      "A person using irony to mock or criticize someone or something, often in a humorous way.",
  },
  {
    value: "sincere",
    label: "Sincere",
    description:
      "Honest and genuine, often using language or behavior that is earnest and heartfelt.",
  },
  {
    value: "solemn",
    label: "Solemn",
    description:
      "A person speaking in a serious or solemn manner, often because they are honoring or remembering someone or something.",
  },
  {
    value: "supportive",
    label: "Supportive",
    description:
      "A person offering encouragement, help, or advice to someone who is facing a challenge or making a decision.",
  },
  {
    value: "suspicious",
    label: "Suspicious",
    description:
      "A person speaking in a wary or skeptical tone, often because they dont trust the other person or believe what they are saying.",
  },
  {
    value: "sympathetic",
    label: "Sympathetic",
    description:
      "A person expressing compassion or understanding towards someone who is going through a difficult time.",
  },
  {
    value: "understanding",
    label: "Understanding",
    description:
      "A person speaking with empathy or sympathy, often in order to help someone who is going through a difficult time.",
  },
  {
    value: "wistful",
    label: "Wistful",
    description:
      "A person speaking in a melancholic or nostalgic manner, often because they are thinking about something they miss.",
  },
  {
    value: "worried",
    label: "Worried",
    description:
      "A person speaking with concern or anxiety, often because they are worried about something.",
  },
];
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
      Inquisitive
    </button>
    <button
      class="_rp_button _rp_tone_button hidden other"
      data-tone="lilting"
    >
      Lilting
    </button>
    <button
      class="_rp_button _rp_tone_button hidden other"
      data-tone="pleading"
    >
      Pleading
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
