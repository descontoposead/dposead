import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputLead = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const refGroup = {
    refNameInput: useRef(null),
    refEmailInput: useRef(null),
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => ({
          inputEl: refGroup.refNameInput.current,
          validator: () => [
            new RegExp(/^[ ]*(.+[ ]+)+.+[ ]*$/).test(
              refGroup.refNameInput.current.value
            ), //boolean validator
            'invalid-value-error', //class
          ],
        }),
        () => ({
          inputEl: refGroup.refEmailInput.current,
          validator: () => [
            new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(
              refGroup.refEmailInput.current.value
            ), //boolean validator
            'invalid-value-error', //class
          ],
        }),
      ],
      setNextFn: () => setNextStep({ currentStep: 'InputGroupPhone' }),
      vibrateFn: () => toggleVibrating(),
    })

    //cache values to input refs masked or not
    Object.keys(refGroup).forEach((ref) => {
      if (refGroup[ref].current) {
        const { current } = refGroup[ref]
        current.value = values[current.name] || ''
      }
    })
  }, [step])

  return (
    currentStepIs('InputLead', step) && (
      <>
        <div>
          <h1>Olá, vamos começar com isto</h1>
        </div>
        <div>
          <div>
            {values.email && (
              <label htmlFor="email">E-mail que você informou</label>
            )}
            <input
              ref={refGroup.refEmailInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.toLowerCase()
                controlInputValue(currentTarget)
              }}
              autoComplete="off"
              autoFocus
              type="text"
              placeholder="escreva seu email..."
              name="email"
            />
            <strong className="hasEmptyError">
              Você não adicionou um e-mail!
            </strong>
            <strong className="hasInvalidError">
              Precisa ser um e-mail válido!
            </strong>
          </div>
          <div>
            {values.name && (
              <label htmlFor="dateOfBirth">Nome que você informou</label>
            )}
            <textarea
              ref={refGroup.refNameInput}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="off"
              autoFocus
              placeholder="escreva seu nome..."
              type="text"
              name="name"
            ></textarea>
            <strong className="hasEmptyError">
              Precisamos saber quem é você!
            </strong>
            <strong className="hasInvalidError">
              Tem certeza que este é seu nome completo?
            </strong>
          </div>
        </div>
        <div>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Próximo
          </button>
        </div>
      </>
    )
  )
}

export default InputLead
