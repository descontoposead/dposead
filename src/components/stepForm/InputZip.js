import MaskedInput from 'react-text-mask'
import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'

const InputZip = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputEl: () => inputRef.current.inputElement,
      setNextFn: () => setNextStep({ currentStep: 'InputFullAddress' }),
      vibrateFn: () => toggleVibrating(),
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.inputElement.value =
        values[inputRef.current.inputElement.name] || ''
    }
  }, [step]) //on open step

  const onType = () => ({ currentTarget }) => {
    const zipFullLength = 9
    const isCompletedZipValue =
      currentTarget.value.replace(/_/, '').length === zipFullLength

    if (isCompletedZipValue) {
      controlInputValue(currentTarget)

      fetch(
        'https://apps.widenet.com.br/busca-cep/api/cep.json?code=' +
          currentTarget.value
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            const addresses = [res.city, res.state, res.district, res.address]
            const inputFullAddressTarget = {
              name: 'fullAddress',
              value: addresses.filter(Boolean).join(', '),
            }
            controlInputValue(inputFullAddressTarget)
          }

          if (res.status === 404) {
          }
        })
    }
  }

  return (
    currentStepIs('InputZip', step) && (
      <>
        <div>
          <h1>Qual é seu cep?</h1>
        </div>
        <div>
          <div>
            {values.zipCode && <label htmlFor="zipCode">Seu CEP é este</label>}
            <MaskedInput
              ref={inputRef}
              onChange={onType()}
              autoComplete="off"
              autoFocus
              name="zipCode"
              placeholder="escreva o cep..."
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            />
            <strong className="hasError">
              Precisamos saber onde você está!
            </strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputProfession' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Este é o meu CEP
          </button>
        </div>
      </>
    )
  )
}

export default InputZip
