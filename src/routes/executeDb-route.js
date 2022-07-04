// Gerencia rotas de execução em banco de dados
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const { verifyJWT } = require('./../services/jwt-service');

/** Criação de banco de dados */
const createController = require('../controllers/db-controller/create-controller');
router.post('/create', verifyJWT, createController.post);

/** Execução de consultas SQL em geral */
const executeController = require('../controllers/db-controller/execute-controller');
router.post('/execute', verifyJWT, executeController.post);

/** Execução de inserts */
const insertController = require('../controllers/db-controller/insert-controller');
router.post('/insert', verifyJWT, insertController.post);

module.exports = router;