// =============================================================================
// PARSER DE RUTINAS DESDE PDF · CGM RENDIMIENTO
// Extrae y estructura automáticamente planes de entrenamiento en el navegador
// =============================================================================

(function(global) {
  'use strict';

  // Configuración del worker de PDF.js local
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './lib/pdf.worker.min.js';
  }

  // Diccionario extendido de sinónimos para PDFs (sin alterar ejercicios-db.js)
  var SINONIMOS_PDF = {
    'pull over': 'pullover',
    'pullover en polea alta': 'pullover',
    'pullover polea': 'pullover',
    'dominadas pronas': 'dominadas',
    'dominadas supinas': 'dominadas',
    'remo dorian': 'remo con barra',
    'remo dorian con barra': 'remo con barra',
    'posterior en maquina': 'pajaros en maquina',
    'pajaros maquina': 'pajaros en maquina',
    'deltoides posterior en maquina': 'pajaros en maquina',
    'remo al menton en polea': 'facepull',
    'remo al menton': 'facepull',
    'jalon agarre cerrado': 'jalon al pecho agarre cerrado',
    'jalon agarre neutro': 'jalon al pecho agarre neutro',
    'jalon al pecho': 'jalon al pecho agarre abierto',
    'press inclinado': 'press inclinado en maquina',
    'press banca inclinado': 'press inclinado en maquina',
    'aperturas': 'aperturas con mancuerna',
    'aperturas mancuernas': 'aperturas con mancuerna',
    'press declinado': 'press banca declinado con barra',
    'cruce de poleas': 'cruces en polea desde abajo',
    'cruces de poleas': 'cruces en polea desde abajo',
    'cruces en polea': 'cruces en polea desde abajo',
    'press militar': 'press militar con mancuerna',
    'press de hombro': 'press militar con mancuerna',
    'elevaciones laterales': 'elevaciones laterales con mancuernas',
    'elevaciones frontales': 'elevaciones frontales con mancuernas',
    'femoral tumbado': 'femoral tumbado en maquina',
    'curl femoral tumbado': 'femoral tumbado en maquina',
    'femoral sentado': 'curl femoral sentado',
    'curl femoral sentado': 'curl femoral sentado',
    'extensiones de cuadriceps': 'extension de cuadriceps',
    'extension cuadriceps': 'extension de cuadriceps',
    'sentadilla pendular': 'sentadilla hack',
    'prensa': 'prensa de piernas inclinada',
    'prensa inclinada': 'prensa de piernas inclinada',
    'aductor': 'aductor en maquina',
    'abductor': 'abductor en maquina',
    'curl de biceps con mancuernas': 'curl biceps mancuernas',
    'curl con mancuernas': 'curl biceps mancuernas',
    'triceps en polea con cuerda': 'triceps en polea con cuerda',
    'triceps cuerda': 'triceps en polea con cuerda',
    'curl de biceps en banco scott': 'curl arana',
    'curl scott': 'curl arana',
    'curl arana': 'curl arana',
    'triceps tras nuca unilateral': 'press trasnuca con mancuerna a una mano',
    'copa triceps': 'press trasnuca con mancuerna a una mano',
    'curl martillo': 'curl martillo mancuernas',
    'fondos': 'fondos',
    'fondos en paralelas': 'fondos'
  };

  function normalizar(texto) {
    if (!texto) return '';
    return texto.toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Motor de correspondencia en 5 fases con la base de datos oficial
  function buscarCoincidenciaEnBD(nombreOriginal) {
    if (!nombreOriginal || !global.CGM_BASE_DATOS_EJERCICIOS) {
      return { match: null, confianza: 'sin_coincidencia', tipo: 'ninguno' };
    }

    var base = global.CGM_BASE_DATOS_EJERCICIOS.lista || [];
    var normOriginal = normalizar(nombreOriginal);

    // 1. Coincidencia directa con función oficial de búsqueda
    var directMatch = global.CGM_BASE_DATOS_EJERCICIOS.buscar(nombreOriginal);
    if (directMatch) {
      return { match: directMatch, confianza: 'alta', tipo: 'exacto' };
    }

    // 2. Comprobación en diccionario de sinónimos extendido de PDF
    if (SINONIMOS_PDF[normOriginal]) {
      var targetId = SINONIMOS_PDF[normOriginal];
      for (var i = 0; i < base.length; i++) {
        if (base[i].id === targetId || normalizar(base[i].nombre) === targetId) {
          return { match: base[i], confianza: 'alta', tipo: 'sinonimo' };
        }
      }
    }

    // 3. Coincidencia normalizada directa
    for (var j = 0; j < base.length; j++) {
      var ex = base[j];
      var normBD = normalizar(ex.nombre);
      if (normOriginal === normBD || ex.id === normOriginal) {
        return { match: ex, confianza: 'alta', tipo: 'normalizado' };
      }
    }

    // 4. Coincidencia por subcadena / términos clave
    var palabras = normOriginal.split(' ').filter(function(w) { return w.length > 2; });
    var mejorCoincidencia = null;
    var maxPuntos = 0;

    for (var k = 0; k < base.length; k++) {
      var cand = base[k];
      var normCand = normalizar(cand.nombre);
      var puntos = 0;

      if (normOriginal.indexOf(normCand) !== -1 || normCand.indexOf(normOriginal) !== -1) {
        puntos += 5;
      }

      for (var p = 0; p < palabras.length; p++) {
        if (normCand.indexOf(palabras[p]) !== -1) puntos++;
      }

      if (puntos > maxPuntos && puntos >= 2) {
        maxPuntos = puntos;
        mejorCoincidencia = cand;
      }
    }

    if (mejorCoincidencia) {
      return { match: mejorCoincidencia, confianza: 'media', tipo: 'parcial' };
    }

    return { match: null, confianza: 'baja', tipo: 'sin_coincidencia' };
  }

  // Extracción de texto organizada por coordenadas visuales con clustering adaptativo
  async function extraerLineasDePDF(arrayBuffer) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('La biblioteca PDF.js no está disponible en este momento.');
    }

    var pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    var lineasTotales = [];

    for (var numPagina = 1; numPagina <= pdf.numPages; numPagina++) {
      var pagina = await pdf.getPage(numPagina);
      var contenido = await pagina.getTextContent({ normalizeWhitespace: true });
      var items = contenido.items || [];
      if (items.length === 0) continue;

      // Agrupación adaptativa de texto por líneas (tolerancia de 6.5px para fuentes y negritas)
      var lineasAgrupadas = [];
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var str = (it.str || '').trim();
        if (!str) continue;

        var y = it.transform ? it.transform[5] : 0;
        var x = it.transform ? it.transform[4] : 0;

        var lineaExistente = null;
        for (var l = 0; l < lineasAgrupadas.length; l++) {
          if (Math.abs(lineasAgrupadas[l].y - y) <= 6.5) {
            lineaExistente = lineasAgrupadas[l];
            break;
          }
        }

        if (lineaExistente) {
          lineaExistente.items.push({ x: x, texto: it.str });
        } else {
          lineasAgrupadas.push({ y: y, items: [{ x: x, texto: it.str }] });
        }
      }

      // Ordenar líneas de arriba hacia abajo (Y descendente)
      lineasAgrupadas.sort(function(a, b) { return b.y - a.y; });

      // Ordenar items dentro de cada línea horizontalmente (X ascendente)
      for (var k = 0; k < lineasAgrupadas.length; k++) {
        var itemsFila = lineasAgrupadas[k].items;
        itemsFila.sort(function(a, b) { return a.x - b.x; });
        var lineaTexto = itemsFila.map(function(el) { return el.texto; }).join(' ').replace(/\s+/g, ' ').trim();
        if (lineaTexto) lineasTotales.push(lineaTexto);
      }

      // Si por alguna razón la agrupación por coordenadas falló, añadir el flujo secuencial plano
      if (lineasAgrupadas.length === 0) {
        for (var s = 0; s < items.length; s++) {
          var t = (items[s].str || '').trim();
          if (t) lineasTotales.push(t);
        }
      }
    }

    return lineasTotales;
  }

  // Mapa de días de la semana (Español e Inglés)
  var MAPA_DIAS_SEMANA = {
    'lunes': { num: 1, nom: 'Lunes' },
    'martes': { num: 2, nom: 'Martes' },
    'miercoles': { num: 3, nom: 'Miércoles' },
    'miércoles': { num: 3, nom: 'Miércoles' },
    'jueves': { num: 4, nom: 'Jueves' },
    'viernes': { num: 5, nom: 'Viernes' },
    'sabado': { num: 6, nom: 'Sábado' },
    'sábado': { num: 6, nom: 'Sábado' },
    'domingo': { num: 7, nom: 'Domingo' },
    'monday': { num: 1, nom: 'Lunes' },
    'tuesday': { num: 2, nom: 'Martes' },
    'wednesday': { num: 3, nom: 'Miércoles' },
    'thursday': { num: 4, nom: 'Jueves' },
    'friday': { num: 5, nom: 'Viernes' },
    'saturday': { num: 6, nom: 'Sábado' },
    'sunday': { num: 7, nom: 'Domingo' }
  };

  // Detector tolerante de encabezados de día (dia 1, dia1, lunes, sesión, letras, splits)
  function detectarEncabezadoDia(linea, conteoDiasActuales) {
    if (!linea || typeof linea !== 'string') return null;
    var l = linea.trim();
    if (l.length > 85) return null;

    // Ignorar tablas generales de calendario semanal con varios días juntos
    if (/lunes\s+martes/i.test(l) || /mon\s+tue/i.test(l) || /^ejercicio\s+series/i.test(l)) {
      return null;
    }

    // 1. Detección de "DÍA 1", "DIA 1", "dia1", "D1", "D-1", "D.1", "Día 1: Pecho", "DÍA 1 (LUNES)", etc.
    var matchNum = l.match(/^(?:[•\-\*#📌🗓️📅\d\.\x29]*\s*)?(?:D[IÍ]A|D|SESI[OÓ]N|SESSION|ENTRENO|ENTRENAMIENTO|DAY|RUTINA)\s*[:#\-\.]*\s*([0-9]+)\b[:\s\-\/\.]*(.*)$/i);
    if (matchNum) {
      var n = parseInt(matchNum[1], 10);
      var resto = (matchNum[2] || '').trim();
      return {
        esDia: true,
        numero: n,
        titulo: 'DÍA ' + n,
        nombre: resto || ('Día ' + n)
      };
    }

    // 2. Detección de días de la semana: "LUNES", "LUNES: Pecho", "Lunes - Pierna", etc.
    var matchSemana = l.match(/^(?:[•\-\*#📌🗓️📅\d\.\x29]*\s*)?(LUNES|MARTES|MI[EÉ]RCOLES|MIERCOLES|JUEVES|VIERNES|S[AÁ]BADO|SABADO|DOMINGO|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\b[:\s\-\/\.]*(.*)$/i);
    if (matchSemana) {
      var diaSemanaKey = matchSemana[1].toLowerCase();
      var infoSemana = MAPA_DIAS_SEMANA[diaSemanaKey] || { num: (conteoDiasActuales + 1), nom: matchSemana[1] };
      var restoSemana = (matchSemana[2] || '').trim();
      var nroSemana = conteoDiasActuales + 1;

      return {
        esDia: true,
        numero: nroSemana,
        titulo: 'DÍA ' + nroSemana + ' (' + infoSemana.nom + ')',
        nombre: restoSemana ? (infoSemana.nom + ' · ' + restoSemana) : infoSemana.nom
      };
    }

    // 3. Detección de Días por letras: "DÍA A", "DIA B", "DÍA C", "RUTINA A"
    var matchLetra = l.match(/^(?:[•\-\*#📌🗓️📅\d\.\x29]*\s*)?(?:D[IÍ]A|D|RUTINA)\s*[:#\-\.]*\s*([A-F])\b[:\s\-\/\.]*(.*)$/i);
    if (matchLetra) {
      var letra = matchLetra[1].toUpperCase();
      var numEquiv = letra.charCodeAt(0) - 64;
      var restoLetra = (matchLetra[2] || '').trim();
      return {
        esDia: true,
        numero: numEquiv,
        titulo: 'DÍA ' + letra,
        nombre: restoLetra || ('Día ' + letra)
      };
    }

    // 4. Detección de divisiones de entrenamiento cuando están solas en la línea (Split headers)
    var matchSplit = l.match(/^(?:[•\-\*#📌🗓️📅\d\.\x29]*\s*)?(TORSO|PIERNA|PIERNAS|PUSH|PULL|LEGS|EMPUJE|TRACCI[OÓ]N|TIR[OÓ]N|FULL\s*BODY|FULLBODY|BRAZOS\s*Y\s*HOMBROS?|PECHO\s*Y\s*ESPALDA|PECHO\s*Y\s*B[IÍ]CEPS|ESPALDA\s*Y\s*TR[IÍ]CEPS|TREN\s*SUPERIOR|TREN\s*INFERIOR|UPPER|LOWER)\b[:\s\-]*(.*)$/i);
    if (matchSplit && l.split(' ').length <= 6) {
      var nro = conteoDiasActuales + 1;
      var grupo = matchSplit[1].trim();
      var detalle = (matchSplit[2] || '').trim();
      return {
        esDia: true,
        numero: nro,
        titulo: 'DÍA ' + nro,
        nombre: detalle ? (grupo + ' · ' + detalle) : grupo
      };
    }

    return null;
  }

  // Preprocesar líneas para unir encabezados o números partidos
  function unificarLineasFragmentadas(lineas) {
    var resultado = [];
    for (var i = 0; i < lineas.length; i++) {
      var actual = lineas[i].trim();
      if (!actual) continue;

      // Si la línea actual es solo "DÍA", "DIA" o "SESIÓN" y la siguiente empieza con número o nombre
      if (/^(?:D[IÍ]A|D|SESI[OÓ]N|SESSION)$/i.test(actual) && (i + 1 < lineas.length)) {
        var siguiente = lineas[i + 1].trim();
        resultado.push(actual + ' ' + siguiente);
        i++;
        continue;
      }

      // Si la línea actual es solo un número de ejercicio (ej. "1." o "1") y la siguiente es el nombre
      if (/^[0-9]{1,2}[\.\x29\-]?$/i.test(actual) && (i + 1 < lineas.length)) {
        var sigEx = lineas[i + 1].trim();
        // Verificar que la siguiente no sea otro día ni otra cabecera
        if (sigEx.length > 2 && !/^(?:D[IÍ]A|LUNES|MARTES)/i.test(sigEx)) {
          resultado.push(actual + ' ' + sigEx);
          i++;
          continue;
        }
      }

      resultado.push(actual);
    }
    return resultado;
  }

  // Parsear texto plano estructurado en objeto de rutina
  function analizarEstructuraRutina(lineasCrudas, nombreArchivo) {
    var lineas = unificarLineasFragmentadas(lineasCrudas);

    var resultado = {
      titulo: 'Rutina Personalizada',
      cliente: '',
      entrenador: 'Carlos Graña',
      descripcion: 'Rutina importada automáticamente desde PDF',
      dias: []
    };

    // 1. Detectar título o cliente en los primeros encabezados
    for (var h = 0; h < Math.min(12, lineas.length); h++) {
      var l = lineas[h];
      if (/ENTRENO|ENTRENAMIENTO|RUTINA|FRECUENCIA|PLAN/i.test(l) && !resultado.tituloModificado && l.length < 70) {
        resultado.titulo = l;
        resultado.tituloModificado = true;
      }
      if (/Plan personalizado|Cliente|Atleta/i.test(l)) {
        resultado.cliente = l.replace(/.*(?:Plan personalizado|Cliente|Atleta)\s*:?/i, '').trim();
      }
    }
    if (!resultado.cliente && nombreArchivo) {
      resultado.cliente = nombreArchivo.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
    }

    // 2. Segmentar días
    var diaActual = null;
    var ejercicioActual = null;
    var contadorEjerciciosDia = 0;

    for (var i = 0; i < lineas.length; i++) {
      var linea = lineas[i].trim();
      if (!linea) continue;

      // Comprobar si la línea es un encabezado de día
      var infoDia = detectarEncabezadoDia(linea, resultado.dias.length + (diaActual ? 1 : 0));
      if (infoDia) {
        // Guardar día anterior si existe
        if (diaActual) {
          resultado.dias.push(diaActual);
        }

        var nombreDia = infoDia.nombre;

        // Si el nombre del día viene en la siguiente línea (ej: "DÍA 1" \n "Espalda y posterior")
        if ((!nombreDia || nombreDia === infoDia.titulo) && (i + 1 < lineas.length)) {
          var sig = lineas[i + 1].trim();
          var esEncabezadoSig = detectarEncabezadoDia(sig, 0);
          if (!esEncabezadoSig && !/^(?:[0-9]{1,2}[\.\)]|•|\-)/.test(sig) && sig.length < 50) {
            nombreDia = sig;
            i++;
          }
        }

        diaActual = {
          id: 'D' + (resultado.dias.length + 1),
          numero: infoDia.numero || (resultado.dias.length + 1),
          titulo: infoDia.titulo,
          nombre: nombreDia || infoDia.titulo,
          ejercicios: []
        };
        ejercicioActual = null;
        contadorEjerciciosDia = 0;
        continue;
      }

      // Fin de sección de rutina si llegamos a notas generales o instrucciones finales
      if (/^C[ÓO]MO FUNCIONA|^REGLAS METODOLOG|^NOTAS GENERALES/i.test(linea)) {
        break;
      }

      // Si aún no se ha detectado ningún día pero aparecen ejercicios, inicializar Día 1 automáticamente
      if (!diaActual) {
        diaActual = {
          id: 'D1',
          numero: 1,
          titulo: 'DÍA 1',
          nombre: 'Día 1',
          ejercicios: []
        };
        contadorEjerciciosDia = 0;
      }

      // Detección de ejercicio
      // A. Numerado o con viñeta (ej. "1. Pull over 3x12", "1) Press banca", "- Sentadilla", "• Fondos")
      var matchEx = linea.match(/^(?:([0-9]{1,2})[\.\x29\-:]\s*|[•\-\*>]\s*)([^\d]+?)(?:\s+([0-9]+(?:\s*[x×]\s*[0-9]+|\s*series)))?$/i);

      // B. Ejercicio sin número pero con series explícitas en la misma línea (ej. "Press militar con barra 3 x 10")
      if (!matchEx) {
        var matchExConSeries = linea.match(/^([a-záéíóúñA-ZÁÉÍÓÚÑ\s\x28\x29\/\.,\-\+]+?)\s+([0-9]+\s*[x×]\s*[0-9]+(?:\s*-\s*[0-9]+)?|[0-9]+\s*series.*)$/i);
        if (matchExConSeries && matchExConSeries[1].length > 4 && matchExConSeries[1].length < 60) {
          matchEx = [linea, null, matchExConSeries[1], matchExConSeries[2]];
        }
      }

      // C. Ejercicio sin número que coincide con un ejercicio conocido de la base de datos
      if (!matchEx && linea.length >= 4 && linea.length <= 60 && !/^(?:series|top set|back off|descanso|rir|rpe|peso)/i.test(linea)) {
        var busqBD = buscarCoincidenciaEnBD(linea);
        if (busqBD.confianza === 'alta' || (busqBD.confianza === 'media' && busqBD.match)) {
          matchEx = [linea, null, linea, ''];
        }
      }

      if (matchEx) {
        contadorEjerciciosDia++;
        var numEx = matchEx[1] ? parseInt(matchEx[1], 10) : contadorEjerciciosDia;
        var nombreEx = (matchEx[2] || '').trim();
        var seriesStr = (matchEx[3] || '').trim();

        // Si la columna de series/reps está en la siguiente línea
        if (!seriesStr && i + 1 < lineas.length) {
          var lineaSig = lineas[i + 1].trim();
          var matchSeriesSig = lineaSig.match(/^([0-9]+)\s*[x×]\s*([0-9]+(?:\s*-\s*[0-9]+)?)$/i) || lineaSig.match(/^([0-9]+)\s*series/i);
          if (matchSeriesSig) {
            seriesStr = lineaSig;
            i++;
          }
        }

        var objSeries = interpretarSeriesYRepeticiones(seriesStr, '');
        var matchBD = buscarCoincidenciaEnBD(nombreEx);

        ejercicioActual = {
          id: diaActual.id.toLowerCase() + '_ex_' + numEx,
          numero: numEx,
          nombre: nombreEx,
          indicaciones: '',
          tieneCalculoDescarga: objSeries.tieneCalculoDescarga,
          series: objSeries.series,
          dbCoincidencia: matchBD.match,
          confianzaCoincidencia: matchBD.confianza
        };

        diaActual.ejercicios.push(ejercicioActual);
        continue;
      }

      // Si no es un ejercicio nuevo, pero tenemos un ejercicio actual, es una nota técnica o indicación
      if (ejercicioActual) {
        if (/[x×]\s*[0-9]+|series|top set|back off|descendente|lastre|fallo/i.test(linea)) {
          var seriesActualizadas = interpretarSeriesYRepeticiones(linea, ejercicioActual.indicaciones);
          if (seriesActualizadas.series.length > 0) {
            ejercicioActual.series = seriesActualizadas.series;
            ejercicioActual.tieneCalculoDescarga = seriesActualizadas.tieneCalculoDescarga;
          }
          ejercicioActual.indicaciones = ejercicioActual.indicaciones ? (ejercicioActual.indicaciones + ' ' + linea) : linea;
        } else {
          ejercicioActual.indicaciones = ejercicioActual.indicaciones ? (ejercicioActual.indicaciones + ' ' + linea) : linea;
        }
      }
    }

    if (diaActual) {
      resultado.dias.push(diaActual);
    }

    // Fail-safe garantizado: Si no hay días, crear Día 1 inicial
    if (resultado.dias.length === 0) {
      resultado.dias.push({
        id: 'D1',
        numero: 1,
        titulo: 'DÍA 1',
        nombre: 'Día 1',
        ejercicios: []
      });
    }

    return resultado;
  }

  // Desglosar series, repeticiones y técnicas especiales
  function interpretarSeriesYRepeticiones(textoSeries, notasPrevias) {
    var texto = (textoSeries + ' ' + (notasPrevias || '')).trim();
    var series = [];
    var tieneCalculoDescarga = false;

    // Caso 1: Detección de "Top set + back off (-20%)"
    if (/top set/i.test(texto) && /back off/i.test(texto)) {
      tieneCalculoDescarga = true;
      var numTotal = 2;
      if (/3\.?[ªa]?\s*serie/i.test(texto) || /3\s*series/i.test(texto)) numTotal = 3;

      series.push({
        tipo: 'pesada',
        etiqueta: 'Serie Pesada',
        insignia: 'SERIE PESADA',
        repeticionesObjetivo: 6
      });

      series.push({
        tipo: 'descarga',
        etiqueta: 'Descarga (-20%)',
        insignia: 'DESCARGA -20%',
        repeticionesObjetivo: 8
      });

      if (numTotal >= 3) {
        series.push({
          tipo: 'descendente',
          etiqueta: 'Serie 3 (Descendente)',
          insignia: 'DESCENDENTE',
          repeticionesObjetivo: 8
        });
      }

      return { series: series, tieneCalculoDescarga: true };
    }

    // Caso 2: Patrón numérico directo "3 × 12", "4x10", etc.
    var matchXxY = texto.match(/([0-9]{1,2})\s*[x×]\s*([0-9]{1,2})/i);
    if (matchXxY) {
      var numSeries = parseInt(matchXxY[1], 10);
      var reps = parseInt(matchXxY[2], 10);
      var tieneDescendenteFinal = /descendente/i.test(texto);

      for (var s = 1; s <= numSeries; s++) {
        var esUltima = (s === numSeries);
        if (esUltima && tieneDescendenteFinal) {
          series.push({
            tipo: 'descendente',
            etiqueta: 'Serie ' + s + ' (Descendente)',
            insignia: 'DESCENDENTE',
            repeticionesObjetivo: reps
          });
        } else {
          series.push({
            tipo: 'normal',
            etiqueta: 'Serie ' + s,
            insignia: 'SERIE',
            repeticionesObjetivo: reps
          });
        }
      }
      return { series: series, tieneCalculoDescarga: false };
    }

    // Caso 3: Patrón "2 series", "3 series"
    var matchSeriesSimple = texto.match(/([0-9]{1,2})\s*series/i);
    if (matchSeriesSimple) {
      var cant = parseInt(matchSeriesSimple[1], 10);
      for (var j = 1; j <= cant; j++) {
        var tipo = 'normal';
        var insignia = 'SERIE';
        var repsObj = 12;

        if (/lastre/i.test(texto) && j === 1) {
          tipo = 'lastre';
          insignia = 'CON LASTRE';
          repsObj = 8;
        } else if (/fallo/i.test(texto) && j === cant) {
          tipo = 'fallo';
          insignia = 'AL FALLO';
          repsObj = 'Al fallo';
        }

        series.push({
          tipo: tipo,
          etiqueta: 'Serie ' + j,
          insignia: insignia,
          repeticionesObjetivo: repsObj
        });
      }
      return { series: series, tieneCalculoDescarga: false };
    }

    // Predeterminado si no se pudo determinar: 3 series de 12 repeticiones
    for (var d = 1; d <= 3; d++) {
      series.push({
        tipo: 'normal',
        etiqueta: 'Serie ' + d,
        insignia: 'SERIE',
        repeticionesObjetivo: 12
      });
    }

    return { series: series, tieneCalculoDescarga: false };
  }

  // Función principal pública
  async function parsearRutinaDesdePDF(archivoPDF) {
    if (!archivoPDF) throw new Error('No se ha proporcionado ningún archivo PDF.');
    var arrayBuffer = await archivoPDF.arrayBuffer();
    var lineas = await extraerLineasDePDF(arrayBuffer);
    var rutina = analizarEstructuraRutina(lineas, archivoPDF.name);
    return rutina;
  }

  global.CGM_PDF_RUTINA_PARSER = {
    parsear: parsearRutinaDesdePDF,
    analizarLineas: analizarEstructuraRutina,
    buscarCoincidencia: buscarCoincidenciaEnBD,
    normalizar: normalizar
  };

})(typeof window !== 'undefined' ? window : this);
