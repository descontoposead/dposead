import Toolbar from '../shared/Toolbar'
import BtnCta from '../shared/BtnCta'

const Header = (props) => (
  <>
    {props.onlyToolbar ? (
      <Toolbar />
    ) : (
      <header>
        <Toolbar />
        <div className="cta">
          <h1>Você não precisa pagar caro para ter educação de qualidade</h1>
          <hr />
          <div>
            <span>Estude agora com descontos imperdíveis</span>
            <div className="bnt">
            <BtnCta className="btn btn-red" />
            </div>


          </div>
        </div>
      </header>
    )}

    <style jsx>{`
      header {
        background-image: url('/static/images/head.webp');
        background-repeat: no-repeat;
        background-size: cover;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        color: #fff;
      }
      header > div {
        z-index: 1;
      }
      div.bnt{
        position:relative;
        top:20px;
      }
      div.cta {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
      }
      div.cta > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      div.cta > h1 {
        font-size: 3.5rem;
      }
      div.cta > div > span {
        font-size: 1.5rem;
      }
      div.cta > hr {
        width: 100%;
      }

      @media (min-width: 1000px) {
        header > div.cta > h1,
        header > div.cta > div {
          padding: 10px var(--margin-lg);
        }
        header > div.cta > hr {
          margin: 10px var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        header > div.cta > h1,
        header > div.cta > div {
          padding: 10px var(--margin-sm);
        }
        header > div.cta > hr {
          margin: 10px var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        header > div.cta > h1,
        header > div.cta > div {
          padding: 10px 20px;
        }
        header > div.cta > hr {
          margin: 10px 20px;
        }
      }
      @media (max-width: 650px) {
        header div.cta > div {
          flex-wrap: wrap;
        }
        header div.cta > div > * {
          margin-bottom: 10px;
        }
      }
      @media (max-width: 550px) {
      }
      @media (max-width: 450px) {
        header {
          background-image: url('/static/images/head__mobile.webp');
          background-position-x: -535px;
          height: 100vh;
        }
        header .cta {
          margin-top: 225px;
        }
        header .cta h1 {
          font-size: 2.5rem;
        }
      }
      @media (max-width: 384px) {
        header {
          height: 100vh;
        }
      }
      @media (max-width: 330px) {
        header {
          height: 616px;
        }
      }
    `}</style>
  </>
)

export default Header
