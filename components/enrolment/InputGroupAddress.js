const InputGroupAddress = (props) =>
  props.stepView('InputGroupAddress') && (
    <>
      <h1>Agora, informacoes de endereco</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupGraduation' })}
      >
        Continuar
      </button>
    </>
  )

export default InputGroupAddress
