const InputGroupParent = (props) =>
  props.stepView('InputGroupParent') && (
    <>
      <h1>Agora, informacoes dos pais</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputCivilStatus' })}
      >
        Continuar
      </button>
    </>
  )

export default InputGroupParent
