const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  // get all hospitales como estan en base de datos
  // const hospital = await Hospital.find();

  // get all hospitales con populate para ver el nombre del usuario que lo creo
  const hospital = await Hospital.find().populate("usuario", "nombre email");
  res.json({
    ok: true,
    hospitales: hospital,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({ usuario: uid, ...req.body });

  // console.log(uid);

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospital",
  });
};

const borrarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarHospital",
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
