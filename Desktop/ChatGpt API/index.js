import { Configuration, OpenAIApi } from "openai";
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import 'dotenv/config'

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey
})

const openai = new OpenAIApi(configuration)

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.post("/", async (req, res) => {

    const {messages} = req.body

    console.log(messages)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot."},
            ...messages
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    })
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

