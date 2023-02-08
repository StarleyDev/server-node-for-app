/**
 * Retorna TOKEN JWT para conexoes
 * @author Starley Cazorla
 */
'use sctict'

const { getToken } = require('../services/jwt-service.js');
const { environment } = require('./../config/environment.js');

/**
 * Send token to connect to server
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.post = async (req, res, next) => {
    let userIdentify;
    let chunks = [];
    let safeKey;

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        userIdentify = JSON.parse(data).userIdentify;
        safeKey = JSON.parse(data).safeKey;

        /** Se não tiver a chave secreta corespondente não ira retornar o token */
        if (safeKey === environment.SECRET) {
            getToken(userIdentify).then(retorno => {
                res.send([{ token: retorno }]);
            }).catch(error => {
                res.send({ message: `Não pegar o token! ${error}`, retorno: false });
            })
        } else {
            res.status(400).send({ message: `Está faltando o segredo do cadeado! Ou a chave esta errada! :( )`, retorno: false });
        }

    });

};
