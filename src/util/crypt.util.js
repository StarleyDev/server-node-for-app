let CryptoJS = require("crypto-js");
const environment = require('./../config/environment.js');

/**
 * Descriptografar dados
 * @author Starley Cazorla
 * @param {*} stringSql 
 */
async function decrypt(stringSql) {
  try {
    let bytes = CryptoJS.AES.decrypt(stringSql, environment.SECRET);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return stringSql;
  }
}

module.exports = { decrypt }