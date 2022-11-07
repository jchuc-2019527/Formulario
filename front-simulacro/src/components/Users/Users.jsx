import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import { url } from "../axiosConnect";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import autoTable from "jspdf-autotable";

export default function Usuarios({ user }) {
  const [usuarios, setUsuarios] = useState([]);
  const doc = new jsPDF();

  const reporte = () => {
    autoTable(doc, { html: "#table" });
    doc.setFontSize(20);
    doc.text("ESTUDIANTES INSCRITOS", 20, 10);
    doc.save("inscritos.pdf");
  };

  const headers = {
    headers: {
      Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  const getUsuarios = (e) => {
    Axios.get(url + "register/inscripciones", headers)
      .then((res) => {
        setUsuarios(res.data.inscripciones);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: 200 }}>
        <TableContainer sx={{ marginTop: 29, width: 1500 }} component={Paper}>
          <Table id="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#000", fontSize: 30 }}>No.</TableCell>
                <TableCell align="center" sx={{ color: "#000", fontSize: 30 }}>
                  Nombre
                </TableCell>
                <TableCell align="center" sx={{ color: "#000", fontSize: 30 }}>
                  Facultad
                </TableCell>
                <TableCell align="center" sx={{ color: "#000", fontSize: 30 }}>
                  Género Poesía{" "}
                </TableCell>
                <TableCell align="center" sx={{ color: "#000", fontSize: 30 }}>
                  Fecha Declamación{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: 15 }} component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: 15 }}
                    component="th"
                    scope="row"
                  >
                    {usuario.nombre}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }} align="center">
                    {usuario.carreraUniversitaria}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }} align="center">
                    {usuario.generoLiterario}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }} align="center">
                    {usuario.fechaDeclamacion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableCell sx={{ fontSize: 15 }}>
            <Button
              onClick={reporte}
              sx={{ marginLeft: 160 }}
              variant="contained"
              color="secondary"
            >
              Generar Reporte
            </Button>
          </TableCell>
        </TableContainer>
      </div>
    </div>
  );
}
