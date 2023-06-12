const environment = {
  "SECRET": "rit4lin4+dev-distr5c40",
};

const defaultConfigServer = `{
  "urlDownloadAngularProject": null,
  "urlDownloadAngularProjectBeta": null,
  "txtDownloadAngularProject": "www.zip",
  "serverConfig": null,
  "defaultPort": 80,
  "startPortHttps": 1256,
  "urlServer": "localhost",
  "usaHttps": false,
  "pwsSecuritySsl": "Ssl.$t.@2",
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