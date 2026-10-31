import { useState } from "react";

import "../styles/agenda.css";


function Agenda() {

  const hoy = new Date();

  const [mesActual, setMesActual] =
    useState(hoy.getMonth());

  const [anioActual, setAnioActual] =
    useState(hoy.getFullYear());

  const [diaSeleccionado, setDiaSeleccionado] =
    useState(hoy.getDate());


  const [busquedaPaciente, setBusquedaPaciente] =
    useState("");

  const [busquedaHora, setBusquedaHora] =
    useState("");

  const [busquedaFecha, setBusquedaFecha] =
    useState("");


  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


  const diasDelMes = new Date(
    anioActual,
    mesActual + 1,
    0
  ).getDate();


  const primerDia = new Date(
    anioActual,
    mesActual,
    1
  ).getDay();


  const desplazamiento =
    primerDia === 0
      ? 6
      : primerDia - 1;


  const cambiarMesAnterior = () => {

    if (mesActual === 0) {

      setMesActual(11);

      setAnioActual(
        anioActual - 1
      );

    } else {

      setMesActual(
        mesActual - 1
      );

    }

  };


  const cambiarMesSiguiente = () => {

    if (mesActual === 11) {

      setMesActual(0);

      setAnioActual(
        anioActual + 1
      );

    } else {

      setMesActual(
        mesActual + 1
      );

    }

  };


  const buscarCitas = () => {

    console.log({
      paciente: busquedaPaciente,
      hora: busquedaHora,
      fecha: busquedaFecha,
    });

  };


  return (

    <main className="pantalla-agenda">

      <section className="contenedor-agenda">


        {/* =========================
            TITULO
            ========================= */}

        <header className="encabezado-agenda">

          <h1>
            AGENDA
          </h1>

          <p>
            Consulta disponibilidad y administra citas
          </p>

        </header>


        {/* =========================
            BUSCADOR
            ========================= */}

        <section className="seccion-busqueda-agenda">

          <h2>
            Buscar
          </h2>


          <div className="campos-busqueda">


            <label>

              Paciente

              <input
                type="text"
                placeholder="Nombre del paciente"
                value={busquedaPaciente}
                onChange={(evento) =>
                  setBusquedaPaciente(
                    evento.target.value
                  )
                }
              />

            </label>


            <label>

              Hora

              <input
                type="time"
                value={busquedaHora}
                onChange={(evento) =>
                  setBusquedaHora(
                    evento.target.value
                  )
                }
              />

            </label>


            <label>

              Fecha

              <input
                type="date"
                value={busquedaFecha}
                onChange={(evento) =>
                  setBusquedaFecha(
                    evento.target.value
                  )
                }
              />

            </label>


            <button
              type="button"
              className="boton-buscar-agenda"
              onClick={buscarCitas}
            >
              Buscar
            </button>


          </div>

        </section>


        {/* =========================
            CALENDARIO
            ========================= */}

        <section className="seccion-calendario">

          <div className="encabezado-calendario">


            <button
              type="button"
              className="boton-mes"
              onClick={
                cambiarMesAnterior
              }
            >
              ←
            </button>


            <h2>
              {nombresMeses[mesActual]}
              {" "}
              {anioActual}
            </h2>


            <button
              type="button"
              className="boton-mes"
              onClick={
                cambiarMesSiguiente
              }
            >
              →
            </button>


          </div>


          <div className="dias-semana">

            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>

          </div>


          <div className="calendario-grid">


            {Array.from({
              length: desplazamiento,
            }).map((_, indice) => (

              <div
                key={`vacio-${indice}`}
                className="dia-vacio"
              />

            ))}


            {Array.from({
              length: diasDelMes,
            }).map((_, indice) => {

              const dia =
                indice + 1;

              return (

                <button
                  key={dia}
                  type="button"

                  className={
                    diaSeleccionado === dia
                      ? "dia-calendario dia-seleccionado"
                      : "dia-calendario"
                  }

                  onClick={() =>
                    setDiaSeleccionado(
                      dia
                    )
                  }
                >

                  {dia}

                </button>

              );

            })}


          </div>


          <div className="fecha-seleccionada">

            Día seleccionado:

            <strong>
              {" "}
              {diaSeleccionado}
              /
              {mesActual + 1}
              /
              {anioActual}
            </strong>

          </div>

        </section>


        {/* =========================
            TABLA DE CITAS
            ========================= */}

        <section className="seccion-citas">

          <h2>
            Citas del día
          </h2>


          <div className="contenedor-tabla">

            <table className="tabla-citas">

              <thead>

                <tr>

                  <th>
                    Paciente
                  </th>

                  <th>
                    Tratamiento
                  </th>

                  <th>
                    Hora
                  </th>

                  <th>
                    Fecha
                  </th>

                  <th>
                    Dentista
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr>

                  <td
                    colSpan="5"
                    className="sin-citas"
                  >
                    No hay citas para mostrar.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>


          <div className="acciones-agenda">

            <button
              type="button"
              className="boton-generar-cita"
            >
              Generar cita nueva
            </button>


            <button
              type="button"
              className="boton-modificar-cita"
            >
              Modificar cita
            </button>

          </div>

        </section>


      </section>

    </main>

  );

}


export default Agenda;