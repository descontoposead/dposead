import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'
import MaskedInput from 'react-text-mask'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'
import postStep from '../../helpers/postStep'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '/matricular/quem-sao-meus-pais',
    next: '/matricular/meu-endereco',
  })

  const [values, setValues] = useSessionStorage('values', {})

  const inputRef = useRef(null)

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputEl: () => inputRef.current.inputElement,
      navigationByStep: async () => {
        sessionStorage.setItem('values', JSON.stringify(values))
        await postStep({
          email: values.email,
          address: {
            zipcode: values.address.zipcode,
          },
        })
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  useEffect(function onLoadPageSetInitialValues() {
    if (!values.hasOwnProperty('address')) {
      setValues(Object.assign(values, { address: {} }))
    }
  }, [])

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  const onInputTypeZip = () => ({ currentTarget }) => {
    const zipFullLength = 9
    const isCompletedZipValue =
      currentTarget.value.replace(/_/, '').length === zipFullLength

    if (isCompletedZipValue) {
      fetch(
        'https://apps.widenet.com.br/busca-cep/api/cep.json?code=' +
          currentTarget.value
      )
        .then((res) => res.json())
        .then((res) => {
          let inputAddress = {}
          if (res.status === 200) {
            inputAddress = {
              name: 'address',
              value: {
                state: res.state,
                city: res.city,
                zipcode: res.code,
                neighborhood: res.district,
                street: res.address,
              },
            }
          } else {
            inputAddress = {
              name: 'address',
              value: {
                zipcode: currentTarget.value,
              },
            }
          }
          mergeInputValue(inputAddress)
        })
    }
  }

  return (
    <>
      <div>
        <h1>Agora vamos agilizar! Digite seu CEP</h1>
      </div>
      <div>
        <div>
          {values.address?.zipcode && (
            <label htmlFor="zipcode">Seu CEP é este</label>
          )}
          <MaskedInput
            ref={inputRef}
            onChange={onInputTypeZip()}
            defaultValue={values.address?.zipcode}
            name="zipcode"
            placeholder="escreva o cep..."
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
          />
          <strong className="hasError">Precisamos saber onde você está!</strong>
        </div>
      </div>
      <div>
        <button
          className="prev"
          onClick={() => window.location.assign(stepPage.prev)}
        >
          Voltar
        </button>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Este é o meu CEP
        </button>
      </div>

      <style jsx>{`
        div:nth-child(2) > div {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 45 })
