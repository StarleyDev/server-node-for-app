// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const arquivoImg = require('../controllers/arquivo-controller/arquivoImg-controller');

router.get('/getImg', arquivoImg.get)
router.post('/saveImg', arquivoImg.post);


module.exports = router;