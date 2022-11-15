const environment = {
  "SECRET": "rit4lin4+dev-distr5c40",
  "usaHttps": true,
  "pwsSecuritySsl": "Ssl.$t.@2"
};

const defaultConfigServer = `{
  "urlDownloadAngularProject": "https://www.starley.dev/download.zip",
  "urlDownloadAngularProjectBeta": "https://www.starley.dev/downloadBeta.zip",
  "txtDownloadAngularProject": "www.zip",
  "serverConfig": "https://starley.dev",
  "serverPortDefaultHttp": 1255,
    "serverPortDefaultHttps": 1256,
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