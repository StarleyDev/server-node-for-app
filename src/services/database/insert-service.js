var dbForUse;

/**
 * Inserção de batch
 * @param {*} sqlRecebida 
 * @param {*} dbInUse 
 * @returns 
 */
function insertMultiplos(sqlRecebida, dbInUse) {
  return new Promise((resolve, reject) => {
    dbForUse = dbInUse;
    dbInUse.runBatchAsync(sqlRecebida, dbInUse).then(() => {
      console.log("SUCCESS!");
      resolve('Inserido');
    }).catch(err => {
      console.error("BATCH FAILED: " + err);
      resolve(err);
    });

  });

}

const sqlite3 = require('sqlite3').verbose();
sqlite3.Database.prototype.runAsync = function (sql, ...params) {
  return new Promise((resolve, reject) => {
    this.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
};

/** Execução de bacth */
sqlite3.Database.prototype.runBatchAsync = function (statements, db) {
  var results = [];
  var batch = ['BEGIN', ...statements, 'COMMIT'];
  return batch.reduce((chain, statement) => chain.then(result => {
    results.push(result);
    return db.runAsync(...[].concat(statement));
  }), Promise.resolve())
    .catch(err => db.runAsync('ROLLBACK').then(() => Promise.reject(err +
      ' in statement #' + results.length)))
    .then(() => results.slice(2));
};

/**
 * Inserção unica de reguistros
 * @param {*} sqlRecebida 
 * @param {*} dbInUse 
 * @returns 
 */
function insertUnico(sqlRecebida, dbInUse) {
  return new Promise((resolve, reject) => {

    dbInUse.run(sqlRecebida, async function (err) {
      if (null == err) {
        // row inserted successfully
        console.log(this.lastID);
        resolve({ insertId: this.lastID });
      } else {
        //Oops something went wrong
        console.log('UNICO ERROR -->', err);
        reject({ message: `Não conseguimos realizar a consulta!!! ${err}`, retorno: false })
      }
    });

  });
}

module.exports = { insertMultiplos, insertUnico };


