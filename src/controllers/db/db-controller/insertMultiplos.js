
function insertMultiplos(sqlRecebida, dbInUse) {
  return new Promise((resolve, reject) => {

    for (const item of sqlRecebida) {
      dbInUse.exec(item, async function (err) {
        if (err) {
          console.log('MULTIPLOS ERROR -->', err);
          existeError = true;
          reject(err);
        }
      });
    }
    resolve('Inserido');

  });
}

module.exports = insertMultiplos;


