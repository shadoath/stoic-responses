import type { NextApiRequest, NextApiResponse } from "next"
import { openai } from "../../../lib/openAi"

const stoicResponse = async (question: string, model = "gpt-4o-mini") => {
  const prompt =
    "As a Stoic philosopher, provide a concise response incorporating Stoic philosophy. Be succinct and to the point."

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: model,
    temperature: 0.7,
    max_tokens: 500,
    n: 1,
  })

  return response.data.choices[0].message.content
}

const stoicQuote = async (question: string, model = "gpt-4o-mini") => {
  const prompt =
    "Please provide a relevant quote from one of the great Stoic philosophers (such as Epictetus, Seneca, or Marcus Aurelius) in response to the user's question. Only add a quote, no other text."

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: model,
    temperature: 0.7,
    max_tokens: 500,
    n: 1,
  })

  return response.data.choices[0].message.content
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { question, mode, model } = req.body
    try {
      if (mode === "quote") {
        const answer = await stoicQuote(question, model)
        res.status(200).json({ answer })
      } else {
        const answer = await stoicResponse(question, model)
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
