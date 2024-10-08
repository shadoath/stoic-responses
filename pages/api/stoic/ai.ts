import { NextApiRequest, NextApiResponse } from "next"
import { openai } from "../../../lib/openAi"

const stoicResponse = async (question: string) => {
  const prompt = `I am an AI trained in Stoic philosophy. How would a Stoic philosopher respond to the following question: "${question}"?`

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0.7,
    max_tokens: 210,
    n: 1,
  })

  return response.data.choices[0].message.content
}

const stoicQuote = async (question: string) => {
  const prompt = `Please provide a relevant quote from one of the great Stoic philosophers (such as Epictetus, Seneca, or Marcus Aurelius) in response to the following question: "${question}". If possible provide context for the quote and where it came from.`

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0.7,
    max_tokens: 210,
    n: 1,
  })

  return response.data.choices[0].message.content
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { question, mode } = req.body
    try {
      if (mode === "quote") {
        const answer = await stoicQuote(question)
        res.status(200).json({ answer })
      } else {
        const answer = await stoicResponse(question)
        res.status(200).json({ answer })
      }
    } catch (error) {
      console.error("Error generating stoic response:", error)
      console.dir(error, { depth: null })
      res.status(500).json({ error: "Error generating stoic response" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
