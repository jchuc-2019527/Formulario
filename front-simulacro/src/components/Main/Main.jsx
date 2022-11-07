import React, { useState } from "react";
import { Route, Routes, useNavigate, redirect, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Formulario from "../Formulario/Formulario";
import Users from "../Users/Users";
import FechaDeclamacion from "../FechaDeclamacion/FechaDeclamacion";
import Swal from "sweetalert2";

const Main = ({ user }) => {

  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscripcion" element={<Formulario />} />

        <Route path="/usuarios" element={<Users />} />

        <Route
          path="/fechaDeclamacion/:idInscripcion"
          element={<FechaDeclamacion />}
        />
        <Route
        
          path="/*"
          
          element={<Navigate to="/" />
        } 
        />
      </Routes>
    </div>
  );
};

export default Main;
