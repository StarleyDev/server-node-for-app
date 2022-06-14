var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'
exports.post = async (req, res, next) => {
    try {
        let sqlRecebida = '';
        let chunks = [];

        await req.on('data', async function (data) {
            chunks.push(data);
        }).on('end', async function () {

            let data = Buffer.concat(chunks);
            sqlRecebida = JSON.parse(data).todo;
            console.log('Sql Recebida /createDb ---> ', sqlRecebida)
            const DBSOURCE = sqlRecebida;

            new sqlite3.Database(DBSOURCE, (err) => {
                if (err) {
                    // Cannot open database
                    console.error(err.message)
                    res.status(400).json({ "error": err.message });
                    throw err
                } else {
                    console.log('Connected to the SQLite --->', DBSOURCE);
                    res.send({ sucesso: 'Base criada/conectada com suceso!' });
                }
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

