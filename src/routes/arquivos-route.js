// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

/** Arquivos de imagem */
const arquivoImgController = require('../controllers/arquivo-controller/arquivoImg-controller');
router.get('/getImg', arquivoImgController.get)
router.post('/saveImg', arquivoImgController.post);

/** Arquivos gerais */
const arquivoGeralController = require('../controllers/arquivo-controller/arquivoGeral-controller');
router.get('/getFile', arquivoGeralController.get)
router.post('/saveFile', arquivoGeralController.post);
router.post('/saveByUrl', arquivoGeralController.saveByUrl);
router.post('/updateFolder', arquivoGeralController.updateFolder);

module.exports = router;