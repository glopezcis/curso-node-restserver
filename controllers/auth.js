const { response } = require('express');
const { generarJWT } = require("../helpers/generar-jwt");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

  try {
    const { correo, password } = req.body;

    // Validar email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ msg: 'Error login - correo'});
    }

    // Validar estado
    if (!usuario.estado) {
      return res.status(400).json({ msg: 'Error login - estado'});
    }

    // Validar password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Error login - password'});
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      token,
      usuario
    })
  } catch (e) {
    console.log('error', e);
    return res.status(500).json('Error interno del servidor');
  }
}

module.exports = {
  login
}
