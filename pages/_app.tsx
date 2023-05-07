import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { AppBar, Button, CssBaseline, Toolbar } from "@mui/material"
import Link from "next/link"
import theme from "../lib/theme"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Link href="/" passHref>
            <Button color={router.pathname === "/" ? "secondary" : "primary"}>Ask</Button>
          </Link>
          <Link href="/about" passHref>
            <Button color={router.pathname === "/about" ? "secondary" : "primary"}>About</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp