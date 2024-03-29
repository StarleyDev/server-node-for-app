const sqlite3 = require('sqlite3').verbose()

let dbInUse;
let lastDbInUse;
exports.dbInUse = dbInUse;

/**
 * Verifica o banco de dados que esta sendo requisitado
 * @param {*} nomeDb
 * @returns
 */
function checkDbInUse(nomeDb) {

  if (lastDbInUse != nomeDb) {

    let userIdentify = nomeDb.substring(
      nomeDb.indexOf("") + 0,
      nomeDb.lastIndexOf("")
    );

    return dbInUse = new sqlite3.Database(`arquivos_${userIdentify}/database/${nomeDb}`, (err) => {
      if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
      } else {
        console.log('# * Connected to: ', nomeDb, ' * #');
        lastDbInUse = nomeDb;
      }
    });
  } else {
    return dbInUse;
  }
}

function restartDb(nomeDb) {
  lastDbInUse = '';
  checkDbInUse(nomeDb);
}

module.exports = { checkDbInUse, restartDb };
