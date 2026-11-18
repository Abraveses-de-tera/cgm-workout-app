// =============================================================================
// PARSER DE RUTINAS DESDE PDF · CGM RENDIMIENTO
// Extrae y estructura automáticamente planes de entrenamiento en el navegador
// =============================================================================

(function(global) {
  'use strict';

  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './lib/pdf.worker.min.js';
  }

// Diccionario extendido de sinónimos para PDFs
var SINONIMOS_PDF = {
  'pull over': 'pullover',
  'pull over en polea': 'pullover',
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

function buscarCoincidenciaEnBD(nombreOriginal) {
  if (!nombreOriginal || !window.CGM_BASE_DATOS_EJERCICIOS) {
    return { match: null, confianza: 'sin_coincidencia', tipo: 'ninguno' };
  }
  var base = window.CGM_BASE_DATOS_EJERCICIOS.lista || [];
  var normOriginal = normalizar(nombreOriginal);

  // 1. Sinónimos PDF directos
  if (SINONIMOS_PDF[normOriginal]) {
    var targetId = SINONIMOS_PDF[normOriginal];
    for (var i = 0; i < base.length; i++) {
      if (base[i].id === targetId || normalizar(base[i].nombre) === targetId) {
        return { match: base[i], confianza: 'alta', tipo: 'sinonimo' };
      }
    }
  }

  // 2. Búsqueda oficial
  var directMatch = window.CGM_BASE_DATOS_EJERCICIOS.buscar(nombreOriginal);
  if (directMatch) return { match: directMatch, confianza: 'alta', tipo: 'exacto' };

  // 3. Normalizada
  for (var j = 0; j < base.length; j++) {
    var ex = base[j];
    var normBD = normalizar(ex.nombre);
    if (normOriginal === normBD || ex.id === normOriginal) {
      return { match: ex, confianza: 'alta', tipo: 'normalizado' };
    }
  }

  // 4. Parcial
  var palabras = normOriginal.split(' ').filter(function(w) { return w.length > 2; });
  var mejor = null;
  var maxP = 0;
  for (var k = 0; k < base.length; k++) {
    var cand = base[k];
    var normCand = normalizar(cand.nombre);
    var p = 0;
    if (normOriginal.indexOf(normCand) !== -1 || normCand.indexOf(normOriginal) !== -1) p += 5;
    for (var w = 0; w < palabras.length; w++) {
      if (normCand.indexOf(palabras[w]) !== -1) p++;
    }
    if (p > maxP && p >= 2) {
      maxP = p;
      mejor = cand;
    }
  }
  if (mejor) return { match: mejor, confianza: 'media', tipo: 'parcial' };

  return { match: null, confianza: 'baja', tipo: 'sin_coincidencia' };
}

function interpretarSeriesYRepeticiones(textoSeries, notasPrevias) {
  var texto = (textoSeries + ' ' + (notasPrevias || '')).trim();
  var series = [];
  var tieneCalculoDescarga = false;

  // Reemplazar unicode minus y por estándar
  texto = texto.replace(/[−–—]/g, '-').replace(/[×✕]/g, 'x');

  // Caso 1: Detección de "Top set + back off (-20%)"
  if (/top\s*set/i.test(texto) && /back\s*off/i.test(texto)) {
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

  // Caso 2: Patrón numérico directo "3 x 12", "4x10", etc.
  var matchXxY = texto.match(/([0-9]{1,2})\s*[xX]\s*([0-9]{1,2})/i);
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

  // Predeterminado
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

// Detector robusto de encabezados de día
function esEncabezadoDia(linea) {
  if (!linea) return null;
  var l = linea.trim();
  if (l.length > 70) return null;

  // DÍA 1, DIA 2, DÍA 3, DÍA 4, D1, DIA A, LUNES, etc.
  var matchNum = l.match(/^(?:D[IÍ]A|SESI[OÓ]N|SESSION|DAY)\s*[:#\-\.]*\s*([0-9]+)\b[:\s\-\/\.]*(.*)$/i);
  if (matchNum) {
    var n = parseInt(matchNum[1], 10);
    return { numero: n, titulo: 'DÍA ' + n, nombre: (matchNum[2] || '').trim() };
  }

  var matchDiaCompacto = l.match(/^D([1-9])\b[:\s\-\/\.]*(.*)$/i);
  if (matchDiaCompacto) {
    var num = parseInt(matchDiaCompacto[1], 10);
    return { numero: num, titulo: 'DÍA ' + num, nombre: (matchDiaCompacto[2] || '').trim() };
  }

  return null;
}

function parsearLineasRobusto(lineasTotales, nombreArchivo) {
  var resultado = {
    titulo: 'Rutina Personalizada',
    cliente: '',
    entrenador: 'Carlos Graña',
    descripcion: 'Rutina importada automáticamente desde PDF',
    dias: []
  };

  // Buscar título y cliente
  for (var h = 0; h < Math.min(10, lineasTotales.length); h++) {
    var lh = lineasTotales[h];
    if (/ENTRENO|ENTRENAMIENTO|RUTINA|FRECUENCIA/i.test(lh) && !resultado.tituloModificado && lh.length < 50) {
      resultado.titulo = lh;
      resultado.tituloModificado = true;
    }
    if (/Plan personalizado|Cliente|Atleta/i.test(lh)) {
      resultado.cliente = lh.replace(/.*(?:Plan personalizado|Cliente|Atleta)\s*:?/i, '').trim();
    }
  }
  if (!resultado.cliente && nombreArchivo) {
    resultado.cliente = nombreArchivo.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
  }

  var diaActual = null;
  var ejercicioActual = null;
  var enCalendario = false;

  for (var i = 0; i < lineasTotales.length; i++) {
    var raw = lineasTotales[i].trim();
    if (!raw) continue;

    // Ignorar encabezados/pies repetitivos o columnas
    if (/^EJERCICIO\s+SERIES/i.test(raw)) continue;
    if (/^CGM\s+PERFORMANCE/i.test(raw)) continue;
    if (/^Carlos\s+Graña\s+Carlos\s+Graña/i.test(raw)) continue;
    if (raw === resultado.titulo) continue;

    // Detectar y saltar la tabla/cuadrícula de calendario de 4 semanas
    if (/LUNES\s+MARTES\s+MI[EÉ]RCOLES/i.test(raw) || /^SEMANA\b/i.test(raw)) {
      enCalendario = true;
      continue;
    }
    if (enCalendario) {
      // Salir del calendario cuando encontramos un encabezado real de DÍA
      var testDia = esEncabezadoDia(raw);
      if (testDia) {
        enCalendario = false;
      } else {
        continue;
      }
    }

    // Fin al llegar a explicaciones o notas metodológicas
    if (/^C[ÓO]MO FUNCIONA|^REGLAS METODOL/i.test(raw)) {
      break;
    }

    // Comprobar si es un encabezado de día
    var infoDia = esEncabezadoDia(raw);
    if (infoDia) {
      if (diaActual) {
        resultado.dias.push(diaActual);
      }

      var nombreDia = infoDia.nombre;
      // Si la siguiente línea contiene el nombre del grupo muscular (ej: "Espalda y posterior", "Pecho y hombro", "Pierna", "Brazo")
      if (!nombreDia && i + 1 < lineasTotales.length) {
        var sigLinea = lineasTotales[i + 1].trim();
        if (!esEncabezadoDia(sigLinea) && !/^[0-9]{1,2}[\.\)]/.test(sigLinea) && !/^EJERCICIO\s+SERIES/i.test(sigLinea) && sigLinea.length < 50) {
          nombreDia = sigLinea;
          i++;
        }
      }

      diaActual = {
        id: 'D' + infoDia.numero,
        numero: infoDia.numero,
        titulo: infoDia.titulo,
        nombre: nombreDia || ('Día ' + infoDia.numero),
        ejercicios: []
      };
      ejercicioActual = null;
      continue;
    }

    if (!diaActual) continue;

    // Comprobar si la línea es un EJERCICIO NUMERADO: ej: "1. Pull over en polea 3 × 12" o "2. Dominadas 2 series"
    // Pero OJO: descartar si después del número dice "serie" (ej: "1 serie con lastre...")
    var matchExNum = raw.match(/^([0-9]{1,2})[\.\)]\s*(.+)$/);
    if (matchExNum && !/^\s*(?:serie|series|vuelta|ronda)\b/i.test(matchExNum[2])) {
      var numEx = parseInt(matchExNum[1], 10);
      var resto = matchExNum[2].trim();

      // Separar nombre de ejercicio de series si están al final (ej: "3 × 12", "2 series")
      var nombreEx = resto;
      var seriesTexto = '';

      var matchSeriesFin = resto.match(/^(.*?)\s+([0-9]+\s*[xX×✕]\s*[0-9]+|[0-9]+\s*series.*)$/i);
      if (matchSeriesFin) {
        nombreEx = matchSeriesFin[1].trim();
        seriesTexto = matchSeriesFin[2].trim();
      }

      var infoSeries = interpretarSeriesYRepeticiones(seriesTexto, '');
      var matchBD = buscarCoincidenciaEnBD(nombreEx);

      ejercicioActual = {
        id: diaActual.id.toLowerCase() + '_ex_' + numEx,
        numero: numEx,
        nombre: nombreEx,
        indicaciones: '',
        tieneCalculoDescarga: infoSeries.tieneCalculoDescarga,
        series: infoSeries.series,
        dbCoincidencia: matchBD.match,
        confianzaCoincidencia: matchBD.confianza
      };
      diaActual.ejercicios.push(ejercicioActual);
      continue;
    }

    // Si tenemos un ejercicio actual y la línea describe series o notas
    if (ejercicioActual) {
      // Si la línea tiene series o indicaciones técnicas ("Top set...", "1 serie con lastre...", "La última serie...")
      if (/top\s*set|back\s*off|descendente|lastre|fallo|[0-9]+\s*series|[0-9]+\s*[xX×✕]\s*[0-9]+/i.test(raw)) {
        var seriesAct = interpretarSeriesYRepeticiones(raw, ejercicioActual.indicaciones);
        if (seriesAct.series.length > 0) {
          ejercicioActual.series = seriesAct.series;
          ejercicioActual.tieneCalculoDescarga = seriesAct.tieneCalculoDescarga;
        }
      }
      ejercicioActual.indicaciones = ejercicioActual.indicaciones ? (ejercicioActual.indicaciones + ' ' + raw) : raw;
    }
  }

  if (diaActual) {
    resultado.dias.push(diaActual);
  }

  return resultado;
}

  async function parsearRutinaDesdePDF(archivoPDF) {
    if (!archivoPDF) throw new Error('No se ha proporcionado ningún archivo PDF.');
    var arrayBuffer = await archivoPDF.arrayBuffer();
    var bufferCopia = arrayBuffer.slice ? arrayBuffer.slice(0) : arrayBuffer;
    var pdf = await pdfjsLib.getDocument({ data: bufferCopia }).promise;
    var lineasTotales = [];

    for (var numPagina = 1; numPagina <= pdf.numPages; numPagina++) {
      var pagina = await pdf.getPage(numPagina);
      var contenido = await pagina.getTextContent({ normalizeWhitespace: true });
      var items = contenido.items || [];
      if (items.length === 0) continue;

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

      lineasAgrupadas.sort(function(a, b) { return b.y - a.y; });

      for (var k = 0; k < lineasAgrupadas.length; k++) {
        var itemsFila = lineasAgrupadas[k].items;
        itemsFila.sort(function(a, b) { return a.x - b.x; });
        var lineaTexto = itemsFila.map(function(el) { return el.texto; }).join(' ').replace(/\s+/g, ' ').trim();
        if (lineaTexto) lineasTotales.push(lineaTexto);
      }
    }

    var rutina = parsearLineasRobusto(lineasTotales, archivoPDF.name);
    return rutina;
  }

  global.CGM_PDF_RUTINA_PARSER = {
    parsear: parsearRutinaDesdePDF,
    analizarLineas: parsearLineasRobusto,
    buscarCoincidencia: buscarCoincidenciaEnBD,
    normalizar: normalizar
  };

})(typeof window !== 'undefined' ? window : this);