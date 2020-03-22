const InputGroupPhone = (props) =>
  props.stepView('InputGroupPhone') && (
    <>
      <h1>telefones</h1>
      <input type="text" name="name" />
      <input type="text" name="name" />
      <button onClick={() => props.stepNext({ currentStep: 'InputGroupDoc' })}>
        Continuar
      </button>
    </>
  )

export default InputGroupPhone
