"use strict";
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

async function downloadFile() {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream("arquivo");
    const request = http.get("https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/arquivoArtvendas%2FupdateApp%2Fsite.zip?alt=media&token=bc3a5e5c-29fb-4bb7-ba13-8f685f1a30ae", function (response) {
      response.pipe(file);
      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log("Download Completed");
      });
      resolve('Download concluido!')
    });
  });
}

module.exports = downloadFile;
