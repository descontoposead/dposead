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
    banking_billet: {
      expire_at: '2020-08-30',
      customer: {
        name: ' test etes iwsdehfkwh ',
        email: 'wmlwarley01@outlook.com',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  },

  items: [{
    name: 'curoso',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }]
}

var gerencianet = new Gerencianet(Opcoes);

gerencianet
  .oneStep([], body)
  .then(console.log)
  .catch(console.log)
  .done();
