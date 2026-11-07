import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";


function formatoDinero(cantidad = 0) {
  return Number(cantidad).toLocaleString(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
    }
  );
}


function calcularTotalAbonado(abonos = []) {
  return abonos.reduce(
    (total, abono) =>
      total + Number(abono),
    0
  );
}


function mostrarSiNo(valor) {

  if (valor === "si" || valor === true) {
    return "Sí";
  }

  if (valor === "no" || valor === false) {
    return "No";
  }

  return valor || "Sin respuesta";
}


async function convertirImagenADataURL(ruta) {

  if (!ruta) {
    return null;
  }


  if (
    typeof ruta === "string" &&
    ruta.startsWith("data:image")
  ) {
    return ruta;
  }


  try {

    const respuesta =
      await fetch(ruta);

    const blob =
      await respuesta.blob();


    return await new Promise(
      (resolve, reject) => {

        const lector =
          new FileReader();


        lector.onloadend = () =>
          resolve(lector.result);


        lector.onerror = () =>
          reject(
            new Error(
              "No se pudo leer la imagen."
            )
          );


        lector.readAsDataURL(blob);

      }
    );

  } catch (error) {

    console.error(
      "No se pudo cargar la imagen:",
      error
    );

    return null;

  }

}


function obtenerFormatoImagen(dataURL) {

  if (
    dataURL?.startsWith(
      "data:image/jpeg"
    ) ||
    dataURL?.startsWith(
      "data:image/jpg"
    )
  ) {
    return "JPEG";
  }

  return "PNG";
}


export async function generarPdfHistorial({
  datosPaciente,
  historial,
  nombreDentista = "Dentista",
  logoDentista = null,
}) {

  const doc =
    new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });


  const anchoPagina =
    doc.internal.pageSize.getWidth();

  const altoPagina =
    doc.internal.pageSize.getHeight();


  let y = 18;


  // ==============================
  // LOGO
  // ==============================

  const logoData =
    await convertirImagenADataURL(
      logoDentista
    );


  if (logoData) {

    try {

      doc.addImage(
        logoData,
        obtenerFormatoImagen(
          logoData
        ),
        15,
        10,
        25,
        25
      );

    } catch (error) {

      console.error(
        "No se pudo agregar el logo:",
        error
      );

    }

  }


  // ==============================
  // TÍTULO
  // ==============================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(18);


  doc.text(
    "HISTORIAL CLÍNICO DENTAL",
    anchoPagina / 2,
    y,
    {
      align: "center",
    }
  );


  y += 10;


  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(10);


  doc.text(
    `Paciente: ${
      datosPaciente?.nombrePaciente ||
      "Sin nombre"
    }`,
    15,
    y
  );


  y += 6;


  doc.text(
    `Dentista: ${nombreDentista}`,
    15,
    y
  );


  y += 6;


  doc.text(
    `Fecha de generación: ${
      new Date().toLocaleDateString(
        "es-MX"
      )
    }`,
    15,
    y
  );


  y += 10;


  // ==============================
  // DATOS DEL PACIENTE
  // ==============================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "Datos del paciente",
    15,
    y
  );


  autoTable(doc, {

    startY: y + 4,

    theme: "grid",

    head: [
      [
        "Nombre",
        "Edad",
        "Nacimiento",
        "Celular",
      ],
    ],

    body: [
      [
        datosPaciente?.nombrePaciente ||
          "Sin respuesta",

        datosPaciente?.edad ||
          "Sin respuesta",

        datosPaciente?.fechaNacimiento ||
          "Sin respuesta",

        datosPaciente?.celular ||
          "Sin respuesta",
      ],
    ],

    styles: {
      fontSize: 8,
      cellPadding: 2.5,
    },

    headStyles: {
      fillColor: [
        0,
        109,
        119,
      ],
    },

  });


  y =
    doc.lastAutoTable.finalY + 10;


  // ==============================
  // MOTIVO DE CONSULTA
  // ==============================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "Motivo de consulta",
    15,
    y
  );


  y += 6;


  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(10);


  const motivo =
    doc.splitTextToSize(
      datosPaciente?.motivoConsulta ||
        "Sin respuesta",
      180
    );


  doc.text(
    motivo,
    15,
    y
  );


  y +=
    motivo.length * 5 + 8;


  // ==============================
  // PREGUNTAS CLÍNICAS
  // ==============================

  if (y > 235) {

    doc.addPage();

    y = 20;

  }


  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "Preguntas clínicas",
    15,
    y
  );


  const preguntas = [

    [
      "¿Mastica por ambos lados?",
      mostrarSiNo(
        datosPaciente?.mastigaAmbosLados
      ),
    ],

    [
      "¿Cansancio al masticar?",
      mostrarSiNo(
        datosPaciente?.cansancioMasticar
      ),
    ],

    [
      "¿Dolor muscular?",
      mostrarSiNo(
        datosPaciente?.dolorMuscular
      ),
    ],

    [
      "¿Rechina los dientes?",
      mostrarSiNo(
        datosPaciente?.rechinaDientes
      ),
    ],

    [
      "¿Presenta sensibilidad?",
      mostrarSiNo(
        datosPaciente?.sensibilidad
      ),
    ],

    [
      "¿Inflamación de encías?",
      mostrarSiNo(
        datosPaciente?.inflamacionEncias
      ),
    ],

    [
      "¿Sangrado de encías?",
      mostrarSiNo(
        datosPaciente?.sangradoEncias
      ),
    ],

    [
      "¿Fuma?",
      mostrarSiNo(
        datosPaciente?.fuma
      ),
    ],

    [
      "¿Padece alguna enfermedad?",
      mostrarSiNo(
        datosPaciente?.enfermedad
      ),
    ],

    [
      "¿Tratamiento médico?",
      mostrarSiNo(
        datosPaciente?.tratamientoMedico
      ),
    ],

    [
      "¿Tiene alergias?",
      mostrarSiNo(
        datosPaciente?.alergia
      ),
    ],

    [
      "¿Enfermedad sanguínea?",
      mostrarSiNo(
        datosPaciente?.enfermedadSanguinea
      ),
    ],

    [
      "Estado de salud actual",
      datosPaciente?.estadoSaludActual ||
        "Sin respuesta",
    ],

  ];


  autoTable(doc, {

    startY: y + 4,

    theme: "grid",

    head: [
      [
        "Pregunta",
        "Respuesta",
      ],
    ],

    body:
      preguntas,

    styles: {
      fontSize: 8,
      cellPadding: 2.3,
    },

    headStyles: {
      fillColor: [
        0,
        109,
        119,
      ],
    },

    columnStyles: {

      0: {
        cellWidth: 130,
      },

      1: {
        cellWidth: 50,
      },

    },

  });


  y =
    doc.lastAutoTable.finalY + 10;


  // ==============================
  // TRATAMIENTOS Y PAGOS
  // ==============================

  if (y > 235) {

    doc.addPage();

    y = 20;

  }


  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);


  doc.text(
    "Tratamientos y pagos",
    15,
    y
  );


  const filasHistorial =
    (historial || []).map(
      (registro) => {

        const abonado =
          calcularTotalAbonado(
            registro.abonos
          );


        const saldo =
          Math.max(
            Number(
              registro.costo
            ) - abonado,
            0
          );


        return [

          registro.tratamiento ||
            "Sin especificar",

          registro.fecha ||
            "",

          registro.diente ||
            "",

          registro.evolucion ||
            "",

          formatoDinero(
            registro.costo
          ),

          formatoDinero(
            abonado
          ),

          formatoDinero(
            saldo
          ),

        ];

      }
    );


  autoTable(doc, {

    startY: y + 4,

    theme: "grid",

    head: [
      [
        "Tratamiento",
        "Fecha",
        "Diente",
        "Evolución",
        "Costo",
        "Abono",
        "Saldo",
      ],
    ],

    body:
      filasHistorial.length > 0
        ? filasHistorial
        : [
            [
              "Sin tratamientos",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
          ],

    styles: {
      fontSize: 6.8,
      cellPadding: 1.8,
    },

    headStyles: {
      fillColor: [
        0,
        109,
        119,
      ],
    },

  });


  y =
    doc.lastAutoTable.finalY + 10;


  // ==============================
  // CONSENTIMIENTO Y FIRMA
  // ==============================

  if (y > 220) {

    doc.addPage();

    y = 20;

  }


  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);


  doc.text(
    "Consentimiento y firma",
    15,
    y
  );


  y += 8;


  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);


  const consentimiento =
    doc.splitTextToSize(
      "El paciente manifiesta haber proporcionado información verdadera y haber otorgado su consentimiento para la atención odontológica correspondiente.",
      180
    );


  doc.text(
    consentimiento,
    15,
    y
  );


  y +=
    consentimiento.length * 4.5 +
    7;


  if (datosPaciente?.firma) {

    try {

      doc.addImage(
        datosPaciente.firma,
        obtenerFormatoImagen(
          datosPaciente.firma
        ),
        15,
        y,
        70,
        30
      );


      y += 35;


      doc.setFontSize(8);

      doc.text(
        "Firma del paciente",
        15,
        y
      );

    } catch (error) {

      console.error(
        "No se pudo agregar la firma:",
        error
      );

    }

  } else {

    doc.text(
      "Firma del paciente: No disponible todavía.",
      15,
      y
    );

  }


  // ==============================
  // NÚMEROS DE PÁGINA
  // ==============================

  const totalPaginas =
    doc.getNumberOfPages();


  for (
    let pagina = 1;
    pagina <= totalPaginas;
    pagina++
  ) {

    doc.setPage(
      pagina
    );


    doc.setFontSize(8);


    doc.text(
      `Página ${pagina} de ${totalPaginas}`,
      anchoPagina / 2,
      altoPagina - 7,
      {
        align: "center",
      }
    );

  }


  // ==============================
  // DESCARGAR
  // ==============================

  const nombrePaciente =
    datosPaciente?.nombrePaciente ||
    "paciente";


  const nombreSeguro =
    nombrePaciente
      .trim()
      .replace(
        /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/g,
        "_"
      );


  doc.save(
    `historial_${nombreSeguro}.pdf`
  );

}