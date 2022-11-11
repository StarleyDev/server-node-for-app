// Para uso de atutenticação com JWT
let jwt = require('jsonwebtoken');
const { environment } = require('./../config/environment');

function verifyJWT(req, res, next) {

  let token = req.headers['x-access-token'];

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
  let token = jwt.sign({ vendedorId }, environment.SECRET, {
    expiresIn: 30000 // expires in 50min
  });
  return token;
}

module.exports = { verifyJWT, getToken };