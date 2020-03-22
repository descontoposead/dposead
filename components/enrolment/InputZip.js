const InputZip = (props) =>
  props.stepView('InputZip') && (
    <>
      <h1>Qual é seu cep?</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupAddress' })}
      >
        Este é meu nome
      </button>
    </>
  )

export default InputZip
