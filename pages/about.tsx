import { Box, Container, Typography } from "@mui/material"
import theme from "../lib/theme"

const About = () => {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${theme.spacing(8)})`, // Subtract AppBar height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          About Stoic Answers
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          Stoic Answers is a simple web app that uses OpenAI's ChatGPT API to provide stoic
          responses to user questions. The app demonstrates how to create a user interface for
          asking questions and displaying AI-generated responses using Next.js and Material-UI.
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          The purpose of this app is to showcase the integration of ChatGPT, a state-of-the-art
          language model, with a modern web application built using Next.js and TypeScript. With a
          focus on stoic philosophy, the app aims to provide insightful and thought-provoking
          answers to user questions.
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          While the AI-generated responses can be helpful, they should not be considered as
          professional advice or an authoritative source. Users are encouraged to reflect on the
          answers and apply critical thinking when using the app.
        </Typography>
      </Container>
    </Box>
  )
}

export default About
