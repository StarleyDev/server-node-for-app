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
    if (isConfigDb) return JSON.parse(defaultConfigServer).configDatabase;
    return JSON.parse(defaultConfigServer);
  } else {
    let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
    if (isConfigDb) return JSON.parse(rawdata).configDatabase;
    return JSON.parse(rawdata);
  }
}

module.exports = getConfigServer;