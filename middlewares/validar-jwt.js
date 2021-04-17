const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token invalido! - usuario no existe'
      });
    }

    // Validar estado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token invalido! - usuario fue borrado'
      });
    }
    req.usuario = usuario;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      msg: 'Token invalido!'
    });
  }
}

module.exports = {
  validarJWT
}
