const ThreeReasons = () => (
  <section>
    <article>
      <h3>3 motivos para começar agora</h3>
      <ul>
        <li>
          <amp-img
            alt="Cursos com qualidade no MEC nota 4"
            src="/static/icons/star.webp"
            width="60"
            height="30"
            layout="responsive"
          >
            <amp-img
              fallback=""
              alt="Cursos com qualidade no MEC nota 4"
              src="/static/icons/star.png"
              width="60"
              height="30"
              layout="responsive"
            ></amp-img>
          </amp-img>
          <span>
            Todos os nossos cursos possuem qualidade garantida pelo Decreto nº
            5.773/06 do MEC, avaliado como nota 4 (de 1 a 5) pelo IGC.
          </span>
        </li>
        <li>
          <amp-img
            alt="Certificado em 6 meses"
            src="/static/icons/school.webp"
            width="40"
            height="40"
            layout="responsive"
          >
            <amp-img
              fallback=""
              alt="Certificado em 6 meses"
              src="/static/icons/school.png"
              width="40"
              height="40"
              layout="responsive"
            ></amp-img>
          </amp-img>
          <span>
            Garanta a sua certificação em um prazo mínimo de 6 meses, de acordo
            com o que você precisa nesse momento.
          </span>
        </li>
        <li>
          <amp-img
            alt="O melhor horário para estudar"
            src="/static/icons/calendar.webp"
            width="40"
            height="40"
            layout="responsive"
          >
            <amp-img
              fallback=""
              src="/static/icons/calendar.png"
              width="40"
              height="40"
              layout="responsive"
            ></amp-img>
          </amp-img>
          <span>
            Você está no controle e decide qual o melhor horário e local para
            estudar.
          </span>
        </li>
      </ul>
    </article>

    <style jsx>{`
      section {
        position: relative;
        display: flex;
      }
      section > article {
        width: 100%;
        height: 1000px;
        background: url('/static/images/footer.webp'),
          url('/static/images/footer.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        margin: 0 40px;
        flex-wrap: wrap;
        align-content: flex-end;
        color: var(--write);
      }
      section > article > h3 {
        font-size: 1.7rem;
      }
      section > article > ul {
        margin-top: 40px;
        list-style: none;
        font-size: 1.1rem;
        width: 80%;
      }
      section > article > ul > li {
        display: flex;
        padding-bottom: 40px;
        align-items: center;
      }
      section > article > ul > li > amp-img {
        width: 40px;
        height: 35px;
        padding-right: 30px;
        margin-right: 10px;
      }

      @media (min-width: 1000px) {
        section > article > h3,
        section > article > ul {
          padding-left: var(--margin-lg);
          padding-right: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        section > article > h3,
        section > article > ul {
          padding-left: calc(var(--margin-sm) - 40px);
        }
      }
      @media (max-width: 750px) {
        section > article {
          margin: 0;
        }
        section > article > h3,
        section > article > ul {
          padding-left: 20px;
        }

        section > article > ul {
          list-style: none;
          font-size: 1.1rem;
          width: 100%;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
        section {
          margin-top: 150px;
        }
      }
      @media (max-width: 450px) {
        section {
          margin-top: 80px;
        }
      }
      @media (max-width: 384px) {
        section {
          height: 997px;
          margin-top: 30px;
          margin-bottom: 80px;
        }
      }
      @media (max-width: 330px) {
        section {
          margin-bottom: 80px;
        }
      }
    `}</style>
  </section>
)

export default ThreeReasons
