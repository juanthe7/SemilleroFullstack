"use strict";

var express = require("express");
var ArticleController = require("../controlers/article");

var router = express.Router();
//cargar archivos
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./upload/articles" });
//rutas de prueba
router.post("/datos-curso", ArticleController.datosCurso);
router.get("/test-de-controllador", ArticleController.test);

//rutas para utiles
router.post("/save", ArticleController.save); // Enviar a la BD
router.get("/articles/:last?", ArticleController.getArticles); //sacar de la BD
router.get("/article/:id", ArticleController.getArticle); //sacar de la BD
router.put("/article/:id", ArticleController.update); //para actualizar
router.delete("/article/:id", ArticleController.delete); //para actualizar
router.post("/upload-image/:id", md_upload, ArticleController.upload); //vamos a guardar la imagen
router.get("/get-image/:image", ArticleController.getImage); //vamos a mostrar la imagen
router.get("/search-image/:search", ArticleController.search); //buscar la imagen

module.exports = router;
