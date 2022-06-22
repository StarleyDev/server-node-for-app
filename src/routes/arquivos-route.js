// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const arquivoImgController = require('../controllers/arquivo-controller/arquivoImg-controller');

router.get('/getImg', arquivoImgController.get)
router.post('/saveImg', arquivoImgController.post);


module.exports = router;