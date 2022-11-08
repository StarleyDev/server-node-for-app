const { poolPromise } = require('../../config/db-config/db-mssql-config');

/**
 * Executa consultas via SQL generico
 * @param {*} sqlRecebida 
 * @returns 
 */
async function executeMssqlQuery(sqlRecebida) {
  // console.log("🚀🚀 - QUERY - 🚀🚀", sqlRecebida)
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(sqlRecebida);
      if (result) {
        resolve(result.recordset)
      } else {
        reject({ "error": 'Não foi possivel fazer o insert!' });
      }
    } catch (error) {
      console.log("🚀 ~ file: db-mssql.service.js ~ line 20 ~ returnnewPromise ~ error", error)
      reject({ "error": 'Não foi possivel fazer o insert!' });
    }

  });
}

/**
 * Executa consultas via SQL generico
 * @param {*} sqlRecebida 
 * @returns 
 */
async function insertMssqlQuery(sqlRecebida) {
  // console.log("🚀🚀 - INSERT - 🚀🚀", sqlRecebida)
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(sqlRecebida + ' SELECT @@IDENTITY AS lastID');
      if (result) {
        resolve(result.recordset)
      } else {
        reject({ "error": 'Não foi possivel fazer o insert!' });
      }
    } catch (error) {
      console.log("🚀 ~ Error insert -->", error.info.message)
      reject({ "error": 'Não foi possivel fazer o insert!' });
    }

  });
}

module.exports = { executeMssqlQuery, insertMssqlQuery };


