// Excução de inserts
/**
 * @author Starley Cazorla
 */
'use sctict'
const { checkDbInUse } = require("../../config/database-config");
const { insertMultiplos, insertUnico } = require("../../services/database/database-service");

exports.post = async (req, res) => {
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
            let dbInUse = checkDbInUse(dbForUse);

            let isArray = Array.isArray(sqlRecebida); // Verifica se é array;
            if (sqlRecebida.length > 1 && isArray) {
                // console.log('# * START INSERT MULTIPLOS # *')

                await insertMultiplos(sqlRecebida, dbInUse).then(() => {
                    res.send({ insertId: sqlRecebida.length });
                }).catch(error => {
                    res.status(400).send({ message: `${error}`, retorno: false });
                });

                // console.log('# * END INSERT MULTIPLOS # *\n')

            } else if (sqlRecebida[0] && isArray) {
                // console.log('# * START INSERT UNICO[0] # *')

                await insertUnico(sqlRecebida[0], dbInUse).then(data => {
                    res.send(data);
                }).catch(error => {
                    res.send({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
                });

                // console.log('# * END INSERT UNICO[0] # *\n')
            } else {
                // console.log('# * START INSERT UNICO # *')

                await insertUnico(sqlRecebida, dbInUse).then(data => {
                    res.send(data);
                }).catch(error => {
                    res.send({ message: `Não conseguimos inserir!!! ${error}`, retorno: false });
                });

                // console.log('# * END INSERT UNICO # *\n')
            }
        });

    } catch (error) {
        res.send({ message: `Não conseguimos realizar a consulta!!! ${error}`, retorno: false });
    }
};
