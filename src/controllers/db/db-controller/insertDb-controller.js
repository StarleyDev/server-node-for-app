// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'
const checkDbInUse = require("../database.js");
const insertMultiplos = require("../service/insertMultiplos.js");
const insertUnique = require("../service/insertUnique");

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
            // console.log("🚀 ~ dbForUse", dbForUse)
            // console.log("🚀 ~ file: insertDb-controller.js ~ line 21 ~ sqlRecebida", sqlRecebida)
            let existeError = false;
            let dbInUse = checkDbInUse(dbForUse);

            let isArray = Array.isArray(sqlRecebida); // Verifica se é array;
            if (sqlRecebida.length > 1 && isArray) {
                console.log('# * START INSERT MULTIPLOS # *')

                await insertMultiplos(sqlRecebida, dbInUse).finally(() => {
                    res.send({ insertId: sqlRecebida.length });
                }).catch(error => {
                    res.send({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
                });

                console.log('# * END INSERT MULTIPLOS # *\n')

            } else if (sqlRecebida[0] && isArray) {
                console.log('# * START INSERT UNICO[0] # *')

                await insertUnique(sqlRecebida[0], dbInUse).then(data => {
                    res.send(data);
                }).catch(error => {
                    res.send({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
                });

                console.log('# * END INSERT UNICO[0] # *\n')
            } else {
                console.log('# * START INSERT UNICO # *')

                await insertUnique(sqlRecebida, dbInUse).then(data => {
                    res.send(data);
                }).catch(error => {
                    res.send({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
                });

                console.log('# * END INSERT UNICO # *\n')
            }
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
