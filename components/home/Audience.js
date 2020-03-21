const Audience = () => (
  <section>
    <amp-img
      media="(min-width: 500px)"
      alt="Aluna satisfeita com o portal do aluno"
      src="/smile_girl_mac.webp"
      width="835"
      height="550"
      layout="responsive"
    ></amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Aluna satisfeita com o portal do aluno"
      src="/smile_girl_mac__mobile.webp"
      width="835"
      height="550"
      layout="responsive"
    ></amp-img>
    <article>
      <h3>O que estão falando sobre nós</h3>
    </article>

    <style jsx>{`
      section {
        position: relative;
      }
      section > amp-img {
        width: 65%;
      }
      section > article {
        width: 50%;
        background: #08395a;
        height: 500px;
        padding: 20px;
        position: absolute;
        top: 60px;
        right: 0;
        color: var(--write);
        font-size: 2.5rem;
      }

      @media (max-width: 999px) {
        section > article {
          height: 400px;
        }
      }
      @media (max-width: 750px) {
      }
      @media (max-width: 650px) {
        section {
          position: relative;
          margin: 400px 0px;
        }
        section > amp-img {
          width: 90%;
        }
        section > article {
          width: 100%;
          top: 250px;
        }
        section > article > h3 {
          font-size: 2rem;
        }
      }
      @media (max-width: 550px) {
        section {
          margin: 500px 0px;
        }
      }
      @media (max-width: 450px) {
        section {
          margin: 569px 0 750px;
        }
        section > article {
          top: 200px;
        }
      }
      @media (max-width: 376px) {
      }
      @media (max-width: 330px) {
        section > article {
          top: 170px;
        }
      }
    `}</style>
  </section>
);

export default Audience;
