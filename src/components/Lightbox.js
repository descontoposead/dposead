const Lightbox = () => (
  <>
    <amp-lightbox id="captureLead" layout="nodisplay">
      <form
        method="get"
        action="true"
        action-xhr="/api/leads"
        target="_top"
        on="submit-success:captureLead.close;"
      >
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
        </div>
        <div>
          <button type="submit" className="btn btn-red">
            Receber Desconto
          </button>
        </div>
      </form>
    </amp-lightbox>

    <style jsx>{`
      @media (min-width: 451px) {
        amp-lightbox form > div:first-child {
        }
        amp-lightbox label {
          font-size: 1.5rem;
        }
      }
      @media (max-width: 450px) {
        amp-lightbox form > div:first-child {
        }
        amp-lightbox label {
          font-size: 1.4rem;
        }
      }
      @media (min-height: 451px) {
        amp-lightbox {
          height: 55vh;
        }
      }
      @media (max-height: 450px) {
        amp-lightbox {
          height: 60vh;
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
        width: 455px;
        margin: 0 auto;
        border-radius: 10px;
        padding: 10px 20px;
        border: 4px solid #fdfdfd;
        color: white;
        margin-top: 15vh;
      }
      amp-lightbox form > div > label {
        margin-bottom: 15px;
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
        height: 40px;
        margin-bottom: 5px;
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
