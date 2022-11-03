const { poolPromise } = require('../../config/db-config/db-mssql-config');

/**
 * Executa consultas via SQL generico
 * @param {*} sqlRecebida 
 * @returns 
 */
async function executeMssqlQuery(sqlRecebida) {
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
      reject({ "error": 'Não foi possivel fazer a sua consulta!' });
    }

  });
}

module.exports = { executeMssqlQuery };


