import { useState } from "react"
import axios from "axios"
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

const Home = () => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const askQuestion = async () => {
    try {
      const response = await axios.post("/api/stoicAnswer", { question })
      setAnswer(response.data.answer)
    } catch (error) {
      console.error("Error fetching stoic response:", error)
      setAnswer("Error fetching stoic response")
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
          <TextField
            fullWidth
            variant="outlined"
            label="Ask your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={askQuestion}>
              Ask
            </Button>
          </Box>
          <Typography variant="body1">{answer}</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Home
