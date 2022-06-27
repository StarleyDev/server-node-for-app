// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvarArquivo, checkFile, criarPasta, deletarPasta } = require('../../util/folders.util');
const { downloadFile } = require('./../../services/download/download.service');
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
        console.log('# * SALVANDO ARQUIVO - AGUARDE! * #')
        await salvarArquivo(`arquivos_${vendedorLogado}/${nomePasta}/${nomeArquivo}`, buf, tipoOperacao).finally(() => {
            console.log("# * ARQUIVO SALVO COM SUCESSO! * #");
            res.status(201).send('Download arquivo!')
        }).catch(error => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });

    });

};

exports.saveByUrl = async (req, res, next) => {

    let urlArquivo, nomeArquivo;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        urlArquivo = JSON.parse(data).urlArquivo;
        nomeArquivo = JSON.parse(data).nomeArquivo;

        downloadFile(urlArquivo, `arquivos_${nomeArquivo}`).finally(() => {
            res.send({ statusAtualizacao: 'Atualizado!' });
        }).catch(() => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });
    });
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

/** Cria ou apaga pastas */
exports.updateFolder = async (req, res, next) => {
    let caminhoPasta, tipoOperacao;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        caminhoPasta = JSON.parse(data).caminhoPasta;
        tipoOperacao = JSON.parse(data).tipoOperacao;

        try {
            if (tipoOperacao === 'criarPasta') {
                criarPasta(`arquivos_${caminhoPasta}`);
                res.send({ status: 'Pasta criada!' });
            }
            if (tipoOperacao === 'deletarPasta') {
                deletarPasta(`arquivos_${caminhoPasta}`);
                res.send({ status: 'Pasta apagada!' });
            }

        } catch (error) {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        }
    });

};

