// Configuração Rotas de SQL Insert
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/download/arquivoImg-controller');

router.get('/', controller.get)
router.post('/', controller.post);


module.exports = router;