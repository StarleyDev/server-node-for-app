// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvarArquivo, checkFile, getDir } = require('../../util/folders.util');
var path = require('path');

exports.post = async (req, res, next) => {
    let nomePasta, nomeArquivo, arquivo, vendedorLogado, tipoOperacao;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        nomePasta = JSON.parse(data).nomePasta;
        nomeArquivo = JSON.parse(data).nomeArquivo;
        arquivo = JSON.parse(data).arquivo;
        tipoOperacao = JSON.parse(data).tipoOperacao
        vendedorLogado = JSON.parse(data).vendedorLogado

        /** Convertendo arquivo em buffer */
        var buf = Buffer.from(arquivo, 'utf8');

        await salvarArquivo(`arquivos_${vendedorLogado}/${nomePasta}/${nomeArquivo}`, buf, tipoOperacao).finally(() => {
            res.status(201).send('Download arquivo!')
        }).catch(error => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });

    });

};

exports.put = (req, res, next) => {
};

/** Retorna imagem encontrada ou imagem padrao quando nao encontra */
exports.get = (req, res, next) => {
    // console.log('Requisição de arquivo ---> ', req.query['path'])
    let arquivoEncontrado = checkFile(req.query['path']);
    if (arquivoEncontrado) {
        res.sendFile(path.resolve(req.query['path']));
    } else {
        res.status(400).send('Não foi possível localizar o arquivo!');
    }

};

