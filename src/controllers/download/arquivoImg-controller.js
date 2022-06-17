// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { salvaImagens, getPathImg } = require('../../util/folders.util');

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

        if (arquivo != null) {
            // console.log('Aquivo Recebido ---> ', nomeArquivo)
            await salvaImagens(`arquivos_${vendedorLogado}/${nomePasta}/`, nomeArquivo, arquivo, isPrincipal).then(() => {
                res.send();
            }).catch(error => {
                res.status(400).send('Não foi possível realizar o download do arquivo!')
            });
        } else {
            let paths = process.cwd() + `/arquivos_${vendedorLogado}/${nomePasta}/${nomeArquivo}.png`;
            // console.log("🚀 ~ file: arquivoImg-controller.js ~ line 33 ~ paths", paths);
            res.send({ caminhoImg: paths });
        }

    });

};

exports.put = (req, res, next) => {
};

exports.get = (req, res, next) => {
};
