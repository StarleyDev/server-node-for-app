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
const { downloadFile, exctratFile } = require('../controllers/download/services/download.service');

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
 # *      Version: 2.0.0 - Data Update: 21/06/2022       * #
 # *                   Licença: GPLv3                    * #
 # *                                                     * #
 # * Autor: Starley Cazorla                              * #
 # * Link: https://github.com/StarleyDev/node-for-sqlite * #
 # *                                                     * #
 # ******************************************************* #
 # *             API Rodando na porta:  ${port}             * #
 # ******************************************************* #
 `);

/** Projeto em angular  */
let existeArtvendas = checkFile(process.cwd() + '/www/index.html');
if (!existeArtvendas) {
    downloadFile(APP_CONFIG_DEFAULT.urlDownloadArtvendas, APP_CONFIG_DEFAULT.txtDownloadArtvendas).finally(() => {
        exctratFile(APP_CONFIG_DEFAULT.txtDownloadArtvendas).then(result => {
            if(result){
                console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
            }
            // abrirNavegador();
        });
    });
} else {
    console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
    // abrirNavegador();
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


// function abrirNavegador() {
//     const readline = require('readline');
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     rl.question('# * DESEJA ABRIR O NAVEGADOR? (s/n) * #', function (name) {
//         if (name === 'S' || name === 's') {
//             console.log('# * ABRINDO * #');
//             open(`http://localhost:${port}`);
//         } else {
//             console.log('# * CONTINUAR SEM NAVEGADOR * #');
//             rl.close();
//         }
//     });
// }

