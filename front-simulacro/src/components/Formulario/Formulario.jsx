import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Formulario.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { url } from "../axiosConnect";
import Swal from "sweetalert2";

const Formulario = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    carnet: "",
    nombre: "",
    direccion: "",
    genero: "",
    telefono: "",
    carreraUniversitaria: "",
    fechaNacimiento: "",
    generoLiterario: "",
  });

  const handleFormulario = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    Axios.post(url + "register/inscripcion", formulario)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          color: "white",
          background: "rgba(0,0,0,0.9)",
          title: res.data.message,
          timer: 3000,
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
        e.target.reset();
        navigate("/fechaDeclamacion/" + res.data.register._id);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          color: "white",
          background: "rgba(0,0,0,0.9)",
          title: err.response.data.message,
          timer: 3000,
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div>
      <NavBar />
      <div class="container">
        <form onSubmit={enviarFormulario}>
          <div class="row">
            <h4>Inscripción</h4>
            <div class="input-group input-group-icon">
              <input
                type="text"
                placeholder="Carnet"
                name="carnet"
                id="carnet"
                onChange={handleFormulario}
                required
              />
              <div class="input-icon">
                <i class="fa fa-user"></i>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                type="text"
                placeholder="Nombre completo"
                name="nombre"
                id="nombre"
                onChange={handleFormulario}
                required
              />
              <div class="input-icon">
                <i class="fa fa-envelope"></i>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                type="text"
                placeholder="Dirección"
                name="direccion"
                id="direccion"
                onChange={handleFormulario}
                required
              />
              <div class="input-icon">
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                type="Number"
                placeholder="Teléfono"
                name="telefono"
                id="telefono"
                onChange={handleFormulario}
                required
              />
              <div class="input-icon">
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                type="text"
                placeholder="Carrera"
                name="carreraUniversitaria"
                id="carreraUniversitaria"
                onChange={handleFormulario}
                required
              />
              <div class="input-icon">
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <select
                value={formulario.generoLiterario}
                name="generoLiterario"
                id="generoLiterario"
                onChange={handleFormulario}
                required
              >
                <option value="">Selecciona el género literario</option>
                <option value="Dramático">Dramático</option>
                <option value="Épico">Épico</option>
                <option value="Lírica">Lírica</option>
              </select>
            </div>
            <div class="input-group input-group-icon">
              <select
                value={formulario.genero}
                name="genero"
                id="genero"
                onChange={handleFormulario}
                required
              >
                <option value="">Seleccione su género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-half">
              <h4>Fecha de nacimiento</h4>
              <div className="fech" >
                <input
                  value={formulario.fechaNacimiento}
                  type="date"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  onChange={handleFormulario}
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" variant="contained" color="secondary">
            Inscribirse
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
