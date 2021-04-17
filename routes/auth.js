const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = new Router();

router.post('/login', [
  check('correo', 'El correo no es válido').isEmail(),
  check('correo', 'El correo es requerido').not().isEmpty(),
  check('password', 'El password es requerido').not().isEmpty(),
  validarCampos
],login);

module.exports = router;
