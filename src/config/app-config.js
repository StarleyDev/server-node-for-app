/**
 * Enviroment configuration
 * @autor Starley Cazorla
 */

const { environment } = require('./environment')

let configServer = {
  urlDownloadAngularProject: environment.urlDownloadAngularProject,
  urlDownloadAngularProjectBeta: environment.urlDownloadAngularProjectBeta,
  txtDownloadAngularProject: environment.txtDownloadAngularProject
};

let APP_CONFIG_DEFAULT = configServer;

APP_CONFIG_DEFAULT['versionServer'] = '4.0.0';
APP_CONFIG_DEFAULT['dataRelease'] = '24/02/2023';

module.exports = APP_CONFIG_DEFAULT;