'use strict'

const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const userAdmin = require('./src/controllers/User.controller');

app.initServer();
mongoConfig.init();
userAdmin.createAdmin();

