document.getElementById('logSave').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        
        
        const currentTabUrl = tabs[0].url; // Get the current tab URL
        
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: (url) => {

                console.log("Text content is", document.getElementById('logSave')?.textContent)

                //TODO: Figure out how to get this access to the button html so It can point out errors
                const setButtonPopupText = function(newText) {
                    //document.getElementById('logSave').textContent = newText;
                }

                const urlRegex = /[?&]gameName=([^&]+)/;
                const match = url.match(urlRegex);

                var gameName;
                
                if (match) {
                    gameName = match[1];
                    console.log(gameName); // Output
                }
                else
                {
                    console.log("Error retrieving game name")
                    //setButtonPopupText("Error")
                    alert("Error retrieving game name") //temporary
                    return;
                }

                const gameLog = document.getElementById("gamelog").outerHTML;



                const blob = new Blob([gameLog], {type: 'text/html'});

                const link = document.createElement('a');

                link.download = `karabast_${gameName}.html`

                link.href = URL.createObjectURL(blob);

                document.body.appendChild(link);

                link.click();
            
                document.body.removeChild(link);
        },
        args: [currentTabUrl]
      });
    });
  });