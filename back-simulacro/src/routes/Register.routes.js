'use strict'

const express = require('express');
const register = require('../controllers/Register.controller');
const auth = require('../middlewares/authenticated.middlewares');

const api = express.Router();

api.get('/test', register.testRegister);
api.post('/inscripcion', register.inscripcion);
api.get('/inscripciones', [auth.ensureAuth], register.inscripciones);
api.get('/inscripcion/:idInscripcion',register.inscripcionById);

module.exports = api;