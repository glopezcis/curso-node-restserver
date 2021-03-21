const {response} = require('express');

const usuariosGet = (req, res = response) => {

  const {q, nombre='Noname', apikey, page = 1, limit = 10} = req.query;

  res.json({
    msg: 'get - API Controller',
    q, 
    nombre, 
    apikey,
    page,
    limit
  })
}

const usuariosPost = (req, res = response) => {

  const {nombre, edad} = req.body;

  res.json({
    msg: 'post - API Controller',
    nombre,
    edad
  })
}

const usuariosPut = (req, res = response) => {

  const id = req.params.id;

  res.json({
    msg: 'put - API Controller',
    id
  })
}

const usuariosPatch = (req, res = response) => {

  const id = req.params.id;

  res.json({
    msg: 'patch - API Controller',
    id
  })
}

const usuariosDelete = (req, res = response) => {

  const id = req.params.id;

  res.json({
    msg: 'delete - API - Controller',
    id
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}