const Faq = () => (
  <div>
    <h3>Perguntas frequentes</h3>
    <amp-accordion>
      <section>
        <h4>Quais as formas de pagamento?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Qual a duração dos cursos?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Os cursos são 100% online?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Qual instituição certifica os cursos?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Todos os cursos são autorizados pelo MEC?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Preciso fazer o TCC?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Qual a diferença entre os cursos presenciais e a distância?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Quais documentos são necessários para começar?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
      <section>
        <h4>Qual a diferença entre Pós-Graduação e MBA?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore
          dolores excepturi aperiam qui debitis dolorum, asperiores veritatis
          consequuntur doloremque non deserunt doloribus enim alias ea quod
          temporibus laudantium impedit!
        </p>
      </section>
    </amp-accordion>
    <style jsx>{`
      div {
        margin: 0 0 100px;
      }
      div > h3 {
        font-size: 2.5rem;
        color: var(--write);
        margin-bottom: 30px;
      }
      div > amp-accordion > section {
        display: flex;
        flex-wrap: wrap;
        background: #08395a;
        margin-bottom: 10px;
        padding: 10px;
        color: #fff;
        border-radius: 10px;
        align-items: center;
        text-decoration: none;
        font-size: 1.2rem;
      }
      div > amp-accordion > section h4 {
        background: transparent;
        border: 0;
        margin-bottom: 10px;
      }
      div > amp-accordion > section h4:focus {
        outline: none;
      }

      @media (min-width: 1000px) {
        div {
          padding-left: var(--margin-lg);
          padding-right: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        div {
          padding-left: var(--margin-sm);
          padding-right: var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        div {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
        div > amp-accordion > section:not([expanded]) {
          height: 85px;
        }
      }
      @media (max-width: 450px) {
        div {
          margin: 0 0 100px;
        }
      }
      @media (max-width: 384px) {
      }
      @media (max-width: 330px) {
      }
    `}</style>
  </div>
)

export default Faq
