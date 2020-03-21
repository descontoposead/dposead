const Faq = () => (
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

    <style jsx>{`
      section {
        margin: 0 0 100px;
      }
      section > h3 {
        font-size: 2.5rem;
        color: var(--write);
        margin-bottom: 30px;
      }
      section > article {
        background: #08395a;
        margin-bottom: 10px;
        padding: 10px;
        color: #fff;
        border-radius: 2px;
      }

      @media (min-width: 1000px) {
        section {
          padding-left: var(--margin-lg);
          padding-right: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        section {
          padding-left: var(--margin-sm);
          padding-right: var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        section {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
      }
      @media (max-width: 450px) {
      }
      @media (max-width: 376px) {
      }
      @media (max-width: 330px) {
      }
    `}</style>
  </section>
);

export default Faq;
