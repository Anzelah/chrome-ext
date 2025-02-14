// CREATE A CHATBOT CONTAINER, THEN INJECT CHATBOT ONCE ADS ARE BLOCKED

function injectChatbot() {
    const matches = document.querySelectorAll("div.ad, [id*=ad], [class*=ad]")

    if (document.getElementById('chatbot-container')) return; // prevent more than one container loads

    const chatbotDiv = document.createElement("div");
    chatbotDiv.id = 'chatbot-container';
    
    const iframeSrc = chrome.runtime.getURL('popup.html');
    chatbotDiv.innerHTML = `<iframe src="${iframeSrc}"></iframe>`; //load chatbot html/ui

    if (matches.length > 0) {
        matches[0].appendChild(chatbotDiv)
    }
}

window.addEventListener('load', () => {
    setTimeout(injectChatbot, 1000 )
});