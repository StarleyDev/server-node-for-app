// Configuração Rotas
/**
 * @author Starley Cazorla
 */

'use sctict'

const express = require('express');
const router = express.Router();

var path = require("path");

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router;