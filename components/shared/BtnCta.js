const BtnCta = props => (
  <button {...props}>
    Falar com um consultor
    <style jsx>{`
      button {
        padding: 10px 30px;
        font-size: 1.2rem;
      }

      @media (max-width: 450px) {
        .btn-red {
          width: 100%;
        }
        button {
          padding: 15px 10px;
          font-size: 1rem;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    `}</style>
  </button>
);

export default BtnCta;
