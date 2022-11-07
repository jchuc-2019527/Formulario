'use strict'

const express = require('express');
const generos = require('../controllers/GenerosLiterarios.controller');

const api = express.Router();

api.get('/test', generos.testGenerosLiterarios);
api.get('/getGeneros', generos.getGeneros);
api.get('/getGenero/:idGenero', generos.generoById);

module.exports = api;