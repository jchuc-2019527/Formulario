import React, { useEffect, useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { url } from "../axiosConnect";
import "./FechaDeclamacion.css";
import Teatro from "../../Helpers/img/teatro.png";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";


const FechaDeclamacion = () => {
  const [declamacion, setDeclamacion] = useState([]);

  const handleDownload = (e) => {
    const pdf = new jsPDF();
    pdf.addImage(Teatro, "PNG", 50, 10, 100, 0);
    pdf.text(`Nombre concursante:  ${declamacion.nombre} `, 10, 100);
    pdf.text(`Carnet:  ${declamacion.carnet} `, 10, 110);
    pdf.text(`Dirección:  ${declamacion.direccion} `, 10, 120);
    pdf.text(`Género:  ${declamacion.genero} `, 10, 130);
    pdf.text(`Teléfono:  ${declamacion.telefono} `, 10, 140);
    pdf.text(`Facultad:  ${declamacion.carreraUniversitaria} `, 10, 150);
    pdf.text(`Fecha de nacimiento:  ${declamacion.fechaNacimiento} `, 10, 160);
    pdf.text(`Fecha inscripción:  ${declamacion.fechaInscripcion} `, 10, 170);
    pdf.text(`Fecha presentación:  ${declamacion.fechaDeclamacion} `, 10, 180);
    pdf.text(`Género poético:  ${declamacion.generoLiterario} `, 10, 190);
    pdf.setTextColor(200);
    pdf.text(60, pdf.internal.pageSize.height - 50, 'CONSTANCIA DE INSCRIPCIÓN');
    pdf.save("constancia.pdf");
  };

  const { idInscripcion } = useParams();
  const getInscripcion = (e) => {
    Axios.get(url + "register/inscripcion/" + idInscripcion)
      .then((res) => {
        setDeclamacion(res.data.inscripcion);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getInscripcion();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div id="download-content">
        <div className="gene">
          <div class="card">
            <img className="teatro" src={Teatro} />
            <h2>Nombre</h2>
            <h5>{declamacion.nombre}</h5>
            <h2>Fecha declamación</h2>
            <h3 class="price">{declamacion.fechaDeclamacion}</h3>
            <h5>
              <h2>Carnet: </h2> {declamacion.carnet}
              <h2>Género literario: </h2> {declamacion.generoLiterario}{" "}
            </h5>
            <p>
              <button onClick={handleDownload}>Descargar Constancia</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FechaDeclamacion;
