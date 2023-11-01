// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { saveFile, checkFile, createFolder, deleteFolder, deleteFile } = require('../../util/folders.util');
const { downloadFile } = require('./../../services/download/download.service');
const { restartDb } = require('../../config/db-config/db-sqlite-config');
let path = require('path');
const fs = require('fs');
const startLogService = require('../../services/log-service');

exports.post = async (req, res, next) => {
    let folderName, fileName, selectedFile, userIdentify, operationType;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        try {

            let data = Buffer.concat(chunks);
            folderName = JSON.parse(data).folderName;
            fileName = JSON.parse(data).fileName;
            selectedFile = JSON.parse(data).selectedFile;
            operationType = JSON.parse(data).operationType
            userIdentify = JSON.parse(data).userIdentify

            /** Convertendo selectedFile em buffer */
            let buf = Buffer.from(selectedFile, 'utf8');
            console.log('# * SALVANDO ARQUIVO - AGUARDE! * #')
            await saveFile(`arquivos_${userIdentify}/${folderName}/${fileName}`, buf, operationType).finally(() => {
                console.log("# * ARQUIVO SALVO COM SUCESSO! * #");
                res.status(201).send('Download arquivo!')
            }).catch(error => {
                res.status(400).send('Não foi possível realizar o download do arquivo!')
            });

        } catch (error) {
            console.log("🚀 ~ selectedFile: arquivoGeral-controller.js ~ line 41 ~ error", error)
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        }

    });

};

exports.saveByUrl = async (req, res, next) => {

    let fileUrl, fileName;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        fileUrl = JSON.parse(data).fileUrl;
        fileName = JSON.parse(data).fileName;

        downloadFile(fileUrl, `arquivos_${fileName}`).finally(() => {

            /** Ao restaruar um banco de dados ele ira reniciar a conexao */
            if (fileName.match('database')) {
                let userIdentify = fileName.substring(
                    fileName.lastIndexOf("/" + 1)
                );
                restartDb(userIdentify.replace('/', ''));
            }

            res.send({ statusAtualizacao: 'Atualizado!' });
        }).catch(() => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });
    });
};

/** Retorna arquivo encontrado */
exports.get = (req, res, next) => {
    let arquivoEncontrado = checkFile(req.query['filePath']);

    let userIdentify = req.query['filePath'].substring(
        req.query['filePath'].lastIndexOf("/" + 1)
    );

    if (arquivoEncontrado) {
        res.set({
            "Content-Disposition": `attachment; filename=${userIdentify}`
        });
        res.sendFile(path.resolve(req.query['filePath']));
    } else {
        res.status(400).send('Não foi possível localizar o arquivo!');
    }
};

/** Retorna a lista de diretorios e arquivos disponiveis no servidor */
exports.getListDir = async (req, res, next) => {

    let filePath, findFiles
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        filePath = JSON.parse(data).filePath;

        try {
            findFiles = fs.readdirSync(`.${filePath}`, { withFileTypes: true })
                .filter(item => item)
                .map(item => item.name)

            res.send({ findFiles: findFiles, lastPath: filePath });
        } catch (error) {
            let caminho = filePath.substring(1);
            let arquivoEncontrado = checkFile(caminho);
            if (arquivoEncontrado) {
                res.send({ downloadFile: caminho });
            } else {
                res.send({ downloadFile: null });
            }
        }

    });
};

/** Retonar verificando se o arquivo existe */
exports.checkFileInFolder = async (req, res, next) => {
    let fileName;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        fileName = JSON.parse(data).fileName;

        let arquivoEncontrado = checkFile(`arquivos_${fileName}`);
        if (arquivoEncontrado) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
};

/** Cria ou apaga pastas */
exports.updateFolder = async (req, res, next) => {
    let filePath, operationType;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        filePath = JSON.parse(data).filePath;
        operationType = JSON.parse(data).operationType;

        try {
            if (operationType === 'criarPasta') {
                createFolder(`arquivos_${filePath}`);
                res.send({ status: 'Pasta criada!' });
            }
            if (operationType === 'deletarPasta') {
                deleteFolder(`arquivos_${filePath}`);
                res.send({ status: 'Pasta apagada!' });
            }

        } catch (error) {
            res.status(400).send('Erro ao atualizar pasta!')
        }
    });

};

/** Metodo para apagar arquivo */
exports.deleteFile = async (req, res, next) => {

    let filePath = String(req.query['filePath']);
    let arquivoEncontrado = checkFile(filePath);

    if (arquivoEncontrado) {
        try {
            deleteFile(filePath);

            if (filePath.match('logServer.txt') !== null) startLogService();

            res.send({ status: `Arquivo ${filePath} apagado com sucesso!` });
        } catch (error) {
            res.status(400).send('Não foi possível excluir o arquivo! --> ', filePath);
        }
    } else {
        res.status(403).send('Não foi possível localizar o arquivo!');
    }

};
