"use strict";

const GenerosLiterarios = require("../models/GenerosLiterarios.models");

exports.testGenerosLiterarios = (req, res) => {
  return res
    .status(200)
    .send({ message: "TestGenerosLiterariosController is running" });
};

exports.createGenerosLiterarios = async (req, res) => {
  try {
    const lirica = await GenerosLiterarios.findOne({ nombre: "Lírica" });
    const epico = await GenerosLiterarios.findOne({ nombre: "Épico" });
    const dramatico = await GenerosLiterarios.findOne({ nombre: "Dramático" });
    if(!lirica) {
        if(!epico) {
            if(!dramatico){
                const data = {
                    nombre: "Lírica"
                }
                const data2 = {
                    nombre: "Épico"
                }
                const data3 = {
                    nombre: "Dramático"
                }
                const generoLirico = new GenerosLiterarios(data);
                const generoEpico = new GenerosLiterarios(data2);
                const generoDramatico = new GenerosLiterarios(data3);
                await generoLirico.save();
                await generoEpico.save();
                await generoDramatico.save();
            }
        }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Error en el servidor, createGenerosLiterarios" });
  }
};

exports.getGeneros = async(req, res) => {
  try{
    const generos = await GenerosLiterarios.find();
    return res.status(200).send({message: 'Generos encontrados',generos});
  }catch(err) {
    console.log(err)
    return res.status(500).send({message: 'Error en el servidor, getGeneros'})
  }
}

exports.generoById = async(req, res) => {
  try{
    const generoId = req.params.idGenero;
    const genero = await GenerosLiterarios.findById(generoId);
    return res.status(200).send({message: 'Genero encontrado',genero});
  }catch(err) {
    console.log(err);
    return res.status(500).send({message: 'Error en el servidor, generosBiId'});
  }
}
