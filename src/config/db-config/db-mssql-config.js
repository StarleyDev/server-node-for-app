const sql = require('mssql');
const fs = require('fs');
const { checkFile, getDir } = require('./../../util/folders.util');
const configDefaultDatabase = require('../../config/environment');

/**
 * Verifica se existe configuração, caso não ira buscar uma padrao de testes
 * @returns 
 */
function getConfigServer() {
  let existFileConfig = checkFile(getDir() + '/serverConfig.json');
  if (existFileConfig) {
    let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
    let config = JSON.parse(rawdata);
    return config.configDatabase;
  } else {
    return configDefaultDatabase;
  }
}

/**
 * Inicializa banco de dados
 * @author Starley Cazorla
 * @returns 
 */
function startMySqlServer() {
  return new Promise((resolve) => {
    // try {
    //   return poolPromise = new sql.ConnectionPool(getConfigServer()).connect().then(pool => {
    //     console.log('\n ### Conectado ao SqlServer ### \n');
    resolve('Ok');
    // return pool;
    //   }).catch(err => {
    //     reject(err);
    //   });
    // } catch (error) {
    //   console.log("🚀 Não foi possível inicializar o banco de dados!", error);
    //   reject(error);
    // }
  });
}

const poolPromise = new sql.ConnectionPool(getConfigServer()).connect().then(pool => {
  console.log('\n ### Conectado ao SqlServer ###');
  return pool;
}).catch(() => {
  console.log("\n###  Não há servidor SQL Server disponível! ### ");
});


module.exports = { startMySqlServer, poolPromise };