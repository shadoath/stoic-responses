import { NextApiRequest, NextApiResponse } from "next"
import { openai } from "../../lib/openAi"

const stoicResponse = async (question: string) => {
  const prompt = `As a stoic philosopher, how would you respond to this question: ${question}?`
  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 100,
    n: 1,
  })

  console.log(response.data)

  return response.data.choices[0].text
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const question = req.body.question
    try {
      const answer = await stoicResponse(question)
      res.status(200).json({ answer })
    } catch (error) {
      console.error("Error generating stoic response:", error)
      res.status(500).json({ error: "Error generating stoic response" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
