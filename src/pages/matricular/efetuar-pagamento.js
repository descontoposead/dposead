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

  const [values] = useSessionStorage('values', {})

  const goToPayMethodTax = () => window.location.assign(stepPage.prev)

  const propsPay = { values, goToPayMethodTax }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            process.env.NODE_ENV === 'production'
              ? `var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/${process.env.gnAccountId}/'+v;s.async=false;s.id='${process.env.gnAccountId}';if(!document.getElementById('${process.env.gnAccountId}')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};$gn.ready((checkout) => {})`
              : `var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://sandbox.gerencianet.com.br/v1/cdn/${process.env.gnAccountId}/'+v;s.async=false;s.id='${process.env.gnAccountId}';if(!document.getElementById('${process.env.gnAccountId}')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};$gn.ready((checkout) => {})`,
        }}
      ></script>

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
