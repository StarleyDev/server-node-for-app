// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { downloadFile, exctratFile } = require('../../services/download/download.service');
const { deletarPasta } = require('../../util/folders.util');

const APP_CONFIG_DEFAULT = require('./../../config/app-config.js');

exports.get = (req, res, next) => {

    /** Caso for uma versão beta */
    let updateBeta = req.query['updateBeta'] === undefined ? false : req.query['updateBeta'];

    console.log('\n# * --- INICIO DE ATUALIZAÇÃO --- * #');
    downloadFile(updateBeta ? APP_CONFIG_DEFAULT.urlDownloadAngularProjectBeta : APP_CONFIG_DEFAULT.urlDownloadAngularProject, APP_CONFIG_DEFAULT.txtDownloadAngularProject).finally(() => {
        deletarPasta('www');
        exctratFile(APP_CONFIG_DEFAULT.txtDownloadAngularProject).finally(() => {
            console.log('# * ARQUIVO EXTRAIDO! * #');
            console.log('# * --- FIM DE ATUALIZAÇÃO --- * #');
            console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
            res.send({ statusAtualizacao: 'Atualizado!' });
        }).catch(error => {
            console.log("🚀 ~ exctratFile", error)
            res.status(400).send('Não foi possível extrair o arquivo!')
        });
    }).catch(error => {
        console.log("🚀 ~ downloadFile", error)
        res.status(400).send('Não foi possível realizar o download do arquivo!')
    });
};
