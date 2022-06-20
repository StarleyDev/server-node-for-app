// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const downloadFile = require('../util/download.util');

exports.post = async (req, res, next) => {
};

exports.put = (req, res, next) => {

};

exports.get = (req, res, next) => {
    downloadFile().then(retorno => {
        res.send(retorno);
    }).catch(error => {
        res.status(400).send('Não foi possível realizar o download do arquivo!')
    });
};
