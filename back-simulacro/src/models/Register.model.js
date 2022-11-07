'use strict'

const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    carnet: String,
    nombre: String,
    direccion: String,
    genero: String,
    telefono: String,
    carreraUniversitaria: String,
    fechaNacimiento: String,
    fechaInscripcion: String,
    fechaDeclamacion: String,
    generoLiterario: String,
})

module.exports = mongoose.model('Register', registerSchema);