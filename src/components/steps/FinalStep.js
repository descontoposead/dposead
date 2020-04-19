import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import CreditCard from '../payment/CreditCard'
import Billet from '../payment/Billet'
import { useSharedValues } from '../../hooks/useSharedValues'

const FinalStep = () => {
  const [step, setNextStep] = useSharedStep()
  const [values] = useSharedValues()

  const goToPayMethodTax = () => {
    setNextStep({
      currentStep: 'InputPayMethodTax',
      progressValue: step.progressValue - 7.69 * 2,
      values,
    })
  }

  return (
    currentStepIs('FinalStep', step) && (
      <>
        {step.values.payMethodTax === 'billet' && (
          <Billet values={step.values} goToPayMethodTax={goToPayMethodTax} />
        )}

        {step.values.payMethodTax === 'creditCard' && (
          <div>
            <CreditCard
              values={step.values}
              goToPayMethodTax={goToPayMethodTax}
            />
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
  )
}

export default FinalStep
