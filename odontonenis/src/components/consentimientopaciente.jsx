import "../styles/consentimientoPaciente.css";

function ConsentimientoPaciente({
  nombrePaciente = "Nombre del paciente",
}) {
  return (
    <main className="pantalla-consentimiento">

      <section className="hoja-consentimiento">

        {/* LOGO DE LA DENTISTA */}
        <div className="logo-consentimiento">
          LOGO
        </div>


        <h1>
          INFORMACIÓN Y CONSENTIMIENTO DEL PACIENTE
        </h1>


        <div className="texto-consentimiento">

          <p>
            Por medio del presente, yo{" "}
            <strong>{nombrePaciente}</strong>,
            autorizo al profesional responsable y a sus
            auxiliares para realizar los procedimientos
            odontológicos necesarios para el cuidado de
            mi salud bucal.
          </p>

          <p>
            Declaro que se me han explicado los objetivos
            del tratamiento, así como las alternativas
            disponibles y los procedimientos que pudieran
            ser necesarios durante mi atención.
          </p>

          <p>
            Comprendo que durante o después de los
            procedimientos pueden presentarse molestias
            como dolor, inflamación, sensibilidad u otras
            reacciones propias del tratamiento.
          </p>

          <p>
            Me comprometo a seguir las indicaciones
            proporcionadas por el profesional tratante y
            manifiesto haber proporcionado información
            verídica en mi historia clínica.
          </p>

          <p>
            Asimismo, manifiesto haber tenido la
            oportunidad de resolver mis dudas antes de
            otorgar mi consentimiento.
          </p>

        </div>


        {/* FIRMA */}

        <section className="seccion-firma">

          <h2>
            Firma del paciente
          </h2>

          <p className="instruccion-firma">
            Firme dentro del recuadro utilizando el dedo,
            lápiz digital o mouse.
          </p>


          <div className="area-firma">
            Aquí colocaremos la firma táctil
          </div>


          <div className="botones-firma">

            <button
              type="button"
              className="boton-borrar-firma"
            >
              Borrar firma
            </button>


            <button
              type="button"
              className="boton-registrar-paciente"
            >
              Registrar paciente
            </button>

          </div>

        </section>

      </section>

    </main>
  );
}

export default ConsentimientoPaciente;