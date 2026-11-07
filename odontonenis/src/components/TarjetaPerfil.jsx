function TarjetaPerfil({
  nombre,
  avatar,
  paleta,
  alSeleccionar,
  alEditar,
}) {

  return (

    <article className={`tarjeta-perfil ${paleta}`}>


      {/* AVATAR */}

      <div className="avatar-temporal">

        <img
          src={avatar}
          alt={`Avatar de ${nombre}`}
        />

      </div>


      {/* NOMBRE */}

      <h2>
        {nombre}
      </h2>


      {/* BOTÓN INGRESAR */}

      <button
        type="button"
        className="boton-ingresar"
        onClick={alSeleccionar}
      >
        Ingresar
      </button>


      {/* BOTÓN EDITAR */}

      <button
        type="button"
        className="boton-editar"
        onClick={alEditar}
      >
        Editar perfil
      </button>


    </article>

  );

}


export default TarjetaPerfil;