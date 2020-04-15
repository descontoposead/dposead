const Modal = () => (
  <>
    <amp-script className="modal" script="modal">
      <div className="close">&#10006;</div>
      <form method="get" action="true" action-xhr="/api/leads" target="_top">
        <div>
          <label htmlFor="email">
            Quer estudar com <strong>Desconto?</strong>
          </label>
          <input
            autoComplete="off"
            autoFocus
            id="email"
            name="email"
            type="email"
            placeholder="Seu melhor e-mail..."
            required
          />
          <input
            autoComplete="off"
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome..."
            required
          />
          <input
            autoComplete="off"
            id="whatsapp"
            name="whatsapp"
            type="text"
            placeholder="Seu whatsapp..."
            required
          />
          <input type="hidden" name="trigger" value="navigator" />
        </div>
        <div>
          <div submitting="">
            <template type="amp-mustache">
              <strong>Enviando...</strong>
            </template>
          </div>
          <button type="submit" className="btn btn-red">
            Receber Desconto
          </button>
        </div>
      </form>
    </amp-script>
    <script
      id="modal"
      type="text/plain"
      target="amp-script"
      dangerouslySetInnerHTML={{
        __html: `
      const btn = document.querySelector('.close');
      btn.addEventListener('click', () => {
        document.textContent = '';
      });
      `,
      }}
    ></script>
    <style jsx>{`
      .amp-form-submitting button {
        display: none;
      }
      div.close {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        cursor: pointer;
      }
      div.close:hover {
        color: var(--red);
      }
      @media (min-width: 749px) {
        amp-script.modal {
          animation: fadeIn 0.2s linear 15s;
          animation-fill-mode: forwards;
        }
      }
      @media (min-width: 451px) {
        amp-script.modal > form > div:first-child {
        }
        div label {
          font-size: 1.5rem;
        }
      }
      @media (max-width: 450px) {
        amp-script.modal > form > div:first-child {
        }
        div label {
          font-size: 1.4rem;
        }
      }
      @media (min-height: 451px) {
        amp-script.modal > form {
          height: 55vh;
        }
      }
      @media (max-height: 450px) {
        amp-script.modal > form {
          height: 60vh;
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      amp-script.modal {
        transition: 0.2s;
        width: 380px;
        opacity: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: space-evenly;
        background: rgb(10, 19, 29);
        position: fixed;
        margin: 0 auto;
        border-radius: 10px;
        padding: 10px 20px;
        border: 4px solid #fdfdfd;
        color: white;
        margin-top: 15vh;
        height: 320px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 9;
        top: 0;
      }
      amp-script.modal > form > div > label {
        margin-bottom: 15px;
      }
      amp-script.modal > form > div {
        flex: 1;
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
      amp-script.modal > form > button {
        border: 0;
        font-size: 2rem;
        background: transparent;
        color: #df2936;
        cursor: pointer;
      }
      form {
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-evenly;
        height: 50vh;
        justify-content: center;
      }
      amp-script.modal > form > div:first-child {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      form label > strong {
        color: var(--red);
      }
      form input {
        border-radius: 10px;
        border: 0;
        padding: 5px 20px;
        font-size: 1.1rem;
        min-width: 300px;
        height: 40px;
        margin-bottom: 5px;
      }
      form input:focus {
        outline: none;
      }
      @media (max-width: 450px) {
        form {
          width: 100vw;
        }
      }
    `}</style>
  </>
)

export default Modal
