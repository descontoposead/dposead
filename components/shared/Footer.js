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
    ></amp-img>
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
        padding-top: 30px;
        padding-bottom: 30px;
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
          padding: 30px 20px;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
      }
      @media (max-width: 450px) {
        footer > ul {
          flex-wrap: wrap;
        }
      }
      @media (max-width: 384px) {
      }
      @media (max-width: 330px) {
      }
    `}</style>
  </footer>
)

export default Footer
