import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'

const InputGroupAddress = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const refGroup = {
    refStateInput: useRef(null),
    refCityInput: useRef(null),
    refNeighInput: useRef(null),
    refNumberInput: useRef(null),
    refStreetInput: useRef(null),
  }

  const controlInputValue = (target) => {
    setSharedValues(
      Object.assign(values, {
        address: Object.assign(values.address, {
          [target.name]: target.value,
        }),
      })
    )
  }

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => ({
          inputEl: refGroup.refStateInput.current,
          validator: () => [
            new RegExp(
              /^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$/
            ).test(refGroup.refStateInput.current.value),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: refGroup.refCityInput.current,
        }),
        () => ({
          inputEl: refGroup.refNeighInput.current,
        }),
        () => ({
          inputEl: refGroup.refNumberInput.current,
        }),
        () => ({
          inputEl: refGroup.refStreetInput.current,
        }),
      ],
      setNextFn: () =>
        setNextStep({
          currentStep: 'InputGroupGraduation',
          progressValue: step.progressValue + 7.69,
          values,
        }),
      vibrateFn: () => toggleVibrating(),
    })

    //cache values to input refs masked or not
    Object.keys(refGroup).forEach((ref) => {
      if (refGroup[ref].current && values.address) {
        const { current } = refGroup[ref]
        current.value = values.address[current.name] || ''
      }
    })
  }, [step])

  return (
    currentStepIs('InputGroupAddress', step) && (
      <>
        <div>
          <h1>Achamos você?</h1>
        </div>
        <div>
          <div>
            {values.address?.state && (
              <label htmlFor="state">Este é o estado que você mora</label>
            )}
            <input
              ref={refGroup.refStateInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.toUpperCase()
                controlInputValue(currentTarget)
              }}
              autoComplete="none"
              autoFocus
              type="text"
              name="state"
              placeholder="estado (sigla)..."
            />
            <strong className="hasEmptyError">Em qual estado você mora?</strong>
            <strong className="hasInvalidError">Este estado existe?</strong>
          </div>
          <div>
            {values.address?.city && (
              <label htmlFor="city">A cidade que você mora</label>
            )}
            <input
              ref={refGroup.refCityInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="none"
              type="text"
              name="city"
              placeholder="cidade..."
            />
            <strong className="hasError">Em qual cidade você mora?</strong>
          </div>
          <div>
            {values.address?.neighborhood && (
              <label htmlFor="neighborhood">Você mora neste bairro</label>
            )}
            <input
              ref={refGroup.refNeighInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="none"
              type="text"
              name="neighborhood"
              placeholder="bairro..."
            />
            <strong className="hasError">Qual é o bairro que você mora?</strong>
          </div>
          <div>
            {values.address?.number && (
              <label htmlFor="number">O número da sua residência</label>
            )}
            <input
              ref={refGroup.refNumberInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="none"
              type="text"
              name="number"
              placeholder="número.."
            />
            <strong className="hasError">
              Qual é o número da sua residência?
            </strong>
          </div>
          <div>
            {values.address?.street && (
              <label htmlFor="street">A rua que você mora</label>
            )}
            <input
              ref={refGroup.refStreetInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="none"
              type="text"
              name="street"
              placeholder="rua..."
            />
            <strong className="hasError">Qual é o a rua que você está?</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputZip',
                progressValue: step.progressValue - 7.69,
                values,
              })
            }
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Este é o meu endereço
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupAddress
