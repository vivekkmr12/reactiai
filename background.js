const remoteURL = "https://funny-gray-worm.cyclic.app/reply"
const localURL = "http://localhost:5000/reply"
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    return true
  });
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text && request.tone) {
    fetch(remoteURL  , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: request.text,
        tone: request.tone
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
       if(data.success){
        sendResponse(data.reply);
       }
       else{
        sendResponse("Some error occurred!")
       }
      }).catch(e =>  {
        console.log(e);
        sendResponse('Error occurred, please try again, kek');
    });

    return true;
  }
});

