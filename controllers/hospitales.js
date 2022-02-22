const { response, request } = require("express");
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

const actualizarHospital = async (req = request, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
