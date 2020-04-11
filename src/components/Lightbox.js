const Lightbox = () => (
  <>
    <amp-lightbox id="captureLead" layout="nodisplay">
      <form action-xhr="/saveLead" method="post">
        <div>
          <label htmlFor="email">
            Quer estudar com <strong>desconto?</strong>
          </label>
          <input
            autoComplete="off"
            autoFocus
            id="email"
            name="email"
            type="email"
            placeholder="Escreva seu melhor e-mail..."
          />
        </div>
        <div>
          <button on="tap:captureLead.close" className="btn btn-red">
            Enviar
          </button>
        </div>
      </form>
    </amp-lightbox>

    <style jsx>{`
      @media (min-width: 451px) {
        amp-lightbox form > div:first-child {
          height: 95px;
        }
        amp-lightbox label {
          font-size: 1.5rem;
        }
      }
      @media (max-width: 450px) {
        amp-lightbox form > div:first-child {
          height: 90px;
        }
        amp-lightbox label {
          font-size: 1.4rem;
        }
      }
      amp-lightbox {
        opacity: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: space-evenly;
        background: rgb(10, 19, 29);
        position: fixed;
        height: 40vh;
        width: 455px;
        margin: 0 auto;
        border-radius: 10px;
        padding: 10px 20px;
        border: 4px solid #fdfdfd;
        color: white;
        margin-top: 25vh;
      }
      amp-lightbox > div {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
      amp-lightbox > div button {
        border: 0;
        font-size: 2rem;
        background: transparent;
        color: #df2936;
        cursor: pointer;
      }
      amp-lightbox form {
        display: flex;
        flex-wrap: wrap;
        align-content: space-evenly;
        height: 100%;
        justify-content: center;
      }
      amp-lightbox form > div:first-child {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      amp-lightbox label > strong {
        color: var(--red);
      }
      amp-lightbox input {
        border-radius: 10px;
        border: 0;
        padding: 5px 20px;
        font-size: 1.1rem;
        min-width: 300px;
      }
      amp-lightbox input:focus {
        outline: none;
      }
      @media (max-width: 450px) {
        amp-lightbox {
          width: 100vw;
        }
      }
    `}</style>
  </>
)

export default Lightbox
