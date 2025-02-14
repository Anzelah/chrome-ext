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
    const res = await fetch(url, options) // fetch results from the backend
    if (res.status === 429) {
        return 'Too many requests. Please try again after a few minutes'
    }
    if (!res.ok) {
        throw new Error('No valid response from AI. Please try again') //most likely a 500 error 
    }
    const resp = await res.json()
    return resp.response; // a string
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
            aiRes.innerHTML = response; //response from the AI or a 429 error;
        } catch(err) {
            aiRes.innerHTML = err.message; 
            console.error(err) //for debugging purposes
        } finally {
            sendButton.disabled = false
        }
    });
})
