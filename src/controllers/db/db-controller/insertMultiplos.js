var dbForUse;

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


module.exports = insertMultiplos;


