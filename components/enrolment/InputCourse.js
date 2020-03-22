const InputCourse = (props) =>
  props.stepView('InputCourse') && (
    <>
      <h1>Qual curso vc deseja?</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupPayment' })}
      >
        Este é meu nome
      </button>
    </>
  )

export default InputCourse
