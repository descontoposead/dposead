const InputGroupGraduation = (props) =>
  props.stepView('InputGroupGraduation') && (
    <>
      <h1>Agora, graduacao</h1>
      <input type="text" name="name" />
      <button onClick={() => props.stepNext({ currentStep: 'InputCourse' })}>
        Continuar
      </button>
    </>
  )

export default InputGroupGraduation
