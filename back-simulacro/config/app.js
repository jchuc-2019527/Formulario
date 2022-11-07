'use strict'

//Confi dependecies
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 3200;

//Routes
const userRoutes = require('../src/routes/User.routes');
// const generosLiterariosRoutes = require('../src/routes/GenerosLiterarios.routes');
const registerRoutes = require('../src/routes/Register.routes');

//Express
const app = express();

//Config client
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

//Usage routes client
app.use('/user', userRoutes);
// app.use('/generos', generosLiterariosRoutes);
app.use('/register', registerRoutes);

//Delfault endpoints
app.get('/', (req, res) => {
    return res.status(200).send({Message: 'Welcome to my API'})
})

app.get('**', (req, res) => {
    return res.status(404).send({Mesasage: 'Endpoint not found'})
})

//Server express
exports.initServer = () => app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})