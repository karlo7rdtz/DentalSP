import { useState } from "react";

import FormularioPaciente
  from "../components/formularioPaciente";

import ConsentimientoPaciente
  from "../components/consentimientopaciente";


function RegistroPaciente() {

  const [pantalla, setPantalla] =
    useState("formulario");

  const [datosPaciente, setDatosPaciente] =
    useState(null);

  const [registroFinal, setRegistroFinal] =
    useState(null);


  // =========================
  // ABRIR CONSENTIMIENTO
  // =========================

  const abrirConsentimiento = (datos) => {

    setDatosPaciente(datos);

    setPantalla("consentimiento");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================
  // VOLVER AL FORMULARIO
  // =========================

  const volverAlFormulario = () => {

    setPantalla("formulario");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================
  // REGISTRAR PACIENTE
  // =========================

  const registrarPaciente = (datosCompletos) => {

    setRegistroFinal(datosCompletos);

    setPantalla("exito");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================
  // PANTALLA DE ÉXITO
  // =========================

  if (
    pantalla === "exito" &&
    registroFinal
  ) {

    return (
      <main className="pantalla-registro">

        <section className="formulario-paciente">

          <div className="registro-exitoso">

            <div className="icono-exito">
              ✓
            </div>

            <h1>
              Paciente registrado
            </h1>

            <p>
              El registro de{" "}
              <strong>
                {registroFinal.nombrePaciente}
              </strong>{" "}
              fue completado correctamente.
            </p>


            <button
              type="button"
              className="boton-nuevo-paciente"
              onClick={() => {

                setDatosPaciente(null);

                setRegistroFinal(null);

                setPantalla("formulario");

              }}
            >
              Registrar otro paciente
            </button>

          </div>

        </section>

      </main>
    );

  }


  // =========================
  // CONSENTIMIENTO
  // =========================

  if (
    pantalla === "consentimiento" &&
    datosPaciente
  ) {

    return (
      <ConsentimientoPaciente
        datosPaciente={datosPaciente}

        alVolver={
          volverAlFormulario
        }

        alRegistrarPaciente={
          registrarPaciente
        }
      />
    );

  }


  // =========================
  // FORMULARIO
  // =========================

  return (
    <FormularioPaciente
      alFirmarConsentimiento={
        abrirConsentimiento
      }
    />
  );

}


export default RegistroPaciente;