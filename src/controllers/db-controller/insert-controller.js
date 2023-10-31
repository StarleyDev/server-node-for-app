// Excução de inserts
/**
 * @author Starley Cazorla
 */
'use sctict'
const { insertInstanceService } = require("../../services/database/db-instace.service");


exports.post = async (req, res) => {
    try {
        let sqlRecebida = '';
        let dbForUse = '';
        let chunks = [];
        let instanceDb = '';

        await req.on('data', async function (data) {
            chunks.push(data);
        }).on('end', async function () {

            let data = Buffer.concat(chunks);
            sqlRecebida = JSON.parse(data).stringSql;
            dbForUse = JSON.parse(data).dbForUse;
            instanceDb = JSON.parse(data).instanceDb;

            await insertInstanceService(instanceDb === undefined ? 'sqlite' : instanceDb, sqlRecebida, dbForUse).then(data => {
                res.send(data);
            }).catch(error => {
                console.log("🚀 ~ file: insert-controller.js:28 ~ awaitinsertInstanceService ~ error:", error);
                res.status(400).send({ message: `${error}`, retorno: false });
            });

        });

    } catch (error) {
        res.send({ message: `Não conseguimos realizar a consulta!!! ${error}`, retorno: false });
    }
};
