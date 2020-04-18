import BtnCta from '../shared/BtnCta'

const Scarcity = () => (
  <section>
    <amp-img
      media="(min-width: 500px)"
      alt="Aluno da POSEAD estudando na comodidade do ser escritório."
      src="/static/images/aluno_estudando_em_casa.webp"
      width="835"
      height="550"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Aluno da POSEAD estudando na comodidade do ser escritório."
        src="/static/images/aluno_estudando_em_casa.jpg"
        width="835"
        height="550"
        layout="responsive"
      ></amp-img>
    </amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Aluno da POSEAD estudando na comodidade do ser escritório."
      src="/static/images/aluno_estudando_em_casa.webp"
      width="835"
      height="550"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Aluno da POSEAD estudando na comodidade do ser escritório."
        src="/static/images/aluno_estudando_em_casa.jpg"
        width="835"
        height="550"
        layout="responsive"
      ></amp-img>
    </amp-img>
    <article>
      <h3>O tempo está correndo contra você</h3>
      <span>
        Profissionais de sucesso se mantém atualizados. Neste exato momento
        diversas pessoas já estão na sua frente, pois saíram da zona de conforto
        e estão realizando uma Pós-Graduação e investindo no futuro.
      </span>
      <span>
        Segundo pesquisas do maior site de empregos do Brasil, CATHO, se tornar
        um especialista pode aumentar o seu salário em até 50% no meio privado
        ou garantir vantagens em relação aos concorrentes no concurso público
        que você tanto deseja.
      </span>
      <span>
        Por isso você precisa começar hoje e entrar para a lista seleta de
        especialistas
      </span>
      <div className="bnt">
        <BtnCta
          goto="/matricular?voucher=7REAIS"
          text={'Começar agora'}
          className="mt15 btn btn-red"
        />
      </div>
    </article>

    <style jsx>{`
      div.bnt {
        position: relative;
        top: 20px;
        left: 5%;
      }
      section {
        margin: 130px 40px 250px 40px;
        position: relative;
        height: 800px;
      }
      section > img {
        width: 100%;
      }
      section > amp-img {
        height: 882px;
      }
      section > article {
        position: absolute;
        background: var(--blue);
        color: var(--write);
        width: 700px;
        top: 50%;
        right: 0%;
        z-index: 1;
        height: 500px;
      }
      section > article > h3 {
        font-size: 2.3rem;
        margin-bottom: 15px;
        padding: 15px;
      }
      section > article > span {
        background: var(--blue);
        display: block;
        padding: 10px;
        font-size: 1.4rem;
      }
      section > article > button {
        margin-top: 15px;
        margin-left: 20px;
      }

      @media (max-width: 999px) {
        section {
          margin: 130px 40px 150px 40px;
        }
        section > article {
          top: 50%;
          right: 15%;
        }
      }
      @media (max-width: 750px) {
        section > article {
          top: 25%;
          right: 15%;
        }
      }
      @media (max-width: 650px) {
        section {
          margin: 60px 40px 333px 40px;
        }
        section > amp-img {
          width: 100%;
        }
        section > article {
          width: 100%;
          right: auto;
        }
      }
      @media (max-width: 550px) {
        section {
          margin: 60px 40px 475px 40px;
        }
      }
      @media (max-width: 450px) {
        section {
          margin: 100px 40px 0;
          height: 817px;
        }
        section > amp-img {
          height: 320px;
        }
        section > article {
          top: 20%;
        }
        section > article h3 {
          font-size: 2rem;
        }
        section > article span {
          font-size: 1.2rem;
        }
      }
      @media (max-width: 384px) {
        section {
          height: 830px;
          margin: 0 20px;
        }
        section > article {
          top: 18%;
        }
      }
      @media (max-width: 330px) {
        section {
          height: 883px;
        }
        section > amp-img {
          height: 290px;
        }
        section > article {
          top: 19%;
        }
        section > article span {
          font-size: 1.2rem;
        }
      }
    `}</style>
  </section>
)

export default Scarcity
