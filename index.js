require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Crear el servidor express.
const app = express();

// Configurar cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static("public"));

// Crear rutas
// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//     msg: "Hola mundo",
//   });
// });

// rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require("./routes/uploads"));
app.use("/api/login", require("./routes/auth"));

// Publicar proyecto html en la carpeta public
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Levnatar servidor express
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
