import withLayout from "../components/Layout";

export const config = { amp: true };

const ThankYou = () => (
  <main>
    <img
      src="/man_happy.webp"
      alt="Homem feliz porque se inscreveu numa incrivel oportunidade de curso a distância"
    />
    <div>
      <h1>Pronto, falta muito pouco para mudar seu futuro.</h1>
      <span>
        Obrigado pela confiança, você pode falar agora com um consultor clicando
        em “Converse no whatsap” ou aguardar o contato de nosso consultor. Caso
        já tenha tomado a decisão de estudar conosco, clique em “Matriule-se”
        abaixo para garantir sua matrícula.
      </span>
      <div>
        <button>Conversar no whatsapp</button>
        <button>Matricule-se</button>
      </div>
    </div>

    <style jsx>{`
      main {
        display: flex;
        position: relative;
        height: calc(100vh - 179px);
        align-items: center;
        padding: 0 var(--margin-lg);
      }

      main > img {
        min-width: 288px;
        min-height: 350px;
        width: 30%;
        background-size: cover;
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

      main > div > div button {
        margin-right: 7px;
        border-radius: 2px;
        font-size: 1rem;
        height: 36px;
        border: 0px;
        margin-bottom: 5px;
      }
      main > div > div button:first-child {
        background: #427e38;
        color: #ffff;
      }
      main > div > div > button:nth-of-type(2) {
        background: ffffff;
        color: #000000;
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
          margin-bottom: 50px;
        }
        main > img {
          margin-top: 50px;
        }
      }
    `}</style>
  </main>
);

export default withLayout(ThankYou, { onlyToolbar: true });
