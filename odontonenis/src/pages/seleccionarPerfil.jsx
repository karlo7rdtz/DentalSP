import { useState } from "react";

import TarjetaPerfil from "../components/TarjetaPerfil";
import IngresoPerfil from "../components/ingresoperfil";

import avatarDiente from "../assets/avatarv.png";
import avatarCapibara from "../assets/guadalupepe.png";
import avatarardilla from "../assets/ARDILLA.png";
import avatardiente2 from "../assets/diente2.png";

import "../styles/perfiles.css";

function SeleccionarPerfil() {
  const [perfiles, setPerfiles] = useState([
  
    {
      id: 1,
      nombre: "Perfil 1",
      avatar: avatarDiente,
      paleta: "paleta-4",
      contrasena: "",
      logo: null,
    },
    {
      id: 2,
      nombre: "Perfil 2",
      avatar: avatarDiente,
      paleta: "paleta-1",
      contrasena: "",
      logo: null,
    },
  ]);
const [perfilEditando, setPerfilEditando] = useState(null);
const [mostrarEditor, setMostrarEditor] = useState(false);
const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
const [nombre, setNombre] = useState("");
const [avatar, setAvatar] = useState(avatarDiente);
const [paleta, setPaleta] = useState("paleta-1");
const [logo, setLogo] = useState(null);
const abrirEditor = (perfil) => {
  setPerfilEditando(perfil);

  setNombre(perfil.nombre);
  setAvatar(perfil.avatar);
  setPaleta(perfil.paleta);
  setLogo(perfil.logo);
  setMostrarEditor(true);
};

const seleccionarLogo = (evento) => {
  const archivo = evento.target.files[0];

  if (!archivo) {
    return;
  }

  const lector = new FileReader();

  lector.onload = () => {
    setLogo(lector.result);
  };

  lector.readAsDataURL(archivo);
};

const guardarCambios = () => {
  const perfilesActualizados = perfiles.map((perfil) => {
    if (perfil.id === perfilEditando.id) {
      return {
        ...perfil,
        nombre: nombre,
        avatar: avatar,
        paleta: paleta,
        logo: logo,
      };
    }
 const guardarContrasena = (idPerfil, nuevaContrasena) => {
  const perfilesActualizados = perfiles.map((perfil) => {
    if (perfil.id === idPerfil) {
      return {
        ...perfil,
        contrasena: nuevaContrasena,
      };
    }

    return perfil;
  });

  setPerfiles(perfilesActualizados);

  setPerfilSeleccionado(
    perfilesActualizados.find(
      (perfil) => perfil.id === idPerfil
    )
  );
};
    return perfil;
  });

  setPerfiles(perfilesActualizados);

  setMostrarEditor(false);
};

if (perfilSeleccionado) {
  const perfilActual =
    perfiles.find(
      (perfil) =>
        perfil.id === perfilSeleccionado.id
    ) || perfilSeleccionado;

  return (
    <IngresoPerfil
      perfil={perfilActual}

      alVolver={() =>
        setPerfilSeleccionado(null)
      }

      alGuardarContrasena={(nuevaContrasena) =>
        guardarContrasena(
          perfilActual.id,
          nuevaContrasena
        )
      }

      alValidarContrasena={(contrasenaIngresada) =>
        contrasenaIngresada ===
        perfilActual.contrasena
      }
    />
  );
}

  return (
    <main className="pantalla-perfiles">
      <section className="panel-perfiles">

        <h1>¿QUIÉN DESEA INGRESAR?</h1>
<div className="contenedor-perfiles">

  {perfiles.map((perfil) => (
    <TarjetaPerfil
      key={perfil.id}
      nombre={perfil.nombre}
      avatar={perfil.avatar}
      paleta={perfil.paleta}
      alSeleccionar={() =>
        setPerfilSeleccionado(perfil)
      }
      alEditar={() =>
        abrirEditor(perfil)
      }
    />
  ))}

</div>

      </section>

       {mostrarEditor && (

        <div className="fondo-editor">

          <section className={`editor-perfil ${paleta}`}>

            <h2>Editar perfil</h2>

            <label>
              Nombre

              <input
                type="text"
                value={nombre}
                onChange={(evento) =>
                  setNombre(evento.target.value)
                }
              />
            </label>


           <label>
           Avatar
          </label>

        <div className="selector-avatares">

        <button
         type="button"
         onClick={() => setAvatar(avatarDiente)}
          >
         <img
        src={avatarDiente}
         alt="Avatar diente"
       />
        </button>

     <button
         type="button"
        onClick={() => setAvatar(avatarCapibara)}
     >
    <img
      src={avatarCapibara}
      alt="Avatar capibara"
    />
  </button>

  <button
    type="button"
    onClick={() => setAvatar(avatarardilla)}
  >
    <img
      src={avatarardilla}
      alt="Avatar ardilla"
    />
  </button>

  <button
    type="button"
    onClick={() => setAvatar(avatardiente2)}
  >
    <img
      src={avatardiente2}
      alt="Avatar diente 2"
    />
  </button>

</div>


            <label>
              Paleta de colores

              <select
                value={paleta}
                onChange={(evento) =>
                  setPaleta(evento.target.value)
                }
              >
                <option value="paleta-1">
                  Paleta 1
                </option>

                <option value="paleta-2">
                  Paleta 2
                </option>

                <option value="paleta-3">
                  Paleta 3
                </option>

                <option value="paleta-4">
                  Paleta 4
                </option>

                <option value="paleta-5">
                  Paleta 5
                </option>
              </select>
            </label>
            <label>
              Logo del consultorio

               <input
                  type="file"
                 accept="image/*"
                  onChange={seleccionarLogo}
               />
            </label>
            {logo && (
  <div className="vista-logo">

    <img
      src={logo}
      alt="Vista previa del logo"
    />

  </div>
)}
            <div className="vista-previa-perfil">

          <div className="avatar-temporal">
            <img
            src={avatar}
             alt="Avatar seleccionado"
           />
          </div>

          <h3>{nombre}</h3>

          </div>


            <div className="botones-editor">

              <button
                onClick={() =>
                  setMostrarEditor(false)
                }
              >
                Cancelar
              </button>

              <button onClick={guardarCambios}>
                Guardar
              </button>

            </div>

          </section>

        </div>

      )}

    </main>
  );
}

export default SeleccionarPerfil;