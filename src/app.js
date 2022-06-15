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
//  const index = require('./routes/index-route') // Index API
 const executeDb = require('./routes/executeDb-route') // Para uso de executar SQL
 const createDb = require('./routes/createDb-route') // Para uso de criação de banco de dados local
 const insertDb = require('./routes/insertDb-route') // Para uso de inserção de dados
 const updateApp = require('./routes/updateApp-route') // Para uso de inserção de dados

 var app = express();
 
 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "*");
   res.header('Access-Control-Allow-Headers', "*");
   next();
 });
 
 // * Rotas abertas
 app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//  app.use('/', index);
 // ! Rotas fechadas ( token )
 app.use('/api/executeDb', executeDb);
 app.use('/api/createDb', createDb);
 app.use('/api/insertDb', insertDb);
 app.use('/api/updateApp', updateApp);
 
 module.exports = app;