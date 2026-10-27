// =============================================================================
// DATOS DE LA RUTINA CARLOS GRAÑA · CGM PERFORMANCE
// Sistema de Frecuencia 1,5 (4 semanas rotativas)
// =============================================================================

(function() {
  'use strict';

  var ROUTINE_INFO = {
    title: "ENTRENO FRECUENCIA 1,5",
    coach: "Carlos Graña",
    brand: "CGM Performance",
    subtitle: "Plan personalizado · Alta intensidad y frecuencia adaptada",
    rules: {
      description: "Entrenas lunes, martes, miércoles, viernes y sábado. El sábado repites el día con el que empezaste el lunes. El lunes siguiente arrancas con el día que toca a continuación, así cada grupo se entrena unas 1,5 veces por semana.",
      topSet: "Top set: serie pesada al límite de reps objetivo con la máxima técnica.",
      backOff: "Back off: 20% menos de peso que el Top set, buscando mismas reps o alguna más.",
      descendente: "Descendente (Drop set): al terminar las repeticiones, bajar peso inmediatamente sin descanso y continuar al fallo.",
      fallo: "Al fallo: tantas repeticiones técnicas como sea posible hasta no poder completar una más sin degradar la técnica."
    }
  };

  var SCHEDULE_WEEKS = [
    {
      week: 1,
      name: "Semana 1",
      days: [
        { day: "Lunes", dayIndex: 1, workoutId: "D1", workoutName: "D1 Espalda", isRest: false },
        { day: "Martes", dayIndex: 2, workoutId: "D2", workoutName: "D2 Pecho-hombro", isRest: false },
        { day: "Miércoles", dayIndex: 3, workoutId: "D3", workoutName: "D3 Pierna", isRest: false },
        { day: "Jueves", dayIndex: 4, workoutId: null, workoutName: "Descanso", isRest: true },
        { day: "Viernes", dayIndex: 5, workoutId: "D4", workoutName: "D4 Brazo", isRest: false },
        { day: "Sábado", dayIndex: 6, workoutId: "D1", workoutName: "D1 Espalda (Repetición)", isRest: false, isRepeated: true },
        { day: "Domingo", dayIndex: 0, workoutId: null, workoutName: "Descanso", isRest: true }
      ]
    },
    {
      week: 2,
      name: "Semana 2",
      days: [
        { day: "Lunes", dayIndex: 1, workoutId: "D2", workoutName: "D2 Pecho-hombro", isRest: false },
        { day: "Martes", dayIndex: 2, workoutId: "D3", workoutName: "D3 Pierna", isRest: false },
        { day: "Miércoles", dayIndex: 3, workoutId: "D4", workoutName: "D4 Brazo", isRest: false },
        { day: "Jueves", dayIndex: 4, workoutId: null, workoutName: "Descanso", isRest: true },
        { day: "Viernes", dayIndex: 5, workoutId: "D1", workoutName: "D1 Espalda", isRest: false },
        { day: "Sábado", dayIndex: 6, workoutId: "D2", workoutName: "D2 Pecho-hombro (Repetición)", isRest: false, isRepeated: true },
        { day: "Domingo", dayIndex: 0, workoutId: null, workoutName: "Descanso", isRest: true }
      ]
    },
    {
      week: 3,
      name: "Semana 3",
      days: [
        { day: "Lunes", dayIndex: 1, workoutId: "D3", workoutName: "D3 Pierna", isRest: false },
        { day: "Martes", dayIndex: 2, workoutId: "D4", workoutName: "D4 Brazo", isRest: false },
        { day: "Miércoles", dayIndex: 3, workoutId: "D1", workoutName: "D1 Espalda", isRest: false },
        { day: "Jueves", dayIndex: 4, workoutId: null, workoutName: "Descanso", isRest: true },
        { day: "Viernes", dayIndex: 5, workoutId: "D2", workoutName: "D2 Pecho-hombro", isRest: false },
        { day: "Sábado", dayIndex: 6, workoutId: "D3", workoutName: "D3 Pierna (Repetición)", isRest: false, isRepeated: true },
        { day: "Domingo", dayIndex: 0, workoutId: null, workoutName: "Descanso", isRest: true }
      ]
    },
    {
      week: 4,
      name: "Semana 4",
      days: [
        { day: "Lunes", dayIndex: 1, workoutId: "D4", workoutName: "D4 Brazo", isRest: false },
        { day: "Martes", dayIndex: 2, workoutId: "D1", workoutName: "D1 Espalda", isRest: false },
        { day: "Miércoles", dayIndex: 3, workoutId: "D2", workoutName: "D2 Pecho-hombro", isRest: false },
        { day: "Jueves", dayIndex: 4, workoutId: null, workoutName: "Descanso", isRest: true },
        { day: "Viernes", dayIndex: 5, workoutId: "D3", workoutName: "D3 Pierna", isRest: false },
        { day: "Sábado", dayIndex: 6, workoutId: "D4", workoutName: "D4 Brazo (Repetición)", isRest: false, isRepeated: true },
        { day: "Domingo", dayIndex: 0, workoutId: null, workoutName: "Descanso", isRest: true }
      ]
    }
  ];

  var WORKOUT_DAYS = {
    D1: {
      id: "D1",
      title: "DÍA 1",
      name: "Espalda y posterior",
      category: "Espalda · Deltoides Posterior",
      badge: "D1",
      description: "Enfoque en densidad y amplitud dorsal, remos pesados y deltoides posterior.",
      exercises: [
        {
          id: "d1_e1",
          name: "Pull over en polea",
          notes: "3 × 12 reps. Movimiento controlado, estiramiento completo en la fase excéntrica sin quebrar muñecas.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d1_e2",
          name: "Dominadas",
          notes: "1 serie con lastre a 8 reps + 1 serie sin peso al fallo.",
          sets: [
            { type: "lastre", label: "Serie 1 (Con Lastre)", targetReps: 8, badge: "LASTRE" },
            { type: "fallo", label: "Serie 2 (Sin Peso)", targetReps: "Fallo", badge: "AL FALLO" }
          ]
        },
        {
          id: "d1_e3",
          name: "Remo con barra",
          notes: "Top set + back off (−20 %) + 3.ª serie con el peso del back off y descendente.",
          hasBackOffCalculation: true,
          sets: [
            { type: "topset", label: "Top Set", targetReps: 6, badge: "TOP SET" },
            { type: "backoff", label: "Back Off (-20%)", targetReps: 8, badge: "BACK OFF" },
            { type: "dropset", label: "Serie 3 (Back-off + Descendente)", targetReps: 8, badge: "DROP SET" }
          ]
        },
        {
          id: "d1_e4",
          name: "Jalón agarre cerrado",
          notes: "3 × 12. La última serie, descendente (drop set al terminar).",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "dropset", label: "Serie 3 (Descendente)", targetReps: 12, badge: "DESCENDENTE" }
          ]
        },
        {
          id: "d1_e5",
          name: "Remo Dorian",
          notes: "3 × 12 reps. Agarre supino, torso a 45º, tirando hacia la cadera baja.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d1_e6",
          name: "Posterior en máquina",
          notes: "3 × 15 reps. Pájaros en máquina (peck deck inverso). Codos alineados con hombros.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 15 },
            { type: "normal", label: "Serie 2", targetReps: 15 },
            { type: "normal", label: "Serie 3", targetReps: 15 }
          ]
        },
        {
          id: "d1_e7",
          name: "Remo al mentón en polea",
          notes: "3 × 15 reps. Agarre medio/ancho en polea baja, enfatizando trapecio y deltoides lateral/posterior.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 15 },
            { type: "normal", label: "Serie 2", targetReps: 15 },
            { type: "normal", label: "Serie 3", targetReps: 15 }
          ]
        }
      ]
    },

    D2: {
      id: "D2",
      title: "DÍA 2",
      name: "Pecho y hombro",
      category: "Pectoral · Deltoides Anterior y Lateral",
      badge: "D2",
      description: "Foco en presses pesados con Top set + Back off, aperturas y congestión de deltoides.",
      exercises: [
        {
          id: "d2_e1",
          name: "Press inclinado",
          notes: "Top set + back off (−20 %). Banco a 30º-45º. Mantén retracción escapular.",
          hasBackOffCalculation: true,
          sets: [
            { type: "topset", label: "Top Set", targetReps: 6, badge: "TOP SET" },
            { type: "backoff", label: "Back Off (-20%)", targetReps: 8, badge: "BACK OFF" }
          ]
        },
        {
          id: "d2_e2",
          name: "Aperturas",
          notes: "3 × 12 reps. Con mancuernas o polea. Máximo estiramiento del pectoral en la fase excéntrica.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d2_e3",
          name: "Press declinado",
          notes: "Top set + back off (−20 %). Excelente estímulo para la porción esternal e inferior.",
          hasBackOffCalculation: true,
          sets: [
            { type: "topset", label: "Top Set", targetReps: 6, badge: "TOP SET" },
            { type: "backoff", label: "Back Off (-20%)", targetReps: 8, badge: "BACK OFF" }
          ]
        },
        {
          id: "d2_e4",
          name: "Cruce de poleas",
          notes: "2 × 12 reps. Aguantar 1 segundo en el pico de contracción.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 }
          ]
        },
        {
          id: "d2_e5",
          name: "Elevaciones laterales",
          notes: "4 × 12 reps. La última serie, descendente (drop set sin descanso).",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 },
            { type: "dropset", label: "Serie 4 (Descendente)", targetReps: 12, badge: "DESCENDENTE" }
          ]
        },
        {
          id: "d2_e6",
          name: "Press militar",
          notes: "2 × 8 reps. Con barra o mancuernas. Core firme y sin arquear en exceso la zona lumbar.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 8 },
            { type: "normal", label: "Serie 2", targetReps: 8 }
          ]
        },
        {
          id: "d2_e7",
          name: "Elevaciones frontales",
          notes: "2 × 12 reps. Con mancuernas o polea baja. Subida controlada hasta la altura de la vista.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 }
          ]
        }
      ]
    },

    D3: {
      id: "D3",
      title: "DÍA 3",
      name: "Pierna",
      category: "Cuádriceps · Isquiosuriales · Aductores",
      badge: "D3",
      description: "Entrenamiento completo del tren inferior: isquios, cuádriceps pesados, prensa y aductor.",
      exercises: [
        {
          id: "d3_e1",
          name: "Femoral tumbado",
          notes: "3 × 12 reps. Pre-fatiga de isquiotibiales. Mantén la pelvis pegada al banco.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d3_e2",
          name: "Extensiones de cuádriceps",
          notes: "3 × 15 reps. Pausa arriba de 1 segundo para aislar el recto femoral y vastos.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 15 },
            { type: "normal", label: "Serie 2", targetReps: 15 },
            { type: "normal", label: "Serie 3", targetReps: 15 }
          ]
        },
        {
          id: "d3_e3",
          name: "Sentadilla pendular",
          notes: "3 × 12 reps. Si tu gimnasio no tiene péndulo, puedes usar Hack squat o multipower.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d3_e4",
          name: "Prensa",
          notes: "Top set + back off (−20 %). Profundidad óptima sin despegar la zona lumbar.",
          hasBackOffCalculation: true,
          sets: [
            { type: "topset", label: "Top Set", targetReps: 8, badge: "TOP SET" },
            { type: "backoff", label: "Back Off (-20%)", targetReps: 10, badge: "BACK OFF" }
          ]
        },
        {
          id: "d3_e5",
          name: "Aductor",
          notes: "3 × 15 reps. En máquina específica de aductor para estabilidad de rodilla y masa interna.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 15 },
            { type: "normal", label: "Serie 2", targetReps: 15 },
            { type: "normal", label: "Serie 3", targetReps: 15 }
          ]
        },
        {
          id: "d3_e6",
          name: "Femoral sentado",
          notes: "3 × 12 reps. Excelente estiramiento en cadera flexionada. Controla la bajada.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        }
      ]
    },

    D4: {
      id: "D4",
      title: "DÍA 4",
      name: "Brazo",
      category: "Bíceps · Tríceps",
      badge: "D4",
      description: "Día específico de hipertrofia de brazos: bíceps en diferentes ángulos y tríceps completo.",
      exercises: [
        {
          id: "d4_e1",
          name: "Curl de bíceps con mancuernas",
          notes: "3 × 12 reps. Supinación marcada en la parte alta del movimiento.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d4_e2",
          name: "Tríceps en polea con cuerda",
          notes: "3 × 12 reps. Abre la cuerda al final de la extensión para activar la cabeza lateral.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 12 },
            { type: "normal", label: "Serie 2", targetReps: 12 },
            { type: "normal", label: "Serie 3", targetReps: 12 }
          ]
        },
        {
          id: "d4_e3",
          name: "Curl de bíceps en banco Scott",
          notes: "3 × 10 reps. Aislamiento total de la cabeza corta. No bloquees los codos abajo.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 10 },
            { type: "normal", label: "Serie 2", targetReps: 10 },
            { type: "normal", label: "Serie 3", targetReps: 10 }
          ]
        },
        {
          id: "d4_e4",
          name: "Tríceps tras nuca unilateral",
          notes: "3 × 10 reps por brazo. En polea o mancuerna, enfatizando cabeza larga del tríceps.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 10 },
            { type: "normal", label: "Serie 2", targetReps: 10 },
            { type: "normal", label: "Serie 3", targetReps: 10 }
          ]
        },
        {
          id: "d4_e5",
          name: "Curl martillo",
          notes: "2 × 10 reps. Para braquial anterior y braquiorradial (grosor de brazo).",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 10 },
            { type: "normal", label: "Serie 2", targetReps: 10 }
          ]
        },
        {
          id: "d4_e6",
          name: "Fondos",
          notes: "2 × 10 reps. En paralelas o entre bancos. Torso erguido para focalizar en tríceps.",
          sets: [
            { type: "normal", label: "Serie 1", targetReps: 10 },
            { type: "normal", label: "Serie 2", targetReps: 10 }
          ]
        }
      ]
    }
  };

  // Exportar al objeto global
  window.CGM_DATA = {
    ROUTINE_INFO: ROUTINE_INFO,
    SCHEDULE_WEEKS: SCHEDULE_WEEKS,
    WORKOUT_DAYS: WORKOUT_DAYS
  };

})();
