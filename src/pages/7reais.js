import Head from 'next/head'

import withLayout from '../components/Layout7'
import About from '../components/home7/About'
import ThreeReasons from '../components/home7/ThreeReasons'
import Scarcity from '../components/home7/Scarcity'
import Audience from '../components/home7/Audience'
import Capitation from '../components/home7/Capitation'
import Faq from '../components/home7/Faq'
import Modal from '../components/Modal'

export const config = { amp: true }

const Home = () => (
  <>
    <Head>
      <title>Desconto Pos EaD - Pós Graduação em 6 meses</title>
    </Head>
    <main>
      <Modal timer={40} />
      <About />
      <ThreeReasons />
      <Scarcity />
      <Audience />
      <Capitation />
      <Faq />
    </main>

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
  </>
)

export default withLayout(Home)
