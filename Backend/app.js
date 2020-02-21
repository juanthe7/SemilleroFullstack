//crear servidor- cargamos exprees , peticiones ruta, middlewares

"use strict";

//cargar modulos de node para cargar el servidor
var express = require("express");
var bodyParser = require("body-parser");

//ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routers = require("./routes/article");

//middleware: simpre se ejecuta antes de cargar una ruta de la aplicacion, procesa algun dato antes de cargar la ruta
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS// acceso cruzado entre dominio→ perimitir llamadas http desde cualquier frontend
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Añadir prefijos a la ruta /cargar rutas
app.use("/api", article_routers);

//exportar modulos (fichero actual)
module.exports = app;
