import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import theme from "../lib/theme"
import ToggleButton from "@mui/lab/ToggleButton"
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup"

const Home = () => {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [qaPairs, setQaPairs] = useState<Array<{ question: string; answer: string }>>([])
  const [mode, setMode] = useState<"response" | "quote">("response")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!question) {
      return
    }

    setLoading(true)
    await getStoic(mode, question)
    setLoading(false)
  }

  const getStoic = async (mode, question) => {
    setLoading(true)
    try {
      const response = await axios.post(`/api/stoic/ai`, { question, mode })
      setQaPairs((prevQaPairs) => [...prevQaPairs, { question, answer: response.data.answer }])
      setQuestion("")
    } catch (error) {
      console.error("Error fetching stoic response:", error)
      setQaPairs((prevQaPairs) => [
        ...prevQaPairs,
        { question, answer: "Error fetching stoic response" },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: "response" | "quote"
  ) => {
    if (newMode !== null) {
      setMode(newMode)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: `calc(100vh - ${theme.spacing(8)})`, // Subtract AppBar height

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Stoic Responses
        </Typography>
        <form onSubmit={handleSubmit}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            fullWidth
            sx={{ marginBottom: 1 }}
          >
            <ToggleButton value="response">Stoic Response</ToggleButton>
            <ToggleButton value="quote">Stoic Quote</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            fullWidth
            variant="outlined"
            label="Ask your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" disabled={loading} type="submit">
              Ask
            </Button>
          </Box>
        </form>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {qaPairs.map((qaPair, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Q: {qaPair.question}</Typography>
            <Typography variant="body1">A: {qaPair.answer}</Typography>
          </Box>
        ))}
      </Container>
    </Box>
  )
}

export default Home
