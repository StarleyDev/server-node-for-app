// Gerencia rotas de execução em banco de dados
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

/** Criação de banco de dados */
const createDb = require('../controllers/db-controller/createDb-controller');
/** Execução de consultas SQL em geral */
const executeDb = require('../controllers/db-controller/executeDb-controller');
/** Execução de inserts */
const insertDb = require('../controllers/db-controller/insertDb-controller');

router.post('/create', createDb.post);
router.post('/execute', executeDb.post);
router.post('/insert', insertDb.post);

module.exports = router;