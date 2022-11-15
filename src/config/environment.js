const environment = {
  "SECRET": "rit4lin4+dev-distr5c40",
  "usaHttps": true,
  "pwsSecuritySsl": "Ssl.$t.@2"
};

const defaultConfigServer = `{
    "urlDownloadAngularProject": null,
    "urlDownloadAngularProjectBeta": null,
    "txtDownloadAngularProject": "www.zip",
    "serverConfig": null,
    "serverPortDefaultHttp": 1255,
    "serverPortDefaultHttps": 1256,
    "licenceKey": "LIC3NC3-TR14L",
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