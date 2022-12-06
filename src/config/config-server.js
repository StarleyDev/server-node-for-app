'use sctict'
const fs = require('fs');
const { checkFile, getDir } = require('./../util/folders.util');
const { defaultConfigServer } = require('../config/environment');
const axios = require('axios');
const { encrypt, decrypt } = require('./../util/crypt.util');

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
    retornoDados['cliente'] = await getConfigClient();
    if (isConfigDb) return retornoDados.configDatabase;
    return retornoDados;
  } else {
    let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
    let retornoDados = JSON.parse(rawdata);
    retornoDados['cliente'] = await getConfigClient();
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


async function getClientData() {
  return new Promise(async (resolve) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });


    rl.question(' \n >>> DIGITE O CNPJ PARA ATIVAR O SERVIDOR? ', async function (cnpj) {
      if (cnpj === '123') {
        resolve(false);
        console.log('# * CONTINUAR SEM ATIVAR * #');
        rl.close();
      } else if (cnpj != null && cnpj.length < 14) {
        console.log('\n# * CNPJ INVALIDO * #');
        rl.close();
        await getClientData();
      } else if (cnpj != null && cnpj.length >= 14) {
        console.log('\n# * VERIFICANDO CNPJ INFORMADO * #');
        let retornoDados = await getClientDataByLicenceKey(cnpj);
        if (retornoDados === undefined) {
          console.log('\n# * CNPJ INFORMADO NÃO POSSUI CHAVE DE ATIVAÇÃO! * #');
          rl.close();
          await getClientData();
        } else {
          resolve(retornoDados);
          console.log('\n\n# * CHAVE DE ATIVAÇÃO ADICIONADA * #');
          rl.close();
        }
      }
    });

  });
}

/**
 * Cria ou recuprear dados da configuração do servidor
 * @returns 
 */
async function getConfigClient() {
  return new Promise(async (resolve) => {
    let existFileConfig = checkFile(getDir() + '/hashKey.json');
    if (!existFileConfig) {
      let retornoCliente = await getClientData();
      let encryptData = await encrypt(JSON.stringify(retornoCliente));
      let that = {
        hashKey: encryptData
      }
      let config = fs.createWriteStream(getDir() + `/hashKey.json`, { flags: 'w' });
      config.write(JSON.stringify(that));
      resolve(retornoCliente);
    } else {
      let rawdata = fs.readFileSync(getDir() + '/hashKey.json');
      let decryptData = await decrypt(JSON.parse(rawdata).hashKey);
      resolve(decryptData);
    }
  });
}


module.exports = getConfigServer;