/** Log Service
 * @author Starley Cazorla
 *
 * Service of logger and start logs
*/

const fs = require('fs');
const { getDir, deleteFile } = require('../util/folders.util');
const util = require('util');
const winston = require('winston');

/** Local datetime */
let dataHoje = new Date();
let dataHoraLocal = dataHoje.toLocaleDateString('pt-BR') + ' ' + dataHoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

/** Logs */
const startLogService = () => {
  deleteFile(getDir() + '/logServer.txt');
  let logFile = fs.createWriteStream(getDir() + `/logServer.txt`, { flags: 'a' });
  let logStdout = process.stdout;
  console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\t ⏱ ' + dataHoraLocal + '\n');
  }
  console.log(' # * 📜 📜 📜 START LOG SERVICE ' + dataHoraLocal + ' 📜 📜 📜 * #');
  console.error = console.log;
  /** Fim Log */
}

/**
 * Create a logger with winston for errors on apps
 * @param {*} logName
 * @returns
 */
function createLogger(logName) {
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logName }),
    ],
  });

  return logger
}

module.exports = { startLogService, createLogger }
