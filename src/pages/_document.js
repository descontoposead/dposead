import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* Facebook Pixel */}
          <amp-pixel
            src="https://www.facebook.com/tr?id=2534781333293766&ev=PageView&noscript=1"
            layout="nodisplay"
          ></amp-pixel>
          <amp-analytics type="facebookpixel" id="facebook-pixel">
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: `{
              "vars": {
                  "pixelId": "2534781333293766"
              },
              "triggers": {
                  "trackPageview": {
                    "on": "visible",
                    "request": "pageview"
                  }
               }
          }`,
              }}
            ></script>
          </amp-analytics>
        </body>
      </Html>
    )
  }
}

export default CustomDocument
