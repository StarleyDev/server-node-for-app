// Configuração sevidor
/**
 * @author Starley Cazorla
 */
'use sctict'

const app = require('../app')
const http = require('http');
const express = require('express');
const debug = require('debug')('balta:server');
const { checkFile, getDir } = require('./../util/folders.util');
const { downloadFile, exctratFile } = require('./../services/download/download.service');
const checkUpdateServer = require('./../services/download/update-server.service');

const APP_CONFIG_DEFAULT = require('../config/app-config.js');

// Instancia de api
const port = nomalizePort(process.env.PORT || '1255'); // Chava a função para validar a porta
app.set('port', port);

globalPort = port;

const server = http.createServer(app);

// Chamando metodos
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.warn(`\n
 # ******************************************************* #
 # *                                                     * #
 # *                    SERVER NODEJS                    * #
 # *                                                     * #
 # *      Version: ${APP_CONFIG_DEFAULT.versionServer} - Data Update: ${APP_CONFIG_DEFAULT.dataRelease}       * #
 # *                   Licença: GPLv3                    * #
 # *                                                     * #
 # * Autor: Starley Cazorla                              * #
 # * https://github.com/StarleyDev/server-node-for-app   * #
 # *                                                     * #
 # ******************************************************* #
 # *             API Rodando na porta:  ${port}             * #
 # ******************************************************* #
 `);

/** Projeto em angular  */
var env = process.argv[2] || 'prod';
switch (env) {
    case 'dev':
        // Setup development config
        console.log('\n# * DEVELOPER MODE * #\n');
        console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');

        break;
    case 'prod':

        checkUpdateServer().finally(() => {
            // Setup production config
            let existeProjeto = checkFile(process.cwd() + '/www/index.html');
            if (!existeProjeto) {
                downloadFile(APP_CONFIG_DEFAULT.urlDownloadAngularProject, APP_CONFIG_DEFAULT.txtDownloadAngularProject).finally(() => {
                    exctratFile(APP_CONFIG_DEFAULT.txtDownloadAngularProject).then(result => {
                        if (result) {
                            console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
                        }
                    });
                });
            } else {
                console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
            }
        });

        break;
}

app.use('/', express.static(getDir() + '/www'));
app.get('/', function (req, res) {
    res.sendFile(getDir() + '/www/index.html');
});

/**
 * Normaliando porta de conexão
 * @param {*} val 
 */
function nomalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Erro de conexao
 * @param {*} error 
 */
function onError(error) {
    // if (error.syscall !== 'listem') {
    //     console.log(error)
    // }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requer privilegios elevados!');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' já está em uso!');
            process.env.PORT = process.env.PORT + 2
            process.exit(1);
            break;

        default:
            throw error;
    }
}

/**
 * Função para ficar escutando a porta
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ', + bind);
}


