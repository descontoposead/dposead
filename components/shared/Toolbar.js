import BtnCta from "./BtnCta";

const Toolbar = () => (
  <div className="toolbar">
    <img
      className="logotipo"
      src="/logotipo.webp"
      alt="Logo da Desconto POSEAD"
    />
    <div className="cta">
      <BtnCta className="btn btn-outline" style={{ marginRight: 10 }} />
      <button className="btn btn-write">Matricule-se</button>
    </div>

    <style jsx>{`
      div.toolbar {
        background: rgba(var(--rgb-blue), var(--alpha));
        align-items: center;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
      }
      div.toolbar > div.logotipo {
        background: url("/logotipo.webp");
        background-size: cover;
        background-repeat: no-repeat;
      }
      button {
        padding: 10px 30px;
        font-size: 1.2rem;
      }

      @media (min-width: 1000px) {
        div.toolbar {
          padding-left: var(--margin-lg);
          padding-right: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        div.toolbar {
          padding-left: var(--margin-sm);
          padding-right: var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        div.toolbar {
          padding: 10px 20px;
        }
      }
      @media (max-width: 650px) {
        .toolbar {
          height: 80px !important;
        }
        .toolbar .btn {
          padding: 5px 10px;
        }
        .toolbar img {
          width: 40% !important;
        }
        .toolbar .cta {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .toolbar .cta > * {
          margin-bottom: 5px;
        }
        .toolbar .cta > .btn:nth-child(1) {
          margin-right: 5px !important;
        }
      }
      @media (max-width: 550px) {
        .toolbar .cta > .btn:nth-child(1) {
          margin-right: 0px !important;
        }
      }
      @media (max-width: 450px) {
        .toolbar .cta {
          width: 100%;
          justify-content: space-between;
        }
        .toolbar .cta > button {
          padding: 15px 10px !important;
          font-size: 1rem;
        }
        div.toolbar {
          flex-wrap: wrap;
          height: 150px !important;
        }
        .toolbar .btn {
          padding: 5px !important;
          margin-right: 10px;
        }
        .toolbar img {
          width: 97% !important;
        }
      }
      @media (max-width: 376px) {
      }
      @media (max-width: 330px) {
      }
    `}</style>
  </div>
);

export default Toolbar;
