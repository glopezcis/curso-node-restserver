const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

  const { limite = 5, desde } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  });
}

const usuariosPost = async (req, res = response) => {

  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  // Encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json(usuario);
}

const usuariosPut = async (req, res = response) => {

  const id = req.params.id;
  const { _id, password, google, correo, ...rest } = req.body;

  // Validar contra BD
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);
  res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

  const id = req.params.id;

  res.json({
    msg: 'patch - API Controller',
    id
  })
}

const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false})
  const usuarioAutenticado = req.usuario;
  res.json(usuario);
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
