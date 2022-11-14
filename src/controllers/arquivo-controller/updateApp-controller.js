// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { downloadFile, exctratFile } = require('../../services/download/download.service');
const { deleteFolder } = require('../../util/folders.util');

const APP_CONFIG_DEFAULT = require('./../../config/app-config.js');

exports.get = (req, res, next) => {
    /** Caso for uma versão beta */
    let updateBeta = req.query['updateBeta'] === undefined ? false : req.query['updateBeta'];

    console.log('\n# * --- INICIO DE ATUALIZAÇÃO --- * #');
    downloadFile(updateBeta ? APP_CONFIG_DEFAULT.urlDownloadAngularProjectBeta : APP_CONFIG_DEFAULT.urlDownloadAngularProject, APP_CONFIG_DEFAULT.txtDownloadAngularProject).then(async (data) => {
        if (data) {
            await deleteFolder('www');
            await exctratFile(APP_CONFIG_DEFAULT.txtDownloadAngularProject).finally(() => {
                console.log('# * ARQUIVO EXTRAIDO! * #');
                console.log('# * --- FIM DE ATUALIZAÇÃO --- * #');
                console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
                res.send({ statusAtualizacao: 'Atualizado!' });
            }).catch(() => {
                res.status(400).send('Não foi possível extrair o arquivo!')
            });
        } else {
            res.status(400).send('Não foi possível fazer o download do arquivo!')
        }
    }).catch((err) => {
        console.log("\n# * NÃO FOI POSSÍVEL PROCESSAR O DOWNLOAD * #", err);
        res.status(400).send('Ops! Houve um erro ao processar do download!')
    });
};
