// Configuração sevidor
/**
 * @author Starley Cazorla
 */
'use sctict'

const app = require('./app');
const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');
const debug = require('debug')('balta:server');
const { checkFile, getDir, getListOfApplication, createFolder } = require('./util/folders.util');
const { downloadFile, exctratFile } = require('./services/download/download.service');
const APP_CONFIG_DEFAULT = require('./config/app-config.js');
const { environment } = require('./config/environment');
const getConfigServer = require('./config/config-server');
const { startLogService } = require('./services/log-service.js');
const path = require('path');
// const network = require('network');

let certificadoOption = null;

getConfigServer(false).then(async res => {
    startLogService();
    createFolder('Aplicacoes');
    createFolder('CertificadoSSL');

    /** Check portas da aplicação */
    let portHttps = nomalizePort(res.portRunApplication); // porta https
    let serverHttps;

    /** Conexões HTTPS ou HTTP */
    if (checkFile(path.join(getDir(), '/CertificadoSSL/privkey.key'))) {
        certificadoOption = {
            // Modelo de certificado key
            key: fs.readFileSync(path.join(getDir(), '/CertificadoSSL/certKey.key')),
            cert: fs.readFileSync(path.join(getDir(), '/CertificadoSSL/certificado.pem')),
            passphrase: environment.pwsSecuritySsl

            // Modelo de certificado pem
            // key: fs.readFileSync(path.join(getDir(), '/CertificadoSSL/privkey.pem')),
            // cert: fs.readFileSync(path.join(getDir(), '/CertificadoSSL/cert.pem')),
            // ca: fs.readFileSync(path.join(getDir(), '/CertificadoSSL/chain.pem')),
        };
    }
    serverHttps = certificadoOption != null ? https.createServer(certificadoOption, app) : http.createServer(app);
    serverHttps.listen(res.serverPort);
    serverHttps.on('error', onErrorHttps);
    serverHttps.on('listening', onListeningHttps);

    /** Define a hora limite de execução na versão de testes */
    let dataHoje = new Date();
    let dataHoraLocal = `${dataHoje.getHours() + 1}:${dataHoje.getMinutes()}`;

    // console.clear();

    // Exemplo de uso
    // const localIP = getLocalIPAddress();
    const externalIp = await getServerIPAddress();
    // console.log("🚀 IP LOCAL DO SERVIDOR ", localIP);
    console.log("🚀 IP EXTERNO DO SERVIDOR ", externalIp)

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
 # * API Rodando na porta: ${checkFile(path.join(getDir(), '/CertificadoSSL/privkey.key')) ? '🔐 https: ' + portHttps : '🔓 http: ' + portHttps + ' -- Certificado SSL não encontrado'}
 # *
 # * VERSÃO: ${APP_CONFIG_DEFAULT.versionServer} - ${APP_CONFIG_DEFAULT.dataRelease} - MIT
 # *
 # * Desenvolvido por: <a href="https://github.com/StarleyDev" target=”_blank” style="color: white;">Starley Cazorla</a> - starlleycom@gmail.com
 # * <a href="https://github.com/StarleyDev/server-node-for-app.git" target=”_blank” style="color: white;">Projeto - Link GitHub</a>
 # *
 # **************************************************************************
 `);

    getListOfApplication(path.join(getDir(), '/Aplicacoes')).then(async folderApplication => {
        if (folderApplication) {

            console.log('\n\n # * 🚀 🚀 🚀 Aplicações disponiveis  🚀 🚀 🚀\n');

            for (const subFolder of folderApplication) {
                portHttps += 1;

                const appNext = express();
                appNext.use(express.static(path.join(getDir(), '/Aplicacoes', subFolder)));

                /** Conexões HTTPS ou HTTP */
                serverHttps = certificadoOption != null ? https.createServer(certificadoOption, appNext) : http.createServer(appNext);
                serverHttps.listen(portHttps);
                serverHttps.on('error', onErrorHttps);
                serverHttps.on('listening', onListeningHttps);

                console.group();
                console.log(' # * 📡 <a href="' + (checkFile(path.join(getDir(), '/CertificadoSSL/privkey.key')) ? 'https://' : 'http://') + await getDefaultIp(res.urlServer) + ':' + portHttps + '/" target=”_blank” style="color: greenyellow; text-transform: uppercase; ">' + subFolder + '</a>');
                console.log(' # * 🚪 PORTA:' + portHttps + ' -- 🛡 ' + (checkFile(path.join(getDir(), '/CertificadoSSL/privkey.key'))) + ' \n');
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
    function onErrorHttps(error) {
        console.log("🚀 ~ file: server.js:152 ~ onErrorHttps ~ error:", error)
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
          <html style="background-color: black;
    color: cyan;">
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

/**
 * Retorna o endereço IP local
 * @returns
 */
// function getLocalIPAddress() {
//     return new Promise((resolve, reject) => {
//         network.get_private_ip((error, ip) => {
//             if (error) {
//                 reject(error);
//             } else {
//               console.log("🚀 ~ file: server.js:222 ~ network.get_private_ip ~ ip:", ip)
//             resolve(ip);
//           }
//         });
//       });
// }

/**
 * Retorna o endereço IP do servidor
 * @returns
 */
async function getServerIPAddress() {
    return new Promise((resolve, reject) => {
        http.get('http://api.ipify.org', (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            console.log("🚀 ~ file: server.js:249 ~ http.get ~ error:", error)
            reject('localhost');
        });
    });
}

/**
 * Pega o endereço IP padrão do servidor a ser utilizado e retorna
 * @param {*} ipServer
 * @returns
 */
async function getDefaultIp(ipServer) {
    return ipServer !== 'localhost' ? ipServer : await getServerIPAddress();
}
