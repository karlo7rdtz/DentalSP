import {
  createContext,
  useContext,
  useState,
} from "react";


const AppContext =
  createContext(null);


export function AppProvider({
  children,
}) {

  // ==========================================
  // PERFIL QUE INICIÓ SESIÓN
  // ==========================================

  const [
    perfilActual,
    setPerfilActual,
  ] = useState(null);


  // ==========================================
  // PACIENTE QUE ESTAMOS CONSULTANDO
  // ==========================================

  const [
    pacienteActual,
    setPacienteActual,
  ] = useState(null);


  // ==========================================
  // PACIENTES TEMPORALES
  // Después vendrán de Supabase
  // ==========================================

  const [
    pacientes,
    setPacientes,
  ] = useState([]);


  // ==========================================
  // REGISTRAR PACIENTE
  // ==========================================

  const registrarPaciente = (
    datosPaciente
  ) => {

    const pacienteCompleto = {

      ...datosPaciente,

      id:
        datosPaciente.id ||
        crypto.randomUUID(),

      dentistaId:
        perfilActual?.id ||
        null,

      dentistaNombre:
        perfilActual?.nombre ||
        "",

    };


    setPacientes(
      pacientesAnteriores => [
        ...pacientesAnteriores,
        pacienteCompleto,
      ]
    );


    setPacienteActual(
      pacienteCompleto
    );


    return pacienteCompleto;

  };


  return (

    <AppContext.Provider
      value={{

        perfilActual,
        setPerfilActual,

        pacienteActual,
        setPacienteActual,

        pacientes,
        setPacientes,

        registrarPaciente,

      }}
    >

      {children}

    </AppContext.Provider>

  );

}


export function useApp() {

  const contexto =
    useContext(AppContext);


  if (!contexto) {

    throw new Error(
      "useApp debe utilizarse dentro de AppProvider"
    );

  }


  return contexto;

}