/**
 * Serviço responsavel por gerenciar em qual banco de dados o serviço ira se executar;
 * Funções basicas de consulta, inserção e inicialização!
 * ! instanceDb - Nome do banco de dados a ser usado
 * @author Starley Cazorla
 */

let sqlite3 = require('sqlite3').verbose();
const { startMySqlServer } = require("../../config/db-config/db-mssql-config");
const { checkDbInUse } = require("../../config/db-config/db-sqlite-config");
const { executeSQLiteQuery } = require('../../services/database/db-sqlite.service');
const { executeMssqlQuery, insertMssqlQuery } = require('../../services/database/db-mssql.service');
const { insertMultiplos, insertUnico } = require("../../services/database/db-sqlite.service");
/**
 * Verifica e inializa o banco de dados
 * @author Starley Cazorla
 * @param {*} instanceDb 
 * @param {*} userIdentify 
 * @param {*} DBSOURCE 
 * @returns 
 */
async function selectInstanceForStart(instanceDb, userIdentify, DBSOURCE) {
  return new Promise(async (resolve, reject) => {
    switch (instanceDb) {
      case 'sqlServer':
        await startMySqlServer().then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
        break
      case 'sqlite':
        new sqlite3.Database(`arquivos_${userIdentify}/database/${DBSOURCE}`, (err) => {
          if (err) {
            reject(err);
            throw err
          } else {
            resolve('Ok');
          }
        });
        break
    }
  });

}

/**
 * Execulta consultas via query
 * @author Starley Cazorla
 * @param {*} instanceDb 
 * @param {*} sqlRecebida 
 * @param {*} dbForUse 
 * @returns 
 */
async function executeInstanceService(instanceDb, sqlRecebida, dbForUse) {
  return new Promise(async (resolve, reject) => {
    switch (instanceDb) {
      case 'sqlServer':
        await executeMssqlQuery(sqlRecebida).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
        break
      case 'sqlite':
        let dbInUse = checkDbInUse(dbForUse);
        await executeSQLiteQuery(sqlRecebida, dbInUse).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
        break
    }
  });
}

/**
 * Executa o insert dos dados no banco de dados
 * @author Starley Cazorla
 * @param {*} instanceDb 
 * @param {*} sqlRecebida 
 * @param {*} dbForUse 
 * @returns 
 */
async function insertInstanceService(instanceDb, sqlRecebida, dbForUse) {
  return new Promise(async (resolve, reject) => {
    switch (instanceDb) {
      case 'sqlServer':
        await insertMssqlQuery(sqlRecebida).then(data => {
          resolve({ insertId: data[0].lastID });
        }).catch(error => {
          console.log("🚀 ~ Erro insert --> ", error)
          reject(error);
        });
        break
      case 'sqlite':
        let dbInUse = checkDbInUse(dbForUse);

        let isArray = Array.isArray(sqlRecebida); // Verifica se é array;
        if (sqlRecebida.length > 1 && isArray) {
          await insertMultiplos(sqlRecebida, dbInUse).then(() => {
            resolve({ insertId: sqlRecebida.length });
          }).catch(error => {
            resolve({ message: `${error}`, retorno: false });
          });
        } else {
          await insertUnico(sqlRecebida[0] && isArray ? sqlRecebida[0] : sqlRecebida, dbInUse).then(data => {
            resolve(data);
          }).catch(error => {
            resolve({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
          });
        }
        break
      default:
        resolve(null);
        break
    }
  });
}

module.exports = { selectInstanceForStart, executeInstanceService, insertInstanceService }