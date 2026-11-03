import { useState } from "react";

import "../styles/modificarCita.css";


function ModificarCita({
  cita,
  alVolver,
  alGuardar,
}) {

  const [paciente, setPaciente] =
    useState(cita.paciente);

  const [tratamiento, setTratamiento] =
    useState(
      cita.tratamiento || ""
    );

  const [fecha, setFecha] =
    useState(cita.fecha);

  const [hora, setHora] =
    useState(cita.hora);

  const [mensaje, setMensaje] =
    useState("");


  const guardarCambios = () => {

    if (
      paciente.trim() === "" ||
      fecha === "" ||
      hora === ""
    ) {

      setMensaje(
        "Completa paciente, fecha y hora."
      );

      return;

    }


    const resultado =
      alGuardar({

        ...cita,

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

    <main className="pantalla-modificar-cita">

      <section className="tarjeta-modificar-cita">


        <button
          type="button"
          className="boton-volver-modificar"
          onClick={alVolver}
        >
          ← Volver a agenda
        </button>


        <header className="encabezado-modificar-cita">

          <h1>
            MODIFICAR CITA
          </h1>

          <p>
            Actualiza los datos de la cita seleccionada
          </p>

        </header>


        <div className="formulario-modificar-cita">


          <label>

            Nombre del paciente

            <input
              type="text"
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
              value={tratamiento}
              onChange={(evento) =>
                setTratamiento(
                  evento.target.value
                )
              }
            />

          </label>


          <div className="fila-modificar-cita">

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

            <p className="mensaje-modificar-cita">
              {mensaje}
            </p>

          )}


          <div className="acciones-modificar-cita">

            <button
              type="button"
              className="boton-cancelar-modificacion"
              onClick={alVolver}
            >
              Cancelar
            </button>


            <button
              type="button"
              className="boton-guardar-modificacion"
              onClick={guardarCambios}
            >
              Guardar cambios
            </button>

          </div>


        </div>

      </section>

    </main>

  );

}


export default ModificarCita;