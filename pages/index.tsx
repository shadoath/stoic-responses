import { useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

const Home = () => {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [qaPairs, setQaPairs] = useState<Array<{ question: string; answer: string }>>([])

  const askQuestion = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/stoicAnswer", { question })
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightblue",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Stoic Answers
          </Typography>
          <form>
            <TextField
              fullWidth
              variant="outlined"
              label="Ask your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={askQuestion}
                disabled={loading}
                type="submit"
              >
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
    </ThemeProvider>
  )
}

export default Home
