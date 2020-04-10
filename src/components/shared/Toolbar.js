import Link from 'next/link'

import BtnCta from './BtnCta'

const Toolbar = () => (
  <div className="toolbar">
    <amp-img
      className="logotipo"
      alt="Logo da Desconto POSEAD"
      src="/static/images/logotipo.webp"
      width="288"
      height="28"
      layout="responsive"
    ></amp-img>
     <div className="bntcon">
    <BtnCta className="btn btn-outline" style={{ marginRight: 10 }} />
    </div>
    <div className="cta">
      <Link href="/matricular">
        <a className="btn btn-write">Matricule-se</a>
      </Link>
    </div>

    <style jsx>{`

    div.bntcon{
      position: relative;
      left: 147px;
    }

      div.toolbar {
        position: fixed;
        z-index: 9;
        background: #0c141d;
        box-shadow: 1px -8px 20px 0px #263954;
        background: rgba(var(--rgb-blue), var(--alpha));
        align-items: center;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
      }
      div.toolbar > amp-img {
        width: 288px;
        height: 28px;
      }
      button {
        padding: 10px 30px;
        font-size: 1.2rem;
      }
      a {
        padding: 10px 30px;
        font-size: 1.2rem;
        text-align: center;
        color: var(--blue);
        text-decoration: none;
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
        div.bntcon{
          position: relative;
          left: 0px;
        }


      }
      @media (max-width: 650px) {
        .toolbar {
          height: 80px;
        }
        .toolbar .btn {
          padding: 5px 10px;
        }
        .toolbar img {
          width: 40%;
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
          margin-right: 5px;
        }
        .bntcon{
          position:relative;
          left:-16px;
        }
      }
      @media (max-width: 550px) {
        .toolbar .cta > .btn:nth-child(1) {
          margin-right: 0px;
        }
      }
      @media (max-width: 450px) {
        div.toolbar {
          flex-wrap: wrap;
          justify-content: center;
          align-content: space-between;
          height: 175px;
        }
        .toolbar .cta {
          width: 100%;
          justify-content: space-between;
        }
        .toolbar .cta .btn {
          padding: 15px 10px;
          font-size: 1rem;
          width: 100%;
        }
        .toolbar .btn {
          padding: 5px;
          margin-right: 10px;
        }
        .toolbar img {
          width: 97%;
        }
      }
      @media (max-width: 384px) {
      }
      @media (max-width: 330px) {
        .toolbar img {
          margin-bottom: 10px;
        }
        .toolbar .cta > button:nth-child(1) {
          padding: 10px 5px;
          font-size: 0.9rem;
          margin-right: 1px;
        }
      }
    `}</style>
  </div>
)

export default Toolbar
