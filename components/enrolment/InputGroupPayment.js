const InputGroupPayment = (props) =>
  props.stepView('InputGroupPayment') && (
    <>
      <h1>Pronto, agora so falta nos dizer como deseja pagar</h1>
      <input type="text" name="name" />
      <button onClick={() => props.stepNext({ currentStep: 'Resume' })}>
        Continuar
      </button>
    </>
  )

export default InputGroupPayment
