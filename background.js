const production= true;
const serverURL = production ? "https://funny-gray-worm.cyclic.app":"http://localhost:5000";
const clientURL = production ?"https://react-ai-demo.netlify.app": "http://localhost:5173";
const redirectToLoginPage=()=>{
  chrome?.cookies
      ?.remove({
        url: clientURL,
        name: "fb-session",
      })
  chrome?.tabs?.create({active: true, url: clientURL+"/login"});
}
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
  if (!request.text && (!request.tone || !request.prompt)) {
    return true;
  }
  (async () => {
    const sessionCookie = await chrome?.cookies?.get({
      url: clientURL,
      name: "fb-session",
    });
    if(!sessionCookie){
      sendResponse({reply:""})
      return redirectToLoginPage()

    }
    fetch(serverURL+"/fetchreply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "fb-session": sessionCookie.value,
      },
      body: JSON.stringify({
        text: request.text,
        tone: request.tone,
        prompt:request.prompt
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reply);
          sendResponse({reply:data.reply});
          if (data.count) {
            chrome.cookies.set({
              url: clientURL,
              name: "request-count",
              value:data.count.toString()
            });
          }
        } 
        else if(data.errorType==="invalidAuth"){
          sendResponse({reply:""});
          redirectToLoginPage()
            
        }
        else if (data.message) {
          sendResponse({reply:data.message});
        } else {
          sendResponse({reply:"Some error occurred!"});
        }
      })
      .catch((e) => {
        console.log(e);
        sendResponse({reply:"Error occurred, please try again"});
      });

    return true;
  })();
  return true;
});
