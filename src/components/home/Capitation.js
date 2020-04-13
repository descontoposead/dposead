import WhatsappGreenIcon from '../icon/WhatsappGreenIcon'

const Capitation = () => (
  <section>
    <form method="get" action="true" action-xhr="/api/leads" target="_top">
      <div className="container">
        <h3>Deixe seu contato</h3>
        <h4>
          E ganhe uma consultoria totalmente gratuita com um especialista de
          aconselhamento educacional capaz de te ajudar a escolher o curso que
          mais atende sua necessidade.
        </h4>
        <div className="topinput">
          <div>
            <label htmlFor="name">NOME</label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">TELEFONE</label>
            <input
              id="phone"
              type="text"
              name="whatsapp"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="email">E-MAIL</label>
            <input
              className="inputmail"
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-black">
            Enviar
          </button>
          <span>
            Ou entre em contato conosco
            <button className="btn btn-green">
              <WhatsappGreenIcon />
              <span>Via Whatsapp</span>
            </button>
          </span>
        </div>
      </div>
    </form>
    <amp-img
      media="(min-width: 500px)"
      alt="Aluno feliz com nossos cursos online"
      src="/static/images/smile_man.webp"
      width="460"
      height="610"
      layout="responsive"
    ></amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Aluno feliz com nossos cursos online"
      src="/static/images/smile_man__mobile.webp"
      width="460"
      height="610"
      layout="responsive"
    ></amp-img>

    <style jsx>{`
      section {
        margin: 150px 0 150px;
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
      }
      div.container {
        position: relative;
        width: 70%;
        left: 21%;
      }
      .btn-green > span {
        margin-left: 10px;
      }
      section > amp-img {
        width: 40vw;
        position: absolute;
        right: 0;
      }
      section > form {
        width: 65vw;
        height: 70vh;
        position: absolute;
        left: 0;
        background: var(--red);
        z-index: 1;
        padding: 20px;
        display: flex;
        align-items: center;
      }
      section > form input {
        height: 40px;
        border-radius: 6px;
      }

      section > form > div.topinput {
        display: flex;
        flex-wrap: wrap;
      }

      section > form > div * {
        color: var(--write);
      }
      section > form > div > h3,
      section > form > div > h4 {
        width: 100%;
      }
      section > form > div > h3 {
        font-size: 2.5rem;
      }
      section > form > div > h4 {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 25px;
      }

      section > form > div > div:nth-of-type(1) {
        display: flex;
        flex: 1;
      }
      section > form > div > div:nth-of-type(2) {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
      }
      section > form > div > div:nth-of-type(3) {
        padding: 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      section > form > div > div:nth-of-type(3) > button {
        align-self: center;
        margin-bottom: 15px;
        background: var(--blue);
        padding: 10px 50px;
        font-size: 1rem;
      }
      section > form > div > div:nth-of-type(3) > span {
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
      section > form > div > div:nth-of-type(3) > span > button {
        background: #69b366;
        border: 1px solid;
        font-size: 1rem;
        padding: 5px 20px;
        margin-left: 10px;
        display: flex;
        align-items: center;
      }
      section > form > div > div > div {
        display: flex;
        flex-flow: column;
        padding: 15px;
        flex: 1;
      }
      section > form > div > div > div label {
        font-weight: 600;
      }
      section > form > div > div > div input {
        border: 0;
        font-size: 1rem;
        color: var(--blue);
        padding: 5px;
        font-weight: 600;
      }

      @media (max-width: 999px) {
        section {
          margin: 50px 0 0;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 750px) {
        section {
          margin: 150px 0 0;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 650px) {
        section {
          flex-direction: column-reverse;
          margin: 350px 0;
          height: 800px;
        }
        section > form {
          height: 525px;
          background: var(--red);
          z-index: 1;
          padding: 20px;
          display: flex;
          width: 100%;
          position: absolute;
          top: 448px;
          box-sizing: border-box;
        }
        section > amp-img {
          width: 80%;
          position: initial;
        }
        section > form > div > div > div {
          padding: 0;
          margin: 5px;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 550px) {
        section {
          margin: -30px 0 400px;
        }
        section > form > div > div:nth-of-type(1) {
          flex-wrap: wrap;
          width: 100%;
          flex: auto;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 450px) {
        section {
          height: 650px;
          margin: 100px 0 415px;
        }
        .btn-green > span {
          margin-left: 5px;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 384px) {
        section {
          height: 550px;
          margin: 100px 0 524px;
        }
        section > form {
          height: 550px;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      @media (max-width: 330px) {
        section {
          height: 450px;
          margin: 100px 0 732px;
        }
        section > form {
          height: 650px;
        }
        div.container {
          position: relative;
          width: 100%;
          left: 0%;
          top: 12px;
        }
        section > form > div > h4 {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
    `}</style>
  </section>
)

export default Capitation
