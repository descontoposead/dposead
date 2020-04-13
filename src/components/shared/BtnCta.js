const BtnCta = (props) => (
  <a
    {...props}
    href={
      'https://api.whatsapp.com/send?1=pt_BR&phone=' +
      process.env.whatsappNumber
    }
    target="_blank"
  >
    Falar com um consultor
    <style jsx>{`
      a {
        padding: 10px 30px;
        font-size: 1.2rem;
        left: 10px;
        text-decoration: none;
      }
      @media (max-width: 450px) {
        .btn-red {
          width: 100%;
        }
        a {
          padding: 15px 38px 12px;
          font-size: 1rem;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    `}</style>
  </a>
)

export default BtnCta
