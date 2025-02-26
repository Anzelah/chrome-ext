//ACT AS A PROXY BETWEEN THE EXTENSION AND OPENAIAPI
import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors({ origin: `chrome-extension://${process.env.EXTENSION_ID}` })) // replace with extension ID

const port = process.env.PORT || 5000
const apiKey = process.env.API_KEY

app.get('/home', (req, res) => {
    res.send("Welcome to the extensions homepage")   
})

app.post('/chat', async(req, res) => {
    const input  = req.body;
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
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: input }],
        })
    }

    try {
        const response = await fetch(url, options)
        console.log(response)
        if (response.status === 429) {
            return res.status(429).send({ error: 'Too many requests. Please try again after a moment' })
        }
        if (!response.ok) {
            throw new Error('API request failed'); // might add res.status for debbugging purposes
        }
        const data = await response.json()
        res.json({ response: data.choices[0].message.content })
    } catch(error) {
        res.status(500).json({ error: 'An error occured while processing your request' })
    }
    
})



app.listen(port, () => {
    console.log(`Express app is listening on port ${port}`)
})