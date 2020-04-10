import { createStateContext } from 'react-use'

const [useSharedStep, SharedStepProvider] = createStateContext({
  currentStep: 'FinalStep',
  progressValue: 1,
  // values: {},
  values: {
    address: {
      state: 'MG',
      city: 'Córrego Novo',
      zipcode: '35345-000',
      neighborhood: 'Centro',
      street: 'Sks',
      number: '92992',
    },
    payMethodCourse: 'creditCard',
    chargeValueCourse: {
      instalment: 1,
      value: 200000,
      currency: 2000,
    },
    payMethodTax: 'creditCard',
    chargeValueTax: {
      instalment: 1,
      value: 20000,
      currency: 200,
    },
    email: 'gsusu@mail.com',
    name: 'Smsk Slks',
    phone: '(33) 9999-9999',
    whatsapp: '(33) 99999-9999',
    personalDocument: '108.470.806-09',
    personalRegistry: 'MG9292',
    stateOfBirth: 'MG',
    cityOfBirth: 'Correfon ',
    dateOfBirth: '12/08/1995',
    parentName: 'Jsosoe Ek',
    motherName: 'Sksk',
    zipcode: '35345-000',
    graduation: 'Denv',
    dateOfGraduation: '12/09/1995',
    courseName: 'MBA EM GASTRONOMIA',
  },
})

const currentStepIs = (step, { currentStep }) => step === currentStep

export { useSharedStep, SharedStepProvider, currentStepIs }
