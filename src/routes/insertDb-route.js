// Configuração Rotas de SQL Insert
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/db-controller/insertDb-controller');

router.get('/', controller.get)
router.post('/', controller.post);
router.put('/:id', controller.put);
// router.delete('/:id',verifyJWT, controller.delete);


module.exports = router;