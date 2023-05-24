import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { AppBar, Button, CssBaseline, Toolbar } from "@mui/material"
import Link from "next/link"
import theme from "../lib/theme"
import { useRouter } from "next/router"
import { Analytics } from "@vercel/analytics/react"
import { Head } from "next/document"
import Script from "next/script"

function StoicApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <Script
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JCERJE35K2"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCERJE35K2');
          `}
        </Script>
      </Head>
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
      <Analytics />
    </ThemeProvider>
  )
}

export default StoicApp
