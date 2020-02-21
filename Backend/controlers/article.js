"use strict";
var validator = require("validator");
var fs = require("fs");
var path = require("path");

var Article = require("../models/article");
var controller = {
  datosCurso: (req, res) => {
    console.log(req.body);
    var hola = req.body.hola;

    return res.status(200).send({
      Curso: "master en Frameworks js",
      Autor: "Juan David",
      url: "juancastanoweb",
      hola
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "soy la accion test de mi controlador de articulos"
    });
  },

  save: (req, res) => {
    //Recoger parametros por port
    var params = req.body;

    //validar datos ( validator)
    try {
      var validate_little = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos para enviar !!!"
      });
    }

    if (validate_little && validate_content) {
      //crear el objeto a guardar
      var article = new Article();
      article.title = params.title;
      article.content = params.content;
      article.image = null;
      //asignar valores

      //guardar el articulo
      article.save((err, articleSatored) => {
        if (err || !articleSatored) {
          return res.status(404).send({
            status: "error",
            message: "El articulo no se ha guardado !!!"
          });
        }
        //devolver una respuesta
        return res.status(200).send({
          status: "succes",
          article: articleSatored
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "Los datos no son validos"
      });
    }
  },

  getArticles: (req, res) => {
    var query = Article.find({});

    var last = req.params.last;
    if (last || last != undefined) {
      query.limit(5);
    }
    //find
    //-_id orden ade manera descendente
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos"
        });
      }

      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay articulos  para monstrar"
        });
      }

      return res.status(200).send({
        status: "succes",
        articles
      });
    });
  },

  getArticle: (req, res) => {
    //recoger el ID de la URS
    var articleId = req.params.id;

    //Comprobar que el ID existe
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No hay articulos  para monstrar"
      });
    }
    //buscar el articulo
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los datos"
        });
      }
      //devolverlo en json
      return res.status(404).send({
        status: "succes",
        article
      });
    });
  },

  update: (req, res) => {
    //recoger el id del articulo por la Url
    var articleId = req.params.id;

    //recoger los datos que llegan por PUT
    var params = req.body;
    //Validar los datos
    console.log(params);
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    if (validate_title && validate_content) {
      //find and update
      Article.findOneAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar"
            });
          }
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "no existe el articulo"
            });
          }
          return res.status(200).send({
            status: "succes",
            article: articleUpdated
          });
        }
      );
    } else {
      //devolver respuesta
      return res.status(200).send({
        status: "error",
        message: "error al actualizar"
      });
    }
  },

  delete: (req, res) => {
    //recoger el id URL
    var articleId = req.params.id;
    //Finf and delete
    Article.findByIdAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar"
        });
      }

      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el articulo, o posiblemente no exista"
        });
      }

      return res.status(200).send({
        status: "succes",
        article: articleRemoved
      });
    });
  },

  upload: (req, res) => {
    //configurar el modulo de connect multi parter router/articles.js
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: "imagen no cargada"
      });
    }

    //recoger el fichero de la peticion
    var file_path = req.files.file0.path;
    var file_split = file_path.split(`\\`);

    /*Advertencia en linux o max */
    //var file_split = file_path.split(`/`);

    //nombre del archivoo
    var file_name = file_split[2];

    //extension del archivo
    var extension_split = file_name.split(`\.`);
    var file_ext = extension_split[1];

    //comprobar la extersión, solo imagenes, si el valida borrar el fichero
    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      fs.unlink(file_path, err => {
        return res.status(200).send({
          status: "error",
          message: "la extension de la imagen no es valida"
        });
      });
    } else {
      // si todo es valido, asignar nombre de la imagen y actualizar
      //sacando id de la url

      var articleId = req.params.id;
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(200).send({
              status: "error",
              message: "Error al guardar la imagen del articulo"
            });
          }

          return res.status(200).send({
            status: "succes",
            message: articleUpdated
          });
        }
      );
    }
  }, //end upload file

  getImage: (req, res) => {
    var file = req.params.image; //cojo la imagen
    var path_file = `./uploads,article/` + file;
    fs.exists(path_file, exists => {
      if (exists) {
      } else {
      }
    });
    return res.status(200).send({
      status: "succes",
      file
    });
  } //fin getImage
}; // end controler

module.exports = controller;
