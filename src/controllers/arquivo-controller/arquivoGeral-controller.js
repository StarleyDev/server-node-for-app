// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvarArquivo, checkFile, criarPasta, deletarPasta } = require('../../util/folders.util');
const { downloadFile } = require('./../../services/download/download.service');
const { restartDb } = require('./../../config/database-config');
var path = require('path');
const fs = require('fs');

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

            /** Ao restaruar um banco de dados ele ira reniciar a conexao */
            if (nomeArquivo.match('database')) {
                var mySubString = nomeArquivo.substring(
                    nomeArquivo.lastIndexOf("/" + 1)
                );
                restartDb(mySubString.replace('/', ''));
            }

            res.send({ statusAtualizacao: 'Atualizado!' });
        }).catch(() => {
            res.status(400).send('Não foi possível realizar o download do arquivo!')
        });
    });
};

/** Retorna arquivo encontrado */
exports.get = (req, res, next) => {
    let arquivoEncontrado = checkFile(req.query['path']);

    var mySubString = req.query['path'].substring(
        req.query['path'].lastIndexOf("/" + 1)
    );

    if (arquivoEncontrado) {
        res.set({
            "Content-Disposition": `attachment; filename=${mySubString}`
        });
        res.sendFile(path.resolve(req.query['path']));
    } else {
        res.status(400).send('Não foi possível localizar o arquivo!');
    }
};

/** Retorna a lista de diretorios e arquivos disponiveis no servidor */
exports.getListDir = async (req, res, next) => {

    let nomePasta, arquivos
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        nomePasta = JSON.parse(data).nomePasta;

        try {
            arquivos = fs.readdirSync(`.${nomePasta}`, { withFileTypes: true })
                .filter(item => item)
                .map(item => item.name)

            res.send({ arquivos: arquivos, lastPath: nomePasta });
        } catch (error) {
            let caminho = nomePasta.substring(1);
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
    let nomeArquivo;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        nomeArquivo = JSON.parse(data).nomeArquivo;

        let arquivoEncontrado = checkFile(`arquivos_${nomeArquivo}`);
        if (arquivoEncontrado) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
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
