const { response } = require('express');
const { generarJWT } = require("../helpers/generar-jwt");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async (req, res = response) => {

  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      // crear usuario
      const data = {
        nombre,
        correo,
        img,
        password: ':P',
        google: true
      }

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario bloqueado'
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Token de Google no válido!');
  }
}

module.exports = {
  login,
  googleSignin
}
