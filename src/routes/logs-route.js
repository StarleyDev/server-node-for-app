// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

/** Arquivos de imagem */
const logsController = require('../controllers/logs.controller');
router.post('/send-log', logsController.post)
router.get('/get-log/:appName', logsController.get)


module.exports = router;
