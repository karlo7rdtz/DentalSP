function TarjetaPerfil({
  nombre,
  avatar,
  paleta,
  alSeleccionar,
  alEditar,
}) {
  return (
    <article className={`tarjeta-perfil ${paleta}`}>

     <div className="avatar-temporal">
      <img
        src={avatar}
        alt={`Avatar de ${nombre}`}
    />
      </div>

      <h2>{nombre}</h2>

      <button
        className="boton-ingresar"
        onClick={alSeleccionar}
      >
        Ingresar
      </button>

      <button
        className="boton-editar"
        onClick={alEditar}
      >
        Editar perfil
      </button>

    </article>
  );
}

export default TarjetaPerfil;