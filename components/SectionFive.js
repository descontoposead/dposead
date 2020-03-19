const SectionFive = () => (
  <section>
    <form>
      <div>
        <h3>Deixe seu contato</h3>
        <h4>
          E ganhe uma consultoria totalmente gratuita com um especialista de
          aconselhamento educacional capaz de te ajudar a escolher o curso que
          mais atende sua necessidade.
        </h4>
        <div>
          <div style={{ flex: 1 }}>
            <label for="name">Nome</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label for="phone">Telefone</label>
            <input type="text" name="phone" />
          </div>
        </div>
        <div>
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" />
          </div>
        </div>
        <div>
          <button className="btn btn-black">Enviar</button>
          <span>
            Ou entre em contato conosco
            <button className="btn btn-green">Via whatsapp</button>
          </span>
        </div>
      </div>
    </form>
    <img src="/smile_man.webp" alt="Aluno feliz com nossos cursos online" />
  </section>
);

export default SectionFive;
