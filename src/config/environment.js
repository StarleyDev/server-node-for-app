const environment = {
  "SECRET": "rit4lin4+dev-distr5c40",
};

const defaultConfigServer = `{
  "urlDownloadAngularProject": "https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/arquivoArtvendas%2FupdateApp%2Fwww.zip?alt=media&token=c9c64e54-dc52-4739-a8b8-c9fce32e168a",
  "urlDownloadAngularProjectBeta": "https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/arquivoArtvendas%2FupdateApp%2Fwww.zip?alt=media&token=c9c64e54-dc52-4739-a8b8-c9fce32e168a",
  "txtDownloadAngularProject": "www.zip",
  "serverConfig": "https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/checarArquivoJson%2Fbr.com.afv.artvendas.json?alt=media&token=85e0f034-8423-42cb-a96b-5aa6fda7da10",
  "serverPortDefaultHttp": 1255,
  "serverPortDefaultHttps": 1256,
  "usaHttps": false,
  "pwsSecuritySsl": "Ssl.$t.@2",
  "licenseKey": "ASWRW73-TECW6CZ-GQG4SAY",
  "razaoSocial": "ARTNEW TECNOLOGIA EM INFORMATICA LTDA",
  "cnpj": "08.630.018/0001-89",
  "configDatabase": {
      "user": "yourUser",
      "password": "yousrPass",
      "server": "yourIp",
      "database": "yourDb",
      "port": 1433,
      "options": {
        "trustedConnection": false,
        "encrypt": false,
        "enableArithAbort": false,
        "trustServerCertificate": false
      }
    }
}`;

module.exports = { environment, defaultConfigServer };