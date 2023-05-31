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
const { checkFile, getDir, getListOfApplication, createFolder } = require('./../util/folders.util');
const { downloadFile, exctratFile } = require('./../services/download/download.service');
const APP_CONFIG_DEFAULT = require('../config/app-config.js');
const { environment } = require('../config/environment');
const getConfigServer = require('./../config/config-server');
const startLogService = require('./../config/log-service');
const path = require('path');

const certificadoOption = {};

getConfigServer(false).then(async res => {
    startLogService();
    createFolder('Aplicacoes');
    createFolder('CertificadoSSL');

    /** Check portas da aplicação */
    let port = nomalizePort(res.serverPortDefaultHttp); // porta http
    let portHttps = nomalizePort(res.serverPortDefaultHttps); // porta https
    let serverHttps, serverHttp;

    /** Conexões HTTP */
    serverHttp = http.createServer(app);
    serverHttp.listen(port);
    serverHttp.on('error', onError);
    serverHttp.on('listening', onListening);

    /** Conexões HTTPs */
    if (res.usaHttps && checkFile(__dirname + '/CertificadoSSL/certKey.key')) {
        certificadoOption = {
            key: fs.readFileSync(__dirname + '/CertificadoSSL/certKey.key'),
            cert: fs.readFileSync(__dirname + '/CertificadoSSL/certificado.pem'),
            passphrase: environment.pwsSecuritySsl
        };

        serverHttps = https.createServer(certificadoOption, app);
        serverHttps.listen(portHttps);
        serverHttps.on('error', onErrorHttps);
        serverHttps.on('listening', onListeningHttps);
    }

    /** Define a hora limite de execução na versão de testes */
    let dataHoje = new Date();
    let dataHoraLocal = `${dataHoje.getHours() + 1}:${dataHoje.getMinutes()}`;

    console.clear();
    console.log(`
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
 # * API Rodando na porta: 🔓 http: ${port}
 # * API Rodando na porta: 🔐 https: ${checkFile(__dirname + '/CertificadoSSL/certKey.key') ? portHttps : 'Certificado SSL não encontrado'}
 # * 
 # * VERSÃO: ${APP_CONFIG_DEFAULT.versionServer} - ${APP_CONFIG_DEFAULT.dataRelease} - MIT
 # *
 # * Desenvolvido por: <a href="https://github.com/StarleyDev" target=”_blank”>Starley Cazorla</a> - starlleycom@gmail.com
 # * <a href="https://github.com/StarleyDev/server-node-for-app.git" target=”_blank”>Projeto - Link GitHub</a>
 # * 
 # **************************************************************************
 `);

    getListOfApplication(getDir() + '/Aplicacoes').then(folderApplication => {
        if (folderApplication) {

            console.log('\n\n # * 🚀 🚀 🚀 Aplicações disponiveis  🚀 🚀 🚀\n');

            for (const subFolder of folderApplication) {
                portHttps += 1;

                const appNext = express();
                appNext.use(express.static(path.join(getDir() + '/applications', subFolder)));

                serverHttps = https.createServer(certificadoOption, appNext);
                serverHttps.listen(portHttps);
                serverHttps.on('error', onErrorHttps);
                serverHttps.on('listening', onListeningHttps);

                console.group();
                console.log(' # * 📡 <a href="' + res.urlServer + ':' + portHttps + '/" target=”_blank” >' + subFolder + '</a>');
                console.log(' # * 🚪 PORTA:' + portHttps + '\n');
                console.groupEnd();
            }
        } else {
            console.log('\n\n # * 🙈 🙉 🙊 Sem aplicações disponiveis 🙊 🙉 🙈 \n');
        }
        startLogHtml();
    });

    /** Projeto em angular  */
    let env = process.argv[2] || 'prod';
    switch (env) {
        case 'dev':
            // Setup development config
            console.log('\n # * 🤖 DEVELOPER MODE 🤖 * #');
            console.log('\n # * ✅ SERVIDOR PRONTO PARA USO! ✅ * #');
            break;
        case 'prod':
            // Setup production config
            let existeProjeto = checkFile(process.cwd() + '/www/index.html');
            if (!existeProjeto) {
                if (res.urlDownloadAngularProject === null) return console.log('\n\n# * 🚧 SERVIDOR PRONTO PARA USO! 🚧 * #');

                downloadFile(res.urlDownloadAngularProject, res.txtDownloadAngularProject).finally(() => {
                    exctratFile(res.txtDownloadAngularProject).then(result => {
                        if (result) {
                            console.log('\n # * ✅ SERVIDOR COM APLICAÇÃO PRONTA PARA USO! ✅ * #');
                        }
                    });
                });
            } else {
                console.log('\n # * ✅ SERVIDOR COM APLICAÇÃO PRONTA PARA USO! ✅ * #');
            }
            break;

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

function startLogHtml() {
    const filePath = getDir() + '/logServer.txt';
    app.get('/', (req, res) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const fileContent = data;
            res.send(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>S-NODE MJ</title>
          </head>
          <body>
            <pre>${fileContent}</pre>
          </body>
          </html>
        `);
        });
    });
}


