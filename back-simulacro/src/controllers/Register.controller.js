'use strict'

const Register = require('../models/Register.model');
const moment = require('moment/moment');
const { validateDate, validateData } = require('../utils/validate.utils');
require('moment-timezone');

exports.testRegister = (req, res) => {
    return res.status(200).send({message: 'TestRegisterController is running'});
}

exports.inscripcion = async(req, res) => {
    try{
        const body = req.body;
        const data = {
            carnet: body.carnet,
            nombre: body.nombre,
            direccion: body.direccion,
            genero: body.genero,
            telefono: body.telefono,
            carreraUniversitaria: body.carreraUniversitaria,
            fechaNacimiento: body.fechaNacimiento,
            fechaInscripcion: moment().format('DD MMMM YYYY, h:mm:s'),
            generoLiterario: body.generoLiterario
        }
        const validate = await validateData(data);
        if(validate) return res.status(400).send({message: validate});
        if(data.carnet.length !== 6) return res.status(500).send({message: 'El carnet debe tener 6 digitos'});
        if(data.carnet[0] !== 'A') return res.status(500).send({message: 'El carnet debe empezar con la letra A'});
        if(Number(data.carnet[2]) !== 5) return res.status(500).send({message: 'El tercer digito del carnet debe ser 5'});

        const ultimoDigito = Number(data.carnet[5]);
        if(ultimoDigito !==1 && ultimoDigito !== 3 && ultimoDigito !==9) return res.status(400).send({message: 'El ultimo digito del carnet debe ser 1, 3 o 9'});
        moment.locale('es');
        moment.tz.setDefault('America/Guatemala');


        const edad = moment().diff(moment(data.fechaNacimiento), 'years');


        if(edad < 17) return res.status(400).send({message: 'Debe ser mayor de edad para inscribirse'});
        data.edad = edad;
        data.fechaNacimiento = moment(data.fechaNacimiento).format('DD-MM-YYYY');

        if(ultimoDigito === 1 && data.generoLiterario === 'Dramático'){
            let fechaPresentacion = moment().add(5, 'days')
            fechaPresentacion = await validateDate(fechaPresentacion)
            data.fechaDeclamacion = fechaPresentacion.format('dddd DD [de] MMMM [del] YYYY, h:mm a')
        }else if (ultimoDigito === 3 && data.generoLiterario === 'Épico'){
            let fechaPresentacion = moment().endOf('month')
            fechaPresentacion = await validateDate(fechaPresentacion)
            const diff = fechaPresentacion.diff(moment(), 'days')
            data.fechaDeclamacion = moment().add(diff, 'days').format('dddd DD [de] MMMM [del] YYYY, h:mm a')

        }else{
            let fechaPresentacion = moment()
            fechaPresentacion = await validateDate(fechaPresentacion)
            const diff = fechaPresentacion.endOf('week').subtract(2, 'days').diff(moment(), 'days')
            data.fechaDeclamacion = moment().add(diff, 'days').format('dddd DD [de] MMMM [del] YYYY, h:mm a')
        }

        const register = new Register(data);
        await register.save();
        return res.status(200).send({message: 'Inscripcion exitosa', register});
    }catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor, inscripcion'});
    }
}

exports.inscripciones = async(req, res) => {
    try{
        const inscripciones = await Register.find({})
        .lean()
        return res.status(200).send({message: 'Inscripciones', inscripciones});
    }catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor, getInscripciones'});
    }
}   

exports.inscripcionById = async(req, res) => {
    try{
        const inscripcionId = req.params.idInscripcion;
        const inscripcion = await Register.findById(inscripcionId)
        .lean()
        return res.status(200).send({message: 'Inscripcion', inscripcion});
    }catch(err) {
        console.log(err) 
        return res.status(500).send({message: 'Error en el servidor, inscripcion'});
    }
}