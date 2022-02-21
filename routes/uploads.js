/* 
    ruta: api/upload/
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, retornaImagen } = require("../controllers/uploads");

const router = Router();

// iniciar la carga de archivos
router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);
router.get("/:tipo/:foto", validarJWT, retornaImagen);

module.exports = router;
