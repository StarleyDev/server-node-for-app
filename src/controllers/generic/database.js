var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

let dbInUse;
let lastDbInUse = '';

function checkDbInUse(nomeDb) {

  if (lastDbInUse != nomeDb) {
    return dbInUse = new sqlite3.Database(nomeDb, (err) => {
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