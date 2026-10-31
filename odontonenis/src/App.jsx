
//****PRIMERA INTERFAZ PERFILES****//

//import SeleccionarPerfil from "./pages/seleccionarPerfil";

//function App() {
 // return (
   // <SeleccionarPerfil />
 // );
//}

// export default App;

//****SEGUNDA INTERFAZ CONSENTIMIENTO PACIENTE****//

//import RegistroPaciente from "./pages/registroPacientes";

//function App() {
  //return <RegistroPaciente />;
//}

//export default App;

//****TERCERA INTERFAZ CONSENTIMIENTO PACIENTE****//

import ConsentimientoPaciente from "./components/consentimientopaciente";

function App() {
  return (
    <ConsentimientoPaciente
      nombrePaciente="Paciente de prueba"
    />
  );
}

export default App;