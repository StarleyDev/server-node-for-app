// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvaImagens, checkFile } = require('../../util/folders.util');
var path = require('path');

exports.post = async (req, res, next) => {
    let nomePasta, nomeArquivo, arquivo, vendedorLogado, isPrincipal;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        nomePasta = JSON.parse(data).nomePasta;
        nomeArquivo = JSON.parse(data).nomeArquivo;
        arquivo = JSON.parse(data).arquivo;
        isPrincipal = JSON.parse(data).isPrincipal
        vendedorLogado = JSON.parse(data).vendedorLogado
        // console.log('Aquivo Recebido ---> ', nomeArquivo)
        await salvaImagens(`arquivos_${vendedorLogado}/${nomePasta}/`, nomeArquivo, arquivo, isPrincipal).then(() => {
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

