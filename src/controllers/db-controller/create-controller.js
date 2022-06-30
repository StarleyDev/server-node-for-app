var sqlite3 = require('sqlite3').verbose();

const externoUtil = require('../../util/folders.util');

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
            // console.log('Sql Recebida /createDb ---> ', sqlRecebida)
            const DBSOURCE = sqlRecebida;

            var mySubString = sqlRecebida.substring(
                sqlRecebida.indexOf("") + 0,
                sqlRecebida.lastIndexOf("_nxsinter")
            );

            /** Criando pastas locais */
            externoUtil.criarPasta(`arquivos_${mySubString}/imgAws`);
            externoUtil.criarPasta(`arquivos_${mySubString}/database`);
            externoUtil.criarPasta(`arquivos_${mySubString}/backup`);
            externoUtil.criarPasta(`arquivos_${mySubString}/relatorios`);
            externoUtil.criarPasta(`arquivos_${mySubString}/download`);

            new sqlite3.Database(`arquivos_${mySubString}/database/${DBSOURCE}`, (err) => {
                if (err) {
                    // Cannot open database
                    console.error(err.message)
                    res.status(400).json({ "error": err.message });
                    throw err
                } else {
                    console.log('# * Connected to: ', DBSOURCE, ' * #');
                    res.send({ sucesso: 'Base criada/conectada com suceso!' });
                }
            });

        });
    } catch (error) {
        res.status(400).send({ message: `${error}`, retorno: false });
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

