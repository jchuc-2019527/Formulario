'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'SecretKey'

exports.ensureAuth = (req, res, next) => {
    try{
        if(!req.headers.authorization){
            return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'})
        }

        const token = req.headers.authorization.replace(/['"]+/g, '')

        try{
            var payload = jwt.decode(token, secret)

            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: 'El token ha expirado'})
            }
        }catch(ex){
            return res.status(404).send({message: 'El token no es válido'})
        }
        req.user = payload
        next()
    }catch(err) {
        console.log(err)
        return res.status(500).send({message: 'Error en la petición, ensureAuth'})
    }
}
