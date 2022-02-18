require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Crear el servidor express
const app = express();

// Configurar cors
app.use(cors());

// Base de datos
dbConnection();

// Crear rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

// Levnatar servidor express
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
