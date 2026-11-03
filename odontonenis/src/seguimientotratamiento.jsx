
import { useState } from "react";
import "./seguimientotratamiento.css";
import odontograma from "./assets/dientesplantila.png";

const dientesSuperiores = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28
];

const dientesInferiores = [
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38
];

export default function SeguimientoTratamiento({
  paciente,
  abrirSeguimientoDiente
}) {
  const [dienteSeleccionado, setDienteSeleccionado] =
    useState(null);

  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setFecha] = useState("");
  const [costo, setCosto] = useState("");

  const [registros, setRegistros] = useState([]);

  const agregarTratamiento = () => {
    if (!dienteSeleccionado) {
      alert("Selecciona un diente");
      return;
    }

    if (!tratamiento.trim() || !fecha || costo === "") {
      alert("Completa los datos del tratamiento");
      return;
    }

    if (!Number.isFinite(Number(costo)) || Number(costo) < 0) {
      alert("Ingresa un costo válido");
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      pacienteId: paciente?.id ?? null,
      diente: dienteSeleccionado,
      tratamiento,
      fecha,
      costo: Number(costo)
    };

    setRegistros([...registros, nuevoRegistro]);

    alert(
      `Tratamiento agregado al diente ${dienteSeleccionado}`
    );

    setTratamiento("");
    setFecha("");
    setCosto("");
  };

  const abrirSeguimiento = () => {
    if (!dienteSeleccionado) {
      alert("Primero selecciona un diente");
      return;
    }

    if (abrirSeguimientoDiente) {
      abrirSeguimientoDiente(dienteSeleccionado);
    }
  };

  return (
    <div className="tratamientos-pagina">
      <div className="tratamientos-contenido">

        <h1 className="tratamientos-titulo">
          {paciente
            ? `${paciente.nombre} ${paciente.apellidoPaterno}`
            : "NOMBRE DEL PACIENTE"}
        </h1>

        <div className="tratamientos-columnas">

          <div className="tratamientos-izquierda">

            <div className="odontograma">
              <img
                src={odontograma}
                alt="Odontograma de 32 dientes"
              />

              <div className="odontograma-botones">
                {dientesSuperiores.map((numero, index) => (
                  <button
                    key={numero}
                    type="button"
                    title={`Diente ${numero}`}
                    aria-label={`Seleccionar diente ${numero}`}
                    aria-pressed={dienteSeleccionado === numero}
                    className={
                      dienteSeleccionado === numero
                        ? "diente-boton seleccionado"
                        : "diente-boton"
                    }
                    style={{
                      left: `${(index / 16) * 100}%`,
                      top: "0%"
                    }}
                    onClick={() => setDienteSeleccionado(numero)}
                  />
                ))}

                {dientesInferiores.map((numero, index) => (
                  <button
                    key={numero}
                    type="button"
                    title={`Diente ${numero}`}
                    aria-label={`Seleccionar diente ${numero}`}
                    aria-pressed={dienteSeleccionado === numero}
                    className={
                      dienteSeleccionado === numero
                        ? "diente-boton seleccionado"
                        : "diente-boton"
                    }
                    style={{
                      left: `${(index / 16) * 100}%`,
                      top: "53%"
                    }}
                    onClick={() => setDienteSeleccionado(numero)}
                  />
                ))}
              </div>
            </div>

            <p className="diente-indicador">
              {dienteSeleccionado
                ? `Diente seleccionado: ${dienteSeleccionado}`
                : "Selecciona un diente"}
            </p>

            <div className="tratamientos-campo">
              <label htmlFor="tratamiento-dental">
                TRATAMIENTO:
              </label>
              <input
                id="tratamiento-dental"
                type="text"
                placeholder="ingrese procedimiento"
                value={tratamiento}
                onChange={(e) => setTratamiento(e.target.value)}
              />
            </div>

            <div className="tratamientos-campo">
              <label htmlFor="fecha-tratamiento">
                FECHA:
              </label>
              <input
                id="fecha-tratamiento"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

          </div>

          <div className="tratamientos-derecha">

            <div className="tratamientos-costo">
              <label htmlFor="costo-tratamiento">
                COSTO DEL TRATAMIENTO
              </label>

              <input
                id="costo-tratamiento"
                type="number"
                min="0"
                step="0.01"
                placeholder="ingrese costo total..."
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
              />
            </div>

            <div className="tratamientos-acciones">
              <button
                type="button"
                onClick={abrirSeguimiento}
              >
                Seguimiento de diente ➜
              </button>

              <button
                type="button"
                onClick={agregarTratamiento}
              >
                Agregar tratamiento ➜
              </button>
            </div>

          </div>
        </div>

        {registros.length > 0 && (
          <div className="tratamientos-registros">
            <h2>Tratamientos agregados</h2>

            {registros.map((registro) => (
              <p key={registro.id}>
                Diente {registro.diente} —
                {" "}{registro.tratamiento} —
                {" "}{registro.fecha} —
                {" "}${registro.costo.toFixed(2)}
              </p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
