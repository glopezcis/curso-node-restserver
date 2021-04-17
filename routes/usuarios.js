const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
} = require('../controllers/usuarios');

const router = new Router();

router.get('/', usuariosGet);

router.post('/', [
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  check('password', 'El password es requerido y >= 6 caracteres').isLength({min: 6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  //check('role', 'Role no válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('role').custom(esRoleValido),
  validarCampos
], usuariosPut);

router.patch('/:id', usuariosPatch);

router.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],usuariosDelete);

module.exports = router;
