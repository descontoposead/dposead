const InputName = (props) =>
  props.stepView('InputName') && (
    <>
      <h1>Qual é seu nome completo?</h1>
      <input type="text" name="name" />
      <button onClick={() => props.stepNext({ currentStep: 'InputEmail' })}>
        Este é meu nome
      </button>
    </>
  )

export default InputName
