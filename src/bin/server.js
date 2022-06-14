// Configuração sevidor
/**
 * @author Starley Cazorla
 */
'use sctict'

const app = require('../app')
const http = require('http');
// const https = require('https');
const fs = require('fs');
const debug = require('debug')('balta:server');

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
 # *******************************************************
 # *                                                     *
 # *             SERVER NODEJS FOR SQLITE DB             *
 # *                                                     *
 # *      Version: 1.0.0 - Data Update: 21/05/2022       *
 # *                   Licença: GPL v3                   *
 # *                                                     *
 # * Autor: Starley Cazorla                              *  
 # * Link: https://github.com/StarleyDev/node-for-sqlite *
 # *                                                     *
 # *******************************************************
 # *             API Rodando na porta:  ${port}             *
 # *******************************************************
 `);

 /** Projeto em angular  */
const express = require('express');
const path = require('path');
app.use('/', express.static(getDir() + '/www'));
app.get('/', function(req, res) {
    res.sendFile(getDir() + '/www/index.html');
});

// Using a function to set default app path
function getDir() {
    if (process.pkg) {
        return path.resolve(process.execPath + "/..");
    } else {
        return path.join(require.main ? require.main.path : process.cwd());
    }
}


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



