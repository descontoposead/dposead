import InstagramIcon from '../icon/InstagramIcon'
import FacebookIcon from '../icon/FacebookIcon'
import WhatsappIcon from '../icon/WhatsappIcon'

const Footer = () => (
  <footer>
    <amp-img
      alt="Logo da Desconto POSEAD"
      src="/static/images/footer_logo.webp"
      width="147"
      height="48"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Logo da Desconto POSEAD"
        src="/static/images/footer_logo.png"
        width="147"
        height="48"
        layout="responsive"
      ></amp-img>

    </amp-img>


    <ul>
      <li>
        <InstagramIcon />
      </li>
      <li>
        <FacebookIcon />
      </li>
      <li>
        <WhatsappIcon />
      </li>
    </ul>


    <style jsx>{`
      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #08395a;
        color: var(--write);
        height: 215px;
      }

      footer > amp-img {
        width: 147px;
      }
      footer > address {
        text-align: center;
        font-size: 0.9rem;
      }
      footer > ul {
        display: flex;
        list-style: none;
        align-items: center;
      }
      footer > ul > li {
        width: 30px;
        margin-right: 10px;
        cursor: pointer;
      }
      footer > ul > li:last-child {
        margin-right: 0;
      }
      @media (min-width: 1000px) {
        footer {
          padding: 10px var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        footer {
          padding: 20px var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        footer {
          padding: 0px 20px;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
      }
      @media (max-width: 450px) {
        footer > ul {
          top: 27%;
          left: -31%;
        }
      }
      @media (max-width: 384px) {
        footer > amp-img {
          position:relative;
          width: 600px;          
          left:26%;
        }
        footer > ul {
          position: relative;
          left: -31%;
          top: -27%;
        }
      }
      @media (max-width: 330px) {
      }
    `}</style>
  </footer>
)

export default Footer
