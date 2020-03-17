import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";
import WhatsappIcon from "./WhatsappIcon";

const Footer = () => (
  <footer>
    <img src="/footer_logo.webp" alt="Logo da Desconto Pos EAD" />
    {/* <address>
      Desconto Pôs EaD | Todos direitos reservados <br />
      Rua XXX, nº XX, Bairro X <br />
      Cidade MG - CEP: XXXXXX-XX
    </address> */}
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
  </footer>
);

export default Footer;
