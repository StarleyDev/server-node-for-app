'use sctict'
const fs = require('fs');
const { checkFile, getDir } = require('./../util/folders.util');
const { defaultConfigServer } = require('../config/environment');

/**
 * Cria ou recuprear dados da configuração do servidor
 * @returns 
 */
async function getConfigServer(isConfigDb) {
  let existFileConfig = checkFile(getDir() + '/serverConfig.json');
  if (!existFileConfig) {
    let config = fs.createWriteStream(getDir() + `/serverConfig.json`, { flags: 'w' });
    config.write(defaultConfigServer);
    let retornoDados = JSON.parse(defaultConfigServer);
    if (isConfigDb) return retornoDados.configDatabase;
    return retornoDados;
  } else {
    let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
    let retornoDados = JSON.parse(rawdata);
    if (isConfigDb) return retornoDados.configDatabase;
    return retornoDados;
  }
}


module.exports = getConfigServer;