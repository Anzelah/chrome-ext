// CREATE A CHATBOT CONTAINER, THEN INJECT CHATBOT ONCE ADS ARE BLOCKED

function injectChatbot() {
    if (document.getElementById('chatbot-container')) return; // prevent more than one container loads

    const chatbotDiv = document.createElement("div");
    chatbotDiv.id = 'chatbot-container'

    chabotDiv.innerHTML = <iframe src="${chrome.runtime.getURL('popup.html')}"></iframe> //load chatbot html/ui
    document.body.append(chatbotDiv)

}

window.addEventListener('load', () => {
    setTimeout(injectChatbot, 1000 )
});