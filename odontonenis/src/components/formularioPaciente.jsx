import { useState } from "react";
import PreguntaSiNo from "./preguntaSiNo";

import "../styles/registroPaciente.css";


function FormularioPaciente({
  alFirmarConsentimiento,
  datosIniciales,
}) {
  const [datos, setDatos] = useState(
  datosIniciales || {

    // =========================
    // PASO 1
    // DATOS DEL PACIENTE
    // =========================

    motivoConsulta: "",
    nombrePaciente: "",
    edad: "",
    fechaNacimiento: "",
    direccion: "",
    celular: "",
    contactoEmergencia: "",
    referidoPor: "",

    regimenFiscal: "",
    rfc: "",
    correoElectronico: "",


    // =========================
    // PASO 2
    // HISTORIAL BUCODENTAL
    // =========================

    mastigaAmbosLados: "",
    cansancioMasticar: "",
    dolorMuscular: "",
    rechinaDientes: "",
    rechinaDia: "",
    rechinaNoche: "",
    dolorArticulacion: "",
    bloqueoMandibula: "",


    // =========================
    // PASO 3
    // ANTECEDENTES ODONTOLÓGICOS
    // =========================

    ortodoncia: false,
    endodoncia: false,
    periodoncia: false,

    molestiaDiente: "",

    molestiaArriba: false,
    molestiaAbajo: false,
    molestiaIzquierda: false,
    molestiaDerecha: false,
    molestiaDia: false,
    molestiaNoche: false,

    sensibilidad: "",

    sensibilidadFrio: false,
    sensibilidadCalor: false,
    sensibilidadDulce: false,

    ultimoProcedimiento: "",

    inflamacionEncias: "",
    sangradoEncias: "",
    movilidadDentaria: "",


    // =========================
    // PASO 4
    // HIGIENE BUCAL
    // =========================

    frecuenciaCepillado: "",
    tipoCepillo: "",
    frecuenciaCambioCepillo: "",

    usaAditamento: "",
    aditamento: "",

    ensenaronCepillado: "",


    // =========================
    // PASO 5
    // ANTECEDENTES PERSONALES
    // =========================

    fuma: "",
    cigarrosDia: "",

    anestesiadoAntes: "",
    complicacionAnestesia: "",

    conoceProblemasDientesFaltantes: "",

    enfermedad: "",
    cualEnfermedad: "",

    tratamientoMedico: "",
    cualTratamiento: "",

    alergia: "",
    cualAlergia: "",

    enfermedadSanguinea: "",
    cualEnfermedadSanguinea: "",

    estadoSaludActual: "",
  });


  // =========================
  // CONTROL DE PASOS
  // =========================

  const [pasoActual, setPasoActual] = useState(1);

  const totalPasos = 5;


  // =========================
  // ACTUALIZAR CAMPOS
  // =========================

  const actualizarCampo = (campo, valor) => {

    setDatos({
      ...datos,
      [campo]: valor,
    });

  };


  // =========================
  // SIGUIENTE
  // =========================

  const siguientePaso = () => {

    if (pasoActual < totalPasos) {

      setPasoActual(pasoActual + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }

  };


  // =========================
  // ANTERIOR
  // =========================

  const pasoAnterior = () => {

    if (pasoActual > 1) {

      setPasoActual(pasoActual - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }

  };


  return (

    <main className="pantalla-registro">

      <section className="formulario-paciente">


        {/* =========================
            ENCABEZADO
            ========================= */}

        <div className="encabezado-formulario">

          <div className="espacio-logo">
            LOGO
          </div>

          <h1>
            HISTORIAL CLÍNICO
          </h1>

        </div>


        {/* =========================
            BARRA DE PROGRESO
            ========================= */}

        <div className="progreso-formulario">

          <div className="texto-progreso">

            <span>
              Paso {pasoActual} de {totalPasos}
            </span>

            <span>

              {pasoActual === 1 &&
                "Datos del paciente"}

              {pasoActual === 2 &&
                "Historial bucodental"}

              {pasoActual === 3 &&
                "Antecedentes odontológicos"}

              {pasoActual === 4 &&
                "Higiene bucal"}

              {pasoActual === 5 &&
                "Antecedentes personales"}

            </span>

          </div>


          <div className="barra-progreso">

            <div
              className="barra-progreso-activa"
              style={{
                width:
                  `${(pasoActual / totalPasos) * 100}%`,
              }}
            />

          </div>

        </div>


        {/* ==================================================
            PASO 1
            DATOS DEL PACIENTE
            ================================================== */}

        {pasoActual === 1 && (

          <div className="paso-formulario">

            {/* MOTIVO DE CONSULTA */}

            <section className="seccion-formulario">

              <h2>
                Motivo de consulta
              </h2>

              <label className="campo-completo">

                <textarea
                  value={datos.motivoConsulta}
                  onChange={(evento) =>
                    actualizarCampo(
                      "motivoConsulta",
                      evento.target.value
                    )
                  }
                  placeholder="Escriba el motivo de consulta..."
                />

              </label>

            </section>


            {/* FICHA DE IDENTIFICACIÓN */}

            <section className="seccion-formulario">

              <h2>
                Ficha de identificación
              </h2>


              <label className="campo-completo">

                Nombre del paciente

                <input
                  type="text"
                  value={datos.nombrePaciente}
                  onChange={(evento) =>
                    actualizarCampo(
                      "nombrePaciente",
                      evento.target.value
                    )
                  }
                />

              </label>


              <div className="fila-formulario">

                <label>

                  Edad

                  <input
                    type="number"
                    min="0"
                    value={datos.edad}
                    onChange={(evento) =>
                      actualizarCampo(
                        "edad",
                        evento.target.value
                      )
                    }
                  />

                </label>


                <label>

                  Fecha de nacimiento

                  <input
                    type="date"
                    value={datos.fechaNacimiento}
                    onChange={(evento) =>
                      actualizarCampo(
                        "fechaNacimiento",
                        evento.target.value
                      )
                    }
                  />

                </label>

              </div>


              <label className="campo-completo">

                Dirección

                <input
                  type="text"
                  value={datos.direccion}
                  onChange={(evento) =>
                    actualizarCampo(
                      "direccion",
                      evento.target.value
                    )
                  }
                />

              </label>


              <div className="fila-formulario">

                <label>

                  Celular

                  <input
                    type="tel"
                    value={datos.celular}
                    onChange={(evento) =>
                      actualizarCampo(
                        "celular",
                        evento.target.value
                      )
                    }
                  />

                </label>


                <label>

                  Contacto de emergencia

                  <input
                    type="tel"
                    value={datos.contactoEmergencia}
                    onChange={(evento) =>
                      actualizarCampo(
                        "contactoEmergencia",
                        evento.target.value
                      )
                    }
                  />

                </label>

              </div>


              <label className="campo-completo">

                Referido por

                <input
                  type="text"
                  value={datos.referidoPor}
                  onChange={(evento) =>
                    actualizarCampo(
                      "referidoPor",
                      evento.target.value
                    )
                  }
                />

              </label>

            </section>


            {/* DATOS FISCALES */}

            <section className="seccion-formulario">

              <h2>
                Datos fiscales
              </h2>


              <label className="campo-completo">

                Régimen fiscal

                <input
                  type="text"
                  value={datos.regimenFiscal}
                  onChange={(evento) =>
                    actualizarCampo(
                      "regimenFiscal",
                      evento.target.value
                    )
                  }
                />

              </label>


              <div className="fila-formulario">

                <label>

                  RFC

                  <input
                    type="text"
                    value={datos.rfc}
                    onChange={(evento) =>
                      actualizarCampo(
                        "rfc",
                        evento.target.value
                      )
                    }
                  />

                </label>


                <label>

                  Correo electrónico

                  <input
                    type="email"
                    value={datos.correoElectronico}
                    onChange={(evento) =>
                      actualizarCampo(
                        "correoElectronico",
                        evento.target.value
                      )
                    }
                  />

                </label>

              </div>

            </section>

          </div>

        )}


        {/* ==================================================
            PASO 2
            HISTORIAL BUCODENTAL
            ================================================== */}

        {pasoActual === 2 && (

          <div className="paso-formulario">

            <section className="seccion-formulario">

              <h2>
                Historial bucodental
              </h2>


              <PreguntaSiNo
                pregunta="¿Mastica por ambos lados de la boca?"
                valor={datos.mastigaAmbosLados}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "mastigaAmbosLados",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Sensación de cansancio mientras mastica o al hablar mucho?"
                valor={datos.cansancioMasticar}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "cansancioMasticar",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Cansancio o dolor muscular en la cara o cuello al despertar?"
                valor={datos.dolorMuscular}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "dolorMuscular",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Aprieta o rechina los dientes?"
                valor={datos.rechinaDientes}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "rechinaDientes",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Aprieta o rechina los dientes durante el día?"
                valor={datos.rechinaDia}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "rechinaDia",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Aprieta o rechina los dientes durante la noche?"
                valor={datos.rechinaNoche}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "rechinaNoche",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Tiene dolor o chasquidos en la articulación al abrir la boca, comer o bostezar?"
                valor={datos.dolorArticulacion}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "dolorArticulacion",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Tiene problemas de traba o bloqueo en la articulación de la mandíbula?"
                valor={datos.bloqueoMandibula}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "bloqueoMandibula",
                    valor
                  )
                }
              />

            </section>

          </div>

        )}


        {/* ==================================================
            PASO 3
            ANTECEDENTES ODONTOLÓGICOS
            ================================================== */}

        {pasoActual === 3 && (

          <div className="paso-formulario">

            <section className="seccion-formulario">

              <h2>
                Antecedentes odontológicos
              </h2>


              <div className="grupo-pregunta">

                <p>
                  ¿Ha estado en tratamiento de:
                </p>


                <div className="opciones-checkbox">

                  <label>

                    <input
                      type="checkbox"
                      checked={datos.ortodoncia}
                      onChange={(evento) =>
                        actualizarCampo(
                          "ortodoncia",
                          evento.target.checked
                        )
                      }
                    />

                    Ortodoncia

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      checked={datos.endodoncia}
                      onChange={(evento) =>
                        actualizarCampo(
                          "endodoncia",
                          evento.target.checked
                        )
                      }
                    />

                    Endodoncia

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      checked={datos.periodoncia}
                      onChange={(evento) =>
                        actualizarCampo(
                          "periodoncia",
                          evento.target.checked
                        )
                      }
                    />

                    Periodoncia

                  </label>

                </div>

              </div>


              <PreguntaSiNo
                pregunta="¿Siente molestia en algún diente?"
                valor={datos.molestiaDiente}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "molestiaDiente",
                    valor
                  )
                }
              />


              <div className="grupo-pregunta">

                <p>
                  Ubicación de la molestia
                </p>

                <div className="opciones-checkbox">

                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaArriba}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaArriba",
                          evento.target.checked
                        )
                      }
                    />
                    Arriba
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaAbajo}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaAbajo",
                          evento.target.checked
                        )
                      }
                    />
                    Abajo
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaIzquierda}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaIzquierda",
                          evento.target.checked
                        )
                      }
                    />
                    Izquierda
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaDerecha}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaDerecha",
                          evento.target.checked
                        )
                      }
                    />
                    Derecha
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaDia}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaDia",
                          evento.target.checked
                        )
                      }
                    />
                    Día
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.molestiaNoche}
                      onChange={(evento) =>
                        actualizarCampo(
                          "molestiaNoche",
                          evento.target.checked
                        )
                      }
                    />
                    Noche
                  </label>

                </div>

              </div>


              <PreguntaSiNo
                pregunta="¿Percibe sensibilidad?"
                valor={datos.sensibilidad}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "sensibilidad",
                    valor
                  )
                }
              />


              <div className="grupo-pregunta">

                <p>
                  ¿Con qué presenta sensibilidad?
                </p>

                <div className="opciones-checkbox">

                  <label>
                    <input
                      type="checkbox"
                      checked={datos.sensibilidadFrio}
                      onChange={(evento) =>
                        actualizarCampo(
                          "sensibilidadFrio",
                          evento.target.checked
                        )
                      }
                    />
                    Frío
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.sensibilidadCalor}
                      onChange={(evento) =>
                        actualizarCampo(
                          "sensibilidadCalor",
                          evento.target.checked
                        )
                      }
                    />
                    Calor
                  </label>


                  <label>
                    <input
                      type="checkbox"
                      checked={datos.sensibilidadDulce}
                      onChange={(evento) =>
                        actualizarCampo(
                          "sensibilidadDulce",
                          evento.target.checked
                        )
                      }
                    />
                    Dulce
                  </label>

                </div>

              </div>


              <label className="campo-completo">

                ¿Cuál fue el último procedimiento dental que le realizaron?

                <input
                  type="text"
                  value={datos.ultimoProcedimiento}
                  onChange={(evento) =>
                    actualizarCampo(
                      "ultimoProcedimiento",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Siente inflamación o irritación en sus encías?"
                valor={datos.inflamacionEncias}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "inflamacionEncias",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Le sangran las encías?"
                valor={datos.sangradoEncias}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "sangradoEncias",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Tiene movilidad dentaria?"
                valor={datos.movilidadDentaria}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "movilidadDentaria",
                    valor
                  )
                }
              />

            </section>

          </div>

        )}


        {/* ==================================================
            PASO 4
            HIGIENE BUCAL
            ================================================== */}

        {pasoActual === 4 && (

          <div className="paso-formulario">

            <section className="seccion-formulario">

              <h2>
                Higiene bucal
              </h2>


              <label className="campo-completo">

                ¿Con qué frecuencia usa el cepillo de dientes?

                <input
                  type="text"
                  value={datos.frecuenciaCepillado}
                  onChange={(evento) =>
                    actualizarCampo(
                      "frecuenciaCepillado",
                      evento.target.value
                    )
                  }
                />

              </label>


              <div className="fila-formulario">

                <label>

                  ¿Qué tipo de cepillo usa?

                  <input
                    type="text"
                    value={datos.tipoCepillo}
                    onChange={(evento) =>
                      actualizarCampo(
                        "tipoCepillo",
                        evento.target.value
                      )
                    }
                  />

                </label>


                <label>

                  ¿Cada cuánto cambia su cepillo?

                  <input
                    type="text"
                    value={datos.frecuenciaCambioCepillo}
                    onChange={(evento) =>
                      actualizarCampo(
                        "frecuenciaCambioCepillo",
                        evento.target.value
                      )
                    }
                  />

                </label>

              </div>


              <PreguntaSiNo
                pregunta="¿Usa otro tipo de aditamento para limpiar sus dientes?"
                valor={datos.usaAditamento}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "usaAditamento",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿Cuál?

                <input
                  type="text"
                  value={datos.aditamento}
                  onChange={(evento) =>
                    actualizarCampo(
                      "aditamento",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Le han enseñado alguna vez a cepillarse correctamente la boca?"
                valor={datos.ensenaronCepillado}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "ensenaronCepillado",
                    valor
                  )
                }
              />

            </section>

          </div>

        )}


        {/* ==================================================
            PASO 5
            ANTECEDENTES PERSONALES PATOLÓGICOS
            ================================================== */}

        {pasoActual === 5 && (

          <div className="paso-formulario">

            <section className="seccion-formulario">

              <h2>
                Antecedentes Personales Patológicos
              </h2>


              <PreguntaSiNo
                pregunta="¿Fuma?"
                valor={datos.fuma}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "fuma",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿Cuántos cigarrillos consume al día?

                <input
                  type="number"
                  min="0"
                  value={datos.cigarrosDia}
                  onChange={(evento) =>
                    actualizarCampo(
                      "cigarrosDia",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Alguna vez lo han anestesiado para repararle sus dientes?"
                valor={datos.anestesiadoAntes}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "anestesiadoAntes",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Presentó alguna complicación con la anestesia bucal?"
                valor={datos.complicacionAnestesia}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "complicacionAnestesia",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Conoce los problemas que puede causarle no reponer los dientes faltantes?"
                valor={datos.conoceProblemasDientesFaltantes}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "conoceProblemasDientesFaltantes",
                    valor
                  )
                }
              />


              <PreguntaSiNo
                pregunta="¿Padece alguna enfermedad?"
                valor={datos.enfermedad}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "enfermedad",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿Cuál?

                <input
                  type="text"
                  value={datos.cualEnfermedad}
                  onChange={(evento) =>
                    actualizarCampo(
                      "cualEnfermedad",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Está bajo algún tratamiento médico?"
                valor={datos.tratamientoMedico}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "tratamientoMedico",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿Cuál?

                <input
                  type="text"
                  value={datos.cualTratamiento}
                  onChange={(evento) =>
                    actualizarCampo(
                      "cualTratamiento",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Es alérgico a algún medicamento, alimento u otra cosa?"
                valor={datos.alergia}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "alergia",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿A qué?

                <input
                  type="text"
                  value={datos.cualAlergia}
                  onChange={(evento) =>
                    actualizarCampo(
                      "cualAlergia",
                      evento.target.value
                    )
                  }
                />

              </label>


              <PreguntaSiNo
                pregunta="¿Padece Hemofilia o alguna enfermedad sanguínea?"
                valor={datos.enfermedadSanguinea}
                alCambiar={(valor) =>
                  actualizarCampo(
                    "enfermedadSanguinea",
                    valor
                  )
                }
              />


              <label className="campo-completo">

                ¿Cuál?

                <input
                  type="text"
                  value={datos.cualEnfermedadSanguinea}
                  onChange={(evento) =>
                    actualizarCampo(
                      "cualEnfermedadSanguinea",
                      evento.target.value
                    )
                  }
                />

              </label>


              <label className="campo-completo">

                ¿Cómo considera que es su estado de salud actual?

                <textarea
                  value={datos.estadoSaludActual}
                  onChange={(evento) =>
                    actualizarCampo(
                      "estadoSaludActual",
                      evento.target.value
                    )
                  }
                  placeholder="Describa brevemente..."
                />

              </label>

            </section>

          </div>

        )}


            {/* =========================
                NAVEGACIÓN
                ========================= */}

            <div className="navegacion-formulario">

              {pasoActual > 1 && (

                <button
                  type="button"
                  className="boton-anterior"
                  onClick={pasoAnterior}
                >
                  ← Anterior
                </button>

              )}


              {pasoActual < totalPasos ? (

                <button
                  type="button"
                  className="boton-siguiente"
                  onClick={siguientePaso}
                >
                  Siguiente →
                </button>

              ) : (

                <button
                  type="button"
                  className="boton-consentimiento"
                  onClick={() =>
                    alFirmarConsentimiento(datos)
                  }
                >
                  Firmar consentimiento
                </button>

              )}

            </div>

        </section>

      </main>            
    );
 }

export default FormularioPaciente;