'use strict';
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require ('body-parser')
const Gerencianet = require('gn-api-sdk-node');
const Chaves_API = require('./Credenciais');
//config
  //template 
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set( 'view engine', 'handlebars')
  //bodyParser
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

//rota principal 
app.get('/', function(req, res){
  res.render('siteprincipal')
})




//Formulario boleto
app.get('/boleto', function(req, res){
  res.render('formulario')
}) //final da rota de formulario boleto

//ADD boleto
app.post('/addboleto', function(req, res){
  
var Opcoes = {
  client_id: Chaves_API.client_id,
  client_secret: Chaves_API.client_secret,
  sandbox: true
}

var body = {

  payment: {
    banking_billet: {
      expire_at: '2020-03-25',
      customer: {
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        birth: req.body.birth,
        phone_number: req.body.phone_number
      }
    }
  },

  items: [{
    name: 'curoso',
    value: 15000,
    amount: 1
  }],
  shippings: [{
    name: 'taxa de emissão do boleto',
    value: 0
  }]
}

var gerencianet = new Gerencianet(Opcoes);

gerencianet
  .oneStep([], body)
  .then(function(){
    res.redirect('/boleto')
  })
  .catch(console.log)
  .done();
}) //final da rota de ADD boleto











app.listen('8081', () => {
  console.log(`Servidor rodando`)
  console.log('Para derrubar o servidor: ctrl + c');
})