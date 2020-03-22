const InputGroupDoc = (props) =>
  props.stepView('InputGroupDoc') && (
    <>
      <h1>Agora, documentos pessoais rg, cpf</h1>
      <input type="text" name="name" />
      <input type="text" name="name" />
      <button
        onClick={() => props.stepNext({ currentStep: 'InputGroupBirth' })}
      >
        Continuar
      </button>
    </>
  )

export default InputGroupDoc
