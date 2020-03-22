const InputGroupBirth = (props) =>
  props.stepView('InputGroupBirth') && (
    <>
      <h1>Agora, informacoes de nascimento</h1>
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupParent' })}
      >
        Continuar
      </button>
    </>
  )

export default InputGroupBirth
