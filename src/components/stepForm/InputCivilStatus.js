import { useRef, useEffect } from 'react'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputCivilStatus = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    assignNewValue({ name: 'civilStatus', value: 'single' })

    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name]
    }
  }, [])

  return (
    currentStepIs('InputCivilStatus', step) && (
      <>
        <div>
          <h1>Informação civil</h1>
        </div>
        <div>
          <label htmlFor="single">
            <input
              ref={inputRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              defaultChecked={
                !values.civilStatus || values.civilStatus === 'single'
              }
              id="single"
              type="radio"
              name="civilStatus"
              value="single"
            />
            Solteiro
          </label>
          <label htmlFor="married">
            <input
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              defaultChecked={values.civilStatus === 'married'}
              id="married"
              type="radio"
              name="civilStatus"
              value="married"
            />
            Casado
          </label>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupParent' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputProfession' })}
          >
            Continuar...
          </button>
        </div>
        <style jsx>{`
          div:nth-child(2) {
            flex-direction: column;
          }
          div:nth-child(2) label input {
            margin-right: 10px;
            width: 30px;
            height: 30px;
          }
          label {
            display: flex;
            flex-wrap: nowrap;
            height: 60px;
            align-items: center;
            font-size: 2rem;
          }
        `}</style>
      </>
    )
  )
}

export default InputCivilStatus
