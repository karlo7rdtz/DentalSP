import { useState } from "react";

import "../styles/historialClinico.css";
import RegistrarAbono from "./registrarAbono";


function HistorialClinico() {

    const [pantalla, setPantalla] =
  useState("historial");
  // ==========================================
  // PACIENTE DE PRUEBA
  // Después vendrá del paciente seleccionado.
  // ==========================================

  const [nombrePaciente] =
    useState("Paciente de prueba");


  // ==========================================
  // HISTORIAL DE PRUEBA
  // Después estos datos vendrán de los
  // tratamientos registrados.
  // ==========================================

    const [historial, setHistorial] = useState([
    {
      id: 1,

      tratamiento: "Resina",

      fecha: "2026-10-20",

      diente: "16",

      evolucion:
        "Sin dolor y evolución favorable.",

      costo: 1200,

      abonos: [
        500,
        300,
      ],
    },

    {
      id: 2,

      tratamiento: "Limpieza",

      fecha: "2026-10-25",

      diente: "General",

      evolucion:
        "Procedimiento terminado.",

      costo: 800,

      abonos: [
        800,
      ],
    },
  ]);


  // ==========================================
  // TRATAMIENTO SELECCIONADO
  // ==========================================

  const [
    tratamientoSeleccionado,
    setTratamientoSeleccionado,
  ] = useState(null);


  // ==========================================
  // CALCULAR TOTAL DE ABONOS
  // ==========================================

  const calcularAbonos = (abonos) => {

    return abonos.reduce(
      (total, abono) =>
        total + abono,
      0
    );

  };


  // ==========================================
  // CALCULAR SALDO
  // ==========================================

  const calcularSaldo = (
    costo,
    abonos
  ) => {

    const totalAbonado =
      calcularAbonos(abonos);

    return Math.max(
      costo - totalAbonado,
      0
    );

  };


  // ==========================================
  // FORMATO DE DINERO
  // ==========================================

  const formatoDinero = (cantidad) => {

    return cantidad.toLocaleString(
      "es-MX",
      {
        style: "currency",
        currency: "MXN",
      }
    );

  };

  const registrarNuevoAbono = (
  idTratamiento,
  cantidad
) => {

  const historialActualizado =
    historial.map((registro) => {

      if (
        registro.id === idTratamiento
      ) {

        return {
          ...registro,

          abonos: [
            ...registro.abonos,
            cantidad,
          ],
        };

      }

      return registro;

    });


  setHistorial(
    historialActualizado
  );


  const tratamientoActualizado =
    historialActualizado.find(
      (registro) =>
        registro.id === idTratamiento
    );


  setTratamientoSeleccionado(
    tratamientoActualizado
  );


  setPantalla(
    "historial"
  );


  return {
    ok: true,
  };

};

if (
  pantalla === "abono" &&
  tratamientoSeleccionado
) {

  return (
    <RegistrarAbono

      tratamiento={
        tratamientoSeleccionado
      }

      alVolver={() =>
        setPantalla("historial")
      }

      alGuardar={
        registrarNuevoAbono
      }

    />
  );

}

  return (

    <main className="pantalla-historial">

      <section className="contenedor-historial">


        {/* ======================================
            ENCABEZADO
            ====================================== */}

        <header className="encabezado-historial">

          <h1>
            HISTORIAL CLÍNICO DENTAL
          </h1>

          <p>
            {nombrePaciente}
          </p>

        </header>


        {/* ======================================
            TABLA
            ====================================== */}

        <section className="seccion-tabla-historial">


          <div className="contenedor-tabla-historial">

            <table className="tabla-historial">

              <thead>

                <tr>

                  <th>
                    Tratamiento
                  </th>

                  <th>
                    Fecha
                  </th>

                  <th>
                    No. de diente
                  </th>

                  <th>
                    Evolución
                  </th>

                  <th>
                    Costo
                  </th>

                  <th>
                    Abono
                  </th>

                  <th>
                    Saldo
                  </th>

                </tr>

              </thead>


              <tbody>

                {historial.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="sin-historial"
                    >
                      El paciente todavía no tiene tratamientos registrados.
                    </td>

                  </tr>

                ) : (

                  historial.map(
                    (registro) => {

                      const totalAbonado =
                        calcularAbonos(
                          registro.abonos
                        );


                      const saldo =
                        calcularSaldo(
                          registro.costo,
                          registro.abonos
                        );


                      return (

                        <tr
                          key={
                            registro.id
                          }

                          className={
                            tratamientoSeleccionado?.id ===
                            registro.id
                              ? "fila-historial-seleccionada"
                              : "fila-historial"
                          }

                          onClick={() =>
                            setTratamientoSeleccionado(
                              registro
                            )
                          }
                        >

                          <td>
                            {
                              registro.tratamiento
                            }
                          </td>


                          <td>
                            {
                              registro.fecha
                            }
                          </td>


                          <td>
                            {
                              registro.diente
                            }
                          </td>


                          <td>
                            {
                              registro.evolucion
                            }
                          </td>


                          <td>
                            {
                              formatoDinero(
                                registro.costo
                              )
                            }
                          </td>


                          <td>
                            {
                              formatoDinero(
                                totalAbonado
                              )
                            }
                          </td>


                          <td>

                            <span
                              className={
                                saldo === 0
                                  ? "saldo-pagado"
                                  : "saldo-pendiente"
                              }
                            >

                              {
                                formatoDinero(
                                  saldo
                                )
                              }

                            </span>

                          </td>

                        </tr>

                      );

                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* ======================================
            RESUMEN DEL TRATAMIENTO
            ====================================== */}

        {tratamientoSeleccionado && (

          <section className="resumen-tratamiento">

            <h2>
              Tratamiento seleccionado
            </h2>


            <div className="datos-resumen">


              <div>

                <span>
                  Tratamiento
                </span>

                <strong>
                  {
                    tratamientoSeleccionado
                      .tratamiento
                  }
                </strong>

              </div>


              <div>

                <span>
                  Diente
                </span>

                <strong>
                  {
                    tratamientoSeleccionado
                      .diente
                  }
                </strong>

              </div>


              <div>

                <span>
                  Costo
                </span>

                <strong>

                  {
                    formatoDinero(
                      tratamientoSeleccionado
                        .costo
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
                      calcularAbonos(
                        tratamientoSeleccionado
                          .abonos
                      )
                    )
                  }

                </strong>

              </div>


              <div>

                <span>
                  Saldo
                </span>

                <strong>

                  {
                    formatoDinero(
                      calcularSaldo(
                        tratamientoSeleccionado
                          .costo,

                        tratamientoSeleccionado
                          .abonos
                      )
                    )
                  }

                </strong>

              </div>


            </div>

          </section>

        )}


        {/* ======================================
            BOTONES
            ====================================== */}

        <div className="acciones-historial">


          <button
            type="button"
            className="boton-preguntas-firma"

            onClick={() =>
              console.log(
                "Abrir preguntas y firma"
              )
            }
          >
            Preguntas y firma
          </button>


         <button
  type="button"
  className="boton-registrar-abono"

  onClick={() => {

    if (
      !tratamientoSeleccionado
    ) {

      alert(
        "Primero selecciona un tratamiento."
      );

      return;

    }

    const saldo =
      calcularSaldo(
        tratamientoSeleccionado.costo,
        tratamientoSeleccionado.abonos
      );


    if (saldo === 0) {

      alert(
        "Este tratamiento ya está completamente pagado."
      );

      return;

    }


    setPantalla(
      "abono"
    );

  }}
>
  Registrar abono
</button>


        </div>


      </section>

    </main>

  );

}


export default HistorialClinico;