const InputCivilStatus = (props) =>
  props.stepView('InputCivilStatus') && (
    <>
      <h1>Informação civil</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputProfession' })}
      >
        Este é meu nome
      </button>
    </>
  )

export default InputCivilStatus
