// Configuração Controller Generico
/**
 * @author Starley Cazorla
 */
 'use sctict'

 const checkDbInUse = require("../db/database.js");
 
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
             // console.log('Sql Recebida /executeDb ---> ', sqlRecebida)
             var params = []
 
             let dbInUse = checkDbInUse(dbForUse);
 
             await dbInUse.all(sqlRecebida, params, (err, rows) => {
                 if (err) {
                     res.status(400).json({ "error": err.message });
                     return;
                 } else {
 
                     if (rows.length > 0) {
 
                         let arrys = [];
                         for (const itens of rows) {
                             arrys.push(itens);
                         }
 
                         res.send(rows);
                     } else {
                         res.send([]);
                     }
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
 