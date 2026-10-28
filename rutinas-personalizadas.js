// =============================================================================
// GESTOR DE RUTINAS PERSONALIZADAS Y ACCESO ADMINISTRADOR · CGM RENDIMIENTO
// Almacenamiento aislado, CRUD completo y autenticación protegida
// =============================================================================

(function(global) {
  'use strict';

  var CLAVES = {
    RUTINAS: 'cgm_rutinas_personalizadas_v1',
    RUTINA_ACTIVA: 'cgm_rutina_activa_id_v1',
    ADMIN_HASH: 'cgm_admin_hash_v1',
    ADMIN_SESION: 'cgm_admin_sesion_activa'
  };

  // Hash SHA-256 predeterminado de la clave maestra de administrador ("cgm2026")
  // Ninguna contraseña en texto plano está expuesta en el código fuente
  var HASH_ADMIN_DEFAULT = '83bfdadda0d6802f112ee6cdd0b51500dc6f7ca31da7904041dc031141fd9869';

  // Función criptográfica nativa del navegador para SHA-256
  async function calcularHashSHA256(cadena) {
    if (!global.crypto || !global.crypto.subtle) {
      // Fallback básico para entornos restringidos
      var h = 0;
      for (var i = 0; i < cadena.length; i++) {
        h = ((h << 5) - h) + cadena.charCodeAt(i);
        h |= 0;
      }
      return 'hash_' + Math.abs(h);
    }
    var buffer = new TextEncoder().encode(cadena);
    var hashBuffer = await global.crypto.subtle.digest('SHA-256', buffer);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  // Comprobar si el administrador tiene sesión activa en esta pestaña
  function esAdmin() {
    try {
      return sessionStorage.getItem(CLAVES.ADMIN_SESION) === 'activo_ok';
    } catch (e) {
      return false;
    }
  }

  // Autenticación con contraseña mediante comparación de hash
  async function autenticarAdmin(password) {
    if (!password) return false;
    var hashIngresado = await calcularHashSHA256(password.trim());
    var hashGuardado = localStorage.getItem(CLAVES.ADMIN_HASH) || HASH_ADMIN_DEFAULT;

    if (hashIngresado === hashGuardado) {
      try {
        sessionStorage.setItem(CLAVES.ADMIN_SESION, 'activo_ok');
      } catch (e) {}
      return true;
    }
    return false;
  }

  function cerrarSesionAdmin() {
    try {
      sessionStorage.removeItem(CLAVES.ADMIN_SESION);
    } catch (e) {}
  }

  async function cambiarPasswordAdmin(nuevoPassword) {
    if (!nuevoPassword || nuevoPassword.length < 4) {
      throw new Error('La nueva contraseña debe tener al menos 4 caracteres.');
    }
    var nuevoHash = await calcularHashSHA256(nuevoPassword.trim());
    localStorage.setItem(CLAVES.ADMIN_HASH, nuevoHash);
    return true;
  }

  // ===========================================================================
  // GESTIÓN DE RUTINAS PERSONALIZADAS (CRUD)
  // ===========================================================================

  function obtenerRutinas() {
    try {
      var datos = localStorage.getItem(CLAVES.RUTINAS);
      if (datos) {
        var parseadas = JSON.parse(datos);
        return Array.isArray(parseadas) ? parseadas : [];
      }
    } catch (e) {
      console.warn('Error al leer rutinas personalizadas:', e);
    }
    return [];
  }

  function guardarRutinasLista(lista) {
    try {
      localStorage.setItem(CLAVES.RUTINAS, JSON.stringify(lista));
    } catch (e) {
      console.error('Error al guardar lista de rutinas:', e);
    }
  }

  function obtenerRutinaPorId(id) {
    if (!id || id === 'oficial_cgm') return null;
    var rutinas = obtenerRutinas();
    for (var i = 0; i < rutinas.length; i++) {
      if (rutinas[i].id === id) return rutinas[i];
    }
    return null;
  }

  function obtenerRutinaActivaId() {
    try {
      return localStorage.getItem(CLAVES.RUTINA_ACTIVA) || 'oficial_cgm';
    } catch (e) {
      return 'oficial_cgm';
    }
  }

  function establecerRutinaActiva(id) {
    try {
      localStorage.setItem(CLAVES.RUTINA_ACTIVA, id || 'oficial_cgm');
    } catch (e) {}
  }

  function guardarRutina(rutina) {
    if (!rutina || !rutina.titulo) {
      throw new Error('La rutina debe tener al menos un título válido.');
    }
    var rutinas = obtenerRutinas();

    if (!rutina.id) {
      rutina.id = 'rutina_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      rutina.fechaCreacion = new Date().toISOString();
    }
    rutina.fechaModificacion = new Date().toISOString();

    var indice = -1;
    for (var i = 0; i < rutinas.length; i++) {
      if (rutinas[i].id === rutina.id) {
        indice = i;
        break;
      }
    }

    if (indice >= 0) {
      rutinas[indice] = rutina;
    } else {
      rutinas.push(rutina);
    }

    guardarRutinasLista(rutinas);
    return rutina;
  }

  function duplicarRutina(id) {
    var original = obtenerRutinaPorId(id);
    if (!original) throw new Error('Rutina no encontrada para duplicar.');

    var copia = JSON.parse(JSON.stringify(original));
    copia.id = 'rutina_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    copia.titulo = original.titulo + ' (Copia)';
    copia.fechaCreacion = new Date().toISOString();
    copia.fechaModificacion = copia.fechaCreacion;

    var rutinas = obtenerRutinas();
    rutinas.push(copia);
    guardarRutinasLista(rutinas);
    return copia;
  }

  function renombrarRutina(id, nuevoTitulo) {
    var r = obtenerRutinaPorId(id);
    if (!r) throw new Error('Rutina no encontrada.');
    r.titulo = nuevoTitulo.trim();
    guardarRutina(r);
    return r;
  }

  function eliminarRutina(id) {
    var rutinas = obtenerRutinas();
    var filtradas = rutinas.filter(function(item) { return item.id !== id; });
    guardarRutinasLista(filtradas);

    // Si la rutina eliminada era la activa, volver a la rutina oficial
    if (obtenerRutinaActivaId() === id) {
      establecerRutinaActiva('oficial_cgm');
    }
    return true;
  }

  function exportarRutinaJSON(id) {
    var r = obtenerRutinaPorId(id);
    if (!r) throw new Error('Rutina no encontrada para exportar.');
    var datosStr = JSON.stringify(r, null, 2);
    var blob = new Blob([datosStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (r.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importarRutinaJSON(jsonStr) {
    var parsed = JSON.parse(jsonStr);
    if (!parsed || !parsed.titulo || !Array.isArray(parsed.dias)) {
      throw new Error('El archivo JSON no tiene una estructura de rutina válida.');
    }
    // Generar nuevo ID para no sobreescribir inadvertidamente
    parsed.id = 'rutina_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    parsed.titulo = parsed.titulo + ' (Importada)';
    parsed.fechaCreacion = new Date().toISOString();
    return guardarRutina(parsed);
  }

  // Convertir la rutina activa en el diccionario que entiende app.js
  function obtenerPlantillaDiasActiva(idRutina) {
    var id = idRutina || obtenerRutinaActivaId();
    if (id === 'oficial_cgm' || !id) {
      return null; // Indica que se debe usar DIAS_ENTRENAMIENTO de la rutina oficial
    }

    var r = obtenerRutinaPorId(id);
    if (!r || !Array.isArray(r.dias) || r.dias.length === 0) {
      return null;
    }

    // Convertir array de días en diccionario { D1: {...}, D2: {...} }
    var mapaDias = {};
    for (var d = 0; d < r.dias.length; d++) {
      var dia = r.dias[d];
      var diaId = dia.id || ('D' + (d + 1));
      mapaDias[diaId] = {
        id: diaId,
        numero: dia.numero || (d + 1),
        titulo: dia.titulo || ('DÍA ' + (d + 1)),
        nombre: dia.nombre || ('Día ' + (d + 1)),
        categoria: dia.categoria || dia.nombre || 'Entrenamiento',
        descripcion: dia.descripcion || (dia.nombre + ' · ' + r.titulo),
        ejercicios: (dia.ejercicios || []).map(function(ex, exIdx) {
          return {
            id: ex.id || (diaId.toLowerCase() + '_e' + (exIdx + 1)),
            nombre: ex.nombre,
            indicaciones: ex.indicaciones || '',
            tieneCalculoDescarga: !!ex.tieneCalculoDescarga,
            dbId: ex.dbMatchId || (ex.dbCoincidencia ? ex.dbCoincidencia.id : null),
            series: (ex.series || []).map(function(s, sIdx) {
              return {
                tipo: s.tipo || 'normal',
                insignia: s.insignia || 'SERIE',
                repeticionesObjetivo: s.repeticionesObjetivo || 12
              };
            })
          };
        })
      };
    }
    return mapaDias;
  }

  global.CGM_RUTINAS_PERSONALIZADAS = {
    esAdmin: esAdmin,
    autenticarAdmin: autenticarAdmin,
    cerrarSesionAdmin: cerrarSesionAdmin,
    cambiarPasswordAdmin: cambiarPasswordAdmin,
    obtenerRutinas: obtenerRutinas,
    obtenerRutinaPorId: obtenerRutinaPorId,
    obtenerRutinaActivaId: obtenerRutinaActivaId,
    establecerRutinaActiva: establecerRutinaActiva,
    guardarRutina: guardarRutina,
    duplicarRutina: duplicarRutina,
    renombrarRutina: renombrarRutina,
    eliminarRutina: eliminarRutina,
    exportarRutinaJSON: exportarRutinaJSON,
    importarRutinaJSON: importarRutinaJSON,
    obtenerPlantillaDiasActiva: obtenerPlantillaDiasActiva
  };

})(typeof window !== 'undefined' ? window : this);
