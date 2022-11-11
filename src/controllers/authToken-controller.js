// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { getToken } = require('../services/jwt-service.js');
const { environment } = require('./../config/environment.js');

exports.post = async (req, res, next) => {
    let vendedorLogado;
    let chunks = [];
    let chaveSecreta;

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        vendedorLogado = JSON.parse(data).vendedorLogado;
        chaveSecreta = JSON.parse(data).chaveSecreta;

        /** Se não tiver a chave secreta corespondente não ira retornar o token */
        if (chaveSecreta === environment.SECRET) {
            getToken(vendedorLogado).then(retorno => {
                res.send([{ token: retorno }]);
            }).catch(error => {
                res.send({ message: `Não pegar o token! ${error}`, retorno: false });
            })
        } else {
            res.status(400).send({ message: `Está faltando o segredo do cadeado! Ou a chave esta errada! :( )`, retorno: false });
        }

    });

};
