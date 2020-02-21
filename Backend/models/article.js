
'use strict'
//var mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: String,
    content: String,
    date: {type: Date, default:Date.now},
    image: String
});

module.exports = model('Article', ArticleSchema);
//articles --> guarda documentos de este tipo y con esta estructura dentro de la colección