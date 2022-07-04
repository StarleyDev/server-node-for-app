// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const { verifyJWT } = require('./../services/jwt-service');

/** Arquivos de imagem */
const arquivoImgController = require('../controllers/arquivo-controller/arquivoImg-controller');
router.get('/getImg', arquivoImgController.get)
router.post('/saveImg', verifyJWT, arquivoImgController.post);

/** Arquivos gerais */
const arquivoGeralController = require('../controllers/arquivo-controller/arquivoGeral-controller');
router.get('/getFile', arquivoGeralController.get)
router.post('/saveFile', verifyJWT, arquivoGeralController.post);
router.post('/saveByUrl', verifyJWT, arquivoGeralController.saveByUrl);
router.post('/updateFolder', verifyJWT, arquivoGeralController.updateFolder);

module.exports = router;