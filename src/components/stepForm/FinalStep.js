import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useEffect, useState } from 'react'
import Card from '../payment/Card'

const FinalStep = () => {
  const [step, setNextStep] = useSharedStep()
  const [paymentResponse, setPaymentResponse] = useState(null)
  const [paymentResponseErr, setPaymentResponseErr] = useState(null)

  useEffect(() => {
    console.log(step.values)
    switch (step.values?.paymentMethod) {
      case 'billet': {
        fetch('/api/charges/billet', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: {
              name:
                'Taxa de inscrição para o curso - ' + step.values.courseName,
              value: step.values.courseTaxValue.value,
            },
            student: {
              name: step.values.name,
              cpf: step.values.personalDocument.replace(/\D/g, ''),
              phone_number: step.values.whatsapp.replace(/\D/g, ''),
            },
          }),
        })
          .then((res) => res.json())
          .then(setPaymentResponse)
          .catch(setPaymentResponseErr)
        break
      }
      case 'creditCard': {
        break
      }
      default: {
      }
    }
  }, [step.values?.paymentMethod])

  const setToClipboard = () => ({ target }) => {
    target.setSelectionRange(0, target.value.length)
    document.execCommand('copy')
  }

  const openBilletFile = () => (event) => {
    event.preventDefault()
    window.open(paymentResponse?.archive, '_blank')
  }

  return (
    currentStepIs('FinalStep', step) && (
      <>
        <div>
          <h2>Parabéns, você concluiu a matricula com sucesso.</h2>
          <h3>Para liberar o acesso ao portal do aluno, pague a matricula.</h3>
        </div>
        {step.values.paymentMethod === 'billet' && paymentResponse && (
          <>
            <div>
              <div>
                <label htmlFor="barcode">
                  Vou usar meu <span>Internet Banking</span>
                </label>
                <textarea
                  onClick={setToClipboard()}
                  name="barcode"
                  id="barcode"
                  defaultValue={paymentResponse?.barcode.replace(/\s/, '')}
                ></textarea>
              </div>
            </div>
            <div>
              <button onClick={openBilletFile()}>
                Prefiro usar o boleto físico
              </button>
            </div>
          </>
        )}
        {step.values.paymentMethod === 'creditCard' && (
          <div>
            <Card values={step.values} />
          </div>
        )}

        {/* <div>
          <strong>
            Só um instante, estamos processando o método de pagamento...
          </strong>
        </div> */}

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
