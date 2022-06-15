// Criptografia e descriptografia de dados
/**
 * @author Starley Cazorla
 */
var CryptoJS = require("crypto-js");


/**
 * Descriptografar dados
 * @param {*} body 
 */
export function decrypt(body) {
  // console.log(' ----> ',body);
  var bytes = CryptoJS.AES.decrypt(body, 'SuaChaveAqui');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  // console.log('Sql Original:', originalText)
  return originalText;
}