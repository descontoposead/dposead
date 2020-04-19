import { useState, useEffect, useRef } from 'react'

const Billet = ({ values, goToPayMethodTax }) => {
  const [paymentResponse, setPaymentResponse] = useState(null)
  const [hasFetchError, setFetchError] = useState(false)
  const [doRefresh, setRefresh] = useState(false)

  const barcodeRef = useRef(null)

  useEffect(() => {
    setFetchError(false)

    fetch('/api/charges/billet', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          name: 'Taxa de inscrição para o curso - ' + values.courseName,
          value: values.chargeValueTax.value,
        },
        student: {
          name: values.name,
          cpf: values.personalDocument.replace(/\D/g, ''),
          phone_number: values.whatsapp.replace(/\D/g, ''),
        },
      }),
    })
      .then(async (res) => {
        if (res.status !== 201) throw await res.json()
        return await res.json()
      })
      .then((res) => {
        setPaymentResponse(res)
        setFetchError(false)
        autosizeBarcodeInput()

        fbq('trackSingleCustom', '2534781333293766', 'Purchase', {
          content_name: values.courseName,
          content_type: 'BOLETO',
          value: values.chargeValueTax.currency,
          currency: 'BRL',
        })
      })
      .catch(setFetchError)
  }, [doRefresh])

  const autosizeBarcodeInput = () => {
    barcodeRef.current.style.cssText =
      'height: ' + (barcodeRef.current.scrollHeight - 20) + 'px'
  }

  const setToClipboard = () => ({ target }) => {
    target.setSelectionRange(0, target.value.length)
    document.execCommand('copy')
  }

  const openBilletFile = () => (event) => {
    event.preventDefault()
    window.open(paymentResponse?.archive, '_blank')
  }

  const canViewBillet = () => {
    return !hasFetchError && paymentResponse
  }

  return canViewBillet() ? (
    <>
      <div>
        <h2>Parabéns, você concluiu a matricula com sucesso.</h2>
        <h3>
          O acesso ao portal do aluno será enviado no seu e-mail em até 2 dias
          uteis
        </h3>
      </div>
      <div>
        <div>
          <label htmlFor="barcode">
            A <strong>DescontoPosEaD</strong> valoriza a preservação da
            natureza. Se possível utilize o código digitado para realizar o
            pagamento
          </label>
          <textarea
            ref={barcodeRef}
            onClick={setToClipboard()}
            name="barcode"
            id="barcode"
            defaultValue={paymentResponse?.barcode.replace(/\s/, '')}
          ></textarea>
        </div>
      </div>
      <div>
        <button onClick={openBilletFile()}>
          Preciso gerar o boleto físico
        </button>
      </div>
      <style>{`
      textarea {
        margin-top: 20px;
        padding: 10px;
        background: yellow;
        border-radius: 10px;
      }
      label > strong {
        font-size: 1rem !important;
      }
      `}</style>
    </>
  ) : hasFetchError ? (
    <>
      <div>
        <h3>
          Sentimos muito por isso, mas não conseguimos gerar seu boleto agora...
        </h3>
      </div>

      <div>
        <button
          onClick={(event) => {
            event.preventDefault()
            setRefresh(!doRefresh)
          }}
        >
          Tentar novamente
        </button>
        <button className="success" onClick={() => goToPayMethodTax()}>
          Alterar método de pagamento
        </button>
      </div>
      <style jsx>{`
        button {
          margin-bottom: 5px;
        }
        .success {
          border: solid 4px #10795c !important;
          color: #10795c !important;
        }
      `}</style>
    </>
  ) : (
    <div>
      <h3>Só um momento, estamos gerando seu boleto...</h3>
    </div>
  )
}

export default Billet
