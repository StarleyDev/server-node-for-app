"use strict";
const http = require('https'); // or 'https' for https:// URLs
const enviroment = require('./../../config/enviroment');
const APP_CONFIG_DEFAULT = require('./../../config/app-config.js');
const { downloadFile, exctratFile } = require('./download.service');

/**
 * Para download de arquivos
 * @returns 
 */
async function checkUpdateServer() {
  return new Promise((resolve, reject) => {
    try {

      http.get(enviroment.serverConfig, function (res) {
        var body = '';

        res.on('data', function (chunk) {
          body += chunk;
        }).on('end', function () {
          var retornoJson = JSON.parse(body);
          let dadosServer = retornoJson.nodeServer[0];

          if (parseInt(APP_CONFIG_DEFAULT.versionServer.replace('.', '')) === parseInt(dadosServer.versionServer.replace('.', ''))) {
            console.log('# * NOVA VERSÃO ' + dadosServer.versionServer + ' DISPONÍVEL * #');

            downloadFile(dadosServer.linkServer, dadosServer.nomeServer).finally(() => {
              exctratFile(dadosServer.nomeServer).then(result => {
                if (result) {
                  console.log('\n# * NOVO SERVIDOR DISPONÍVEL! * #\n');
                  resolve('OK');
                }
              });
            });
          } else {
            resolve('OK');
          }

        });
      }).on('error', function (e) {
        console.log("Got an error: ", e);
      });

    } catch (error) {
      reject('Não foi possível encontrar arquivo de atualização!');
    }

  });
}


module.exports = checkUpdateServer;
