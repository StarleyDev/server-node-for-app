// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { downloadFile, exctratFile } = require('../../services/download/download.service');
const { deleteFolder, checkFile, getDir } = require('../../util/folders.util');
const fs = require('fs');
const { defaultConfigServer } = require('../../config/environment');

/**
 * Verifica se existe configuração, caso não ira buscar uma padrao de testes
 * @returns 
 */
function getConfigServer() {
    let existFileConfig = checkFile(getDir() + '/serverConfig.json');
    if (existFileConfig) {
        let rawdata = fs.readFileSync(getDir() + '/serverConfig.json');
        let config = JSON.parse(rawdata);
        return config;
    } else {
        return JSON.parse(defaultConfigServer);
    }
}

exports.get = async (req, res, next) => {
    /** Caso for uma versão beta */
    const updateBeta = await req.query['updateBeta'] === undefined ? 'no' : req.query['updateBeta'];

    /** Pega dados da configuração mais atualizados! */
    let configServer = getConfigServer();

    if (configServer.urlDownloadAngularProject === null) return res.status(400).send('Url de donwload inexistente!');
    console.log('\n# * 🚀 🚀 🚀 INICIO DE ATUALIZAÇÃO 🚀 🚀 🚀 * #');
    downloadFile(updateBeta === 'yes' ? configServer.urlDownloadAngularProjectBeta : configServer.urlDownloadAngularProject, configServer.txtDownloadAngularProject).then(async (data) => {
        if (data) {
            await deleteFolder('www');
            await exctratFile(configServer.txtDownloadAngularProject).finally(() => {
                console.log('# * 🎉 ARQUIVO EXTRAIDO! * #');
                console.log('# * 🎊 🎊 🎊 FIM DE ATUALIZAÇÃO 🎊 🎊 🎊 * #');
                console.log('\n# * ✅ APLICAÇÃO PRONTA PARA USO! ✅ * #\n');
                res.send({ statusAtualizacao: `Atualizado! Versão ${updateBeta === 'yes' ? 'BETA!' : 'PRODUÇÃO!'}` });
            }).catch(() => {
                res.status(400).send('Não foi possível extrair o arquivo!')
            });
        } else {
            res.status(400).send('Não foi possível fazer o download do arquivo!')
        }
    }).catch((err) => {
        console.log("\n# * ❌ NÃO FOI POSSÍVEL PROCESSAR O DOWNLOAD * #", err);
        res.status(400).send('Ops! Houve um erro ao processar do download!')
    });
};
