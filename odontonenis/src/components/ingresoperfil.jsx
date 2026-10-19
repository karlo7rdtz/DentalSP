import { useState } from "react";
import obtenerFondo from "../utils/obtenerfondo";

function IngresoPerfil({
  perfil,
  alVolver,
  alGuardarContrasena,
  alValidarContrasena,
}) {
  const fondo = obtenerFondo(
    perfil.paleta,
    "login"
  );

  const [contrasena, setContrasena] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const [cambiarContrasena, setCambiarContrasena] =
    useState(false);

  const [mensaje, setMensaje] = useState("");

  const tieneContrasena =
    perfil.contrasena !== "";

  const iniciarSesion = () => {
    const esCorrecta =
      alValidarContrasena(contrasena);

    if (esCorrecta) {
      setMensaje("Contraseña correcta.");
    } else {
      setMensaje("Contraseña incorrecta.");
    }
  };

  const guardarNuevaContrasena = () => {
    if (nuevaContrasena.length < 6) {
      setMensaje(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (
      nuevaContrasena !== confirmarContrasena
    ) {
      setMensaje(
        "Las contraseñas no coinciden."
      );
      return;
    }

    alGuardarContrasena(nuevaContrasena);

    setNuevaContrasena("");
    setConfirmarContrasena("");
    setCambiarContrasena(false);

    setMensaje(
      "Contraseña guardada correctamente."
    );
  };

  return (
    <main
      className={`pantalla-ingreso-perfil ${perfil.paleta}`}
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >

      <section
        className={`panel-ingreso-perfil ${perfil.paleta}`}
      >

        <button
          className="boton-volver"
          onClick={alVolver}
        >
          ← Volver
        </button>


        <h1>
          HOLA {perfil.nombre.toUpperCase()}
        </h1>


        <div className="avatar-login">
          <img
            src={perfil.avatar}
            alt={`Avatar de ${perfil.nombre}`}
          />
        </div>


        {!tieneContrasena &&
        !cambiarContrasena ? (
          <>
            <p className="texto-ayuda">
              Este perfil todavía no tiene
              contraseña.
            </p>

            <button
              className="boton-crear-contrasena"
              onClick={() =>
                setCambiarContrasena(true)
              }
            >
              Crear contraseña
            </button>
          </>
        ) : cambiarContrasena ? (
          <>

            <label className="campo-login">
              Nueva contraseña

              <input
                type="password"
                value={nuevaContrasena}
                onChange={(evento) =>
                  setNuevaContrasena(
                    evento.target.value
                  )
                }
              />
            </label>


            <label className="campo-login">
              Confirmar contraseña

              <input
                type="password"
                value={confirmarContrasena}
                onChange={(evento) =>
                  setConfirmarContrasena(
                    evento.target.value
                  )
                }
              />
            </label>


            <button
              className="boton-iniciar-perfil"
              onClick={
                guardarNuevaContrasena
              }
            >
              Guardar contraseña
            </button>


            {tieneContrasena && (
              <button
                className="boton-cancelar-cambio"
                onClick={() =>
                  setCambiarContrasena(false)
                }
              >
                Cancelar
              </button>
            )}

          </>
        ) : (
          <>

            <label className="campo-login">
              INGRESA TU CONTRASEÑA

              <input
                type="password"
                value={contrasena}
                onChange={(evento) =>
                  setContrasena(
                    evento.target.value
                  )
                }
              />
            </label>


            <button
              className="boton-iniciar-perfil"
              onClick={iniciarSesion}
            >
              Iniciar sesión
            </button>


            <button
              className="boton-cambiar-contrasena"
              onClick={() => {
                setCambiarContrasena(true);
                setMensaje("");
              }}
            >
              ¿Olvidaste o quieres cambiar tu
              contraseña?
            </button>

          </>
        )}


        {mensaje && (
          <p className="mensaje-login">
            {mensaje}
          </p>
        )}

      </section>

    </main>
  );
}

export default IngresoPerfil;