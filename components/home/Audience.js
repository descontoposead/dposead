const Audience = () => (
  <section>
    <img
      src="/smile_girl_mac.webp"
      alt="Aluna feliz enquanto usa o seu portal de aluno"
    />
    <article>
      <h3>O que estão falando sobre nós</h3>
    </article>

    <style jsx>{`
      section {
        position: relative;
      }
      section > img {
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
        section > img {
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
      }
      @media (max-width: 450px) {
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
