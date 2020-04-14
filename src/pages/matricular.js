import Head from 'next/head'
import { useState } from 'react'

import { SharedStepProvider } from '../hooks/useSharedStep'
import Form from '../components/stepForm/Form'

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
                : `var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://sandbox.gerencianet.com.br/v1/cdn/${process.env.gnAccountId}/'+v;s.async=false;s.id='${process.env.gnAccountId}';if(!document.getElementById('${process.env.gnAccountId}')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};$gn.ready((checkout) => {})`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KD7Q46R');`,
          }}
        ></script>
      </Head>

      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https:/
            /www.googletagmanager.com/ns.html?id=GTM-KD7Q46R"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
        }}
      ></noscript>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-161660301-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-161660301-1');`,
        }}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `<script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2142419396064150');
            fbq('track', 'PageView');
          </script>`,
        }}
      ></script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=2142419396064150&ev=PageView&noscript=1"
          />`,
        }}
      ></noscript>
      <header>
        <div></div>
      </header>
      <SharedStepProvider>
        <Form onProgress={(value) => progressBar(value)} />
      </SharedStepProvider>
      <img
        id="logo"
        src="static/images/logo-prominas.png"
        alt="Logo da Instituição parceira ofertante dos cursos"
      />

      <style jsx>{`
        img#logo {
          position: fixed;
          right: 10px;
          bottom: 20px;
        }
        header {
          width: 100vw;
          height: 10px;
          border-right: 0;
          border-left: 0;
          background: #cecece;
        }
        header > div {
          width: ${progressBarValue > 100 ? 100 : progressBarValue}vw;
          height: 10px;
          background: #000;
          transition: 1s;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 7px;
        }
      `}</style>
    </>
  )
}

export default Enrolment
