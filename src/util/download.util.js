"use strict";
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const unzip = require('node-unzip-2');

async function downloadFile() {
  return new Promise((resolve, reject) => {
    console.log('# * DOWNLOAD EM ANDAMENTO - AGUARDE! * #')
    try {

      const file = fs.createWriteStream("Artvendas2.0.zip");
      http.get("https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/arquivoArtvendas%2FupdateApp%2FArtvendas2.0.zip?alt=media&token=c9c64e54-dc52-4739-a8b8-c9fce32e168a", function (response) {
        response.pipe(file);
        // after download completed close filestream
        file.on("finish", async () => {
          file.close();
          console.log("# * DOWNLOAD CONCLUIDO! * #");
          resolve('');
        });
      });

    } catch (error) {
      reject('Não foi possível encontrar o Artvendas para Download!')
    }

  });
}

async function exctratFile() {
  console.log('# * EXTRAINDO ARQUIVO! * #');
  return fs.createReadStream('Artvendas2.0.zip').pipe(unzip.Extract({ path: '.' }));
}

module.exports = { downloadFile, exctratFile };
