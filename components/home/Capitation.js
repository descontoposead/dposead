const Capitation = () => (
  <section>
    <form>
      <div>
        <h3>Deixe seu contato</h3>
        <h4>
          E ganhe uma consultoria totalmente gratuita com um especialista de
          aconselhamento educacional capaz de te ajudar a escolher o curso que
          mais atende sua necessidade.
        </h4>
        <div>
          <div style={{ flex: 1 }}>
            <label for="name">Nome</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label for="phone">Telefone</label>
            <input type="text" name="phone" />
          </div>
        </div>
        <div>
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" />
          </div>
        </div>
        <div>
          <button className="btn btn-black">Enviar</button>
          <span>
            Ou entre em contato conosco
            <button className="btn btn-green">Via whatsapp</button>
          </span>
        </div>
      </div>
    </form>
    <img src="/smile_man.webp" alt="Aluno feliz com nossos cursos online" />

    <style jsx>{`
      section {
        margin: 150px 0 150px;
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
      }
      section > img {
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
        border-radius: 2px;
      }
      section > form > div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
      }
      section > form > div > div:nth-of-type(3) > span > button {
        background: rgb(21, 128, 21);
        border: 1px solid;
        font-size: 1rem;
        padding: 5px 20px;
        margin-left: 10px;
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
      }
      @media (max-width: 750px) {
        section {
          margin: 150px 0 0;
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
        section > img {
          width: 90%;
          position: initial;
        }
        section > form > div > div > div {
          padding: 0;
          margin: 5px;
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
      }
      @media (max-width: 450px) {
        section {
          margin: -220px 0 490px;
        }
        section > form {
          top: 623px;
        }
      }
      @media (max-width: 376px) {
      }
      @media (max-width: 330px) {
        section {
          margin: -318px 0 413px;
        }
      }
    `}</style>
  </section>
);

export default Capitation;
