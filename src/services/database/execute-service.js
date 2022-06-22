
function executeSqlQuerie(sqlRecebida, dbInUse) {
  return new Promise((resolve, reject) => {

    dbInUse.all(sqlRecebida, (err, rows) => {
      if (err) {
        reject({ "error": err.message })
      } else {

        if (rows.length > 0) {
          resolve(rows)
        } else {
          resolve([])
        }
      }

    });

  });
}

module.exports = executeSqlQuerie;


