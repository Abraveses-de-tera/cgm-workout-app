// =============================================================================
// DATOS DE LA RUTINA CARLOS GRAÑA · CGM RENDIMIENTO
// Sistema de 4 Días Rotativos (Frecuencia 1,5)
// Sin días fijos de la semana: avanzas día a día a tu propio ritmo
// =============================================================================

(function() {
  'use strict';

  var INFORMACION_RUTINA = {
    titulo: "ENTRENAMIENTO FRECUENCIA 1,5",
    entrenador: "Carlos Graña",
    marca: "CGM Rendimiento",
    subtitulo: "Plan personalizado de alta intensidad",
    reglas: {
      descripcion: "El plan consta de 4 días de entrenamiento en rotación continua. Entrenas a tu ritmo sin estar atado a días fijos de la semana: cuando termines un día, el siguiente entrenamiento pasas al siguiente en la lista.",
      seriePesada: "Serie pesada (máximo peso): serie con el máximo peso posible para las repeticiones marcadas, manteniendo técnica estricta.",
      serieDescarga: "Serie de descarga (-20%): un 20% menos de peso que en la serie pesada, buscando sacar las mismas repeticiones o alguna más.",
      serieDescendente: "Serie descendente: al terminar las repeticiones, bajas peso inmediatamente sin descansar y sigues sacando repeticiones.",
      serieAlFallo: "Al fallo: tantas repeticiones con buena técnica como seas capaz de hacer hasta no poder levantar una más."
    }
  };

  // Cuatro días de entrenamiento principales
  var DIAS_ENTRENAMIENTO = {
    D1: {
      id: "D1",
      numero: 1,
      titulo: "DÍA 1",
      nombre: "Espalda y Deltoides Posterior",
      categoria: "Espalda y parte trasera del hombro",
      etiqueta: "DÍA 1",
      descripcion: "Amplitud y grosor dorsal, remos pesados y deltoides posterior.",
      ejercicios: [
        {
          id: "d1_e1",
          name: "Pull over en polea",
          nombre: "Pull over en polea",
          indicaciones: "3 series de 12 repeticiones. Movimiento controlado, estiramiento completo arriba sin doblar muñecas.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d1_e2",
          name: "Dominadas",
          nombre: "Dominadas",
          indicaciones: "1 serie con peso añadido (lastre) a 8 repeticiones + 1 serie sin peso al fallo muscular.",
          series: [
            { tipo: "lastre", etiqueta: "Serie 1 (Con Lastre)", repeticionesObjetivo: 8, insignia: "CON LASTRE" },
            { tipo: "fallo", etiqueta: "Serie 2 (Sin Peso)", repeticionesObjetivo: "Al fallo", insignia: "AL FALLO" }
          ]
        },
        {
          id: "d1_e3",
          name: "Remo con barra",
          nombre: "Remo con barra",
          indicaciones: "Serie pesada + serie de descarga (−20 %) + 3.ª serie con el peso de la descarga y descendente.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", etiqueta: "Serie Pesada", repeticionesObjetivo: 6, insignia: "SERIE PESADA" },
            { tipo: "descarga", etiqueta: "Descarga (-20%)", repeticionesObjetivo: 8, insignia: "DESCARGA -20%" },
            { tipo: "descendente", etiqueta: "Serie 3 (Descarga + Descendente)", repeticionesObjetivo: 8, insignia: "DESCENDENTE" }
          ]
        },
        {
          id: "d1_e4",
          name: "Jalón agarre cerrado",
          nombre: "Jalón agarre cerrado",
          indicaciones: "3 series de 12 repeticiones. En la última serie, baja de peso al terminar y continúa (descendente).",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "descendente", etiqueta: "Serie 3 (Descendente)", repeticionesObjetivo: 12, insignia: "DESCENDENTE" }
          ]
        },
        {
          id: "d1_e5",
          name: "Remo Dorian",
          nombre: "Remo Dorian",
          indicaciones: "3 series de 12 repeticiones. Agarre con palmas hacia arriba (supino), torso a 45 grados, tirando hacia la cadera.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d1_e6",
          name: "Posterior en máquina",
          nombre: "Posterior en máquina",
          indicaciones: "3 series de 15 repeticiones. Pájaros en máquina. Codos alineados con los hombros.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d1_e7",
          name: "Remo al mentón en polea",
          nombre: "Remo al mentón en polea",
          indicaciones: "3 series de 15 repeticiones. Agarre medio en polea baja, subiendo hacia el pecho/mentón.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 15 }
          ]
        }
      ]
    },

    D2: {
      id: "D2",
      numero: 2,
      titulo: "DÍA 2",
      nombre: "Pecho y Hombro",
      categoria: "Pectoral y parte delantera/lateral del hombro",
      etiqueta: "DÍA 2",
      descripcion: "Empujes pesados con serie de descarga, aperturas y congestión de hombro.",
      ejercicios: [
        {
          id: "d2_e1",
          name: "Press inclinado",
          nombre: "Press inclinado",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Banco inclinado a 30-45 grados. Saca pecho y junta escápulas.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", etiqueta: "Serie Pesada", repeticionesObjetivo: 6, insignia: "SERIE PESADA" },
            { tipo: "descarga", etiqueta: "Descarga (-20%)", repeticionesObjetivo: 8, insignia: "DESCARGA -20%" }
          ]
        },
        {
          id: "d2_e2",
          name: "Aperturas",
          nombre: "Aperturas",
          indicaciones: "3 series de 12 repeticiones. Con mancuernas o en polea. Siente el estiramiento en el pecho al bajar.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d2_e3",
          name: "Press declinado",
          nombre: "Press declinado",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Gran trabajo para la zona baja y media del pectoral.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", etiqueta: "Serie Pesada", repeticionesObjetivo: 6, insignia: "SERIE PESADA" },
            { tipo: "descarga", etiqueta: "Descarga (-20%)", repeticionesObjetivo: 8, insignia: "DESCARGA -20%" }
          ]
        },
        {
          id: "d2_e4",
          name: "Cruce de poleas",
          nombre: "Cruce de poleas",
          indicaciones: "2 series de 12 repeticiones. Aguanta 1 segundo apretando fuerte en el centro.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d2_e5",
          name: "Elevaciones laterales",
          nombre: "Elevaciones laterales",
          indicaciones: "4 series de 12 repeticiones. En la 4.ª serie, baja de peso inmediatamente al terminar y sigue sacando repeticiones.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 },
            { tipo: "descendente", etiqueta: "Serie 4 (Descendente)", repeticionesObjetivo: 12, insignia: "DESCENDENTE" }
          ]
        },
        {
          id: "d2_e6",
          name: "Press militar",
          nombre: "Press militar",
          indicaciones: "2 series de 8 repeticiones. Con barra o mancuernas. Abdomen y glúteos firmes.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 8 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 8 }
          ]
        },
        {
          id: "d2_e7",
          name: "Elevaciones frontales",
          nombre: "Elevaciones frontales",
          indicaciones: "2 series de 12 repeticiones. Con mancuernas o polea. Subida controlada hasta la altura de los ojos.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 }
          ]
        }
      ]
    },

    D3: {
      id: "D3",
      numero: 3,
      titulo: "DÍA 3",
      nombre: "Pierna Completa",
      categoria: "Cuádriceps, Isquiotibiales y Aductor",
      etiqueta: "DÍA 3",
      descripcion: "Trabajo completo de piernas: isquios, sentadilla, prensa pesada y aductor.",
      ejercicios: [
        {
          id: "d3_e1",
          name: "Femoral tumbado",
          nombre: "Femoral tumbado",
          indicaciones: "3 series de 12 repeticiones. Mantén la cadera bien pegada al banco.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d3_e2",
          name: "Extensiones de cuádriceps",
          nombre: "Extensiones de cuádriceps",
          indicaciones: "3 series de 15 repeticiones. Haz una pausa de 1 segundo arriba para apretar el músculo.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d3_e3",
          name: "Sentadilla pendular",
          nombre: "Sentadilla pendular",
          indicaciones: "3 series de 12 repeticiones. Si en tu gimnasio no hay péndulo, usa sentadilla Hack o Multipower.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d3_e4",
          name: "Prensa",
          nombre: "Prensa",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Baja profundo sin redondear la zona lumbar.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", etiqueta: "Serie Pesada", repeticionesObjetivo: 8, insignia: "SERIE PESADA" },
            { tipo: "descarga", etiqueta: "Descarga (-20%)", repeticionesObjetivo: 10, insignia: "DESCARGA -20%" }
          ]
        },
        {
          id: "d3_e5",
          name: "Aductor",
          nombre: "Aductor",
          indicaciones: "3 series de 15 repeticiones. En máquina de aductores, movimiento controlado.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 15 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d3_e6",
          name: "Femoral sentado",
          nombre: "Femoral sentado",
          indicaciones: "3 series de 12 repeticiones. Controla bien la subida y la bajada sin balanceos.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        }
      ]
    },

    D4: {
      id: "D4",
      numero: 4,
      titulo: "DÍA 4",
      nombre: "Brazos (Bíceps y Tríceps)",
      categoria: "Bíceps y Tríceps",
      etiqueta: "DÍA 4",
      descripcion: "Entrenamiento enfocado en brazos: diferentes ángulos para bíceps y tríceps.",
      ejercicios: [
        {
          id: "d4_e1",
          name: "Curl de bíceps con mancuernas",
          nombre: "Curl de bíceps con mancuernas",
          indicaciones: "3 series de 12 repeticiones. Gira la muñeca hacia afuera en la parte más alta.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d4_e2",
          name: "Tríceps en polea con cuerda",
          nombre: "Tríceps en polea con cuerda",
          indicaciones: "3 series de 12 repeticiones. Separa los extremos de la cuerda al final de la extensión.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 12 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d4_e3",
          name: "Curl de bíceps en banco Scott",
          nombre: "Curl de bíceps en banco Scott",
          indicaciones: "3 series de 10 repeticiones. Brazos bien apoyados en la almohadilla.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e4",
          name: "Tríceps tras nuca unilateral",
          nombre: "Tríceps tras nuca unilateral",
          indicaciones: "3 series de 10 repeticiones con cada brazo. En polea o con mancuerna por detrás de la cabeza.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 3", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e5",
          name: "Curl martillo",
          nombre: "Curl martillo",
          indicaciones: "2 series de 10 repeticiones. Con las palmas mirándose entre sí para dar grosor al brazo.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e6",
          name: "Fondos",
          nombre: "Fondos",
          indicaciones: "2 series de 10 repeticiones. En barras paralelas o entre dos bancos.",
          series: [
            { tipo: "normal", etiqueta: "Serie 1", repeticionesObjetivo: 10 },
            { tipo: "normal", etiqueta: "Serie 2", repeticionesObjetivo: 10 }
          ]
        }
      ]
    }
  };

  // Secuencia rotativa ordenada (puedes seguirla o elegir el día que quieras)
  var SECUENCIA_CICLO = [
    { sesion: 1, idDia: "D1", nombre: "Día 1: Espalda y Posterior", esRepeticion: false },
    { sesion: 2, idDia: "D2", nombre: "Día 2: Pecho y Hombro", esRepeticion: false },
    { sesion: 3, idDia: "D3", nombre: "Día 3: Pierna Completa", esRepeticion: false },
    { sesion: 4, idDia: "D4", nombre: "Día 4: Brazos", esRepeticion: false },
    { sesion: 5, idDia: "D1", nombre: "Día 1: Espalda (Repetición)", esRepeticion: true },
    { sesion: 6, idDia: "D2", nombre: "Día 2: Pecho y Hombro", esRepeticion: false },
    { sesion: 7, idDia: "D3", nombre: "Día 3: Pierna", esRepeticion: false },
    { sesion: 8, idDia: "D4", nombre: "Día 4: Brazos", esRepeticion: false },
    { sesion: 9, idDia: "D2", nombre: "Día 2: Pecho (Repetición)", esRepeticion: true }
  ];

  window.CGM_DATOS = {
    INFORMACION_RUTINA: INFORMACION_RUTINA,
    DIAS_ENTRENAMIENTO: DIAS_ENTRENAMIENTO,
    SECUENCIA_CICLO: SECUENCIA_CICLO
  };

})();
