
import { useState } from "react";
import "./seguimientodiente.css";

export default function SeguimientoDiente({ numeroDiente, volverMenu }) {
  const [tratamiento, setTratamiento] = useState("");
  const [evolucion, setEvolucion] = useState("");
  const [abono, setAbono] = useState("");

  const registrarEvolucion = () => {
    if (!evolucion.trim()) {
      alert("Ingrese la evolución del diente");
      return;
    }

    alert("Evolución registrada correctamente");
    console.log("Evolución:", evolucion);
    setEvolucion("");
  };

  const registrarAbono = () => {
    if (!abono.trim() || Number(abono) <= 0) {
      alert("Ingrese un abono válido");
      return;
    }

    alert("Abono registrado correctamente");
    console.log("Abono:", abono);
    setAbono("");
  };

  const irHistorial = () => {
    alert("Abrir historial clínico dental");
  };

  return (
    <div className="seguimiento-pagina">

      <div className="seguimiento-contenido">

        <div className="seguimiento-imagen">
          <span>
            imagen del diente
            <br />
            seleccionado
          </span>
        </div>

        <div className="seguimiento-formulario">

          <h1 className="seguimiento-titulo">
            SEGUIMIENTO DEL DIENTE
          </h1>

          <div className="seguimiento-tratamiento">
            <label htmlFor="tratamiento">
              TRATAMIENTO
            </label>

            <input
              id="tratamiento"
              type="text"
              placeholder="buscar..."
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
            />
          </div>

          <div className="seguimiento-seccion">
            <label htmlFor="evolucion">
              REGISTRAR EVOLUCION DEL DIENTE
            </label>

            <div className="seguimiento-fila">
              <input
                id="evolucion"
                type="text"
                placeholder="registre evolucion"
                value={evolucion}
                onChange={(e) => setEvolucion(e.target.value)}
              />

              <button
                type="button"
                className="seguimiento-boton"
                onClick={registrarEvolucion}
              >
                registrar ➜
              </button>
            </div>
          </div>

          <div className="seguimiento-seccion">
            <label htmlFor="abono">
              AGREGAR ABONO
            </label>

            <div className="seguimiento-fila">
              <input
                id="abono"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="abono dado..."
                value={abono}
                onChange={(e) => setAbono(e.target.value)}
              />

              <button
                type="button"
                className="seguimiento-boton"
                onClick={registrarAbono}
              >
                registrar ➜
              </button>
            </div>
          </div>

          <div className="seguimiento-historial">
            <button
              type="button"
              className="seguimiento-boton historial-boton"
              onClick={irHistorial}
            >
              Ir al historial clínico dental ➜
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
