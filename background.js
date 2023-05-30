const production = true;
const serverURL = production
  ? "https://extension.server.reacti.ai"
  : "http://localhost:5000";
const clientURL = production ? "https://reacti.ai" : "http://localhost:5173";
const redirectToLoginPage = () => {
  chrome?.cookies?.remove({
    url: clientURL,
    name: "fb-session",
  });
  chrome?.tabs?.create({ active: true, url: clientURL + "/login" });
};
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender, sendResponse) {
    return true;
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type && request.type === "getCookie") {
    chrome?.cookies
      ?.get({
        url: clientURL,
        name: "fb-session",
      })
      .then((cookie) => {
        sendResponse(Boolean(cookie && cookie?.value));
        return true;
      });
  }
  if (request.type && request.type === "saveComment") {
    (async () => {
      try {
        const sessionCookie = await chrome?.cookies?.get({
          url: clientURL,
          name: "fb-session",
        });
        if (!sessionCookie) {
          sendResponse({ reply: "" });
          return redirectToLoginPage();
        }
        const res = await fetch(serverURL + "/user/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "fb-session": sessionCookie.value,
          },
          body: JSON.stringify({
            comment: request.comment,
          }),
        });
        const response = await res.json();
        if (response.success) {
          sendResponse({ success: true });
        } else if (response.message) {
          sendResponse({ reply: response.message });
        } else {
          sendResponse({ reply: "Some error occurred!" });
        }

        return true;
      } catch (e) {
        console.log(e);
        sendResponse({ reply: "Some error occurred!" });
      }
    })();
  }
  if (request.type && request.type === "fetchComments") {
    (async () => {
      try {
        const sessionCookie = await chrome?.cookies?.get({
          url: clientURL,
          name: "fb-session",
        });
        
        if (!sessionCookie) {
          sendResponse({ reply: "" });
          return redirectToLoginPage();
        }
        const res = await fetch(serverURL + "/user/comment",{headers: {
          "Content-Type": "application/json",
          "fb-session": sessionCookie.value,
        }},);
        const response = await res.json();
        if (response.success) {
          sendResponse({data:response.data || []});
        } else if (response.message) {
          sendResponse({ reply: response.message });
        } else {
          sendResponse({ reply: "Some error occurred!" });
        }

        return true;
      } catch (e) {
        console.log(e);
        sendResponse({ reply: "Some error occurred!" });
      }
    })();
  }
  if (!request.text || !request.tone) {
    return true;
  }
  (async () => {
    const sessionCookie = await chrome?.cookies?.get({
      url: clientURL,
      name: "fb-session",
    });
    if (!sessionCookie) {
      sendResponse({ reply: "" });
      return redirectToLoginPage();
    }
    fetch(serverURL + "/generatereply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "fb-session": sessionCookie.value,
      },
      body: JSON.stringify({
        text: request.text,
        tone: request.tone,
        comment: request.comment,
        language: request.language || "english",
        characterLimit:request.characterLimit || 250
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reply);
          sendResponse({ reply: data.reply });
          if (data.count) {
            chrome.cookies.set({
              url: clientURL,
              name: "request-count",
              value: data.count.toString(),
            });
          }
        } else if (data.errorType === "invalidAuth") {
          sendResponse({ reply: "" });
          redirectToLoginPage();
        } else if (data.message) {
          sendResponse({ reply: data.message });
        } else {
          sendResponse({ reply: "Some error occurred!" });
        }
      })
      .catch((e) => {
        console.log(e);
        sendResponse({ reply: "Error occurred, please try again" });
      });

    return true;
  })();
  return true;
});
