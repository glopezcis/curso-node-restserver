const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Usuario no autenticado'
    });
  }

  const { role, nombre } = req.usuario;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'El usuario no es Administrador'
    });
  }
  next();
}

const tieneRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Usuario no autenticado'
      });
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        msg: `Usuario no autorizado, debe ser: ${roles}`
      })
    }
    next();
  }
}

module.exports = {
  esAdminRole,
  tieneRole
}
