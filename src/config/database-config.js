var sqlite3 = require('sqlite3').verbose()

let dbInUse;
exports.dbInUse = dbInUse;
let lastDbInUse = '';

function checkDbInUse(nomeDb) {

  if (lastDbInUse != nomeDb) {

    var mySubString = nomeDb.substring(
      nomeDb.indexOf("") + 0,
      nomeDb.lastIndexOf("_nxsinter")
    );

    return dbInUse = new sqlite3.Database(`arquivos_${mySubString}/database/${nomeDb}`, (err) => {
      if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
      } else {
        console.log('Connected to:', nomeDb);
        lastDbInUse = nomeDb;
      }
    });
  } else {
    return dbInUse;
  }
}

module.exports = checkDbInUse;