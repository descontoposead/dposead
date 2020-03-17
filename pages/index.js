import withLayout from "../components/Layout";

const Home = () => (
  <main>
    <section>
      <div>
        <h2>Mais barato, porque você merece</h2>
        <h3>
          Toda tecnologia que o ensino a distância pode te proporcionar, por
          valores que se ajustam a sua renda mensal. Converse agora com um
          consultor e monte o seu plano personalizado.
        </h3>
        <button className="btn btn-red" style={{ marginTop: 40 + "px" }}>
          Falar com um consultor
        </button>
      </div>
      <img src="/smile_girl_nature.webp" alt="Mulher sorrindo" />
    </section>
    <section>
      <article>
        <h3>3 motivos para escolher nossos cursos</h3>
        <ul>
          <li>
            <img
              src="/icons/star.webp"
              alt="Cursos com qualidade no MEC nota 4"
            />
            <span flex="1">
              Todos os nossos cursos possuem qualidade garantida pelo Decreto nº
              5.773/06 do MEC, avaliado como nota 4 (de 1 a 5) pelo IGC.
            </span>
          </li>
          <li>
            <img src="/icons/school.webp" alt="Certificado em 6 meses" />
            <span>
              Garanta a sua certificação em um prazo mínimo de 6 meses, de
              acordo com o que você precisa nesse momento.
            </span>
          </li>
          <li>
            <img
              src="/icons/calendar.webp"
              alt="O melhor horário para estudar"
            />
            <span>
              Você está no controle e decide qual o melhor horário e local para
              estudar.
            </span>
          </li>
        </ul>
      </article>
    </section>
    <section>
      <img src="/success_man.webp" alt="Homem de sucesso em seu escritório" />
      <article>
        <h3>Profissionais de sucesso estão se especializando neste momento</h3>
        <span>
          Profissionais da atualidade precisam de uma pós graduação rápida para
          atender sua necessidade, e de qualidade para se destacar e ter
          autonomia no mercado de trabalho.
        </span>
        <span>
          Segundo o site de empresas Catho, fazer uma pós graduação pode
          aumentar seu salário em até 50% no meio privado ou em até 47% se
          tratando de servidores públicos, segundo o jornal extra. Nisso nós
          podemos te ajudar.
        </span>
        <button className="btn btn-red">Falar com um consultor</button>
      </article>
    </section>
    <section>
      <img
        src="/smile_girl_mac.webp"
        alt="Aluna feliz enquanto usa o seu portal de aluno"
      />
      <article>
        <h3>O que estão falando sobre nós</h3>
      </article>
    </section>
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
    <section>
      <h3>Perguntas frequentes</h3>
      <article>
        <strong>Quais as formas de pagamento?</strong>
        <span></span>
      </article>
      <article>
        <strong>Qual a duração dos cursos?</strong>
        <span></span>
      </article>
      <article>
        <strong>Os cursos são 100% online?</strong>
        <span></span>
      </article>
      <article>
        <strong>Qual instituição certifica os cursos?</strong>
        <span></span>
      </article>
      <article>
        <strong>Todos os cursos são autorizados pelo MEC?</strong>
        <span></span>
      </article>
      <article>
        <strong>Preciso fazer o TCC?</strong>
        <span></span>
      </article>
      <article>
        <strong>
          Qual a diferença entre os cursos presenciais e a distância?
        </strong>
        <span></span>
      </article>
      <article>
        <strong>Quais documentos são necessários para começar?</strong>
        <span></span>
      </article>
      <article>
        <strong>Qual a diferença entre Pós-Graduação e MBA?</strong>
        <span></span>
      </article>
    </section>
  </main>
);

export default withLayout(Home);
