'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'SecretKey';

exports.createToken = async (user) => {
    try{
        const payload = {
            sub: user._id,
            username: user.username,
            password: user.password,
            iat: moment().unix(),
            exp: moment().add(1, 'hour').unix()
        }
        return jwt.encode(payload, secretKey)
    }catch(err) {
        console.log(err);
        return err;
    }
}