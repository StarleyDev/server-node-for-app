// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { getToken } = require('../services/jwt-service.js');
const enviroment = require('./../config/enviroment.js');

exports.post = async (req, res, next) => {
    let vendedorLogado;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        vendedorLogado = JSON.parse(data).vendedorLogado;
        chaveSecreta = JSON.parse(data).chaveSecreta;

        /** Se não tiver a chave secreta corespondente não ira retornar o token */
        if (chaveSecreta === enviroment.SECRET) {
            console.log('vendedorLogado ---> ', vendedorLogado)
            getToken(vendedorLogado).then(retorno => {
                console.log("🚀 ~ file: authToken-controller.js ~ line 21 ~ getToken ~ retorno", retorno)
                res.send([{ token: retorno }]);
            }).catch(error => {
                res.send({ message: `Não pegar o token! ${error}`, retorno: false });
            })
        } else {
            res.status(400).send({ message: `Está faltando o segredo do cadeado! Ou a chave esta errada! :( )`, retorno: false });
        }

    });


};
