import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Settings as SettingsIcon } from "@mui/icons-material"
import axios from "axios"
import { useState } from "react"
import theme from "../lib/theme"
const Home = () => {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [qaPairs, setQaPairs] = useState<Array<{ question: string; answer: string }>>([])
  const [mode, setMode] = useState<"response" | "quote">("response")
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [settingsOpen, setSettingsOpen] = useState(false)

  const availableModels = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  ]

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
      const response = await axios.post(`/api/stoic/ai`, { question, mode, model: selectedModel })
      setQaPairs((prevQaPairs) => [{ question, answer: response.data.answer }, ...prevQaPairs])
      setQuestion("")
    } catch (error) {
      console.error("Error fetching stoic response:", error)
      setQaPairs((prevQaPairs) => [
        { question, answer: "Error fetching stoic response" },
        ...prevQaPairs,
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
  const clearResponses = () => {
    setQaPairs([])
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: `calc(100vh - ${theme.spacing(8)})`, // Subtract AppBar height

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Stoic Mind AI
        </Typography>
        <form onSubmit={handleSubmit}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            fullWidth
            sx={{ marginBottom: 1 }}
          >
            <ToggleButton value="response">Response</ToggleButton>
            <ToggleButton value="quote">Quote</ToggleButton>
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
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 3,
              border: "1px solid",
              borderColor: "primary.light",
              borderRadius: 2,
              backgroundColor: "background.paper",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "primary.dark",
                mb: 1.5,
                pb: 1,
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              Q: {qaPair.question}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                color: "text.primary",
                fontStyle: "italic",
              }}
            >
              {qaPair.answer}
            </Typography>
          </Box>
        ))}
        <Button color="secondary" variant="outlined" onClick={clearResponses} sx={{ marginTop: 2 }}>
          Clear
        </Button>
      </Container>

      {/* Settings Button - Bottom Left */}
      <IconButton
        onClick={() => setSettingsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <SettingsIcon />
      </IconButton>

      {/* Settings Modal */}
      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        aria-labelledby="settings-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: "text.primary" }}>
            Settings
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="model-select-label">AI Model</InputLabel>
            <Select
              labelId="model-select-label"
              value={selectedModel}
              label="AI Model"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {availableModels.map((model) => (
                <MenuItem key={model.value} value={model.value}>
                  {model.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setSettingsOpen(false)} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default Home
