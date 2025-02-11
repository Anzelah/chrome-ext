// JAVASCRIPT LOGIC FOR THE AI WIDGET INTERFACE. HANDLES USER INPUT, SENDS IT TO AN AI SERVICE, AND DISPLAYS THE RESPONSE
import dotenv from 'dotenv';
import OpenAI from 'openai';

const client = new OpenAI({ 
    apiKey: process.env.GPT_API_KEY, 
});


document.getElementById("ai-send").addEventListener("click", async() => {
    let res = document.getElementById('ai-response')
    const input = document.getElementById("ai-input").value;

    if (!input) {
        return;
    }
    try {
        const response = await client.createChatCompletion({ 
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: input }],
        })

        const aiRes = response.data.choices[0].message.content;
        res.innerHTML = aiRes; //response from the AI;
    } catch(err) {
        res.innerHTML = 'An error occured while getting a response. Please try again'; // use err.message during development
        console.error(err)
    }
});
