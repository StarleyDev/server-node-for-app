let CryptoJS = require("crypto-js");
const { environment } = require('./../config/environment.js');

/**
 * Descriptografar dados
 * @author Starley Cazorla
 * @param {*} dataToDecrypt 
 */
async function decrypt(dataToDecrypt) {
  try {
    let bytes = CryptoJS.AES.decrypt(dataToDecrypt, environment.SECRET);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return dataToDecrypt;
  }
}

/**
 * Encriptografar dados
 * @author Starley Cazorla
 * @param {*} dataToEncrypt 
 */
async function encrypt(dataToEncrypt) {
  try {
    let dataEncrypt = CryptoJS.AES.encrypt(dataToEncrypt, environment.SECRET).toString();
    return dataEncrypt;
  } catch (error) {
    return dataToEncrypt;
  }
}

module.exports = { decrypt, encrypt }