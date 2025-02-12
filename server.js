//ACT AS A PROXY BETWEEN THE EXTENSION AND OPENAIAPI
const cors = require('cors')
const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors({ origin: "*" })) // replace with extension ID

const port = process.env.PORT || 5000
const apiKey = process.env.API_KEY


app.post('/chat', async(req, res) => {
    const { input } = req.body;
    if (!input) {
        return res.status(400).json({ error: 'Input cannot be empty'})
    }

    const url = 'https://api.openai.com/v1/chat/completions';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        })
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json()

        res.json({ response: data.choices[0].message.content })
    } catch(error) {
        res.status(500).json({ error: 'An error occured while processing your request' })
    }
    
})



app.listen(port, () => {
    console.log(`Express app is listening on port ${PORT}`)
})