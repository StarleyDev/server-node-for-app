const fs = require('fs');
const { getDir } = require('./../util/folders.util');
const util = require('util');
/** Local datetime */
let dataHoje = new Date();
let dataHoraLocal = dataHoje.toLocaleDateString('pt-BR') + ' ' + dataHoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

/** Logs */
const startLogService = () => {

  let logFile = fs.createWriteStream(getDir() + `/logServer.txt`, { flags: 'a' });
  let logStdout = process.stdout;
  console.log = function () {
    logFile.write(util.format.apply(null, arguments) + ' ' + dataHoraLocal + '\n');
    logStdout.write(util.format.apply(null, arguments) + ' ' + dataHoraLocal + '\n');
  }
  console.log('# * 📜 📜 📜 START LOG SERVICE 📜 📜 📜 * #');
  console.error = console.log;
  /** Fim Log */
}

module.exports = startLogService 