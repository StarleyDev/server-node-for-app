// Rota de gerenciamento de arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

/** Arquivos de imagem */
const authTokenController = require('../controllers/authToken-controller');
router.post('/', authTokenController.post)

module.exports = router;