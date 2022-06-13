// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'
const checkDbInUse = require("./database.js");

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
                console.log('------------------ START INSERT MULTIPLOS ------------------')

                for (const item of sqlRecebida) {
                    await dbInUse.exec(item, async function (err) {
                        // console.log("🚀 ~ item", item)
                        if (err) {
                            console.log('MULTIPLOS ERROR -->', err);
                            existeError = true;
                        }
                    });
                    if (existeError) {
                        break;
                    }
                }

                console.log('------------------ END INSERT MULTIPLOS ---> ' + sqlRecebida.length + ' ------------------')
                res.send({ insertId: 0 });
            } else if (sqlRecebida[0] && isArray) {
                console.log('------------------ START INSERT UNICO[0] ------------------')
                await dbInUse.exec(sqlRecebida[0], async function (err) {
                    if (null == err) {
                        // row inserted successfully
                        console.log(this.lastID);
                        res.send({ insertId: this.lastID });
                    } else {
                        //Oops something went wrong
                        console.log('UNICO[0] ERROR -->', err);
                        res.send({ message: `Não conseguimos realizar a consulta!!! ${err}`, retorno: false });
                    }
                });
                console.log('------------------ END INSERT UNICO[0] ---> ' + sqlRecebida.length + ' ------------------')
            } else {
                console.log('------------------ START INSERT UNICO ------------------')
                await dbInUse.run(sqlRecebida, async function (err) {
                    if (null == err) {
                        // row inserted successfully
                        console.log(this.lastID);
                        res.send({ insertId: this.lastID });
                    } else {
                        //Oops something went wrong
                        console.log('UNICO ERROR -->', err);
                        res.send({ message: `Não conseguimos realizar a consulta!!! ${err}`, retorno: false });
                    }
                });
                console.log('------------------ END INSERT UNICO ------------------')
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
