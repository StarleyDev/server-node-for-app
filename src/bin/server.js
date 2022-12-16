// Configuração sevidor
/**
 * @author Starley Cazorla
 */
'use sctict'

const app = require('../app');
const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');
const debug = require('debug')('balta:server');
const { checkFile, getDir } = require('./../util/folders.util');
const { downloadFile, exctratFile } = require('./../services/download/download.service');
const APP_CONFIG_DEFAULT = require('../config/app-config.js');
const { environment } = require('../config/environment');
const getConfigServer = require('./../config/config-server');
const startLogService = require('./../config/log-service');

getConfigServer(false).then(res => {
    startLogService();
    /** Check portas da aplicação */
    const port = nomalizePort(res.serverPortDefaultHttp); // porta http
    const portHttps = nomalizePort(res.serverPortDefaultHttps); // porta https
    let serverHttps, serverHttp;

    /** Conexões HTTP */
    serverHttp = http.createServer(app);
    serverHttp.listen(port);
    serverHttp.on('error', onError);
    serverHttp.on('listening', onListening);

    /** Conexões HTTPs */
    if (res.usaHttps) {
        const options = {
            key: fs.readFileSync(__dirname + '/CertificadoSSL/server.enc.key'),
            cert: fs.readFileSync(__dirname + '/CertificadoSSL/server.csr'),
            passphrase: environment.pwsSecuritySsl
        };

        serverHttps = https.createServer(options, app);
        serverHttps.listen(portHttps);
        serverHttps.on('error', onErrorHttps);
        serverHttps.on('listening', onListeningHttps);
    }

    /** Define a hora limite de execução na versão de testes */
    let dataHoje = new Date();
    let dataHoraLocal = `${dataHoje.getHours() + 1}:${dataHoje.getMinutes()}`;

    console.clear();
    console.log(`\n\n 
 #
 #  ███████╗      ███╗   ██╗ ██████╗ ██████╗ ███████╗    ███╗   ███╗     ██╗
 #  ██╔════╝      ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ████╗ ████║     ██║
 #  ███████╗█████╗██╔██╗ ██║██║   ██║██║  ██║█████╗      ██╔████╔██║     ██║
 #  ╚════██║╚════╝██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██   ██║
 #  ███████║      ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║╚█████╔╝
 #  ╚══════╝      ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝ ╚════╝ 
 #
 # **************************************************************************
 # * 
 # * RAZÃO SOCIAL: ${res.cliente ? res.cliente.Item.razaoSocial : 'NÃO ENCONTRADO'}
 # * CNPJ: ${res.cliente ? res.cliente.Item.id.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : '00.000.000/0000-00'}
 # * 
 # * CHAVE DO PRODUTO: ${res.cliente ? res.cliente.Item.secret : 'VERSÃO DE TESTE ACABA AS ' + dataHoraLocal + ' H'}
 # * 
 # * API Rodando na porta: 🔓 http: ${port}
 # * API Rodando na porta: 🔐 https: ${portHttps}
 # * 
 # * VERSÃO: ${APP_CONFIG_DEFAULT.versionServer} - ${APP_CONFIG_DEFAULT.dataRelease}
 # *
 # * Desenvolvido por: MESTRE JEDI - snode.mestrejedi.dev
 # **************************************************************************
 #`);

    /** Projeto em angular  */
    let env = process.argv[2] || 'prod';
    switch (env) {
        case 'dev':
            // Setup development config
            console.log('\n\n# * 🤖 DEVELOPER MODE 🤖 * #');
            console.log('\n\n# * ✅ SERVIDOR PRONTO PARA USO! ✅ * #');
            break;
        case 'prod':
            // Setup production config
            let existeProjeto = checkFile(process.cwd() + '/www/index.html');
            if (!existeProjeto) {
                if (res.urlDownloadAngularProject === null) return console.log('\n\n# * 🚧 SERVIDOR PRONTO PARA USO! 🚧 * #');

                downloadFile(res.urlDownloadAngularProject, res.txtDownloadAngularProject).finally(() => {
                    exctratFile(res.txtDownloadAngularProject).then(result => {
                        if (result) {
                            console.log('\n\n# * ✅ SERVIDOR COM APLICAÇÃO PRONTA PARA USO! ✅ * #');
                        }
                    });
                });
            } else {
                console.log('\n\n# * ✅ SERVIDOR COM APLICAÇÃO PRONTA PARA USO! ✅ * #');
            }
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
     * Função para ficar escutando a porta http
     */
    function onListening() {
        /** Http */
        const addr = serverHttp.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ', + bind);
    }


    /**
     * Erro de conexao
     * @param {*} error 
     */
    function onErrorHttps(error) {
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
     * Função para ficar escutando a porta https
     */
    function onListeningHttps() {
        const addr = serverHttps.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ', + bind);

    }
});


