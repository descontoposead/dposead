import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '/matricular/como-eu-vou-pagar-o-curso',
    next: '/matricular/escolha-o-metodo-de-pagamento-da-matricula',
  })
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    billetDueDay: useRef(null),
    billetChargeStartIn: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputGroup: [
        () => ({
          inputEl: refs.billetDueDay.current,
        }),
        () => ({
          inputEl: refs.billetChargeStartIn.current,
        }),
      ],
      navigationByStep: async () => {
        Array.from(
          document.querySelectorAll('button.next, button.prev')
        ).map((b) => b.setAttribute('disabled', 'disabled'))
        sessionStorage.setItem('values', JSON.stringify(values))
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  return (
    <>
      <Head>
        <link rel="prefetch" href={stepPage.next}></link>
      </Head>
      <div>
        <h1>Configure as Mensalidades</h1>
      </div>
      <div>
        <div>
          <label htmlFor="billetDueDay">Qual melhor dia?</label>
          <select
            name="billetDueDay"
            id="billetDueDay"
            ref={refs.billetDueDay}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
            defaultValue={values.billetDueDay}
          >
            <option value="5">5 de cada mês</option>
            <option value="10">10 de cada mês</option>
            <option value="15">15 de cada mês</option>
            <option value="20">20 de cada mês</option>
          </select>
        </div>
        <div>
          <label htmlFor="billetChargeStartIn">
            Quando você quer começar a pagar?
          </label>
          <select
            name="billetChargeStartIn"
            id="billetChargeStartIn"
            ref={refs.billetChargeStartIn}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
            defaultValue={values.billetChargeStartIn}
          >
            <option value="sooner">Mais breve...</option>
            <option value="next_month">Próximo mês</option>
            <option value="2_months_from_now">Daqui 2 meses</option>
          </select>
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
          Gostei...
        </button>
      </div>

      <style jsx>{`
        div:nth-child(2) {
          flex-direction: column;
        }
        select {
          font-size: 1.3rem;
          width: 100%;
          border: 4px solid #292929;
          background: #fff;
          padding: 5px 0px;
          font-weight: 700;
          border-radius: 6px;
          margin-top: 7px;
        }
        label {
          font-size: 1.5rem;
        }
      `}</style>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 85 })
