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
            <BtnCta className="btn btn-red" />
          </div>
        </div>
      </header>
    )}

    <style jsx>{`
      /* CSS specific to iOS devices */
      // @supports (-webkit-touch-callout: none) and @media (max-width: 450px) {
      //   header:before {
      //     content: '';
      //     background-image: url('/static/images/head__mobile.jpg');
      //     background-repeat: no-repeat;
      //     background-size: cover;
      //     background-position-x: -185px;
      //     height: 100vh;
      //     background-size: 777px;
      //     background-position-y: 65px;
      //     position: fixed
      //   }
      // }
      header {
        background-image: url('/static/images/head.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        color: #fff;
      }
      header > div.cta {
        position: relative;
        z-index: 1;
        background: transparent;
        align-self: flex-end;
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
          background-image: url('/static/images/head__mobile.webp'),
            url('/static/images/head.jpg');
          background-position-x: -185px;
          height: 100vh;
          background-size: 777px;
          background-position-y: 65px;
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
          background-position-x: -213px;
          height: 100vh;
          background-size: 777px;
          background-position-y: 65px;
          height: 616px;
        }
      }
    `}</style>
  </>
)

export default Header
