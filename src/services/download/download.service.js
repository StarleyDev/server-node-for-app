"use strict";
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const unzip = require('node-unzip-2');

/**
 * Para download de arquivos
 * @param {*} url 
 * @param {*} fileFolder 
 * @returns 
 */
async function downloadFile(url, fileFolder) {
  return new Promise((resolve, reject) => {
    console.log('# * 📥 INICIANDO DOWNLOAD - AGUARDE! * #')
    try {
      
      const file = fs.createWriteStream(fileFolder);
      http.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", async () => {
          file.close();
          console.log("# * 📦 DOWNLOAD CONCLUIDO! * #");
          resolve(true);
        });
      });

    } catch (error) {
      console.log('# * ❌ OPS! ERRO AO FAZER DOWNLOAD * #')
      reject(false)
    }

  });
}

/**
 * Para extração de arquivos
 * @param {*} fileFolder 
 * @returns 
 */
async function exctratFile(fileFolder) {
  console.log('# * 🗜  EXTRAINDO ARQUIVO! * #');
  let arquivoExtraido = true;
  try {
    fs.createReadStream(fileFolder).pipe(unzip.Extract({ path: '.' }));
    console.log('# * 🎉 ARQUIVO EXTRAIDO COM SUCESSO! * #');
  } catch (error) {
    console.log("# * ❌ ERRO AO EXTRAIR ARQUIVO * #", error);
    arquivoExtraido = false;
  }

  return arquivoExtraido;
}

module.exports = { downloadFile, exctratFile };
