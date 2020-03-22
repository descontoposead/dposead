const InputProfession = (props) =>
  props.stepView('InputProfession') && (
    <>
      <h1>Qual é sua profissao</h1>
      <input type="text" name="name" />
      <button onClick={() => props.stepNext({ currentStep: 'InputZip' })}>
        Este é meu nome
      </button>
    </>
  )

export default InputProfession
