// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { downloadFile, exctratFile } = require('../../services/download/download.service');
const { deletarPasta } = require('../../util/folders.util');

const APP_CONFIG_DEFAULT = require('./../../config/app-config.js');

exports.get = (req, res, next) => {
    console.log('\n# * --- INICIO DE ATUALIZAÇÃO --- * #');
    deletarPasta('www');
    downloadFile(APP_CONFIG_DEFAULT.urlDownloadArtvendas, APP_CONFIG_DEFAULT.txtDownloadArtvendas).finally(() => {
        exctratFile(APP_CONFIG_DEFAULT.txtDownloadArtvendas).finally(() => {
            console.log('# * ARQUIVO EXTRAIDO! * #');
            console.log('# * --- FIM DE ATUALIZAÇÃO --- * #');
            console.log('\n# * APLICAÇÃO PRONTA PARA USO! * #\n');
            res.send({ statusAtualizacao: 'Atualizado!' });
        }).catch(error => {
            console.log("🚀 ~ file: updateApp-controller.js ~ line 28 ~ exctratFile ~ error", error)
            res.status(400).send('Não foi possível extrair o arquivo!')
        });
    }).catch(error => {
        console.log("🚀 ~ file: updateApp-controller.js ~ line 32 ~ downloadFile ~ error", error)
        res.status(400).send('Não foi possível realizar o download do arquivo!')
    });
};
