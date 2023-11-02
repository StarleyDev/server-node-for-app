
/**
 * Save in file logs recived
 * @author Starley Cazorla
 */
'use sctict'
const { checkFile } = require('../util/folders.util');
let path = require('path');
const { createLogger } = require('../services/log-service');

/** Local datetime */
let dateToday = new Date();
let localDateTime = dateToday.toLocaleDateString('pt-BR') + ' ' + dateToday.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

/**
 * Save log file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.post = async (req, res, next) => {
    // Declare the chunks array
    const chunks = [];
    const clientIP = req.ip; 
    console.log(clientIP)

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks).toString('utf8'); // Convert buffer to string
        const logData = JSON.parse(data);

        if (logData.logs) {
            const appName = logData.logs.appName;

            // Validation for appName
            if (!appName || appName.trim() === '') {
                res.status(400).send({ message: `appName and message is required`, retorno: false });
                return;
            }

            let logger = createLogger(`logs/${appName}.log`);
            logger.error(logData.logs, { date: localDateTime, ip: req.socket.remoteAddress });

            res.send({ message: `Log salvo com sucesso!` });
        } else {
            logger.error('Failed to save log');
            res.status(400).send({ message: `Não foi possível salvar o log`, retorno: false });
        }

    });
};

/**
 * Return log file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get = async (req, res, next) => {
    const { appName } = req.params;
    let arquivoEncontrado = checkFile(`logs/${appName}.log`);
    if (arquivoEncontrado) {
        res.set({
            "Content-Disposition": `attachment; filename=${appName}.log`
        });
        res.sendFile(path.resolve(`logs/${appName}.log`));
    } else {
        res.status(400).send('Não foi possível localizar o arquivo!');
    }
}
