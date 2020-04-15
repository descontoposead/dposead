import Head from 'next/head'

import withLayout from '../components/Layout'
import Link from 'next/link'

export const config = { amp: true }

const ThankYou = () => (
  <>
    <Head>
      <title>Obrigado - Desconto Pos EaD</title>
    </Head>
    <main>
      <amp-img
        media="(min-width: 500px)"
        alt="Aluno feliz porque se inscreveu numa incrível oportunidade de curso a distância"
        src="/static/images/man_happy.webp"
        width="700"
        height="844"
        layout="responsive"
      >
        <amp-img
          fallback=""
          alt="Aluno feliz porque se inscreveu numa incrível oportunidade de curso a distância"
          src="/static/images/man_happy.jpg"
          width="700"
          height="844"
          layout="responsive"
        ></amp-img>
      </amp-img>
      <amp-img
        media="(max-width: 499px)"
        alt="Aluno feliz porque se inscreveu numa incrível oportunidade de curso a distância"
        src="/static/images/man_happy__mobile.webp"
        width="700"
        height="844"
        layout="responsive"
      >
        <amp-img
          fallback=""
          alt="Aluno feliz porque se inscreveu numa incrível oportunidade de curso a distância"
          src="/static/images/man_happy.jpg"
          width="700"
          height="844"
          layout="responsive"
        ></amp-img>
      </amp-img>
      <div>
        <h1>Pronto, falta muito pouco para mudar seu futuro.</h1>
        <span>
          Obrigado pela confiança, você pode falar agora com um consultor
          clicando em “Converse no Whatsapp” ou aguardar o contato de nosso
          consultor. Caso já tenha tomado a decisão de estudar conosco, clique
          em “Matricule-se” abaixo para garantir sua matrícula.
        </span>
        <div>
          <a
            href={
              'https://api.whatsapp.com/send?1=pt_BR&phone=' +
              process.env.whatsappNumber
            }
            target="_blank"
          >
            Conversar no whatsapp
          </a>
          <Link href="/matricular">
            <a className="btn btn-write">Matricule-se</a>
          </Link>
        </div>
      </div>
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
      <style jsx>{`
        main {
          display: flex;
          position: relative;
          height: calc(100vh - 68px);
          align-items: center;
          padding: 0 var(--margin-lg);
        }

        main > amp-img {
          min-width: 288px;
          min-height: 350px;
          width: 30%;
        }

        main > div {
          background: var(--blue);
          color: #fff;
          padding: 10px;
          width: 557px;
          width: 50vw;
          height: 65vh;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          margin-left: 15px;
        }

        main > div > span {
          margin-top: 20px;
        }

        main > div > div {
          margin-top: 30px;
        }

        main > div > div a {
          text-decoration: none;
          margin-right: 7px;
          border-radius: 4px;
          height: 36px;
          border: 0px;
          margin-bottom: 5px;
          padding: 10px 15px;
          height: 40px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
        }
        main > div > div a:first-child {
          background: #427e38;
          color: #ffff;
        }
        main > div > div > a:nth-of-type(2) {
          background: #fff;
          color: var(--blue);
        }

        @media (min-width: 1000px) {
          main > div {
            height: 50vh;
            position: absolute;
            left: 425px;
          }
        }

        @media (max-width: 999px) {
          main {
            padding: 0 var(--margin-sm);
          }
        }
        @media (max-width: 750px) {
          main {
            padding: 0 20px;
          }
        }
        @media (max-width: 650px) {
          main {
            height: auto;
            flex-wrap: wrap;
            justify-content: center;
          }
          main > div {
            width: auto;
            padding: 0;
            margin-bottom: 40px;
          }
          main > amp-img {
            margin-top: 90px;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 450px) {
          main > div {
            height: auto;
          }
        }
      `}</style>
    </main>
  </>
)

export default withLayout(ThankYou, { onlyToolbar: true })
