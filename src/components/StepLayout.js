import Head from 'next/head'
import { useSessionStorage, useKeyPressEvent } from 'react-use'
import { useEffect } from 'react'

const withStepLayout = (Step, props = { progressValue: 0 }) => () => {
  const [scrap, setScrap] = useSessionStorage('scrap', {
    page: 0,
    courses: [],
  })

  useKeyPressEvent('Enter', function gotoNextStep(e) {
    e.preventDefault()

    const btnNext = document.querySelector('button.next')
    btnNext.click()
  })

  useEffect(function onLoadPageScrapCourses() {
    let page = scrap.page

    ;(async function paginate() {
      const res = await fetch('/api/courses/' + page++)
      const data = await res.json()
      if (res.status === 200) {
        setScrap((scp) => ({ page, courses: [...scp.courses, ...data] }))
      } else {
        return
      }
      await paginate()
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Nova Matricula - Desconto Pos EaD</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2534781333293766');
            fbq('track', 'PageView');
            `,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2534781333293766&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
      <header>
        <div></div>
      </header>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Step />
      </form>
      <img
        id="logo"
        src="/static/images/logo-prominas.png"
        alt="Logo da Instituição parceira ofertante dos cursos"
      />
      <style jsx global>{`
        button.next[disabled] {
          visibility: hidden;
          border-color: #a6a6a6;
          color: #a6a6a6;
          cursor: not-allowed;
          user-select: none;
        }
        button.prev[disabled] {
          display: none;
        }
        button.next[disabled]:after {
          content: 'Enviando...';
          visibility: visible;
          display: flex;
          border: 4px solid #a6a6a6;
          padding: 10px 15px;
          border-radius: 10px;
        }
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
          width: ${props.progressValue}vw;
          height: 10px;
          background: #000;
          transition: 1s;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 7px;
        }

        @media (min-width: 449px) {
          form {
            justify-content: space-around;
          }
          form > div button {
            font-size: 1.4rem;
          }
          form > div h1 {
            line-height: 1.25;
            font-size: 2.4rem;
          }
        }
        @media (max-width: 450px) {
          form {
            justify-content: space-between;
            padding: 0 0 20px;
            box-sizing: border-box;
          }
          form > div h1 {
            line-height: 1;
          }
          form > div button {
            font-size: 1.25rem;
          }
        }
        @media (max-width: 350px) {
          form > div button {
            font-size: 1rem;
          }
          form > div h1 {
            font-size: 2.3rem;
          }
        }

        strong.hasError {
          display: none;
        }
        strong.hasEmptyError {
          display: none;
        }
        strong.hasInvalidError {
          display: none;
        }
        .empty-value-error + strong.hasError,
        .invalid-value-error ~ strong.hasInvalidError,
        .empty-value-error ~ strong.hasEmptyError {
          display: block;
          color: #f44336;
        }
        .error,
        .invalid-value-error,
        .empty-value-error {
          border-bottom: 4px solid #f44336 !important;
        }
        body {
          margin: 0;
        }
        :root {
          margin: 0;
          touch-action: pan-y;
        }
        * {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1;
        }
        form {
          width: 100vw;
          display: flex;
          flex-wrap: wrap;
        }
        form > div {
          width: 100vw;
          text-align: center;
          padding: 0 16px;
          box-sizing: border-box;
        }
        form > div:nth-child(1),
        form > div:nth-child(2) {
          align-self: flex-start;
        }
        form > div:nth-child(3) {
          display: flex;
          justify-content: center;
          align-items: stretch;
        }
        form > div:nth-child(2) > div {
          margin-bottom: 15px;
        }
        form > div:nth-child(2) > div:last-child {
          margin-bottom: 0;
        }
        form > div:nth-child(2) {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          justify-content: center;
          margin-bottom: 30px;
        }
        form > div:nth-child(2) input:first-child {
          margin-bottom: 5px;
        }
        textarea:focus,
        input:focus {
          outline: none;
        }
        form > div:nth-child(2) textarea {
          resize: none;
        }
        form > div:nth-child(2) textarea,
        form > div:nth-child(2) input {
          width: 90vw;
          border: 0;
          font-size: 1.8rem;
          text-align: center;
          overflow: hidden;
        }
        form > div:nth-child(2) strong {
          width: 100%;
          font-size: 1.5rem;
        }
        form > div h1 {
          color: #292929;
        }
        form > div button {
          border: solid 4px;
          padding: 10px 15px;
          border-radius: 10px;
          font-weight: bold;
          background: transparent;
          cursor: pointer;
        }
        form > div button.prev {
          border-color: #6b6b6b;
          color: #6b6b6b;
          margin-right: 5px;
        }
        form > div button.next {
          border-color: #292929;
          color: #292929;
        }
      `}</style>
    </>
  )
}

export default withStepLayout
