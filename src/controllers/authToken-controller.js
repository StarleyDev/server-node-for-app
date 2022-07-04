// UpdateApp
/**
 * @author Starley Cazorla
 */
'use sctict'

const { getToken } = require('../services/jwt-service.js');

exports.post = async (req, res, next) => {
    let vendedorLogado;
    let chunks = [];

    await req.on('data', async function (data) {
        chunks.push(data);
    }).on('end', async function () {

        let data = Buffer.concat(chunks);
        vendedorLogado = JSON.parse(data).vendedorLogado
        console.log('vendedorLogado ---> ', vendedorLogado)
        getToken(vendedorLogado).then(retorno => {
            console.log("🚀 ~ file: authToken-controller.js ~ line 21 ~ getToken ~ retorno", retorno)
            res.send([{ token: retorno }]);
        }).catch(error => {
            res.send({ message: `Não pegar o token! ${error}`, retorno: false });
        })

    });


};
