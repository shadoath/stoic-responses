import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
