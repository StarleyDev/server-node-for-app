
const externoUtil = require('../../util/folders.util');
const { selectInstanceForStart } = require("../../services/database/db-instace.service");
// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
'use sctict'
exports.post = async (req, res, next) => {
    try {
        let sqlRecebida = '';
        let instanceDb = '';
        let chunks = [];

        await req.on('data', async function (data) {
            chunks.push(data);
        }).on('end', async function () {

            let data = Buffer.concat(chunks);
            sqlRecebida = JSON.parse(data).todo;
            instanceDb = JSON.parse(data).instanceDb;
            const DBSOURCE = sqlRecebida;

            let userId = sqlRecebida.substring(
                sqlRecebida.indexOf("") + 0,
                sqlRecebida.lastIndexOf("_nxsinter")
            );

            /** Criando pastas locais */
            externoUtil.criarPasta(`arquivos_${userId}/imgAws`);
            externoUtil.criarPasta(`arquivos_${userId}/database`);
            externoUtil.criarPasta(`arquivos_${userId}/backup`);
            externoUtil.criarPasta(`arquivos_${userId}/relatorios`);
            externoUtil.criarPasta(`arquivos_${userId}/download`);

            await selectInstanceForStart(instanceDb, userId, DBSOURCE).then(data => {
                console.log('# * Connected server: ', data, ' * #');
                res.send({ sucesso: 'Base criada/conectada com suceso!' });
            }).catch(err => {
                console.error(err.message)
                res.status(400).json({ "error": err.message });
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

