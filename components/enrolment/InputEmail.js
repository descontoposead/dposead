const InputEmail = (props) =>
  props.stepView('InputEmail') && (
    <>
      <h1>Agora, seu endereço de e-mail principal</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupPhone' })}
      >
        Continuar
      </button>
    </>
  )

export default InputEmail
