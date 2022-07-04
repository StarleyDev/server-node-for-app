// Para uso de atutenticação com JWT
var jwt = require('jsonwebtoken');
const environment = require('./../config/enviroment');

function verifyJWT(req, res, next) {

  var token = req.headers['x-access-token'];

  if (!token)
    return res.status(401).json({ auth: false, message: 'Nenhum token adicionado.' });

  jwt.verify(token, environment.SECRET, function (err, decoded) {
    if (err)
      return res.status(401).json({ auth: false, message: 'Falha na autenticação do token!' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

async function getToken(vendedorId) {
  var token = jwt.sign({ vendedorId }, environment.SECRET, {
    expiresIn: 30000 // expires in 50min
  });
  return token;
}

module.exports = { verifyJWT, getToken };