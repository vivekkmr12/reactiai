let lastText = null;
let isLoading = false;

let isLinkedIn = window.location.origin.includes("linkedin.com");
const optionData = [
  {
    value: "formal",
    label: "Formal",
    description:
      "A businessperson speaking to a client, a teacher addressing a student, or a politician giving a speech.",
  },
  {
    value: "informal",
    label: "Informal",
    description:
      "Friends chatting with each other, a family member catching up with a relative, or coworkers discussing a project.",
  },
  {
    value: "rude",
    label: "Rude",
    description:
      "Someone interrupting another person, speaking in a condescending tone, or using offensive language.",
  },
  {
    value: "polite",
    label: "Polite",
    description:
      "A customer thanking a shopkeeper, a guest thanking a host, or a colleague asking for a favor in a respectful manner.",
  },
  {
    value: "sarcastic",
    label: "Sarcastic",
    description:
      "A person using irony to mock or criticize someone or something, often in a humorous way.",
  },
  {
    value: "earnest",
    label: "Earnest",
    description:
      "A person speaking sincerely and with genuine emotion, often about something they care deeply about.",
  },
  {
    value: "sincere",
    label: "Sincere",
    description:
      "Honest and genuine, often using language or behavior that is earnest and heartfelt.",
  },
  {
    value: "pleading",
    label: "Pleading",
    description:
      "A person begging or imploring someone to do something, often in a desperate or emotional way.",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    description:
      "A person trying to convince another person to believe or do something, often by providing evidence or reasoning.",
  },
  {
    value: "condescending",
    label: "Condescending",
    description:
      "A person speaking in a way that implies they think they are superior to the person they are talking to.",
  },
  {
    value: "sympathetic",
    label: "Sympathetic",
    description:
      "A person expressing compassion or understanding towards someone who is going through a difficult time.",
  },
  {
    value: "supportive",
    label: "Supportive",
    description:
      "A person offering encouragement, help, or advice to someone who is facing a challenge or making a decision.",
  },
  {
    value: "critical",
    label: "Critical",
    description:
      "A person pointing out flaws or shortcomings in someones ideas, actions, or performance.",
  },
  {
    value: "complimentary",
    label: "Complimentary",
    description:
      "A person praising or complimenting someone for their achievements, talents, or appearance.",
  },
  {
    value: "flirtatious",
    label: "Flirtatious",
    description:
      "A person using playful or suggestive language to express romantic or sexual interest in someone.",
  },
  {
    value: "angry",
    label: "Angry",
    description:
      "A person expressing anger or frustration through their words, tone of voice, or body language.",
  },
  {
    value: "frightened",
    label: "Frightened",
    description:
      "A person speaking in a scared or nervous tone, often because they are in a dangerous or threatening situation.",
  },
  {
    value: "envious",
    label: "Envious",
    description:
      "A person expressing jealousy or resentment towards someone who has something they want or admire.",
  },
  {
    value: "insulting",
    label: "Insulting",
    description:
      "A person using hurtful or offensive language to belittle or disrespect someone.",
  },
  {
    value: "impatient",
    label: "Impatient",
    description:
      "A person speaking in a hurried or frustrated manner, often because they want something to happen quickly.",
  },
  {
    value: "confused",
    label: "Confused",
    description:
      "A person speaking in a hesitant or uncertain manner, often because they dont understand something.",
  },
  {
    value: "disinterested",
    label: "Disinterested",
    description:
      "A person speaking in a bored or uninterested tone, often because they dont care about the topic of conversation.",
  },
  {
    value: "indignant",
    label: "Indignant",
    description:
      "A person expressing outrage or disbelief, often because they feel they have been wronged or treated unfairly.",
  },
  {
    value: "intimidating",
    label: "Intimidating",
    description:
      "A person speaking in a threatening or aggressive manner, often in order to scare or bully someone.",
  },
  {
    value: "intimate",
    label: "Intimate",
    description:
      "A person speaking in a soft or tender tone, often because they are sharing personal or emotional information with someone.",
  },
  {
    value: "cautious",
    label: "Cautious",
    description:
      "A person speaking in a careful or measured way, often because they are unsure of how the other person will react.",
  },
  {
    value: "intrigued",
    label: "Intrigued",
    description:
      "A person speaking in a curious or interested tone, often because they want to learn more about something.",
  },
  {
    value: "fascinated",
    label: "Fascinated",
    description:
      "A person speaking with excitement and wonder, often because they are learning about something new or interesting.",
  },
  {
    value: "suspicious",
    label: "Suspicious",
    description:
      "A person speaking in a wary or skeptical tone, often because they dont trust the other person or believe what they are saying.",
  },
  {
    value: "contemplative",
    label: "Contemplative",
    description:
      "A person speaking in a thoughtful or introspective manner, often because they are considering a difficult decision or problem.",
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    description:
      "A person speaking with energy and enthusiasm, often because they are excited about something.",
  },
  {
    value: "encouraging",
    label: "Encouraging",
    description:
      "A person speaking with support and positivity, often in order to motivate or inspire someone.",
  },
  {
    value: "calm",
    label: "Calm",
    description:
      "A person speaking in a relaxed and collected manner, often in order to ease tension or stress in a situation.",
  },
  {
    value: "humorous",
    label: "Humorous",
    description:
      "A person speaking with humor or wit, often in order to entertain or amuse the other person.",
  },
  {
    value: "appreciative",
    label: "Appreciative",
    description:
      "A person speaking with gratitude and appreciation, often to thank someone for something they have done.",
  },
  {
    value: "worried",
    label: "Worried",
    description:
      "A person speaking with concern or anxiety, often because they are worried about something.",
  },
  {
    value: "passionate",
    label: "Passionate",
    description:
      "A person speaking with intensity or emotion, often because they are strongly invested in something.",
  },
  {
    value: "dismissive",
    label: "Dismissive",
    description:
      "A person speaking in a dismissive or contemptuous manner, often because they dont think something is important or worth discussing.",
  },
  {
    value: "condolent",
    label: "Condolent",
    description:
      "A person expressing sorrow or sympathy, often in response to someone’s loss or misfortune.",
  },
  {
    value: "romantic",
    label: "Romantic",
    description:
      "A person expressing love or admiration, often in a poetic or heartfelt way.",
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
    value: "assertive",
    label: "Assertive",
    description:
      "A person speaking confidently and directly, often in order to stand up for themselves or make a request.",
  },
  {
    value: "doubtful",
    label: "Doubtful",
    description:
      "A person speaking skeptically or hesitantly, often because they are uncertain about something.",
  },
  {
    value: "amused",
    label: "Amused",
    description:
      "A person speaking with amusement or laughter, often because they find something funny or entertaining.",
  },
  {
    value: "firm",
    label: "Firm",
    description:
      "A person speaking in a determined and resolute manner, often to make a point or defend a position.",
  },
  {
    value: "apologetic",
    label: "Apologetic",
    description:
      "A person expressing regret or remorse, often to apologize for something they have done wrong.",
  },
  {
    value: "wistful",
    label: "Wistful",
    description:
      "A person speaking in a melancholic or nostalgic manner, often because they are thinking about something they miss.",
  },
  {
    value: "desperate",
    label: "Desperate",
    description:
      "A person speaking urgently or desperately, often because they want something to happen quickly or they are in a difficult situation.",
  },
  {
    value: "quizzical",
    label: "Quizzical",
    description:
      "A person speaking in a puzzled or bewildered manner, often because they dont understand something.",
  },
  {
    value: "dubious",
    label: "Dubious",
    description:
      "A person speaking skeptically or doubtfully, often because they dont trust or believe something.",
  },
  {
    value: "astonished",
    label: "Astonished",
    description:
      "A person speaking in a surprised or shocked manner, often because they are amazed or impressed by something.",
  },
  {
    value: "disdainful",
    label: "Disdainful",
    description:
      "A person speaking with contempt or scorn, often to express disapproval of someone or something.",
  },
  {
    value: "reverent",
    label: "Reverent",
    description:
      "A person speaking with respect or reverence, often because they are in a holy or sacred place or talking about something important.",
  },
  {
    value: "hesitant",
    label: "Hesitant",
    description:
      "A person speaking uncertainly or hesitantly, often because they are afraid or unsure of what to do or say.",
  },
  {
    value: "nervous",
    label: "Nervous",
    description:
      "A person speaking in a shaky or jittery manner, often because they are anxious or afraid.",
  },
  {
    value: "dreamy",
    label: "Dreamy",
    description:
      "A person speaking in a thoughtful or romantic manner, often because they are lost in thought or imagining something.",
  },
  {
    value: "gloomy",
    label: "Gloomy",
    description:
      "A person speaking in a depressed or pessimistic manner, often because they are feeling down or pessimistic.",
  },
  {
    value: "confident",
    label: "Confident",
    description:
      "A person speaking with assurance or self-belief, often because they have faith in themselves or their abilities.",
  },
  {
    value: "guarded",
    label: "Guarded",
    description:
      "A person speaking cautiously or carefully, often because they are trying to avoid saying something they shouldnt.",
  },
  {
    value: "playful",
    label: "Playful",
    description:
      "A person speaking in a lighthearted or teasing manner, often in order to have fun or make someone laugh.",
  },
  {
    value: "inquisitive",
    label: "Inquisitive",
    description:
      "A person speaking in a curious or investigative manner, often because they want to learn more about something.",
  },
  {
    value: "solemn",
    label: "Solemn",
    description:
      "A person speaking in a serious or solemn manner, often because they are honoring or remembering someone or something.",
  },
  {
    value: "adoring",
    label: "Adoring",
    description:
      "A person speaking with admiration and affection, often because they are expressing love for someone.",
  },
  {
    value: "determined",
    label: "Determined",
    description:
      "A person speaking with resolve and perseverance, often because they are committed to achieving something.",
  },
  {
    value: "grateful",
    label: "Grateful",
    description:
      "A person expressing thanks or appreciation, often because they are deeply thankful for something.",
  },
  {
    value: "resigned",
    label: "Resigned",
    description:
      "A person speaking with acceptance or resignation, often because they have accepted a difficult situation or decision.",
  },
  {
    value: "despondent",
    label: "Despondent",
    description:
      "A person speaking in a hopeless or despairing manner, often because they feel like they have no options or solutions.",
  },
  {
    value: "exasperated",
    label: "Exasperated",
    description:
      "A person speaking in an irritated or frustrated manner, often because they are fed up with something.",
  },
  {
    value: "forgiving",
    label: "Forgiving",
    description:
      "A person expressing compassion or understanding, often to forgive someone for something they have done wrong.",
  },
  {
    value: "reflective",
    label: "Reflective",
    description:
      "A person speaking in a contemplative or introspective manner, often to think about something or consider a decision.",
  },
  {
    value: "disappointed",
    label: "Disappointed",
    description:
      "A person expressing dissatisfaction or discouragement, often because something didnt happen or turn out the way they wanted.",
  },
  {
    value: "content",
    label: "Content",
    description:
      "A person speaking in a satisfied or peaceful manner, often because they are happy with how things are going.",
  },
  {
    value: "adventurous",
    label: "Adventurous",
    description:
      "A person speaking with excitement and enthusiasm, often because they are looking forward to a new experience or challenge.",
  },
  {
    value: "understanding",
    label: "Understanding",
    description:
      "A person speaking with empathy or sympathy, often in order to help someone who is going through a difficult time.",
  },
  {
    value: "amiable",
    label: "Amiable",
    description:
      "A person speaking in a friendly or warm manner, often because they want to make a good impression or get along with someone.",
  },
  {
    value: "dignified",
    label: "Dignified",
    description:
      "A person speaking with poise or grace, often because they are trying to maintain a sense of composure or respect.",
  },
  {
    value: "condescending",
    label: "Condescending",
    description:
      "A person speaking in a way that implies they think they are superior to the person they are talking to.",
  },
  {
    value: "energetic",
    label: "Energetic",
    description:
      "A person speaking with enthusiasm, often because they are excited or motivated by something.",
  },
  {
    value: "honest",
    label: "Honest",
    description:
      "A person speaking openly and truthfully, often because they are being sincere or direct.",
  },
  {
    value: "friendly",
    label: "Friendly",
    description:
      "A person speaking in a warm and welcoming manner, often to make someone feel comfortable or welcome.",
  },
  {
    value: "patient",
    label: "Patient",
    description:
      "A person speaking calmly and patiently, often because they are willing to wait or take their time with something.",
  },
  {
    value: "genZ",
    label: "Gen Z",
    description:
      "A person speaking in a casual and relaxed manner, often because they are young and up to date on the latest trends and technology.",
  },
  {
    value: "millenial",
    label: "Millenial",
    description:
      "A person speaking in a confident and optimistic manner, often because they are young and open to new experiences.",
  },
  {
    value: "boomer",
    label: "Boomer",
    description:
      "A person speaking in a wise and experienced manner, often because they are older and have seen a lot in their life.",
  },
  {
    value: "lilting",
    label: "Lilting",
    description:
      "A person speaking in a soft and melodic manner, often because they are trying to soothe or comfort someone.",
  },
];
function debug(msg) {
  console.log("Debug message: ", msg);
}
const htmlSnippet = `<div class="_responsively_wrapper">
<div class="_responsively_btn_wrapper">
  <button class="_responsively_tone_btn" data-tone="agree">🙂 Agree</button>
  <button class="_responsively_tone_btn" data-tone="disagree">👎 Disagree</button>
  <button class="_responsively_tone_btn" data-tone="joke">	&#129315; Joke</button>
  <button class="_responsively_tone_btn" data-tone="idea">💡 Idea</button>
</div>
<div class="_responsively_tone_picker_wrapper">
  <label for="_responsively_tone_picker">Custom Tone</label>
  <select name="_responsively_tone_picker" id="_responsively_tone_picker">
  <option selected value disabled>Pick a custom tone</option>
  </select>
</div>
</div>


`;
function populateOptionsAndListeners(linkedinEditor) {
  const selectEl = document.querySelector("select#_responsively_tone_picker");
  if (!selectEl) {
    return;
  }
  optionData.forEach((op) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = op.label;
    optionEl.value = op.value;
    selectEl.appendChild(optionEl);
  });
  selectEl.addEventListener("change", (e) => {
    if (linkedinEditor) {
      handleLinkedinSubmit(e.target.value, linkedinEditor, e.target);
      selectEl.selectedIndex = 0;
      return;
    }
    handleSubmit(e.target.value);
    selectEl.selectedIndex = 0;
  });
  const toneBtns = document.querySelectorAll("._responsively_tone_btn");
  toneBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedTone = btn.dataset.tone;
      if (linkedinEditor) {
        return handleLinkedinSubmit(selectedTone, linkedinEditor, e.target);
      }
      handleSubmit(selectedTone);
    });
  });
}
function sendServerRequest(data, editorEl) {
  addLoading();
  chrome.runtime.sendMessage(data, function (response) {
    updateInput(response, editorEl);
    removeLoading();
  });
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
      return parseInt(styles.fontSize) > 20;
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
  const func = (button) => {
    if (!button) {
      return null;
    }

    button.style.opacity = 0.6;
    button.style.pointerEvents = "none";
  };

  const buttons = document.querySelectorAll("._responsively_tone_btn");
  buttons.forEach((btn) => {
    func(btn);
  });
  func(document.querySelector("#_responsively_tone_picker"));
}

function removeLoading() {
  const func = (button) => {
    if (!button) {
      return null;
    }

    button.style.opacity = 1;
    button.style.pointerEvents = "auto";
  };
  const buttons = document.querySelectorAll("._responsively_tone_btn");
  buttons.forEach((btn) => {
    func(btn);
  });
  func(document.querySelector("#_responsively_tone_picker"));
}
function handleLinkedinSubmit(tone, editorEl, clickedButton) {
  debug("Data submitted with tone: " + tone);

  let data = { tone };
  text = getLinkedInText(clickedButton);

  if (!text) {
    debug("No text available during submission!");
    return;
  }
  data.text = text;
  sendServerRequest(data, editorEl);
}
function handleSubmit(tone) {
  debug("Data submitted with tone: " + tone);
  let data = { tone };

  text = findCurrentTweetText();

  if (!text) {
    debug("No text available during submission!");
    return;
  }
  data.text = text;
  sendServerRequest(data);
}

const embedButtons = () => {
  const isContainerEmbedded = document.getElementById(
    "_responsively_container"
  );
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
  container.id = "_responsively_container";
  container.innerHTML = htmlSnippet;
  toolbar.parentNode.prepend(container);
  populateOptionsAndListeners();
};

const updateInput = (newText, linkedinElem) => {
  if (linkedinElem) {
    let text = "";
    newText.split(" ").forEach((word,i) => {
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
    if (b.querySelector("#_responsively_container")) {
      return;
    }

    const container = document.createElement("div");
    container.id = "_responsively_container";
    container.innerHTML = htmlSnippet;
    b.appendChild(container);
    populateOptionsAndListeners(b.querySelector(".ql-editor"));
  });
};

// check whether it's linkedin or twitter
if (window.location.origin.includes("twitter.com")) {
  setInterval(embedButtons, 100);
} else if (window.location.origin.includes("linkedin.com")) {
  setInterval(() => {
    embedLinkedinButtons();
  }, 100);
}
