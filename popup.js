// JAVASCRIPT LOGIC FOR THE AI WIDGET INTERFACE. HANDLES USER INPUT, SENDS IT TO AN AI SERVICE, AND DISPLAYS THE RESPONSE
async function fetchResponse(input) {
    const url = 'http://localhost:3000/chat'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: String(input)
    }


    const res = await fetch(url, options) // issue here
    const resp = await res.json()

    return resp.response;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("ai-send").addEventListener("click", async() => {
        let aiRes = document.getElementById('ai-response')
        const input = document.getElementById("ai-input").value;
        const sendButton = document.getElementById('ai-send')

        if (!input) {
            aiRes.HTML = 'Please enter a message'
            return;
        }
        sendButton.disabled = true
        
        try {
            aiRes.innerHTML = 'Thinking....'
            const response = await fetchResponse(input)
            aiRes.innerHTML = response; //response from the AI;
        } catch(err) {
            aiRes.innerHTML = 'An error occured while getting a response. Please try again'; // use err.message during development
            console.error(err)
        } finally {
            sendButton.disabled = false
        }
    });
})
