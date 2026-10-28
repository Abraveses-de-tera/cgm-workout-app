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

  // Extracción de texto organizada por coordenadas visuales
  async function extraerLineasDePDF(arrayBuffer) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('La biblioteca PDF.js no está disponible en este momento.');
    }

    var pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    var lineasTotales = [];

    for (var numPagina = 1; numPagina <= pdf.numPages; numPagina++) {
      var pagina = await pdf.getPage(numPagina);
      var contenido = await pagina.getTextContent({ normalizeWhitespace: true });
      var items = contenido.items;

      // Agrupar texto por líneas según coordenada vertical Y
      var lineasMapa = {};
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var str = it.str.trim();
        if (!str) continue;

        // Redondear Y a intervalos de 4px para tolerancia de alineación
        var yAprox = Math.round(it.transform[5] / 4) * 4;
        if (!lineasMapa[yAprox]) lineasMapa[yAprox] = [];
        lineasMapa[yAprox].push({
          x: it.transform[4],
          texto: it.str
        });
      }

      // Ordenar líneas de arriba hacia abajo (Y descendente en PDF)
      var clavesY = Object.keys(lineasMapa).map(Number).sort(function(a, b) { return b - a; });

      for (var k = 0; k < clavesY.length; k++) {
        var elementosFila = lineasMapa[clavesY[k]];
        // Ordenar elementos horizontalmente de izquierda a derecha (X ascendente)
        elementosFila.sort(function(a, b) { return a.x - b.x; });
        var lineaTexto = elementosFila.map(function(el) { return el.texto; }).join(' ').replace(/\s+/g, ' ').trim();
        if (lineaTexto) lineasTotales.push(lineaTexto);
      }
    }

    return lineasTotales;
  }

  // Parsear texto plano estructurado en objeto de rutina
  function analizarEstructuraRutina(lineas, nombreArchivo) {
    var resultado = {
      titulo: 'Rutina Personalizada',
      cliente: '',
      entrenador: 'Carlos Graña',
      descripcion: 'Rutina importada automáticamente desde PDF',
      dias: []
    };

    // 1. Detectar título o cliente en los primeros encabezados
    for (var h = 0; h < Math.min(10, lineas.length); h++) {
      var l = lineas[h];
      if (/ENTRENO|ENTRENAMIENTO|RUTINA|FRECUENCIA/i.test(l) && !resultado.tituloModificado) {
        resultado.titulo = l;
        resultado.tituloModificado = true;
      }
      if (/Plan personalizado|Cliente/i.test(l)) {
        resultado.cliente = l.replace(/.*Plan personalizado\s*:?/i, '').trim();
      }
    }
    if (!resultado.cliente && nombreArchivo) {
      resultado.cliente = nombreArchivo.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
    }

    // 2. Segmentar días
    var diaActual = null;
    var ejercicioActual = null;
    var numeroDia = 0;

    for (var i = 0; i < lineas.length; i++) {
      var linea = lineas[i].trim();
      if (!linea) continue;

      // Ignorar encabezados y tablas de calendario general
      if (/^LUNES\s+MARTES/i.test(linea) || /^SEMANA\s+\d/i.test(linea) || /^EJERCICIO\s+SERIES/i.test(linea)) {
        continue;
      }

      // Detección de encabezado de Día: "DÍA 1", "DIA 1", "D1", "Día 2 - Pierna", etc.
      var matchDia = linea.match(/^(?:D[IÍ]A|D)\s*([0-9]+)\b[:\s-]*(.*)$/i);
      if (matchDia) {
        // Guardar día anterior si existe
        if (diaActual && diaActual.ejercicios.length > 0) {
          resultado.dias.push(diaActual);
        }

        numeroDia = parseInt(matchDia[1], 10) || (resultado.dias.length + 1);
        var nombreDia = matchDia[2] ? matchDia[2].trim() : '';

        // Si el nombre del día viene en la siguiente línea (ej: "DÍA 1" \n "Espalda y posterior")
        if (!nombreDia && i + 1 < lineas.length) {
          var sig = lineas[i + 1].trim();
          if (!/^(?:D[IÍ]A|EJERCICIO|1\.)/i.test(sig) && sig.length < 50) {
            nombreDia = sig;
            i++;
          }
        }

        diaActual = {
          id: 'D' + numeroDia,
          numero: numeroDia,
          titulo: 'DÍA ' + numeroDia,
          nombre: nombreDia || ('Día ' + numeroDia),
          ejercicios: []
        };
        ejercicioActual = null;
        continue;
      }

      if (!diaActual) continue;

      // Fin de sección de rutina si llegamos a notas generales o instrucciones finales
      if (/^C[ÓO]MO FUNCIONA|^REGLAS|^NOTAS GENERALES/i.test(linea)) {
        break;
      }

      // Detección de ejercicio numerado (ej. "1. Pull over en polea 3 × 12")
      var matchExNum = linea.match(/^([0-9]{1,2})\.\s*([^\d]+?)(?:\s+([0-9]+(?:\s*[x×]\s*[0-9]+|\s*series)))?$/i);
      if (matchExNum) {
        var numEx = parseInt(matchExNum[1], 10);
        var nombreEx = matchExNum[2].trim();
        var seriesStr = matchExNum[3] ? matchExNum[3].trim() : '';

        // Si la columna de series/reps está en la misma línea o en la siguiente
        if (!seriesStr && i + 1 < lineas.length) {
          var lineaSig = lineas[i + 1].trim();
          var matchSeriesSig = lineaSig.match(/^([0-9]+)\s*[x×]\s*([0-9]+)$/i) || lineaSig.match(/^([0-9]+)\s*series$/i);
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
        // Detectar si la línea describe series ("3 x 12", "Top set + back off...", etc.)
        if (/[x×]\s*[0-9]+|series|top set|back off|descendente|lastre|fallo/i.test(linea)) {
          var seriesActualizadas = interpretarSeriesYRepeticiones(linea, ejercicioActual.indicaciones);
          if (seriesActualizadas.series.length > 0) {
            ejercicioActual.series = seriesActualizadas.series;
            ejercicioActual.tieneCalculoDescarga = seriesActualizadas.tieneCalculoDescarga;
          }
          if (ejercicioActual.indicaciones) {
            ejercicioActual.indicaciones += ' ' + linea;
          } else {
            ejercicioActual.indicaciones = linea;
          }
        } else {
          // Nota de ajuste o técnica
          if (ejercicioActual.indicaciones) {
            ejercicioActual.indicaciones += ' ' + linea;
          } else {
            ejercicioActual.indicaciones = linea;
          }
        }
      }
    }

    if (diaActual && diaActual.ejercicios.length > 0) {
      resultado.dias.push(diaActual);
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
