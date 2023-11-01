// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

/** Arquivos de imagem */
const loggerController = require('../controllers/logger.controller');
router.post('/send-log', loggerController.post)
router.get('/get-log/:appName', loggerController.get)


module.exports = router;
