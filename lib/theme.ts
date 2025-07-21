import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#5D4037", // Deep brown - stoic and grounded
    },
    secondary: {
      main: "#8D6E63", // Lighter brown for secondary elements
    },
    background: {
      default: "#F5F5F5", // Warm off-white background
      paper: "#FAFAFA", // Slightly warmer white for cards
    },
    text: {
      primary: "#3E2723", // Dark brown for primary text
      secondary: "#6D4C41", // Medium brown for secondary text
    },
    grey: {
      300: "#D7CCC8", // Warm light grey for borders
      400: "#BCAAA4", // Medium warm grey
      500: "#8D6E63", // Warm medium grey
    },
  },
})
export default theme
