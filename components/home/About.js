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
      <BtnCta style={{ marginTop: 40 + "px" }} className="btn btn-red" />
    </div>
    <img src="/smile_girl_nature.webp" alt="Mulher sorrindo" />

    <style jsx>{`
      section {
        position: relative;
        height: var(--section-height);
        background: var(--blue);
        box-shadow: 0px 0px 100px 80px var(--blue);
        margin-bottom: 100px;
      }
      section > img {
        width: 60%;
        position: absolute;
        top: var(--margin-between);
      }
      section > div {
        width: 500px;
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
        section > img {
          right: var(--margin-lg);
        }
        section > div {
          left: var(--margin-lg);
        }
      }
      @media (max-width: 999px) {
        section > img {
          right: var(--margin-sm);
          width: 80% !important;
        }
        section > div {
          left: var(--margin-sm);
        }
      }
      @media (max-width: 750px) {
        section > img {
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
          margin-top: 70px !important;
          margin-bottom: 235px !important;
        }
        section > div {
          width: 75vw !important;
          bottom: 0 !important;
        }
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

export default About;
