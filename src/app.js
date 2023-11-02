/**
 * Configuração do servidor
 * @author Starley Cazorla
 */

'use sctict'

let express = require('express');
let app = express()
const morgan = require('morgan');
const winston = require('winston');
// Documentação do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// ? Index de rotas
const executeDb = require('./routes/executeDb-route') // Para uso de executar em banco de dados
const updateApp = require('./routes/updateApp-route') // Para uso de atualizao de aplicação
const files = require('./routes/arquivos-route') // Para uso de gerenciamento de arquivos
const authToken = require('./routes/authToken-route') // Para uso de gerenciamento de arquivos
const logs = require('./routes/logs-route') // Para captura de logs do app

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
});

morgan.token('remote-addr', function (req) {
  return (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
});


// Configuração do logger do Winston
const newLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/access.log' }), // Salva os logs de acesso
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: { write: (message) => newLogger.info(message.trim()) } }
  )
);

// * Rotas abertas
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/authToken', authToken);

// ! Rotas fechadas
app.use('/api/executeDb', executeDb);
app.use('/api/updateApp', updateApp);
app.use('/api/files', files);
app.use('/logs', logs);

module.exports = app;
