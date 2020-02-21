//crear servidor- cargamos exprees , peticiones ruta, middlewares

'use strict'

//cargar modulos de node para cargar el servidor
var express = require('express');
var bodyParser = require('body-parser');

//ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routers = require('./routes/article');

//middleware: simpre se ejecuta antes de cargar una ruta de la aplicacion, procesa algun dato antes de cargar la ruta
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//CORS

//Añadir prefijos a la ruta /cargar rutas
app.use('/api', article_routers)


//exportar modulos (fichero actual)
module.exports = app;