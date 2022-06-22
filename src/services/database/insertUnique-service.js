
function insertUnique(sqlRecebida, dbInUse) {
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

module.exports = insertUnique;


