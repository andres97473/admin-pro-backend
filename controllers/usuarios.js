const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.json({
    ok: true,
    usuarios,
    // se puede obtener del req los parametros q se defina
    // uid: req.uid,
  });
};

const crearUsuarios = async (req, res = response) => {
  //   console.log(req.body);

  const { password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "EL correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // TODO: token
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      msg: "Usuario registrado",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revisar logs ",
    });
  }
};

const actualizarUsuarios = async (req, res = response) => {
  // TODO: Validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUser,
};