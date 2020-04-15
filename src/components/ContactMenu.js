import SaleIcon from './icon/SaleIcon'
import WhatsappGreenIcon from './icon/WhatsappGreenIcon'

const ContactMenu = () => (
  <>
    <div id="contactMenu__desktop">
      <a
        title="Fale com um especialista em cursos EaD"
        href={
          'https://api.whatsapp.com/send?1=pt_BR&phone=' +
          process.env.whatsappNumber
        }
        target="_blank"
      >
        <WhatsappGreenIcon />
      </a>
    </div>
    <div id="contactMenu__mobile">
      <button on="tap:captureLead">
        <SaleIcon />
        <span>Quero Desconto</span>
      </button>
      <a
        href={
          'https://api.whatsapp.com/send?1=pt_BR&phone=' +
          process.env.whatsappNumber
        }
        target="_blank"
      >
        <WhatsappGreenIcon />
        <span>Falar com consultor</span>
      </a>
    </div>
    <style jsx>{`
      @media (min-width: 1000px) {
        div#contactMenu__mobile {
          width: 510px;
          left: 50%;
          transform: translateX(-50%);
        }
        div#contactMenu__mobile > button {
          font-size: 1.2rem;
        }
      }
      @media (min-width: 749px) {
        div#contactMenu__mobile {
          display: none;
        }
        div#contactMenu__desktop {
          display: block;
        }
      }
      @media (max-width: 999px) {
        div#contactMenu__mobile {
          padding: 0 var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        div#contactMenu__desktop {
          display: none;
        }
        div#contactMenu__mobile {
          width: 100%;
          padding: 0 20px;
          display: flex;
        }
        div#contactMenu__mobile > button {
          font-size: 1rem;
        }
      }
      div#contactMenu__desktop {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99;
      }
      div#contactMenu__desktop > a {
        background: #4caf50;
        display: flex;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 0 8px 0px #427447;
      }
      div#contactMenu__mobile {
        transition: 0.5s;
        position: fixed;
        bottom: 10px;
        z-index: 99;
        justify-content: center;
      }
      div#contactMenu__mobile > button,
      div#contactMenu__mobile > a {
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
      div#contactMenu__mobile > button:focus,
      div#contactMenu__mobile > a:focus {
        outline: 0;
      }
      div#contactMenu__mobile > button:first-child {
        background: #fff;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      div#contactMenu__mobile > a:last-child {
        background: #69b366;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        text-decoration: none;
        color: #000;
      }
      span {
        text-align: left;
        margin-left: 10px;
      }
    `}</style>
  </>
)

export default ContactMenu
