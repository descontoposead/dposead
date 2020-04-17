import BtnCta from '../shared/BtnCta'

const Scarcity = () => (
  <section>
    <amp-img
      media="(min-width: 500px)"
      alt="Aluno da POSEAD estudando na comodidade do ser escritório."
      src="/static/images/success_man.webp"
      width="835"
      height="550"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Aluno da POSEAD estudando na comodidade do ser escritório."
        src="/static/images/success_man.jpg"
        width="835"
        height="550"
        layout="responsive"
      ></amp-img>
    </amp-img>
    <amp-img
      media="(max-width: 499px)"
      alt="Aluno da POSEAD estudando na comodidade do ser escritório."
      src="/static/images/success_man__mobile.webp"
      width="835"
      height="550"
      layout="responsive"
    >
      <amp-img
        fallback=""
        alt="Aluno da POSEAD estudando na comodidade do ser escritório."
        src="/static/images/success_man.jpg"
        width="835"
        height="550"
        layout="responsive"
      ></amp-img>
    </amp-img>
    <article>
      <h3> Profissionais de sucesso estão se especializando neste momento</h3>
      <span>
        Profissionais da atualidade precisam de uma pós graduação rápida para
        atender sua necessidade, e de qualidade para se destacar e ter autonomia
        no mercado de trabalho.
      </span>
      <span>
        Segundo o site de empregos Catho, fazer uma pós graduação pode aumentar
        seu salário em até 50% no meio privado ou em até 47% se tratando de
        servidores públicos, segundo o jornal extra. Nisso nós podemos te
        ajudar.
      </span>
      <div className="bnt">
        <BtnCta className="mt15 btn btn-red" />
      </div>
    </article>

    <style jsx>{`
    div.bnt{
      position:relative;
      top:20px;
      left:5%;
    }
      section {
        margin: 130px 40px 250px 40px;
        position: relative;
        height: 800px;
      }
      section > img {
        width: 100%;
      }
      section > article {
        position: absolute;
        color: var(--write);
        width: 700px;
        top: 81%;
        right: 0%;
        z-index: 1;
      }
      section > article > h3 {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }
      section > article > span {
        background: var(--blue);
        display: block;
        padding: 18px;
        font-size: 1.4rem push -u origin masterrem;
        }

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
      }
      @media (max-width: 330px) {
        section {
          height: 910px;
        }
        section > article span {
          font-size: 1.2rem;
        }

      }
    `}</style>
  </section>
)

export default Scarcity
