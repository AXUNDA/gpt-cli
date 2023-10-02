import OpenAI from 'openai';
import dotenv from 'dotenv'


dotenv.config()
const openai = new OpenAI({
    apiKey: "",
});

export default openai