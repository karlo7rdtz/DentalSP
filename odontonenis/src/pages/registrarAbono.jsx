import { useState } from "react";

import "../styles/registrarAbono.css";


function RegistrarAbono({
  tratamiento,
  alVolver,
  alGuardar,
}) {

  const [cantidad, setCantidad] =
    useState("");

  const [mensaje, setMensaje] =
    useState("");


  const totalAbonado =
    tratamiento.abonos.reduce(
      (total, abono) =>
        total + abono,
      0
    );


  const saldo =
    Math.max(
      tratamiento.costo -
      totalAbonado,
      0
    );


  const formatoDinero = (valor) => {

    return valor.toLocaleString(
      "es-MX",
      {
        style: "currency",
        currency: "MXN",
      }
    );

  };


  const guardarAbono = () => {

    const cantidadNumero =
      Number(cantidad);


    if (
      cantidad === "" ||
      cantidadNumero <= 0
    ) {

      setMensaje(
        "Ingresa una cantidad válida."
      );

      return;

    }


    if (
      cantidadNumero > saldo
    ) {

      setMensaje(
        `El abono no puede ser mayor al saldo pendiente de ${formatoDinero(saldo)}.`
      );

      return;

    }


    alGuardar(
      tratamiento.id,
      cantidadNumero
    );

  };


  return (

    <main className="pantalla-registrar-abono">

      <section className="tarjeta-registrar-abono">


        <button
          type="button"
          className="boton-volver-historial"
          onClick={alVolver}
        >
          ← Volver al historial
        </button>


        <header className="encabezado-abono">

          <h1>
            REGISTRAR ABONO
          </h1>

          <p>
            {tratamiento.tratamiento}
          </p>

          <p>
            Diente: {tratamiento.diente}
          </p>

        </header>


        <div className="resumen-abono">


          <div>

            <span>
              Costo total
            </span>

            <strong>
              {
                formatoDinero(
                  tratamiento.costo
                )
              }
            </strong>

          </div>


          <div>

            <span>
              Abonado
            </span>

            <strong>
              {
                formatoDinero(
                  totalAbonado
                )
              }
            </strong>

          </div>


          <div>

            <span>
              Saldo pendiente
            </span>

            <strong>
              {
                formatoDinero(
                  saldo
                )
              }
            </strong>

          </div>


        </div>


        <label className="campo-nuevo-abono">

          Nuevo abono

          <input
            type="number"
            min="1"
            max={saldo}
            step="0.01"

            placeholder="Cantidad"

            value={cantidad}

            onChange={(evento) =>
              setCantidad(
                evento.target.value
              )
            }
          />

        </label>


        {mensaje && (

          <p className="mensaje-abono">
            {mensaje}
          </p>

        )}


        <div className="acciones-abono">


          <button
            type="button"
            className="boton-cancelar-abono"
            onClick={alVolver}
          >
            Cancelar
          </button>


          <button
            type="button"
            className="boton-confirmar-abono"
            onClick={guardarAbono}
          >
            Registrar abono
          </button>


        </div>


      </section>

    </main>

  );

}


export default RegistrarAbono;