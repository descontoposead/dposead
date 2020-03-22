const Modal = () => (
  <>
    <form action-xhr='/saveLead' method='post'>
      <div>
        <label htmlFor='email'>
          Falar com um <strong>especialista</strong>
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='Digite seu melhor e-mail'
        />
      </div>
      <div>
        <button className='btn btn-red'>Enviar</button>
      </div>
    </form>

    <style jsx>{`
      @keyframes openModal {
        from {
          top: 100vh;
        }
        to {
          top: 60vh;
        }
      }
      form {
        animation: openModal 1s;
        animation-delay: 10s;
        animation-fill-mode: forwards;
        opacity: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: space-evenly;
        top: 100vh;
        background: rgb(10, 19, 29);
        z-index: 2;
        position: fixed;
        height: 40vh;
        width: 455px;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 2px;
        padding: 10px 20px;
        border: 4px solid #fdfdfd;
        color: white;
        transition: top 1s;
      }
      form > div:first-child {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: 85px;
      }
      form label {
        font-size: 1.5rem;
      }
      form label > strong {
        color: var(--red);
      }
      form input {
        border-radius: 2px;
        border: 0;
        padding: 5px 20px;
        font-size: 1.1rem;
        min-width: 300px;
      }
      @media (max-width: 450px) {
        form {
          width: 100vw;
        }
      }
    `}</style>
  </>
);

export default Modal;
