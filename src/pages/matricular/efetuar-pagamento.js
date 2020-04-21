import { useState } from 'react'
import { useSessionStorage } from 'react-use'

import withStepLayout from '../../components/StepLayout'
import CreditCard from '../../components/payment/CreditCard'
import Billet from '../../components/payment/Billet'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/escolha-o-metodo-de-pagamento-da-matricula',
    next: '',
  })

  const [_, setProgressValue] = useSessionStorage('progressValue')
  const [values] = useSessionStorage('values', {})

  const goToPayMethodTax = () => {
    setProgressValue(86.66740000000001)
    window.location.assign(stepPage.prev)
  }

  const propsPay = { values, goToPayMethodTax }

  return (
    <>
      {values.payMethodTax === 'billet' && <Billet {...propsPay} />}

      {values.payMethodTax === 'creditCard' && (
        <div>
          <CreditCard {...propsPay} />
        </div>
      )}

      <style jsx>{`
        div:nth-child(1) > h2,
        div:nth-child(1) > h3 {
          line-height: 1;
        }
        div:nth-child(2) {
          margin-top: 0 !important;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          box-sizing: border-box;
        }
        label[for='barcode'] > span {
          font-weight: bold;
        }
        div:nth-child(2) {
          margin-top: 40px;
        }
        textarea {
          height: 20vh;
        }
      `}</style>
    </>
  )
}

export default withStepLayout(Step)
