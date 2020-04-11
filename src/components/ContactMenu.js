import SaleIcon from './icon/SaleIcon'
import WhatsappGreenIcon from './icon/WhatsappGreenIcon'

const ContactMenu = () => (
  <>
    <div id="contactMenu">
      <button>
        <SaleIcon />
        <span>Quero Desconto</span>
      </button>
      <button>
        <WhatsappGreenIcon />
        <span>Falar com consultor</span>
      </button>

      <style jsx>{`
        @media (min-width: 1000px) {
          div {
            width: 510px;
            left: 50%;
            transform: translateX(-50%);
          }
          div > button {
            font-size: 1.2rem;
          }
        }
        @media (max-width: 999px) {
          div {
            padding: 0 var(--margin-sm);
          }
        }
        @media (max-width: 750px) {
          div {
            width: 100%;
            padding: 0 20px;
          }
          div > button {
            font-size: 1rem;
          }
        }
        div {
          transition: 0.5s;
          display: flex;
          position: fixed;
          bottom: 10px;
          z-index: 9;
          justify-content: center;
        }
        div:hover {
          opacity: 1;
        }
        div > button {
          width: 50%;
          height: 50px;
          display: flex;
          align-items: center;
          font-weight: 700;
          padding: 0 10px;
          border: 0;
          cursor: pointer;
          justify-content: space-evenly;
        }
        div > button:focus {
          outline: 0;
        }
        div > button:first-child {
          background: #fff;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        div > button:last-child {
          background: #69b366;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      `}</style>
    </div>
  </>
)

export default ContactMenu
