import BtnCta from "../shared/BtnCta";

const About = () => (
  <section>
    <div>
      <h2>Mais barato, porque você merece</h2>
      <h3>
        Toda tecnologia que o ensino a distância pode te proporcionar, por
        valores que se ajustam a sua renda mensal. Converse agora com um
        consultor e monte o seu plano personalizado.
      </h3>
      <BtnCta className="mt40 btn btn-red" />
    </div>
    <amp-img
      media="(min-width: 500px)"
      alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
      src="/smile_girl_nature.webp"
      width="664"
      height="332"
      layout="responsive"
    ></amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Estudante feliz por estudar a distância com cursos EAD de qualidade."
      src="/smile_girl_nature__mobile.webp"
      width="664"
      height="332"
      layout="responsive"
    ></amp-img>

    <style jsx>{`
      section {
        position: relative;
        height: var(--section-height);
        background: var(--blue);
        box-shadow: 0px 0px 100px 80px var(--blue);
        margin-top: 100px;
        margin-bottom: 100px;
      }
      section > amp-img {
        width: 664px;
        position: absolute;
        top: var(--margin-between);
      }
      section > div {
        width: 60%;
        background: var(--blue);
        color: var(--write);
        padding: 15px;
        position: absolute;
        bottom: var(--margin-between);
        z-index: 1;
        top: 235px;
      }
      section > div > h2 {
        font-size: 3.5rem;
        padding-bottom: 15px;
        font-weight: 900;
      }
      section > div > h3 {
        font-size: 1.4rem;
        font-weight: 500;
      }

      @media (min-width: 1000px) {
        section > amp-img {
          right: var(--margin-lg);
        }
        section > div {
          left: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        section > amp-img {
          right: var(--margin-sm);
          width: 80%;
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
          margin-top: 100px;
          margin-bottom: 355px;
        }
        section > amp-img {
          width: 90%;
        }
      }
      @media (max-width: 376px) {
        section {
          margin-top: 200px;
          margin-bottom: 470px;
        }
        section > div {
          bottom: -264px;
        }
      }
      @media (max-width: 330px) {
        section {
          margin-top: 300px;
        }
      }
    `}</style>
  </section>
);

export default About;