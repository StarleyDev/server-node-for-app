// Configuração sevidor
/**
 * @author Starley Cazorla
 */

'use sctict'

var express = require('express');
var app = express()
// Documentação do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// ? Index de rotas
const executeDb = require('./routes/executeDb-route') // Para uso de executar em banco de dados
const updateApp = require('./routes/updateApp-route') // Para uso de atualizao de aplicação
const arquivos = require('./routes/arquivos-route') // Para uso de gerenciamento de arquivos
const authToken = require('./routes/authToken-route') // Para uso de gerenciamento de arquivos

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
});

// * Rotas abertas
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/authToken', authToken);

// ! Rotas fechadas
app.use('/api/executeDb', executeDb);
app.use('/api/updateApp', updateApp);
app.use('/api/arquivos', arquivos);

module.exports = app;