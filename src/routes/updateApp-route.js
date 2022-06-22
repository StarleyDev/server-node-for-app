// Para download de atualização
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/arquivo-controller/updateApp-controller');

router.get('/', controller.get)

module.exports = router;