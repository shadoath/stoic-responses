import { NextApiRequest, NextApiResponse } from "next"
import { openai } from "../../../lib/openAi"

const stoicResponse = async (question: string) => {
  const prompt = `Please provide a relevant quote from one of the great Stoic philosophers (such as Epictetus, Seneca, or Marcus Aurelius) in response to the following question: "${question}"`

  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 180,
    n: 1,
  })

  return response.data.choices[0].text
}

const stoicQuote = async (question: string) => {
  const prompt = `Please provide a relevant quote from one of the great Stoic philosophers (such as Epictetus, Seneca, or Marcus Aurelius) in response to the following question: "${question}". If possible provide context for the quote and where it came from.`

  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    temperature: 0.8,
    max_tokens: 180,
    n: 1,
  })
  console.log(response.data)

  return response.data.choices[0].text
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { question, mode } = req.body
    console.log({ question, mode })
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
      res.status(500).json({ error: "Error generating stoic response" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
