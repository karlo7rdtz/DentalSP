import "../styles/preguntasFirma.css";


function PreguntasFirma({
  datosPaciente,
  alVolver,
}) {

  const mostrarSiNo = (valor) => {

    if (valor === "si") {
      return "Sí";
    }

    if (valor === "no") {
      return "No";
    }

    return valor || "Sin respuesta";

  };


  return (

    <main className="pantalla-preguntas-firma">

      <section className="contenedor-preguntas-firma">


        <button
          type="button"
          className="boton-volver-preguntas"
          onClick={alVolver}
        >
          ← Volver al historial
        </button>


        <header className="encabezado-preguntas-firma">

          <h1>
            PREGUNTAS Y FIRMA
          </h1>

          <p>
            {datosPaciente.nombrePaciente}
          </p>

        </header>


        {/* =========================
            DATOS GENERALES
            ========================= */}

        <section className="bloque-preguntas">

          <h2>
            Datos del paciente
          </h2>


          <div className="grid-respuestas">


            <div>

              <span>
                Nombre
              </span>

              <strong>
                {
                  datosPaciente
                    .nombrePaciente
                }
              </strong>

            </div>


            <div>

              <span>
                Edad
              </span>

              <strong>
                {
                  datosPaciente.edad ||
                  "Sin respuesta"
                }
              </strong>

            </div>


            <div>

              <span>
                Fecha de nacimiento
              </span>

              <strong>
                {
                  datosPaciente
                    .fechaNacimiento ||
                  "Sin respuesta"
                }
              </strong>

            </div>


            <div>

              <span>
                Celular
              </span>

              <strong>
                {
                  datosPaciente.celular ||
                  "Sin respuesta"
                }
              </strong>

            </div>


          </div>

        </section>


        {/* =========================
            MOTIVO
            ========================= */}

        <section className="bloque-preguntas">

          <h2>
            Motivo de consulta
          </h2>

          <p className="respuesta-larga">

            {
              datosPaciente
                .motivoConsulta ||
              "Sin respuesta"
            }

          </p>

        </section>


        {/* =========================
            HISTORIAL BUCODENTAL
            ========================= */}

        <section className="bloque-preguntas">

          <h2>
            Historial bucodental
          </h2>


          <div className="lista-respuestas">


            <div>

              <span>
                ¿Mastica por ambos lados?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .mastigaAmbosLados
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Presenta cansancio al masticar?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .cansancioMasticar
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Aprieta o rechina los dientes?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .rechinaDientes
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Percibe sensibilidad?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .sensibilidad
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Presenta inflamación en encías?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .inflamacionEncias
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Le sangran las encías?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .sangradoEncias
                  )
                }
              </strong>

            </div>


          </div>

        </section>


        {/* =========================
            ANTECEDENTES
            ========================= */}

        <section className="bloque-preguntas">

          <h2>
            Antecedentes personales
          </h2>


          <div className="lista-respuestas">


            <div>

              <span>
                ¿Fuma?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente.fuma
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Padece alguna enfermedad?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .enfermedad
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Está bajo tratamiento médico?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .tratamientoMedico
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Tiene alguna alergia?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .alergia
                  )
                }
              </strong>

            </div>


            <div>

              <span>
                ¿Padece alguna enfermedad sanguínea?
              </span>

              <strong>
                {
                  mostrarSiNo(
                    datosPaciente
                      .enfermedadSanguinea
                  )
                }
              </strong>

            </div>


          </div>


          <div className="estado-salud">

            <span>
              Estado actual de salud
            </span>

            <strong>
              {
                datosPaciente
                  .estadoSaludActual ||
                "Sin respuesta"
              }
            </strong>

          </div>

        </section>


        {/* =========================
            FIRMA
            ========================= */}

        <section className="bloque-preguntas">

          <h2>
            Firma del paciente
          </h2>


          <div className="firma-guardada">

            {datosPaciente.firma ? (

              <img
                src={
                  datosPaciente.firma
                }

                alt="Firma del paciente"
              />

            ) : (

              <p>
                La firma aparecerá aquí cuando conectemos
                el registro real del paciente.
              </p>

            )}

          </div>

        </section>


      </section>

    </main>

  );

}


export default PreguntasFirma;