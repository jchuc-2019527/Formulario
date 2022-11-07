'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/User.model');


exports.validateData = (data)=> {
    let keys =Object.keys(data), msg = '';
    for(let key of keys) {
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} is required \n`
    }
    return msg.trim();
}

exports.checkPassword = async(password, hashSync) => {
    try{
        return bcrypt.compareSync(password, hashSync);
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.validateDate = async(fechaPresentacion) => {
    const fechaInvalida = fechaPresentacion.format('dddd')
    if(fechaInvalida.toLowerCase() === 'sábado') return fechaPresentacion.add(2, 'days');
    else if (fechaInvalida.toLowerCase() === 'domingo') return fechaPresentacion.add(1, 'days');
    return fechaPresentacion;
}

exports.searchUser = async(username) => {
    try{
        const userExist = await User.findOne({username: username})
        .lean();
        return userExist;
    }catch(err) {
        console.log(err)
        return resizeBy.status(500).send({message: 'Error en el servidor, searchUser'})
    }
}