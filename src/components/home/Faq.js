const Faq = () => (
  <div>
    <h3>Perguntas frequentes</h3>
    <amp-accordion expand-single-section="">
      <section>
        <h4>
          Quais as formas de pagamento?
          <button>&#8249;</button>
        </h4>
        <p>
          Para iniciar o curso você deverá realizar o pagamento da matrícula,
          liberando assim o portal do aluno, e materiais para iniciar os
          estudos. Durante o curso você deverá realizar o pagamento das
          mensalidades através do boleto bancário em até 18 vezes, ou no cartão
          de crédito em até 12 vezes sem juros.
        </p>
      </section>
      <section>
        <h4>
          Qual a duração dos cursos?
          <button>&#8249;</button>
        </h4>
        <p>
          O curso deverá ter duração mínima de 6 meses e máxima de 18 meses.
          Exceto o curso de Engenharia de Segurança do Trabalho e os cursos com
          carga horária a partir de 1.000 horas, que têm duração mínima de 12
          meses.
        </p>
      </section>
      <section>
        <h4>
          Os cursos são 100% online?
          <button>&#8249;</button>
        </h4>
        <p>
          Todo o material de estudo é disponibilizado de forma digital, podendo
          ser acessado no portal do aluno em qualquer plataforma que possua
          acesso à internet.
        </p>
      </section>
      <section>
        <h4>
          Como funciona as avaliações do curso?
          <button>&#8249;</button>
        </h4>
        <p>
          Durante o curso, o aluno deverá realizar duas avaliações, a Avaliação
          On-line (AVO), dividida por módulos de estudos, e Avaliação Final
          (AVF), abrangendo todos os módulos do curso, ambas no valor de 10
          pontos. A nota final do aluno será a média obtida por meio do
          somatório das notas das duas avaliações, no qual você deverá alcançar
          o percentual mínimo de 70% para a aprovação.
        </p>
      </section>
      <section>
        <h4>
          Todos os cursos são autorizados pelo MEC?
          <button>&#8249;</button>
        </h4>
        <p>
          Todos os nossos cursos são certificados em parceria com a Faculdade
          ÚNICA, do Grupo Prominas, que se encontram devidamentes reconhecidos
          pelo MEC, Decreto 1.004 de, 17/08/2017, e publicado no Diário Oficial
          da União, em 18/08/2017, com validade em todo território nacional.
          Além disso, a Faculdade ÚNICA foi avaliada como nota 4 (em uma escala
          de 1 a 5) no IGC.
          <br />
          <br />
          <a
            rel="nofollow"
            target="_blank"
            href="http://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTU0NTA="
          >
            Clique aqui para consultar.
          </a>
        </p>
      </section>
      <section>
        <h4>
          Preciso fazer o TCC?
          <button>&#8249;</button>
        </h4>
        <p>
          Conforme a resolução n° 1, de 06/04/2018, da Câmara de Educação
          Superior (CES), do Conselho Nacional de Educação (CNE), publicada no
          Diário Oficial da União (D.O.U), de 09/04/2018 o Trabalho de Conclusão
          de Curso não é mais obrigatório, ficando ao critério do aluno a
          realização ou não. Entretanto, alguns conselhos ou concursos ainda
          exigem, como por exemplo, os cursos da área da Engenharia que seguem
          regulamentação própria do CREA, que exige a realização do mesmo.
        </p>
      </section>
      <section>
        <h4>
          Quais declarações tenho direito durante o curso?
          <button>&#8249;</button>
        </h4>
        <p>
          Durante o curso algumas declarações são totalmente gratuitas, e você
          poderá acessar em seu portal, sendo elas:
          <br />
          <br />
          a) Cursando. <br />
          b) Presença. <br />
          c) Matrícula. <br />
          d) Conclusão.
        </p>
      </section>
      <section>
        <h4>
          Qual a diferença entre Pós-Graduação e MBA?
          <button>&#8249;</button>
        </h4>
        <p>
          Segundo o MEC, ambas são modalidades de Pós-Graduação lato sensu e
          garantem o título de especialista. A diferença é que os cursos de
          cursos de MBA são mais focados em negócios e gerenciamento de
          processos e pessoas, sendo mais indicado para aquele que precisa
          desenvolver habilidades empreendedoras ou de gestor.
        </p>
      </section>
      <section>
        <h4>
          Quais documentos são necessários para começar?
          <button>&#8249;</button>
        </h4>
        <p>
          Para emissão do certificado de conclusão do curso de pós-graduação
          lato sensu o aluno deverá anexar no portal a cópia simples dos
          seguintes documentos:
          <br />
          <br />
          a) Diploma de graduação. <br />
          b) Histórico de graduação. <br />
          c) Certidão de nascimento ou casamento. <br />
          d) Carteira de identidade. <br />
          e) CPF. <br />
          f) Comprovante de endereço.
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
      div > amp-accordion > section p {
        font-size: 1.15rem;
      }
      div > amp-accordion > section a {
        color: #fff;
      }
      div > amp-accordion > section h4 {
        width: 100%;
        background: transparent;
        border: 0;
      }
      div > amp-accordion > section[expanded] h4 {
        margin-bottom: 10px;
      }
      div > amp-accordion > section h4 button {
        position: absolute;
        top: -15px;
        right: 0;
        font-size: 2.7rem;
        border: 0;
        background: transparent;
        color: #fff;
        font-weight: bold;
        transition: 0.1s;
      }
      div > amp-accordion > section:not(expanded) button:focus {
        outline: none;
      }
      div > amp-accordion > section:not(expanded) button {
        transform: rotate(-90deg);
      }
      div > amp-accordion > section[expanded] button {
        transform: rotate(90deg);
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
