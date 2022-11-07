"use strict";

const User = require("../models/User.model");
const { createToken } = require("../services/createToken.services");
const {
  encrypt,
  checkPassword,
  searchUser,
} = require("../utils/validate.utils");
const bcrypt = require('bcrypt-nodejs');

exports.testUser = (req, res) => {
  return res.status(200).send({ message: "TestUserController is running" });
};

// exports.register = async (req, res) => {
//   try {
//     const body = req.body;
//     const data = {
//       username: body.username,
//       password: body.password,
//     };
//     if (data.username) {
//       if (data.password) {
//         const userExist = await searchUser(req.body.username);
//         if (!userExist) {
//           data.password = await encrypt(req.body.password);
//           let user = new User(data);
//           await user.save();
//           return res
//             .status(200)
//             .send({ message: "Usuario creado satisfactoriamente", user});
//         } else {
//           return res.status(400).send({ message: "El nombre de usuario ya esta en uso" });
//         }
//       }else{
//         return res.status(402).send({message: 'El parámetro contraseña es requerido'});
//       }
//     }else{
//         return res.status(402).send({message: 'El parámetro nombre de usuario es requerido'});
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500), send({ message: "Error en el servidor, register" });
//   }
// };

exports.createAdmin = async (req, res) => {
  try {
    const adminCreate = await User.findOne({ username: "admin" });
    if (!adminCreate) {
      const data = {
        username: "admin",
        password: bcrypt.hashSync("admin"),
      };
      const admin = new User(data);
      await admin.save();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error en el servidor, userAdmin" });
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      username: body.username,
      password: body.password,
    };
    if (data.username) {
      if (data.password) {
        let search = await searchUser(body.username);
        let passwordCheck = await checkPassword(body.password, search.password);
        if (search && passwordCheck) {
          const token = await createToken(search);
          return res
            .status(200)
            .send({ message: "Inicio de sesión satisfactorio", token, search });
        } else {
          return res
            .status(401)
            .send({ message: "Nombre de usuario o contraseña no coiciden" });
        }
      } else {
        return res
          .status(402)
          .send({ message: "El parámetro contraseña es requerido" });
      }
    } else {
      return res
        .status(402)
        .send({ message: "El parámetro nombre de usuario es requerido" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error en el servidor, login" });
  }
};
