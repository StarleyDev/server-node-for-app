
/**
 * Save in file logs recived
 * @author Starley Cazorla
 */
'use sctict'
const { checkFile } = require('../util/folders.util');
let path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

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

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks).toString('utf8'); // Convert buffer to string
        const logData = JSON.parse(data);

        if (logData.logs) {
            // Log the received log data
            logger.error(logData.logs, { date: localDateTime });
            res.send([{ status: `Log salvo com sucesso!` }]);
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
    const filePath = 'error.log';
    let arquivoEncontrado = checkFile(filePath);
    if (arquivoEncontrado) {
        res.set({
            "Content-Disposition": `attachment; filename=${filePath}`
        });
        res.sendFile(path.resolve(filePath));
    } else {
        res.status(400).send('Não foi possível localizar o arquivo!');
    }
}
