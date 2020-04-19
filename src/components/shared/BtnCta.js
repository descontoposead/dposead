const BtnCta = (props) => (
  <a className={props.className} href={props.goto || '#falar-com-consultor'}>
    {props.text || 'Falar com um consultor'}
    <style jsx>{`
      a {
        padding: 10px 30px;
        font-size: 1.2rem;
        left: 10px;
        text-decoration: none;
      }
      @media (max-width: 450px) {
        a {
          padding: 15px 38px 12px;
          font-size: ${props.text ? '1.4' : '1'}rem;
          margin-bottom: 5px;
          line-height: 1;
        }
      }
    `}</style>
  </a>
)

export default BtnCta
