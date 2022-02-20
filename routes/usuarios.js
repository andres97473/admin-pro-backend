/*
 * Ruta: /api/usuarios
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUser,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  actualizarUsuarios
);

router.delete("/:id", validarJWT, borrarUser);

module.exports = router;
