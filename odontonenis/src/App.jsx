
//<<<<<<< main
//import { useState } from "react";
//import Menu from "./menu";
//import SeguimientoPaciente from "./seguimientopaciente";
//import SeguimientoTratamiento from "./seguimientotratamiento";
//import SeguimientoDiente from "./seguimientodiente";
//import "./App.css";

//import miFondo from "./assets/fondo.jpeg";

//export default function App() {
  //const [pantalla, setPantalla] = useState("inicio");
  //const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  //const [dienteSeleccionado, setDienteSeleccionado] = useState(null);

  //const handleLogin = () => {
    //setPantalla("menu");
  //};

 // if (pantalla === "menu") {
   // return (
     // <Menu
       // nombreUsuario="usuario1"
       // abrirSeguimientoPaciente={() =>
         // setPantalla("seguimientopaciente")
       // }
     // />
   // );
 // }

 // if (pantalla === "seguimientopaciente") {
   // return (
     // <SeguimientoPaciente
       // abrirSeguimiento={(paciente) => {
         // setPacienteSeleccionado(paciente);
         // setPantalla("seguimientotratamiento");
       // }}
     // />
   // );
 // }

 // if (pantalla === "seguimientotratamiento") {
   // return (
    //  <SeguimientoTratamiento
      //  paciente={pacienteSeleccionado}
       // abrirSeguimientoDiente={(numeroDiente) => {
        //  setDienteSeleccionado(numeroDiente);
         // setPantalla("seguimientodiente");
       // }}
     // />
   // );
 // }

 // if (pantalla === "seguimientodiente") {
   // return (
     // <SeguimientoDiente
       // numeroDiente={dienteSeleccionado}
       // volverMenu={() => setPantalla("menu")}
     // />
   // );
 // }

 // return (
   // <div style={styles.container}>
     // <div style={styles.leftPanel}></div>

     // <div style={styles.centerPanel}>
       // <h1 style={styles.title}>BIENVENIDA</h1>

       // <button
         // style={styles.button}
         // onClick={handleLogin}
       // >
         // Iniciar sesión
       // </button>
     // </div>

     // <div style={styles.rightPanel}></div>
   // </div>
 // );
//}

// const styles = {
 // container: {
   // display: "flex",
   // width: "100vw",
   // height: "100vh",
   // margin: 0,
   // padding: 0,
   // overflow: "hidden",
   // boxSizing: "border-box",
   // fontFamily: "sans-serif",
 // },

 // leftPanel: {
   // width: "26%",
   // backgroundImage: `url(${miFondo})`,
   // backgroundRepeat: "repeat",
   // backgroundSize: "250px auto",
   // backgroundColor: "#ffffff",
  // },

//  centerPanel: {
  //  width: "40%",
  //  backgroundColor: "#83C5BE",
 //   display: "flex",
 //   flexDirection: "column",
//    alignItems: "center",
 //   justifyContent: "center",
 //   gap: "30px",
//  },

//  rightPanel: {
//    flex: 1,
 //   backgroundImage: `url(${miFondo})`,
  // backgroundRepeat: "repeat",
  //  backgroundSize: "250px auto",
  //  backgroundColor: "#ffffff",
//  },

  // title: {
  //  color: "#006D77",
  //  fontSize: "1.8rem",
  //  fontWeight: "bold",
  //  letterSpacing: "1.5px",
  //  margin: 0,
 // }, //

//  button: {
   // backgroundColor: "#006D77",
   // color: "#EDF6F9",
   // border: "none",
   // borderRadius: "20px",
   // padding: "8px 25px",
   // fontSize: "0.85rem",
   // fontWeight: "bold",
   // cursor: "pointer",
  //},
//};
=======
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
//import RegistroPaciente from "./pages/registroPacientes";

//function App() {
  //return <RegistroPaciente />;
//}

//export default App;

//****CUARTA INTERFAZ AGENDA****//
// import Agenda from "./pages/agenda";

// function App() {
  // return <Agenda />;
//}

// export default App;

//****QUINTA INTERFAZ GENERAR CITA****//

//import HistorialClinico from "./pages/historialClinico";

//function App() {
  //return <HistorialClinico />;
//}

//export default App;
//>>>>>>> feature/perfiles
