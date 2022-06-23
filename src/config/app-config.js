let configServer = {
  urlDownloadArtvendas: "https://firebasestorage.googleapis.com/v0/b/art-vendas-mobile.appspot.com/o/arquivoArtvendas%2FupdateApp%2FArtvendas2.0.zip?alt=media&token=c9c64e54-dc52-4739-a8b8-c9fce32e168a",
  txtDownloadArtvendas: "Artvendas2.0.zip"
};

let APP_CONFIG_DEFAULT = configServer;

APP_CONFIG_DEFAULT['versionServer'] = '2.0.1';
APP_CONFIG_DEFAULT['dataRelease'] = '23/06/2022';

module.exports = APP_CONFIG_DEFAULT;