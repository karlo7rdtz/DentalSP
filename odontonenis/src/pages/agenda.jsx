import { useState } from "react";

import GenerarCita from "./generarCita";
import ModificarCita from "./modificarCita";

import "../styles/agenda.css";


function Agenda() {

  // ==================================================
  // DENTISTA ACTUAL
  // Temporalmente simulada.
  // Después vendrá del perfil que inició sesión.
  // ==================================================

  const dentistaActual = "Dentista 1";


  // ==================================================
  // FECHA ACTUAL
  // ==================================================

  const hoy = new Date();


  // ==================================================
  // ESTADOS DE PANTALLA
  // ==================================================

  const [pantalla, setPantalla] =
    useState("agenda");

  const [mesActual, setMesActual] =
    useState(hoy.getMonth());

  const [anioActual, setAnioActual] =
    useState(hoy.getFullYear());

  const [diaSeleccionado, setDiaSeleccionado] =
    useState(hoy.getDate());


  // ==================================================
  // BUSCADOR
  // ==================================================

  const [busquedaPaciente, setBusquedaPaciente] =
    useState("");

  const [busquedaHora, setBusquedaHora] =
    useState("");

  const [busquedaFecha, setBusquedaFecha] =
    useState("");

  const [resultadosBusqueda, setResultadosBusqueda] =
    useState(null);


  // ==================================================
  // CITAS
  // ==================================================

  const [citas, setCitas] =
    useState([]);

  const [citaSeleccionada, setCitaSeleccionada] =
    useState(null);

  const [horaParaNuevaCita, setHoraParaNuevaCita] =
    useState("");

  const [mensajeAgenda, setMensajeAgenda] =
    useState("");


  // ==================================================
  // MESES
  // ==================================================

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


  // ==================================================
  // HORARIOS DEL CONSULTORIO
  // ==================================================

  const horariosConsultorio = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];


  // ==================================================
  // DATOS DEL CALENDARIO
  // ==================================================

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


  // ==================================================
  // FECHA SELECCIONADA EN FORMATO YYYY-MM-DD
  // ==================================================

  const obtenerFechaSeleccionada = () => {

    const mes =
      String(mesActual + 1).padStart(
        2,
        "0"
      );

    const dia =
      String(diaSeleccionado).padStart(
        2,
        "0"
      );

    return `${anioActual}-${mes}-${dia}`;

  };


  const fechaSeleccionada =
    obtenerFechaSeleccionada();


  // ==================================================
  // CAMBIAR DE MES
  // ==================================================

  const cambiarMesAnterior = () => {

    setDiaSeleccionado(1);

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

    setDiaSeleccionado(1);

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


  // ==================================================
  // CITAS DEL DÍA SELECCIONADO
  // ==================================================

  const citasDelDia =
    citas.filter(
      (cita) =>
        cita.fecha === fechaSeleccionada
    );


  // ==================================================
  // DISPONIBILIDAD DEL DÍA
  // ==================================================

  const disponibilidadDelDia =
    horariosConsultorio.map((hora) => {

      const citaEncontrada =
        citasDelDia.find(
          (cita) =>
            cita.hora === hora
        );

      return {
        hora: hora,

        ocupado:
          Boolean(citaEncontrada),

        cita:
          citaEncontrada || null,
      };

    });


  // ==================================================
  // QUÉ MOSTRAR EN LA TABLA
  // ==================================================

  const citasMostradas =
    resultadosBusqueda !== null
      ? resultadosBusqueda
      : citasDelDia;


  // ==================================================
  // BUSCAR CITAS
  // ==================================================

  const buscarCitas = () => {

    setMensajeAgenda("");

    const pacienteEscrito =
      busquedaPaciente.trim();

    const hayPaciente =
      pacienteEscrito !== "";

    const hayHora =
      busquedaHora !== "";

    const hayFecha =
      busquedaFecha !== "";


    if (
      !hayPaciente &&
      !hayHora &&
      !hayFecha
    ) {

      setResultadosBusqueda(null);

      setMensajeAgenda(
        "Selecciona al menos un criterio de búsqueda."
      );

      return;

    }


    const resultados =
      citas.filter((cita) => {

        /*
          Si se busca por nombre de paciente,
          solamente aparecen pacientes
          pertenecientes a la dentista actual.
        */

        const coincidePaciente =
          !hayPaciente ||
          (
            cita.dentista === dentistaActual &&

            cita.paciente
              .toLowerCase()
              .includes(
                pacienteEscrito.toLowerCase()
              )
          );


        /*
          Hora y fecha consultan
          la agenda compartida.
        */

        const coincideHora =
          !hayHora ||
          cita.hora === busquedaHora;


        const coincideFecha =
          !hayFecha ||
          cita.fecha === busquedaFecha;


        return (
          coincidePaciente &&
          coincideHora &&
          coincideFecha
        );

      });


    // ESTA LÍNEA FALTABA EN TU ARCHIVO
    setResultadosBusqueda(
      resultados
    );


    if (resultados.length === 0) {

      if (hayPaciente) {

        setMensajeAgenda(
          "No se encontró ese paciente entre tus citas."
        );

      } else {

        setMensajeAgenda(
          "No hay citas registradas con esos criterios."
        );

      }

    } else {

      setMensajeAgenda(
        `Se encontraron ${resultados.length} cita(s).`
      );

    }

  };


  // ==================================================
  // GUARDAR NUEVA CITA
  // ==================================================

  const guardarNuevaCita = (
    nuevaCita
  ) => {

    const horarioOcupado =
      citas.some(
        (cita) =>
          cita.fecha === nuevaCita.fecha &&
          cita.hora === nuevaCita.hora
      );


    if (horarioOcupado) {

      return {
        ok: false,
        mensaje:
          "Ese horario ya está ocupado.",
      };

    }


    const citaCompleta = {

      ...nuevaCita,

      id: Date.now(),

      dentista:
        dentistaActual,

    };


    setCitas([
      ...citas,
      citaCompleta,
    ]);


    const partesFecha =
      nuevaCita.fecha.split("-");


    setAnioActual(
      Number(partesFecha[0])
    );

    setMesActual(
      Number(partesFecha[1]) - 1
    );

    setDiaSeleccionado(
      Number(partesFecha[2])
    );


    setResultadosBusqueda(null);

    setCitaSeleccionada(null);

    setHoraParaNuevaCita("");

    setMensajeAgenda(
      "Cita generada correctamente."
    );

    setPantalla("agenda");


    return {
      ok: true,
      mensaje:
        "Cita generada correctamente.",
    };

  };


  // ==================================================
  // GUARDAR CAMBIOS DE UNA CITA
  // ==================================================

  const guardarCambiosCita = (
    citaModificada
  ) => {

    const horarioOcupado =
      citas.some(
        (cita) =>
          cita.id !== citaModificada.id &&
          cita.fecha === citaModificada.fecha &&
          cita.hora === citaModificada.hora
      );


    if (horarioOcupado) {

      return {
        ok: false,
        mensaje:
          "Ese horario ya está ocupado.",
      };

    }


    const citasActualizadas =
      citas.map((cita) => {

        if (
          cita.id ===
          citaModificada.id
        ) {

          return citaModificada;

        }

        return cita;

      });


    setCitas(
      citasActualizadas
    );


    setCitaSeleccionada(
      citaModificada
    );


    const partesFecha =
      citaModificada.fecha.split("-");


    setAnioActual(
      Number(partesFecha[0])
    );

    setMesActual(
      Number(partesFecha[1]) - 1
    );

    setDiaSeleccionado(
      Number(partesFecha[2])
    );


    setResultadosBusqueda(null);

    setMensajeAgenda(
      "Cita modificada correctamente."
    );

    setPantalla("agenda");


    return {
      ok: true,
      mensaje:
        "Cita modificada correctamente.",
    };

  };


  // ==================================================
  // PANTALLA GENERAR CITA
  // ==================================================

  if (pantalla === "generar") {

    return (
      <GenerarCita
        fechaInicial={
          fechaSeleccionada
        }

        horaInicial={
          horaParaNuevaCita
        }

        alVolver={() => {

          setHoraParaNuevaCita("");

          setPantalla("agenda");

        }}

        alGuardar={
          guardarNuevaCita
        }
      />
    );

  }


  // ==================================================
  // PANTALLA MODIFICAR CITA
  // ==================================================

  if (
    pantalla === "modificar" &&
    citaSeleccionada
  ) {

    return (
      <ModificarCita
        cita={
          citaSeleccionada
        }

        alVolver={() =>
          setPantalla("agenda")
        }

        alGuardar={
          guardarCambiosCita
        }
      />
    );

  }


  // ==================================================
  // PANTALLA PRINCIPAL DE AGENDA
  // ==================================================

  return (

    <main className="pantalla-agenda">

      <section className="contenedor-agenda">


        {/* =========================
            ENCABEZADO
            ========================= */}

        <header className="encabezado-agenda">

          <h1>
            AGENDA
          </h1>

        </header>


        <div className="distribucion-agenda">


          {/* ==================================================
              COLUMNA IZQUIERDA
              ================================================== */}

          <div className="columna-agenda-izquierda">


            {/* =========================
                BUSCADOR
                ========================= */}

            <section className="seccion-busqueda-agenda">

              <p className="instruccion-busqueda">
                Nombre de paciente, fecha u hora a consultar
              </p>


              <div className="campos-busqueda">


                <label>

                  Paciente

                  <input
                    type="text"

                    placeholder="Nombre del paciente"

                    value={
                      busquedaPaciente
                    }

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

                    value={
                      busquedaHora
                    }

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

                    value={
                      busquedaFecha
                    }

                    onChange={(evento) =>
                      setBusquedaFecha(
                        evento.target.value
                      )
                    }
                  />

                </label>


              </div>


              <div className="acciones-busqueda">


                <button
                  type="button"

                  className="boton-buscar-agenda"

                  onClick={
                    buscarCitas
                  }
                >
                  Buscar →
                </button>


                <button
                  type="button"

                  className="boton-limpiar-busqueda"

                  onClick={() => {

                    setBusquedaPaciente("");

                    setBusquedaHora("");

                    setBusquedaFecha("");

                    setResultadosBusqueda(
                      null
                    );

                    setMensajeAgenda("");

                    setCitaSeleccionada(
                      null
                    );

                  }}
                >
                  Limpiar
                </button>


              </div>

            </section>


            {/* =========================
                MENSAJE
                ========================= */}

            {mensajeAgenda && (

              <p className="mensaje-agenda">
                {mensajeAgenda}
              </p>

            )}


            {/* =========================
                RESULTADOS
                ========================= */}

            <section className="seccion-resultados-agenda">

              <h2>

                {
                  resultadosBusqueda !== null
                    ? "Resultados de búsqueda"
                    : `Citas del ${diaSeleccionado}/${mesActual + 1}/${anioActual}`
                }

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

                    {citasMostradas.length === 0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="sin-citas"
                        >
                          No hay citas para mostrar.
                        </td>

                      </tr>

                    ) : (

                      citasMostradas.map(
                        (cita) => (

                          <tr
                            key={cita.id}

                            className={
                              citaSeleccionada?.id ===
                              cita.id
                                ? "fila-cita-seleccionada"
                                : "fila-cita"
                            }

                            onClick={() =>
                              setCitaSeleccionada(
                                cita
                              )
                            }
                          >

                            <td>
                              {cita.paciente}
                            </td>

                            <td>
                              {
                                cita.tratamiento ||
                                "Sin especificar"
                              }
                            </td>

                            <td>
                              {cita.hora}
                            </td>

                            <td>
                              {cita.fecha}
                            </td>

                            <td>

                              <span
                                className={
                                  cita.dentista ===
                                  dentistaActual
                                    ? "dentista-propia"
                                    : "dentista-ajena"
                                }
                              >
                                {cita.dentista}
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>


                </table>

              </div>

            </section>


            {/* =========================
                BOTONES DE AGENDA
                ========================= */}

            <div className="acciones-agenda">


              <button
                type="button"

                className="boton-generar-cita"

                onClick={() => {

                  setMensajeAgenda("");

                  setHoraParaNuevaCita("");

                  setPantalla(
                    "generar"
                  );

                }}
              >
                Generar cita nueva →
              </button>


              <button
                type="button"

                className="boton-modificar-cita"

                onClick={() => {

                  if (!citaSeleccionada) {

                    setMensajeAgenda(
                      "Primero selecciona una cita de la tabla."
                    );

                    return;

                  }


                  if (
                    citaSeleccionada.dentista !==
                    dentistaActual
                  ) {

                    setMensajeAgenda(
                      "No puedes modificar una cita perteneciente a la otra dentista."
                    );

                    return;

                  }


                  setMensajeAgenda("");

                  setPantalla(
                    "modificar"
                  );

                }}
              >
                Modificar cita →
              </button>


            </div>


          </div>


          {/* ==================================================
              COLUMNA DERECHA
              ================================================== */}

          <div className="columna-calendario">


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
                  length:
                    desplazamiento,
                }).map(
                  (_, indice) => (

                    <div
                      key={
                        `vacio-${indice}`
                      }

                      className="dia-vacio"
                    />

                  )
                )}


                {Array.from({
                  length:
                    diasDelMes,
                }).map(
                  (_, indice) => {

                    const dia =
                      indice + 1;


                    const mesTexto =
                      String(
                        mesActual + 1
                      ).padStart(
                        2,
                        "0"
                      );


                    const diaTexto =
                      String(
                        dia
                      ).padStart(
                        2,
                        "0"
                      );


                    const fechaDia =
                      `${anioActual}-${mesTexto}-${diaTexto}`;


                    const tieneCitas =
                      citas.some(
                        (cita) =>
                          cita.fecha ===
                          fechaDia
                      );


                    return (

                      <button
                        key={dia}

                        type="button"

                        className={`
                          dia-calendario
                          ${
                            diaSeleccionado === dia
                              ? "dia-seleccionado"
                              : ""
                          }
                          ${
                            tieneCitas
                              ? "dia-con-cita"
                              : ""
                          }
                        `}

                        onClick={() => {

                          setDiaSeleccionado(
                            dia
                          );

                          setResultadosBusqueda(
                            null
                          );

                          setMensajeAgenda(
                            ""
                          );

                          setCitaSeleccionada(
                            null
                          );

                        }}
                      >

                        <span>
                          {dia}
                        </span>


                        {tieneCitas && (

                          <span className="punto-cita">
                            •
                          </span>

                        )}

                      </button>

                    );

                  }
                )}


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
                DISPONIBILIDAD
                ========================= */}

            <section className="seccion-disponibilidad">


              <h3>
                Disponibilidad del día
              </h3>


              <p className="fecha-disponibilidad">

                {diaSeleccionado}

                /

                {mesActual + 1}

                /

                {anioActual}

              </p>


              <div className="lista-disponibilidad">


                {disponibilidadDelDia.map(
                  (horario) => (

                    <button
                      key={
                        horario.hora
                      }

                      type="button"

                      className={
                        horario.ocupado
                          ? "horario horario-ocupado"
                          : "horario horario-libre"
                      }

                      disabled={
                        horario.ocupado
                      }

                      onClick={() => {

                        setHoraParaNuevaCita(
                          horario.hora
                        );

                        setPantalla(
                          "generar"
                        );

                      }}
                    >

                      <span className="hora-disponibilidad">
                        {horario.hora}
                      </span>


                      {horario.ocupado ? (

                        <span>

                          Ocupado ·{" "}

                          {
                            horario
                              .cita
                              ?.dentista
                          }

                        </span>

                      ) : (

                        <span>
                          Libre
                        </span>

                      )}


                    </button>

                  )
                )}


              </div>


            </section>


          </div>


        </div>


      </section>


    </main>

  );

}


export default Agenda;