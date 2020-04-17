import { createStateContext } from 'react-use'

const [useSharedStep, SharedStepProvider] = createStateContext({
  currentStep: 'InputLead',
  progressValue: 1,
  values: {},
  // values: {
  //   address: {
  //     state: 'MG',
  //     city: 'Corrego Noo',
  //     zipcode: '35345-000',
  //     neighborhood: 'Centro',
  //     street: 'R E E',
  //     number: '8383',
  //   },
  //   payMethodCourse: 'billet',
  //   chargeValueCourse: {
  //     instalment: 1,
  //     value: 200000,
  //     currency: 2000,
  //   },
  //   payMethodTax: 'creditCard',
  //   chargeValueTax: {
  //     instalment: 1,
  //     value: 0.05,
  //     currency: 5,
  //   },
  //   voucher: '',
  //   email: 'gustavojnt@gmail.com',
  //   name: 'Gustao Jonathan',
  //   phone: '(33) 9923-8239',
  //   whatsapp: '(33) 99939-3993',
  //   personalDocument: '108.470.806-09',
  //   personalRegistry: 'MGG3883D',
  //   stateOfBirth: 'MG',
  //   cityOfBirth: 'Corrego Novo',
  //   dateOfBirth: '12/08/1995',
  //   parentName: 'Jose Antonio',
  //   motherName: 'Conceicao',
  //   zipcode: '35345-000',
  //   graduation: 'Dedkie',
  //   dateOfGraduation: '20/08/1995',
  //   courseName: 'ENSINO RELIGIOSO',
  // },
})

const currentStepIs = (step, { currentStep }) => step === currentStep

export { useSharedStep, SharedStepProvider, currentStepIs }
