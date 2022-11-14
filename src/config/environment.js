const environment = {
  "urlDownloadAngularProject": "https://www.starley.dev/download.zip",
  "urlDownloadAngularProjectBeta": "https://www.starley.dev/downloadBeta.zip",
  "txtDownloadAngularProject": "www.zip",
  "serverConfig": "https://starley.dev",
  "SECRET": "rit4lin4+dev-distr5c40",
  "usaHttps": true,
  "pwsSecuritySsl": "Ssl.$t.@2"
};

const configDefaultDatabase = {
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

module.exports = { environment, configDefaultDatabase };