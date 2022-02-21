// getTodo
const { response } = require("express");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  // crear expresion regular para que la busqueda sea insensible
  const regex = new RegExp(busqueda, "i");

  // buscar por expresion regular
  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    // cantidad de resultados de usuarios
    // resultUsuarios: usuarios.length,
    usuarios,
    hospitales,
    medicos,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );

      break;
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla no existe",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
