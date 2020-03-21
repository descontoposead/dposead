import BtnCta from "../shared/BtnCta";

const Scarcity = () => (
  <section>
    <img src="/success_man.webp" alt="Homem de sucesso em seu escritório" />
    <article>
      <h3>Profissionais de sucesso estão se especializando neste momento</h3>
      <span>
        Profissionais da atualidade precisam de uma pós graduação rápida para
        atender sua necessidade, e de qualidade para se destacar e ter autonomia
        no mercado de trabalho.
      </span>
      <span>
        Segundo o site de empresas Catho, fazer uma pós graduação pode aumentar
        seu salário em até 50% no meio privado ou em até 47% se tratando de
        servidores públicos, segundo o jornal extra. Nisso nós podemos te
        ajudar.
      </span>
      <BtnCta className="mt15 btn btn-red" />
    </article>

    <style jsx>{`
      section {
        margin: 60px 40px 250px 40px;
        position: relative;
      }
      section > img {
        width: 100%;
      }
      section > article {
        position: absolute;
        color: var(--write);
        top: 70%;
        width: 500px;
        right: 20%;
      }
      section > article > h3 {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }
      section > article > span {
        background: var(--blue);
        display: block;
        padding: 12px;
      }
      section > article > button {
        margin-top: 15px;
        margin-left: 20px;
      }

      @media (max-width: 999px) {
        section > article {
          top: 50%;
          right: 15%;
        }
      }
      @media (max-width: 750px) {
      }
      @media (max-width: 650px) {
        section {
          margin: 60px 40px 333px 40px;
        }
        section > img {
          width: 100%;
        }
        section > article {
          width: 100%;
          right: auto;
          top: 70%;
        }
      }
      @media (max-width: 550px) {
        section {
          margin: 60px 40px 475px 40px;
        }
      }
      @media (max-width: 450px) {
        section {
          margin: 60px 40px 528px 40px;
        }
      }
      @media (max-width: 376px) {
        section {
          margin: 60px 40px 700px 40px;
        }
      }
      @media (max-width: 330px) {
        section {
          margin: 60px 40px 735px 40px;
        }
      }
    `}</style>
  </section>
);

export default Scarcity;
