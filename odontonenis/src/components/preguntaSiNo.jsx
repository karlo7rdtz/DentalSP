function PreguntaSiNo({
  pregunta,
  valor,
  alCambiar,
}) {
  return (
    <div className="pregunta-si-no">

      <p>{pregunta}</p>

      <div className="opciones-si-no">

        <button
          type="button"
          className={
            valor === "si"
              ? "opcion-seleccionada"
              : ""
          }
          onClick={() =>
            alCambiar("si")
          }
        >
          Sí
        </button>

        <button
          type="button"
          className={
            valor === "no"
              ? "opcion-seleccionada"
              : ""
          }
          onClick={() =>
            alCambiar("no")
          }
        >
          No
        </button>

      </div>

    </div>
  );
}

export default PreguntaSiNo;
