// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvaImagens, checkFile, getDir } = require('../../util/folders.util');
let path = require('path');

exports.post = async (req, res, next) => {
    let folderName, fileName, selectedFile, userIdentify, isPrincipal;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        folderName = JSON.parse(data).folderName;
        fileName = JSON.parse(data).fileName;
        selectedFile = JSON.parse(data).selectedFile;
        isPrincipal = JSON.parse(data).isPrincipal
        userIdentify = JSON.parse(data).userIdentify
        // console.log('Aquivo Recebido ---> ', fileName)
        await salvaImagens(`arquivos_${userIdentify}/${folderName}/`, fileName, selectedFile, isPrincipal).then(() => {
            res.send();
        }).catch(error => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });

    });

};

exports.put = (req, res, next) => {
};

/** Retorna imagem encontrada ou imagem padrao quando nao encontra */
exports.get = (req, res, next) => {
    // console.log('Requisição de imagem ---> ', req.query['img'])
    let imgEncontrada = checkFile(req.query['img']);
    if (imgEncontrada) {
        res.sendFile(path.resolve(req.query['img']));
    } else {
        res.sendFile(getDir() + '/www/assets/prodNoImg.jpg');
    }

};

