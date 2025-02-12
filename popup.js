// JAVASCRIPT LOGIC FOR THE AI WIDGET INTERFACE. HANDLES USER INPUT, SENDS IT TO AN AI SERVICE, AND DISPLAYS THE RESPONSE
async function fetchResponse(input) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = process.env.GPT_API_KEY;

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
    }

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, req)
    if (!res.ok) {
        throw new Error('API request failed');
    }
    const resp = await res.json()

    return resp.data.choices[0].message.content;
}

document.getElementById("ai-send").addEventListener("click", async() => {
    let aiRes = document.getElementById('ai-response')
    const input = document.getElementById("ai-input").value;

    if (!input) return;

    try {
        aiRes.innerHTML = 'Thinking....'
        const response = await fetchResponse(input)
        aiRes.innerHTML = response; //response from the AI;
    } catch(err) {
        aiRes.innerHTML = 'An error occured while getting a response. Please try again'; // use err.message during development
        console.error(err)
    }
});
