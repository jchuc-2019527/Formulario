'use strict'

const express = require('express');
const user = require('../controllers/User.controller');

const api = express.Router();

api.get('/test', user.testUser);
// api.post('/register', user.register);
api.post('/login', user.login);

module.exports = api;