const remoteURL = "https://funny-gray-worm.cyclic.app/reply";
const localURL = "http://localhost:5000/reply";
const localHostURL = "http://localhost:5173";
const remoteHostURL = "https://react-ai-demo.netlify.app";

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request, sender, sendResponse) {
    return true;
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type && request.type === "getCookie") {
    console.log("getCookie");
    chrome?.cookies
      ?.get({
        url: remoteHostURL,
        name: "fb-access-token",
      })
      .then((cookie) => {
        console.log(cookie);

        sendResponse(Boolean(cookie && cookie?.value));
        return true;
      });
  }
  if (!request.text && !request.tone) {
    return true;
  }
  (async () => {
    const accessTokenCookie = await chrome?.cookies?.get({
      url: remoteHostURL,
      name: "fb-access-token",
    });

    fetch(remoteURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessTokenCookie.value,
      },
      body: JSON.stringify({
        text: request.text,
        tone: request.tone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reply);
          sendResponse(data.reply);
          if (data.count) {
            chrome.cookies.set({
              url: remoteHostURL,
              name: "request-count",
              value:data.count.toString()
            });
          }
        } else if (data.message) {
          sendResponse(data.message);
        } else {
          sendResponse("Some error occurred!");
        }
      })
      .catch((e) => {
        console.log(e);
        sendResponse("Error occurred, please try again");
      });

    return true;
  })();
  return true;
});
