'use strict';

var Gerencianet = require('gn-api-sdk-node');
var Chaves_API = require('./Credenciais');

var Opcoes = {
  client_id: Chaves_API.client_id,
  client_secret: Chaves_API.client_secret,
  sandbox: true
}
var body = {

  payment: {
    credit_card: {
      customer: {
        name: 'ahdgfljlsdjfvlkas dvaioksjdvpça teste',
        cpf: '02099890684',
        email: 'wmlwarley@gmail.com',
        birth: '1998-01-15',
        phone_number: '5144916523'
      },
      installments:1,
      payment_token: '8d3cad156cc637b89ed3add9974cd5ef1ee4219b',
      billing_address:{
        street: 'rua teste',
        number: 201,
        neighborhood: 'Bauxita',
        zipcode: '35170028',
        city: 'inhapim',
        state: 'MG'

      }

    }
  },

  items: [{
    name: 'curoso',
    value: 20000,
    amount: 1
  }]
}

var gerencianet = new Gerencianet(Opcoes);

gerencianet
  .oneStep([], body)
  .then(console.log)
  .catch(console.log)
  .done();
