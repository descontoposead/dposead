const Header = props => (
  <>
    {props.onlyToolbar ? (
      <div className="toolbar">
        <img
          className="logotipo"
          src="/logotipo.webp"
          alt="Logo da Desconto POSEAD"
        />
        <div className="cta">
          <button className="btn btn-outline">Falar com consultor</button>
          <button className="btn btn-write">Matricule-se</button>
        </div>
      </div>
    ) : (
      <header>
        <div className="toolbar">
          <img
            className="logotipo"
            src="/logotipo.webp"
            alt="Logo da Desconto POSEAD"
          />
          <div className="cta">
            <button className="btn btn-outline">Falar com consultor</button>
            <button className="btn btn-write">Matricule-se</button>
          </div>
        </div>

        <div style={{ zIndex: 1 }} className="cta">
          <h1>Você não precisa pagar caro para ter educação de qualidade</h1>
          <hr />
          <div>
            <span>Estude agora com descontos imperdiveis</span>
            <button className="btn btn-red">Falar com um consultor</button>
          </div>
        </div>
      </header>
    )}
  </>
);

export default Header;
