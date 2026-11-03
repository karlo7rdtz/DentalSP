import React from "react";
import "./menu.css";

import registrarIcono from "./assets/registraricono.png";
import agendaIcono from "./assets/agendaicono.png";
import seguimientoIcono from "./assets/seguimientoicono.png";

function Menu({ nombreUsuario = "NOMBRE USUARIO" }) {

  const registrarPaciente = () => {
    console.log("Registrar paciente");
  };

  const verAgenda = () => {
    console.log("Ver agenda");
  };

  const seguimientoPaciente = () => {
    console.log("Seguimiento del paciente");
  };

  return (
    <div className="menu-principal">

      <header className="encabezado">
        <div className="circulo-logo"></div>
      </header>

      <div className="barra-bienvenida">
        <h1>
          “{nombreUsuario}” ¿QUÉ QUEREMOS HACER?
        </h1>
      </div>

      <main className="contenedor-botones">

        <button className="boton-menu" onClick={registrarPaciente}>
          <img src={registrarIcono} alt="" className="icono-boton" />
          <span>REGISTRAR PACIENTE</span>
        </button>

        <button className="boton-menu" onClick={verAgenda}>
          <img src={agendaIcono} alt="" className="icono-boton" />
          <span>VER AGENDA</span>
        </button>

        <button className="boton-menu" onClick={seguimientoPaciente}>
          <img src={seguimientoIcono} alt="" className="icono-boton" />
          <span>SEGUIMIENTO DEL PACIENTE</span>
        </button>

      </main>
    </div>
  );
}

export default Menu;