import Head from 'next/head'

import Header from './home/Header'
import Footer from './shared/Footer'
import ContactMenu from './ContactMenu'
import Lightbox from './Lightbox'

const withLayout = (Page, opts = { onlyToolbar: false }) => () => (
  <>
    {/* Google Tag Manager */}
    <amp-analytics
      config="https://www.googletagmanager.com/amp.json?id=GTM-KD7Q46R"
      data-credentials="include"
    ></amp-analytics>
    <amp-analytics
      config="https://www.googletagmanager.com/amp.json?id=GTM-KD7Q46R&gtm.url=SOURCE_URL"
      data-credentials="include"
      dangerouslySetInnerHTML={{
        __html: `
          <script type="application/json">
          {
            "vars": {
              "var1": "val1", "var2": "val2"
            }
          }
          </script>
          `,
      }}
    ></amp-analytics>

    {/* Google analytics */}
    <amp-analytics type="googleanalytics" id="analytics1">
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: `{
            "vars": {
              "account": "UA-161660301-1"
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

    {/* Facebook Pixel */}
    <amp-pixel
      src="https://www.facebook.com/tr?id=2142419396064150&ev=PageView&noscript=1"
      layout="nodisplay"
    ></amp-pixel>
    <amp-analytics type="facebookpixel" id="facebook-pixel">
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: `{
              "vars": {
                  "pixelId": "2142419396064150"
              },
              "triggers": {
                  "trackPageview": {
                      "on": "visible",
                      "request": "pageview"
                  },
                  "formSubmit": {
                      "on": "amp-form-submit-success",
                      "request": "event",
                      "vars": {
                      "eventName": "Entrou na página home"
                      }
                  }   }
          }`,
        }}
      ></script>
    </amp-analytics>

    <Lightbox />
    <Header {...opts} />
    <Page />
    <ContactMenu />
    <Footer />
    <style jsx global>{`
      * {
        margin: 0;
        font-family: Helvetica, sans-serif;
        box-sizing: border-box;
      }
      body {
        background: var(--blue);
      }
      :root {
        --blue: #0c141e;
        --rgb-blue: 10, 20, 30;
        --write: #fff;
        --red: #df2936;
        --alpha: 0.99;
        --margin-lg: 150px;
        --margin-sm: 70px;
        --margin-between: 60px;
        --section-height: 600px;
      }
      .btn {
        border: 0;
        padding: 5px 30px;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-outline {
        border: 0.5px solid #ddd;
        background: transparent;
        color: var(--write);
      }
      .btn-red {
        background: var(--red);
        color: var(--write);
        font-size: 1.2rem;
        padding: 10px 20px;
        font-weight: 700;
      }
      .btn-write {
        background: var(--write);
      }
      .mt40 {
        margin-top: 40px;
      }
      .mt15 {
        margin-top: 15px;
      }
    `}</style>
  </>
)

export default withLayout
