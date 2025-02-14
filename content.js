// CREATE A CHATBOT CONTAINER, THEN INJECT CHATBOT ONCE ADS ARE BLOCKED

function injectChatbot() {
    //const matches = document.querySelectorAll("div.ad, [id*=ad], [class*=ad]")
    const matches = document.querySelectorAll("div[id*='ad'], [id*='ad'], [class*='id]")
    //const matches = document.querySelector("div[id^='div-gpt-ad-']") //working
    //'[id*=.ad.]'
    console.log(matches)
    console.log('here')

    if (document.getElementById('chatbot-container')) return; // prevent more than one container loads

    const chatbotDiv = document.createElement("div");
    chatbotDiv.id = 'chatbot-container';

    const iframeSrc = chrome.runtime.getURL('popup.html');
    chatbotDiv.innerHTML = `<iframe src="${iframeSrc}"></iframe>`; //load chatbot html/ui

    for (i = 0; i < matches.length; i++) {
        const chatbotClone = chatbotDiv.cloneNode(true);
        matches[i].replaceWith(chatbotClone)
    }
}

window.addEventListener('load', () => {
    setTimeout(injectChatbot, 1000 )
});