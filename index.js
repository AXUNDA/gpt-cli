import openai from "./config/index.js"
import readLineSync from "readline-sync"
import colors from "colors"

async function main() {

    console.log(colors.bold.green(`Welcome to gpt-cli interface`))
    console.log(colors.bold.green(`Type a message to prompt the chatbot `))
    let chatHistory = []
    while (true) {
        const input = readLineSync.question(colors.bold.yellow(`You: `))
        try {
            const messages = chatHistory.map(([role, content]) => ({
                role,
                content
            }))
            messages.push({
                role: "user",
                content: input
            })
            if (input.toLowerCase() === "exit") {
                console.log(colors.orange.green(`Goodbye`))
                return
            }

            const chat = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-16k-0613",
                messages: [{
                    role: "user",
                    content: messages
                }]
            })
            const text = chat.data.choices[0].message.content
            chatHistory.push(['user', input])
            chatHistory.push(['Bot', text])

            console.log(colors.green(`Bot: ${text}`))

        } catch (error) {
            console.error(colors.red(error))

        }
    }





}

main()