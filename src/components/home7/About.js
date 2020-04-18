import BtnCta from '../shared/BtnCta'

const About = () => (
  <section>
    <div>
      <h2>Seja um especialista investindo apenas 7 reais por dia</h2>
      <h3>
        Chega de pagar valores abusivos para ter acesso a educação de qualidade.
        Investindo esse valor todo dia em sua Pós-Graduação a distância, você
        pode concluir o seu curso em 6 meses e ser um especialista em sua área
        de atuação.
      </h3>
      <BtnCta
        goto="/matricular?voucher=7REAIS"
        text={'Começar agora'}
        className="mt40 btn btn-red"
      />
    </div>
    <amp-img
      media="(min-width: 500px)"
      alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
      src="/static/images/aluno_de_pos_feliz_porque_conseguiu_estudar_com_7_reais_por_dia.webp"
      width="674"
      height="380"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
        src="/static/images/aluno_de_pos_feliz_porque_conseguiu_estudar_com_7_reais_por_dia.jpg"
        width="674"
        height="380"
        layout="responsive"
      ></amp-img>
    </amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
      src="/static/images/aluno_de_pos_feliz_porque_conseguiu_estudar_com_7_reais_por_dia.webp"
      width="664"
      height="332"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
        src="/static/images/aluno_de_pos_feliz_porque_conseguiu_estudar_com_7_reais_por_dia.jpg"
        width="664"
        height="332"
        layout="responsive"
      ></amp-img>
    </amp-img>

    <style jsx>{`
      section {
        position: relative;
        height: var(--section-height);
        background: var(--blue);
        box-shadow: 0px 0px 100px 80px var(--blue);
        margin-top: 50px;
        margin-bottom: 290px;
      }
      section > amp-img {
        width: 755px;
        position: absolute;
        top: var(--margin-between);
      }
      section > div {
        width: 46%;
        background: var(--blue);
        color: var(--write);
        padding: 15px;
        position: absolute;
        bottom: var(--margin-between);
        z-index: 2;
        top: 125px;
      }
      section > div > h2 {
        font-size: 3.5rem;
        padding-bottom: 15px;
        font-weight: 900;
      }
      section > div > h3 {
        font-size: 1.4rem;
        font-weight: 500;
        height: 183px;
      }

      @media (min-width: 1000px) {
        section > amp-img {
          right: var(--margin-lg);
        }
        section > div {
          top: 289px;
          left: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        section > amp-img {
          right: var(--margin-sm);
          width: 70%;
        }
        section > div {
          left: var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        section > amp-img {
          right: 20px;
        }
        section > div {
          left: 20px;
          top:36%;
        }
      }
      @media (max-width: 650px) {
      }
      @media (max-width: 550px) {
        section {
          margin-top: 70px;
          margin-bottom: 235px;
        }
        section > div {
          width: 75vw;
          bottom: 0;
        }
      }
      @media (max-width: 450px) {
        section {
          margin-top: 25px;
          margin-bottom: 0px;
          height: 600px;
        }
        section > div {
          width: 85vw;
        }
        section > amp-img {
          width: 90%;
        }
        section > div h2 {
          font-size: 2rem;
        }
        section > div h3 {
          font-size: 1.2rem;
          height: 200px;
        }
        }
      }
      @media (max-width: 384px) {
        section {
          margin-top: 0px;
          margin-bottom: 0;
          height: 630px;
        }
        section > div {
          width: 100vw;
          left: 0;
          top: 214px;
        }
      }
      @media (max-width: 330px) {
        section {
          margin-top: 0px;
          height: 664px;
        }
        section > div {
          top: 223px;
        }
        section > div h3 {
          font-size: 1.2rem;
          height: 210px;
        }
      }
    `}</style>
  </section>
)

export default About
