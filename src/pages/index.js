import Head from 'next/head'

import withLayout from '../components/Layout'
import About from '../components/home/About'
import ThreeReasons from '../components/home/ThreeReasons'
import Scarcity from '../components/home/Scarcity'
import Audience from '../components/home/Audience'
import Capitation from '../components/home/Capitation'
import Faq from '../components/home/Faq'
import Modal from '../components/Modal'

export const config = { amp: true }

const Home = () => (
  <>
    <Head>
      <title>Desconto Pos EaD - Cursos Online de Pós Graduação</title>
    </Head>
    <main>
      <Modal />
      <About />
      <ThreeReasons />
      <Scarcity />
      <Audience />
      <Capitation />
      <Faq />
    </main>
  </>
)

export default withLayout(Home)
