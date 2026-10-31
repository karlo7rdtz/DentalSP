import { useEffect, useRef } from "react";

function FirmaTactil({
  onFirmaChange,
  limpiarFirma,
}) {
  const canvasRef = useRef(null);
  const dibujandoRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contexto = canvas.getContext("2d");

    const ajustarCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const escala = window.devicePixelRatio || 1;

      canvas.width = rect.width * escala;
      canvas.height = rect.height * escala;

      contexto.setTransform(
        escala,
        0,
        0,
        escala,
        0,
        0
      );

      contexto.lineWidth = 2.5;
      contexto.lineCap = "round";
      contexto.lineJoin = "round";
      contexto.strokeStyle = "#222";
    };

    ajustarCanvas();

    window.addEventListener(
      "resize",
      ajustarCanvas
    );

    return () => {
      window.removeEventListener(
        "resize",
        ajustarCanvas
      );
    };
  }, []);


  useEffect(() => {
    if (limpiarFirma) {
      const canvas = canvasRef.current;
      const contexto = canvas.getContext("2d");

      contexto.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }, [limpiarFirma]);


  const obtenerPosicion = (evento) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: evento.clientX - rect.left,
      y: evento.clientY - rect.top,
    };
  };


  const comenzarFirma = (evento) => {
    evento.preventDefault();

    const canvas = canvasRef.current;
    const contexto = canvas.getContext("2d");

    const posicion =
      obtenerPosicion(evento);

    dibujandoRef.current = true;

    contexto.beginPath();

    contexto.moveTo(
      posicion.x,
      posicion.y
    );

    canvas.setPointerCapture(
      evento.pointerId
    );
  };


  const dibujar = (evento) => {
    if (!dibujandoRef.current) {
      return;
    }

    evento.preventDefault();

    const canvas = canvasRef.current;
    const contexto = canvas.getContext("2d");

    const posicion =
      obtenerPosicion(evento);

    contexto.lineTo(
      posicion.x,
      posicion.y
    );

    contexto.stroke();
  };


  const terminarFirma = (evento) => {
    if (!dibujandoRef.current) {
      return;
    }

    dibujandoRef.current = false;

    const canvas = canvasRef.current;

    if (
      canvas.hasPointerCapture(
        evento.pointerId
      )
    ) {
      canvas.releasePointerCapture(
        evento.pointerId
      );
    }

    const imagenFirma =
      canvas.toDataURL("image/png");

    onFirmaChange(imagenFirma);
  };


  return (
    <canvas
      ref={canvasRef}
      className="canvas-firma"

      onPointerDown={comenzarFirma}
      onPointerMove={dibujar}

      onPointerUp={terminarFirma}
      onPointerCancel={terminarFirma}

      onPointerLeave={(evento) => {
        if (
          evento.buttons === 0 &&
          dibujandoRef.current
        ) {
          terminarFirma(evento);
        }
      }}
    />
  );
}

export default FirmaTactil;