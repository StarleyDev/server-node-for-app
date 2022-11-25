'use sctict'
const fs = require('fs');
const { checkFile, getDir } = require('./../util/folders.util');
const { defaultConfigServer } = require('../config/environment');
const axios = require('axios');

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
    let retornoDados = JSON.parse(rawdata);
    retornoDados['cliente'] = await getClientDataByLicenceKey(retornoDados.cnpj);
    if (isConfigDb) return retornoDados.configDatabase;
    return retornoDados;
  }
}

/** Busca dados na api lambda */
async function getClientDataByLicenceKey(cnpj) {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(`https://1pjdh2o11d.execute-api.sa-east-1.amazonaws.com/check-key/${cnpj}`)
        .then((response) => {
          let dados = response.data.Item ? response.data : undefined;
          resolve(dados);
        }).catch((e) => {
          reject('Erro ao consultar api!')
          console.error(e)
        })
    } catch (error) {
      console.log("🚀 Erro ao buscar dados da API ", error)
    }
  });
}


module.exports = getConfigServer;