/**
 * Configuração do servidor
 * @author Starley Cazorla
 */

'use sctict'

let express = require('express');
let app = express()
// Documentação do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// ? Index de rotas
const executeDb = require('./routes/executeDb-route') // Para uso de executar em banco de dados
const updateApp = require('./routes/updateApp-route') // Para uso de atualizao de aplicação
const files = require('./routes/arquivos-route') // Para uso de gerenciamento de arquivos
const authToken = require('./routes/authToken-route') // Para uso de gerenciamento de arquivos

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
app.use('/api/files', files);

module.exports = app;