// Configuração Rotas de criação de banco de dados
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/db-controller/createDb-controller');

router.get('/', controller.get)
router.post('/', controller.post);
router.put('/:id', controller.put);

module.exports = router;