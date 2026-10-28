// =============================================================================
// CGM RENDIMIENTO · BASE DE DATOS MAESTRA DE EJERCICIOS Y VÍDEOS (103 EJERCICIOS)
// Creada a partir del Excel oficial de Carlos Graña
// Sistema extensible: se asocia automáticamente a este entrenamiento y a futuros entrenamientos de otros clientes
// =============================================================================

(function(global) {
  'use strict';

  var BASE_DATOS_EJERCICIOS = [
    // ABDOMEN
    { id: "crunch_abdominal_declinado", nombre: "Crunch abdominal declinado", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "crunch_abdominal_en_banco_plano", nombre: "Crunch abdominal en banco plano", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "crunch_abdominal_en_maquina", nombre: "Crunch abdominal en máquina", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "crunch_abdominal_en_polea", nombre: "Crunch abdominal en polea", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "crunch_abdominal", nombre: "Crunch abdominal", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "elevaciones_de_pierna", nombre: "Elevaciones de pierna", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "elevaciones_de_rodillas", nombre: "Elevaciones de rodillas", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "plancha_abdominal", nombre: "Plancha abdominal", grupo: "Abdomen", video: "rehacer", archivo: "", estado: "rehacer" },

    // ANTEBRAZO
    { id: "curl_antebrazo_barra_z", nombre: "Curl antebrazo barra Z", grupo: "Antebrazo", video: "curl antebrazo barra z", archivo: "curl antebrazo barra z.mp4", estado: "disponible" },
    { id: "extension_antebrazo_barra_z", nombre: "Extensión antebrazo barra Z", grupo: "Antebrazo", video: "Extensión antebrazo barra z.mp4", archivo: "Extensión antebrazo barra z.mp4", estado: "disponible" },

    // BÍCEPS
    { id: "curl_arana", nombre: "Curl araña", grupo: "Bíceps", video: "curl araña", archivo: "curl araña.mp4", estado: "disponible" },
    { id: "curl_bayesian_unilateral", nombre: "Curl bayesian unilateral", grupo: "Bíceps", video: "curl bayesian unilateral", archivo: "curl bayesian unilateral.mp4", estado: "disponible" },
    { id: "curl_biceps_alterno", nombre: "Curl bíceps alterno", grupo: "Bíceps", video: "curl biceps alterno", archivo: "curl biceps alterno.mp4", estado: "disponible" },
    { id: "curl_biceps_barra_z", nombre: "Curl bíceps barra Z", grupo: "Bíceps", video: "curl biceps barra z", archivo: "curl biceps barra z.mp4", estado: "disponible" },
    { id: "curl_biceps_mancuerna_banco_inclinado", nombre: "Curl bíceps mancuerna banco inclinado", grupo: "Bíceps", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "curl_biceps_mancuernas", nombre: "Curl bíceps mancuernas", grupo: "Bíceps", video: "curl biceps mancuernas", archivo: "curl biceps mancuernas.mp4", estado: "disponible" },
    { id: "curl_biceps_polea", nombre: "Curl bíceps polea", grupo: "Bíceps", video: "curl biceps polea", archivo: "curl biceps polea.mp4", estado: "disponible" },
    { id: "curl_biceps_polea_alta", nombre: "Curl bíceps polea alta", grupo: "Bíceps", video: "curl biceps polea alta", archivo: "curl biceps polea alta.mp4", estado: "disponible" },
    { id: "curl_concentrado", nombre: "Curl concentrado", grupo: "Bíceps", video: "curl concentrado", archivo: "curl concentrado.mp4", estado: "disponible" },
    { id: "curl_martillo_mancuernas", nombre: "Curl martillo mancuernas", grupo: "Bíceps", video: "curl martillo mancuernas", archivo: "curl martillo mancuernas.mp4", estado: "disponible" },

    // ESPALDA & TRAPECIO
    { id: "dominadas", nombre: "Dominadas", grupo: "Espalda", video: "dominadas", archivo: "dominadas.mp4", estado: "disponible" },
    { id: "dominadas_asistidas", nombre: "Dominadas asistidas", grupo: "Espalda", video: "dominadas asistidas", archivo: "dominadas asistidas.mp4", estado: "disponible" },
    { id: "encogimientos_con_barra", nombre: "Encogimientos con barra", grupo: "Espalda", video: "encogimientos con barra", archivo: "encogimientos con barra.mp4", estado: "disponible" },
    { id: "encogimientos_con_mancuerna", nombre: "Encogimientos con mancuerna", grupo: "Trapecio", video: "encogimientos con mancuernas", archivo: "encogimientos con mancuernas.mp4", estado: "disponible" },
    { id: "jalon_agarre_abierto", nombre: "Jalón agarre abierto", grupo: "Espalda", video: "jalón agarre abierto", archivo: "jalón agarre abierto.mp4", estado: "disponible" },
    { id: "jalon_agarre_cerrado", nombre: "Jalón agarre cerrado", grupo: "Espalda", video: "jalón agarre cerrado.mp4", archivo: "jalón agarre cerrado.mp4", estado: "disponible" },
    { id: "jalon_agarre_neutro", nombre: "Jalón agarre neutro", grupo: "Espalda", video: "jalón agarre neutro", archivo: "jalón agarre neutro.mp4", estado: "disponible" },
    { id: "jalon_al_pecho_agarre_neutro", nombre: "Jalón al pecho agarre neutro", grupo: "Espalda", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "jalon_al_pecho_agarre_v", nombre: "Jalón al pecho agarre V", grupo: "Espalda", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "jalon_unilateral", nombre: "Jalón unilateral", grupo: "Espalda", video: "jalón unilateral", archivo: "jalón unilateral.mp4", estado: "disponible" },
    { id: "jalon_unilateral_en_polea", nombre: "Jalón unilateral en polea", grupo: "Espalda", video: "jalón unilateral en polea", archivo: "jalón unilateral en polea.mp4", estado: "disponible" },
    { id: "pullover", nombre: "Pullover", grupo: "Espalda", video: "pullover", archivo: "pullover.mp4", estado: "disponible" },
    { id: "remo_con_barra", nombre: "Remo con barra", grupo: "Espalda", video: "remo con barra", archivo: "remo con barra.mp4", estado: "disponible" },
    { id: "remo_con_barra_polea", nombre: "Remo con barra polea", grupo: "Espalda", video: "remo con barra polea", archivo: "remo con barra polea.mp4", estado: "disponible" },
    { id: "remo_con_mancuerna", nombre: "Remo con mancuerna", grupo: "Espalda", video: "remo con mancuerna", archivo: "remo con mancuerna.mp4", estado: "disponible" },
    { id: "remo_gironda", nombre: "Remo Gironda", grupo: "Espalda", video: "remo gironda", archivo: "remo gironda.mp4", estado: "disponible" },
    { id: "peso_muerto_con_barra", nombre: "Peso muerto con barra", grupo: "Espalda", video: "rehacer", archivo: "", estado: "rehacer" },

    // HOMBRO
    { id: "elevaciones_frontales", nombre: "Elevaciones frontales", grupo: "Hombro", video: "elevaciones frontales", archivo: "elevaciones frontales.mp4", estado: "disponible" },
    { id: "elevaciones_frontales_apoyado_en_banco", nombre: "Elevaciones frontales apoyado en banco", grupo: "Hombro", video: "elevaciones frontales apoyado en banco", archivo: "elevaciones frontales apoyado en banco.mp4", estado: "disponible" },
    { id: "elevaciones_frontales_polea", nombre: "Elevaciones frontales polea", grupo: "Hombro", video: "elevaciones frontales polea", archivo: "elevaciones frontales polea.mp4", estado: "disponible" },
    { id: "elevaciones_laterales", nombre: "Elevaciones laterales", grupo: "Hombro", video: "elevaciones laterales", archivo: "elevaciones laterales.mp4", estado: "disponible" },
    { id: "elevaciones_laterales_apoyado_en_banco", nombre: "Elevaciones laterales apoyado en banco", grupo: "Hombro", video: "elevaciones laterales apoyado en banco", archivo: "elevaciones laterales apoyado en banco.mp4", estado: "disponible" },
    { id: "elevaciones_laterales_en_maquina", nombre: "Elevaciones laterales en máquina", grupo: "Hombro", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "elevaciones_laterales_en_polea", nombre: "Elevaciones laterales en polea", grupo: "Hombro", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "elevaciones_laterales_polea", nombre: "Elevaciones laterales polea", grupo: "Hombro", video: "elevaciones laterales polea", archivo: "elevaciones laterales polea.mp4", estado: "disponible" },
    { id: "elevaciones_laterales_sentado", nombre: "Elevaciones laterales sentado", grupo: "Hombro", video: "elevaciones laterales sentado", archivo: "elevaciones laterales sentado.mp4", estado: "disponible" },
    { id: "facepull", nombre: "Facepull", grupo: "Hombro", video: "facepull", archivo: "facepull.mp4", estado: "disponible" },
    { id: "hombro_posterior_en_polea", nombre: "Hombro posterior en polea", grupo: "Hombro", video: "hombro posterior en polea", archivo: "hombro posterior en polea.mp4", estado: "disponible" },
    { id: "hombro_posterior_mancuerna", nombre: "Hombro posterior mancuerna", grupo: "Hombro", video: "hombro posterior mancuerna", archivo: "hombro posterior mancuerna.mp4", estado: "disponible" },
    { id: "pajaros_en_maquina", nombre: "Pájaros en máquina", grupo: "Hombro", video: "pájaros en máquina", archivo: "pájaros en máquina.mp4", estado: "disponible" },
    { id: "press_militar_con_mancuerna", nombre: "Press militar con mancuerna", grupo: "Hombro", video: "press militar con mancuerna", archivo: "press militar con mancuerna.mp4", estado: "disponible" },

    // PECHO
    { id: "aperturas_en_maquina", nombre: "Aperturas en máquina", grupo: "Pecho", video: "aparturas en máquina", archivo: "aparturas en máquina.mp4", estado: "disponible" },
    { id: "aperturas_con_mancuerna", nombre: "Aperturas con mancuerna", grupo: "Pecho", video: "aperturas con mancuerna", archivo: "aperturas con mancuerna.mp4", estado: "disponible" },
    { id: "aperturas_con_mancuerna_banco_plano", nombre: "Aperturas con mancuerna banco plano", grupo: "Pecho", video: "aperturas con mancuerna banco plano", archivo: "aperturas con mancuerna banco plano.mp4", estado: "disponible" },
    { id: "contractora", nombre: "Contractora", grupo: "Pecho", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "cruces_en_polea_desde_abajo", nombre: "Cruces en polea desde abajo", grupo: "Pecho", video: "cruces en polea desde abajo", archivo: "cruces en polea desde abajo.mp4", estado: "disponible" },
    { id: "cruces_en_polea_desde_arriba", nombre: "Cruces en polea desde arriba", grupo: "Pecho", video: "cruces en polea desde arriba", archivo: "cruces en polea desde arriba.mp4", estado: "disponible" },
    { id: "flexiones", nombre: "Flexiones", grupo: "Pecho", video: "flexiones", archivo: "flexiones.mp4", estado: "disponible" },
    { id: "press_banca", nombre: "Press banca", grupo: "Pecho", video: "press banca", archivo: "press banca.mp4", estado: "disponible" },
    { id: "press_con_mancuerna", nombre: "Press con mancuerna", grupo: "Pecho", video: "press con mancuerna", archivo: "press con mancuerna.mp4", estado: "disponible" },
    { id: "press_declinado", nombre: "Press declinado", grupo: "Pecho", video: "press declinado", archivo: "press declinado.mp4", estado: "disponible" },
    { id: "press_inclinado_con_mancuerna", nombre: "Press inclinado con mancuerna", grupo: "Pecho", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "press_inclinado_en_maquina", nombre: "Press inclinado en máquina", grupo: "Pecho", video: "press inclinado en máquina", archivo: "press inclinado en máquina.mp4", estado: "disponible" },
    { id: "press_plano_en_maquina", nombre: "Press plano en máquina", grupo: "Pecho", video: "press plano en máquina", archivo: "press plano en máquina.mp4", estado: "disponible" },
    { id: "press_sentado_en_maquina", nombre: "Press sentado en máquina", grupo: "Pecho", video: "press sentado en máquina", archivo: "press sentado en máquina.mp4", estado: "disponible" },

    // PIERNA
    { id: "aduccion_en_maquina", nombre: "Aducción en máquina", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "aductor_en_maquina", nombre: "Aductor en máquina", grupo: "Pierna", video: "aductor en máquina", archivo: "aductor en máquina.mp4", estado: "disponible" },
    { id: "extension_de_cuadriceps", nombre: "Extensión de cuádriceps", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "femoral_de_pie", nombre: "Femoral de pie", grupo: "Pierna", video: "femoral de pie", archivo: "femoral de pie.mp4", estado: "disponible" },
    { id: "femoral_de_pie_en_maquina", nombre: "Femoral de pie en máquina", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "femoral_sentado", nombre: "Femoral sentado", grupo: "Pierna", video: "femoral sentado", archivo: "femoral sentado.mp4", estado: "disponible" },
    { id: "femoral_tumbado", nombre: "Femoral tumbado", grupo: "Pierna", video: "femoral tumbado", archivo: "femoral tumbado.mp4", estado: "disponible" },
    { id: "femoral_tumbado_en_maquina", nombre: "Femoral tumbado en máquina", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "gemelo_de_pie", nombre: "Gemelo de pie", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "gemelo_sentado", nombre: "Gemelo sentado", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "gemelos_en_maquina", nombre: "Gemelos en máquina", grupo: "Pierna", video: "gemelos en máquina", archivo: "gemelos en máquina.mp4", estado: "disponible" },
    { id: "gemelos_en_prensa", nombre: "Gemelos en prensa", grupo: "Pierna", video: "Gemelos en prensa", archivo: "Gemelos en prensa.mp4", estado: "disponible" },
    { id: "hip_thrust", nombre: "Hip thrust", grupo: "Pierna", video: "Hip thrust", archivo: "Hip thrust.mp4", estado: "disponible" },
    { id: "patada_de_gluteo", nombre: "Patada de glúteo", grupo: "Pierna", video: "patada de glúteo", archivo: "patada de glúteo.mp4", estado: "disponible" },
    { id: "peso_muerto_convencional", nombre: "Peso muerto convencional", grupo: "Pierna", video: "peso muerto convencional", archivo: "peso muerto convencional.mp4", estado: "disponible" },
    { id: "peso_muerto_rumano_con_barra", nombre: "Peso muerto rumano con barra", grupo: "Pierna", video: "peso muerto rumano con barra", archivo: "peso muerto rumano con barra.mp4", estado: "disponible" },
    { id: "prensa", nombre: "Prensa", grupo: "Pierna", video: "Prensa", archivo: "Prensa.mp4", estado: "disponible" },
    { id: "prensa_horizontal", nombre: "Prensa horizontal", grupo: "Pierna", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "sentadilla_bulgara_en_maquina_smith", nombre: "Sentadilla búlgara en máquina Smith", grupo: "Pierna", video: "sentadilla búlgara en máquina smith", archivo: "sentadilla búlgara en máquina smith.mp4", estado: "disponible" },
    { id: "sentadilla_multipower", nombre: "Sentadilla multipower", grupo: "Pierna", video: "sentadilla en máquina smith", archivo: "sentadilla en máquina smith.mp4", estado: "disponible" },
    { id: "sentadilla_hack", nombre: "Sentadilla hack", grupo: "Pierna", video: "sentadilla hack", archivo: "sentadilla hack.mp4", estado: "disponible" },
    { id: "sentadilla_profunda_pies_juntos", nombre: "Sentadilla profunda pies juntos", grupo: "Pierna", video: "sentadilla profunda pies juntos", archivo: "sentadilla profunda pies juntos.mp4", estado: "disponible" },
    { id: "sentadilla_sumo", nombre: "Sentadilla sumo", grupo: "Pierna", video: "sentadilla sumo", archivo: "sentadilla sumo.mp4", estado: "disponible" },
    { id: "sldl", nombre: "SLDL (Peso muerto piernas rígidas)", grupo: "Pierna", video: "SLDL", archivo: "SLDL.mp4", estado: "disponible" },
    { id: "zancada_en_smith", nombre: "Zancada en Smith", grupo: "Pierna", video: "zancada en smith", archivo: "zancada en smith.mp4", estado: "disponible" },

    // TRÍCEPS
    { id: "fondos", nombre: "Fondos", grupo: "Tríceps", video: "fondos", archivo: "fondos.mp4", estado: "disponible" },
    { id: "patada_de_triceps", nombre: "Patada de tríceps", grupo: "Tríceps", video: "patada de triceps", archivo: "patada de triceps.mp4", estado: "disponible" },
    { id: "press_frances", nombre: "Press francés", grupo: "Tríceps", video: "press francés", archivo: "press francés.mp4", estado: "disponible" },
    { id: "press_frances_con_mancuerna", nombre: "Press francés con mancuerna", grupo: "Tríceps", video: "press francés con mancuerna", archivo: "press francés con mancuerna.mp4", estado: "disponible" },
    { id: "press_frances_sobre_cabeza", nombre: "Press francés sobre cabeza", grupo: "Tríceps", video: "press frances sobre cabeza", archivo: "press frances sobre cabeza.mp4", estado: "disponible" },
    { id: "press_trasnuca", nombre: "Press trasnuca", grupo: "Tríceps", video: "Press trasnuca", archivo: "Press trasnuca.mp4", estado: "disponible" },
    { id: "press_trasnuca_con_mancuerna", nombre: "Press trasnuca con mancuerna", grupo: "Tríceps", video: "press trasnuca con mancuerna", archivo: "press trasnuca con mancuerna.mp4", estado: "disponible" },
    { id: "press_trasnuca_con_mancuerna_a_una_mano", nombre: "Press trasnuca con mancuerna a una mano", grupo: "Tríceps", video: "press trasnuca con mancuerna a una mano", archivo: "press trasnuca con mancuerna a una mano.mp4", estado: "disponible" },
    { id: "press_triceps_fuerza", nombre: "Press tríceps fuerza", grupo: "Tríceps", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "triceps_en_polea_con_barra", nombre: "Tríceps en polea con barra", grupo: "Tríceps", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "triceps_en_polea_con_cuerda", nombre: "Tríceps en polea con cuerda", grupo: "Tríceps", video: "rehacer", archivo: "", estado: "rehacer" },
    { id: "triceps_polea_unilateral", nombre: "Tríceps polea unilateral", grupo: "Tríceps", video: "triceps uni lateral", archivo: "triceps uni lateral.mp4", estado: "disponible" }
  ];

  // Normalizador de texto para búsquedas (quita tildes, minúsculas, caracteres especiales)
  function normalizarTexto(txt) {
    if (!txt) return '';
    return txt.toString().toLowerCase().trim()
      .replace(/[áàä]/g, 'a')
      .replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i')
      .replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/\.mp4$/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Diccionario de equivalencias para asociar automáticamente cualquier ejercicio escrito en una rutina
  var SINONIMOS = {
    'pull over en polea': 'pullover',
    'pull over': 'pullover',
    'pullover en polea': 'pullover',
    'remo dorian': 'remo con barra',
    'remo dorian con barra': 'remo con barra',
    'remo barra': 'remo con barra',
    'remo con barra en punta': 'remo con barra',
    'remo al menton en polea': 'remo con barra polea',
    'remo al menton': 'remo con barra polea',
    'posterior en maquina': 'pajaros en maquina',
    'deltoides posterior en maquina': 'pajaros en maquina',
    'press inclinado': 'press inclinado en maquina',
    'press inclinado mancuerna': 'press inclinado con mancuerna',
    'press banca inclinada': 'press inclinado en maquina',
    'aperturas': 'aperturas con mancuerna',
    'aperturas en banco': 'aperturas con mancuerna banco plano',
    'cruce de poleas': 'cruces en polea desde arriba',
    'cruces en polea': 'cruces en polea desde arriba',
    'press militar': 'press militar con mancuerna',
    'press de hombros': 'press militar con mancuerna',
    'extensiones de cuadriceps': 'extension de cuadriceps',
    'extension cuadriceps': 'extension de cuadriceps',
    'sentadilla pendular': 'sentadilla hack',
    'prensa inclinada': 'prensa',
    'aductor': 'aductor en maquina',
    'aductores': 'aductor en maquina',
    'curl de biceps con mancuernas': 'curl biceps mancuernas',
    'curl biceps': 'curl biceps mancuernas',
    'triceps en polea con cuerda': 'triceps en polea con cuerda',
    'extension triceps cuerda': 'triceps en polea con cuerda',
    'curl de biceps en banco scott': 'curl biceps barra z',
    'banco scott': 'curl biceps barra z',
    'triceps tras nuca unilateral': 'press trasnuca con mancuerna a una mano',
    'tras nuca unilateral': 'press trasnuca con mancuerna a una mano',
    'curl martillo': 'curl martillo mancuernas',
    'fondos': 'fondos',
    'fondos en paralelas': 'fondos'
  };

  /**
   * Busca un ejercicio en la base de datos maestra por nombre
   * Realiza coincidencia exacta, por sinónimos o por similitud de palabras
   */
  function buscarEjercicioEnBD(nombreBuscado) {
    if (!nombreBuscado) return null;
    var norm = normalizarTexto(nombreBuscado);
    if (!norm) return null;

    // 1. Comprobar diccionario de sinónimos
    if (SINONIMOS[norm]) {
      var sinNorm = normalizarTexto(SINONIMOS[norm]);
      for (var s = 0; s < BASE_DATOS_EJERCICIOS.length; s++) {
        var nItemSin = normalizarTexto(BASE_DATOS_EJERCICIOS[s].nombre);
        var nItemSinId = normalizarTexto(BASE_DATOS_EJERCICIOS[s].id);
        if (nItemSin === sinNorm || nItemSinId === sinNorm) return BASE_DATOS_EJERCICIOS[s];
      }
    }

    // 2. Coincidencia exacta de nombre, id o nombre de archivo
    for (var i = 0; i < BASE_DATOS_EJERCICIOS.length; i++) {
      var item = BASE_DATOS_EJERCICIOS[i];
      var nItem = normalizarTexto(item.nombre);
      var nId = normalizarTexto(item.id);
      var nArch = normalizarTexto(item.video);
      if (nItem === norm || nId === norm || nArch === norm) return item;
    }

    // 3. Coincidencia por subcadena o palabras clave
    var mejorCoincidencia = null;
    var maxPuntaje = 0;
    var palabrasBuscadas = norm.split(' ').filter(function(p) { return p.length > 2; });

    for (var j = 0; j < BASE_DATOS_EJERCICIOS.length; j++) {
      var item2 = BASE_DATOS_EJERCICIOS[j];
      var itemTexto = normalizarTexto(item2.nombre + ' ' + item2.video + ' ' + item2.grupo);
      var puntaje = 0;

      for (var k = 0; k < palabrasBuscadas.length; k++) {
        if (itemTexto.indexOf(palabrasBuscadas[k]) !== -1) {
          puntaje++;
        }
      }

      if (puntaje > maxPuntaje && puntaje >= Math.min(2, palabrasBuscadas.length)) {
        maxPuntaje = puntaje;
        mejorCoincidencia = item2;
      }
    }

    return mejorCoincidencia;
  }

  function obtenerEjerciciosPorGrupo() {
    var grupos = {};
    for (var i = 0; i < BASE_DATOS_EJERCICIOS.length; i++) {
      var ex = BASE_DATOS_EJERCICIOS[i];
      var g = ex.grupo || 'Otros';
      if (!grupos[g]) grupos[g] = [];
      grupos[g].push(ex);
    }
    return grupos;
  }

  function obtenerEstadisticasBD() {
    var total = BASE_DATOS_EJERCICIOS.length;
    var disponibles = 0;
    var rehacer = 0;
    for (var i = 0; i < total; i++) {
      if (BASE_DATOS_EJERCICIOS[i].estado === 'disponible') disponibles++;
      else rehacer++;
    }
    return {
      total: total,
      disponibles: disponibles,
      rehacer: rehacer
    };
  }

  var BD = {
    lista: BASE_DATOS_EJERCICIOS,
    buscar: buscarEjercicioEnBD,
    normalizar: normalizarTexto,
    porGrupo: obtenerEjerciciosPorGrupo,
    estadisticas: obtenerEstadisticasBD
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = BD;
  } else {
    global.CGM_BASE_DATOS_EJERCICIOS = BD;
  }
})(typeof window !== 'undefined' ? window : this);
