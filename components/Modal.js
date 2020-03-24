const Modal = () => (
  <>
    <amp-script
      layout="container"
      src="https://descontoposead.com.br/amp-scripts/hideModal.js"
    >
      <div>
        <button>&times;</button>
      </div>
      <form action-xhr="/saveLead" method="post">
        <div>
          <label htmlFor="email">
            Falar com um <strong>especialista</strong>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu melhor e-mail"
          />
        </div>
        <div>
          <button className="btn btn-red">Enviar</button>
        </div>
      </form>
    </amp-script>

    <style jsx>{`
      @keyframes openModal {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(0, -40vh);
        }
      }
      amp-script {
        animation: openModal 0.5s;
        animation-delay: 10s;
        animation-fill-mode: forwards;
        opacity: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: space-evenly;
        top: 100vh;
        background: rgb(10, 19, 29);
        z-index: 2;
        position: fixed;
        height: 40vh;
        width: 455px;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 10px;
        padding: 10px 20px;
        border: 4px solid #fdfdfd;
        color: white;
        transition: top 1s;
      }
      amp-script > div {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
      amp-script > div button {
        border: 0;
        font-size: 2rem;
        background: transparent;
        color: #df2936;
        cursor: pointer;
      }
      amp-script form {
        display: flex;
        flex-wrap: wrap;
        align-content: space-evenly;
        height: 100%;
        justify-content: center;
      }
      amp-script form > div:first-child {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: 85px;
      }
      amp-script label {
        font-size: 1.5rem;
      }
      amp-script label > strong {
        color: var(--red);
      }
      amp-script input {
        border-radius: 10px;
        border: 0;
        padding: 5px 20px;
        font-size: 1.1rem;
        min-width: 300px;
      }
      @media (max-width: 450px) {
        amp-script {
          width: 100vw;
        }
      }
    `}</style>
  </>
)

export default Modal
