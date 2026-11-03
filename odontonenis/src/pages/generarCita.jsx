import { useState } from "react";

import "../styles/generarCita.css";


function GenerarCita({
  fechaInicial,
  horaInicial,
  alVolver,
  alGuardar,
}) {

  const [paciente, setPaciente] =
    useState("");

  const [tratamiento, setTratamiento] =
    useState("");

  const [fecha, setFecha] =
    useState(
      fechaInicial || ""
    );

  const [hora, setHora] =
    useState(
      horaInicial || ""
    );

  const [mensaje, setMensaje] =
    useState("");


  const guardarCita = () => {

    if (
      paciente.trim() === "" ||
      fecha === "" ||
      hora === ""
    ) {

      setMensaje(
        "Completa el paciente, la fecha y la hora."
      );

      return;

    }


    const resultado =
      alGuardar({

        paciente:
          paciente.trim(),

        tratamiento:
          tratamiento.trim(),

        fecha,

        hora,

      });


    if (!resultado.ok) {

      setMensaje(
        resultado.mensaje
      );

    }

  };


  return (

    <main className="pantalla-generar-cita">

      <section className="tarjeta-generar-cita">


        <button
          type="button"
          className="boton-volver-agenda"
          onClick={alVolver}
        >
          ← Volver a agenda
        </button>


        <header className="encabezado-generar-cita">

          <h1>
            GENERAR CITA
          </h1>

          <p>
            Registra los datos de la nueva cita
          </p>

        </header>


        <div className="formulario-generar-cita">


          <label>

            Nombre del paciente

            <input
              type="text"

              placeholder="Escribe el nombre"

              value={paciente}

              onChange={(evento) =>
                setPaciente(
                  evento.target.value
                )
              }
            />

          </label>


          <label>

            Tratamiento o motivo

            <input
              type="text"

              placeholder="Ej. Limpieza, revisión..."

              value={tratamiento}

              onChange={(evento) =>
                setTratamiento(
                  evento.target.value
                )
              }
            />

          </label>


          <div className="fila-generar-cita">


            <label>

              Fecha

              <input
                type="date"

                value={fecha}

                onChange={(evento) =>
                  setFecha(
                    evento.target.value
                  )
                }
              />

            </label>


            <label>

              Hora

              <input
                type="time"

                value={hora}

                onChange={(evento) =>
                  setHora(
                    evento.target.value
                  )
                }
              />

            </label>


          </div>


          {mensaje && (

            <p className="mensaje-generar-cita">
              {mensaje}
            </p>

          )}


          <div className="acciones-generar-cita">


            <button
              type="button"
              className="boton-cancelar-generar"
              onClick={alVolver}
            >
              Cancelar
            </button>


            <button
              type="button"
              className="boton-guardar-cita"
              onClick={guardarCita}
            >
              Generar cita
            </button>


          </div>


        </div>

      </section>

    </main>

  );

}


export default GenerarCita;