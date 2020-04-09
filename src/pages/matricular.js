import Head from 'next/head'

import { SharedStepProvider } from '../hooks/useSharedStep'
import Form from '../components/stepForm/Form'
import { useState } from 'react'

const Enrolment = () => {
  const [progressBarValue, setProgressBarValue] = useState(0)
  const progressBar = (value) => {
    setProgressBarValue(value)
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              process.env.NODE_ENV === 'production'
                ? `var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/${process.env.gnAccountId}/'+v;s.async=false;s.id='${process.env.gnAccountId}';if(!document.getElementById('${process.env.gnAccountId}')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};$gn.ready((checkout) => {})`
                : `var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/${process.env.gnAccountId}/'+v;s.async=false;s.id='${process.env.gnAccountId}';if(!document.getElementById('${process.env.gnAccountId}')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};$gn.ready((checkout) => {})`,
          }}
        ></script>
      </Head>
      <header></header>
      <SharedStepProvider>
        <Form onProgress={(value) => progressBar(value)} />
      </SharedStepProvider>
      <img
        id="logo"
        src="/static/images/logo-prominas.webp"
        alt="Logo da Instituição parceira ofertante dos cursos"
      />

      <style jsx>{`
        img#logo {
          position: fixed;
          right: 10px;
          bottom: 20px;
        }
        header {
          height: 5px;
          background: #000;
          width: ${progressBarValue > 100 ? 100 : progressBarValue}vw;
          transition: 1s;
        }
      `}</style>
    </>
  )
}

export default Enrolment
