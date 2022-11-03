// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'
const { executeInstanceService } = require("../../services/database/db-instace.service");

const isSqlServer = false;

exports.post = async (req, res, next) => {
    try {
        let sqlRecebida = '';
        let dbForUse = '';
        let instanceDb = '';
        let chunks = [];

        await req.on('data', async function (data) {
            chunks.push(data);
        }).on('end', async function () {

            let data = Buffer.concat(chunks);
            sqlRecebida = JSON.parse(data).todo;
            dbForUse = JSON.parse(data).dbForUse;
            instanceDb = JSON.parse(data).instanceDb;
            // console.log('Sql Recebida /executeDb ---> ', sqlRecebida)

            await executeInstanceService(instanceDb, sqlRecebida, dbForUse).then(data => {
                res.send(data);
            }).catch(error => {
                res.status(400).send({ message: `${error}`, retorno: false });
            });

        });
    } catch (error) {
        res.send({ message: `Não conseguimos realizar a consulta!!! ${error}`, retorno: false });
    }
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.get = (req, res, next) => {
    console.log('Sql Criptograda ---> ', req)
};
