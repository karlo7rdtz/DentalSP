
import { useState } from "react";
import "./seguimientopaciente.css";

const pacientesEjemplo = [
  {
    id: 1,
    nombre: "juanito",
    apellidoPaterno: "alcachofa",
    apellidoMaterno: "martines",
    tratamiento: "caries",
    hora: "12:00",
    fechaCita: "08/10/2026",
  },
  {
    id: 2,
    nombre: "josi",
    apellidoPaterno: "huele",
    apellidoMaterno: "apedo",
    tratamiento: "quitar colmillo",
    hora: "1:00",
    fechaCita: "08/10/2026",
  },
];

export default function SeguimientoPaciente({ abrirSeguimiento }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] =
    useState(null);

  
  const [pacientes] = useState(pacientesEjemplo);

  const buscarPaciente = () => {
    setFiltro(busqueda.trim().toLowerCase());
    setPacienteSeleccionado(null);
  };

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const nombreCompleto = [
      paciente.nombre,
      paciente.apellidoPaterno,
      paciente.apellidoMaterno,
    ].join(" ").toLowerCase();

    return nombreCompleto.includes(filtro);
  });

  const abrirHistorial = () => {
    if (!pacienteSeleccionado) {
      alert("Primero selecciona un paciente de la tabla");
      return;
    }

    alert(
      "Historial clínico de: " +
      pacienteSeleccionado.nombre
    );
  };

const abrirTratamientos = () => {
  if (pacienteSeleccionado === null) {
    alert("Primero selecciona un paciente de la tabla");
    return;
  }

  if (typeof abrirSeguimiento === "function") {
    abrirSeguimiento(pacienteSeleccionado);
  }
};

  return (
    <div className="pacientes-pagina">
      <div className="pacientes-contenido">

        <h1 className="pacientes-titulo">
          SEGUIMIENTO DEL PACIENTE
        </h1>

        <div className="pacientes-buscador">
          <input
            type="text"
            placeholder="nombre de paciente a consultar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscarPaciente();
            }}
          />

          <button
            type="button"
            className="pacientes-boton"
            onClick={buscarPaciente}
          >
            buscar ➜
          </button>
        </div>

        <div className="pacientes-zona-tabla">
          <div className="pacientes-tabla-scroll">
            <table className="pacientes-tabla">
              <thead>
                <tr>
                  <th>nombre</th>
                  <th>apellido paterno</th>
                  <th>apellido materno</th>
                  <th>tratamiento</th>
                  <th>hora</th>
                  <th>fecha de cita</th>
                </tr>
              </thead>

              <tbody>
                {pacientesFiltrados.map((paciente) => (
                  <tr
                    key={paciente.id}
                    className={
                      pacienteSeleccionado?.id === paciente.id
                        ? "paciente-activo"
                        : ""
                    }
                    onClick={() =>
                      setPacienteSeleccionado(paciente)
                    }
                  >
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellidoPaterno}</td>
                    <td>{paciente.apellidoMaterno}</td>
                    <td>{paciente.tratamiento}</td>
                    <td>{paciente.hora}</td>
                    <td>{paciente.fechaCita}</td>
                  </tr>
                ))}

                {pacientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      No se encontraron pacientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pacientes-acciones">
            <button
              type="button"
              className="pacientes-boton"
              onClick={abrirHistorial}
            >
              Historial clínico ➜
            </button>

<button
  type="button"
  className="pacientes-boton"
  onClick={abrirTratamientos}
>
  Tratamientos ➜
</button>
          </div>
        </div>

      </div>
    </div>
  );
}
