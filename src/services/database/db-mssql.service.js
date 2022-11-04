const { poolPromise } = require('../../config/db-config/db-mssql-config');

/**
 * Executa consultas via SQL generico
 * @param {*} sqlRecebida 
 * @returns 
 */
async function executeMssqlQuery(sqlRecebida) {
  console.log("🚀 ~ file: db-mssql.service.js ~ line 9 ~ executeMssqlQuery ~ sqlRecebida", sqlRecebida)
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(sqlRecebida);
      if (result) {
        resolve(result.recordset)
      } else {
        reject({ "error": 'Não foi possivel fazer a sua consulta!' });
      }
    } catch (error) {
      console.log("🚀 ~ file: db-mssql.service.js ~ line 20 ~ returnnewPromise ~ error", error)
      reject({ "error": 'Não foi possivel fazer a sua consulta!' });
    }

  });
}

/**
 * Executa consultas via SQL generico
 * @param {*} sqlRecebida 
 * @returns 
 */
 async function insertMssqlQuery(sqlRecebida) {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input(sqlRecebida);
      if (result) {
        resolve(result.recordset)
      } else {
        reject({ "error": 'Não foi possivel fazer a sua consulta!' });
      }
    } catch (error) {
      reject({ "error": 'Não foi possivel fazer a sua consulta!' });
    }

  });
}

module.exports = { executeMssqlQuery, insertMssqlQuery };


