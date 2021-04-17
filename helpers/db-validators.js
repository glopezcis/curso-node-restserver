const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El Role ${role} no existe en la BD`);
  }
}

// Verificar si el email existe
const emailExiste = async(correo = '') => {
  const res = await Usuario.findOne({ correo });
  if (res) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
}

// Verificar si ID existe
const existeUsuarioPorId = async(id) => {
  const res = await Usuario.findById(id);
  if (!res) {
    throw new Error(`El ID ${id} no existe`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}
