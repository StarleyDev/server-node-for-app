// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'

const checkDbInUse = require("../../config/database-config");
const { executeSqlQuerie } = require('../../services/database/database-service');

exports.post = async (req, res, next) => {
    try {
        let sqlRecebida = '';
        let dbForUse = '';
        let chunks = [];

        await req.on('data', async function (data) {
            chunks.push(data);
        }).on('end', async function () {

            let data = Buffer.concat(chunks);
            sqlRecebida = JSON.parse(data).todo;
            dbForUse = JSON.parse(data).dbForUse;
            // console.log('Sql Recebida /executeDb ---> ', sqlRecebida)

            let dbInUse = checkDbInUse(dbForUse);
            // console.log('# * START SQL QUERIE # *')
            await executeSqlQuerie(sqlRecebida, dbInUse).then(data => {
                // console.log("SUCCESS!")
                res.send(data);
            }).catch(err => {
                res.status(400).json({ "error": err.message });
            });

            // console.log('# * END SQL QUERIE # *\n')
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
