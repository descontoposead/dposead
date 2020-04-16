import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'
import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputGroupBirth = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState({
    inputGroup: [],
  })

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputGroupRefs = {
    inputStateOfBirthRef: useRef(null),
    inputCityOfBirthRef: useRef(null),
    inputDateOfBirthRef: useRef(null),
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => ({
          inputEl: inputGroupRefs.inputStateOfBirthRef.current,
          validator: () => [
            new RegExp(
              /^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$/
            ).test(inputGroupRefs.inputStateOfBirthRef.current.value),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: inputGroupRefs.inputCityOfBirthRef.current,
        }),
        () => ({
          inputEl: inputGroupRefs.inputDateOfBirthRef.current.inputElement,
          validator: () => [
            (() => {
              try {
                return new RegExp(
                  /[12][0-9]{3}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
                ).test(
                  new Date(
                    inputGroupRefs.inputDateOfBirthRef.current.inputElement.value
                  )
                    .toISOString()
                    .replace(/=?T.*/, '')
                )
              } catch (e) {
                return false
              }
            })(),
            'invalid-value-error',
          ],
        }),
      ],
      setNextFn: () =>
        setNextStep({
          currentStep: 'InputGroupParent',
          progressValue: step.progressValue + 7.69,
        }),
      vibrateFn: () => toggleVibrating(),
    })

    //cache values to input refs masked or not
    Object.keys(inputGroupRefs).forEach((ref) => {
      if (inputGroupRefs[ref].current) {
        if (inputGroupRefs[ref].current.hasOwnProperty('inputElement')) {
          const { current } = inputGroupRefs[ref]
          current.inputElement.value = values[current.inputElement.name] || ''
        } else {
          const { current } = inputGroupRefs[ref]
          current.value = values[current.name] || ''
        }
      }
    })
  }, [step])

  return (
    currentStepIs('InputGroupBirth', step) && (
      <>
        <div>
          <h1>Necessário para seu certificado</h1>
        </div>
        <div>
          <div>
            {values.stateOfBirth && (
              <label htmlFor="stateOfBirth">O estado que você nasceu</label>
            )}
            <input
              ref={inputGroupRefs.inputStateOfBirthRef}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.toUpperCase()
                controlInputValue(currentTarget)
              }}
              autoComplete="off"
              autoFocus
              name="stateOfBirth"
              type="text"
              placeholder="estado que vc nasceu..."
            />
            <strong className="hasEmptyError">Faltou o estado aqui!</strong>
            <strong className="hasInvalidError">
              Digite a sigla de seu estado. Ex: MG
            </strong>
          </div>
          <div>
            {values.cityOfBirth && (
              <label htmlFor="cityOfBirth">A cidade que você nasceu</label>
            )}
            <input
              ref={inputGroupRefs.inputCityOfBirthRef}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              type="text"
              name="cityOfBirth"
              placeholder="cidade que vc nasceu..."
            />
            <strong className="hasError">Faltou a cidade aqui!</strong>
          </div>
          <div>
            <label htmlFor="dateOfBirth">Quando você nasceu?</label>
            <MaskedInput
              id="dateOfBirth"
              ref={inputGroupRefs.inputDateOfBirthRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              autoComplete="off"
              name="dateOfBirth"
              placeholder="dia/mês/ano"
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
            <strong className="hasEmptyError">
              Precisamos saber quando você nasceu!
            </strong>
            <strong className="hasInvalidError">Essa data não é válida.</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputGroupDoc',
                progressValue: step.progressValue - 7.69,
              })
            }
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Continuar...
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupBirth
