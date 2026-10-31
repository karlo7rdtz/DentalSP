import { useState } from "react";

import FormularioPaciente from "../components/formularioPaciente";
import ConsentimientoPaciente from "../components/consentimientopaciente";


function RegistroPaciente() {

  const [pantalla, setPantalla] =
    useState("formulario");

  const [datosPaciente, setDatosPaciente] =
    useState(null);


  const abrirConsentimiento = (datos) => {

    setDatosPaciente(datos);

    setPantalla("consentimiento");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  const volverAlFormulario = () => {

    setPantalla("formulario");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  if (
    pantalla === "consentimiento" &&
    datosPaciente
  ) {

    return (
      <ConsentimientoPaciente
        datosPaciente={datosPaciente}
        alVolver={volverAlFormulario}
      />
    );

  }


  return (
    <FormularioPaciente
      alFirmarConsentimiento={
        abrirConsentimiento
      }
    />
  );

}


export default RegistroPaciente;