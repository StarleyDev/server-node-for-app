const sql = require('mssql');
const fs = require('fs');
const { getDir } = require('./../../util/folders.util');

/**
 * Cria ou recupera dados de conexao
 * @returns 
 */
function getConfigServer() {
  let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
  let config = JSON.parse(rawdata);
  return config.configDatabase;
}

/**
 * Inicializa banco de dados
 * @author Starley Cazorla
 * @returns 
 */
function startMySqlServer() {
  return new Promise((resolve, reject) => {
    try {
      return poolPromise = new sql.ConnectionPool(getConfigServer()).connect().then(pool => {
        console.log('\n ### Conectado ao SqlServer ### \n');
        resolve('Ok');
        return pool;
      }).catch(err => {
        reject(err);
      });
    } catch (error) {
      console.log("🚀 Não foi possível inicializar o banco de dados!", error);
      reject(error);
    }
  });
}


module.exports = { startMySqlServer };