// =============================================================================
// INTERFAZ DE USUARIO PARA RUTINAS DESDE PDF Y PANEL DE ADMINISTRADOR
// =============================================================================

(function(global) {
  'use strict';

  var rutinaEnEdicion = null;

  function $(id) {
    return document.getElementById(id);
  }

  function mostrarNotificacion(mensaje, tipo) {
    var notif = $('adminToast');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'adminToast';
      notif.className = 'admin-toast';
      document.body.appendChild(notif);
    }
    notif.textContent = mensaje;
    notif.className = 'admin-toast show ' + (tipo || 'info');
    setTimeout(function() {
      notif.className = 'admin-toast';
    }, 3500);
  }

  // ===========================================================================
  // SELECTOR DE RUTINAS EN LA PANTALLA PRINCIPAL
  // ===========================================================================
  function renderizarSelectorRutinas() {
    var contenedor = $('routineSelectorWrap');
    if (!contenedor) return;

    var rutinaActivaId = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinaActivaId();
    var rutinas = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinas();
    var esAdmin = global.CGM_RUTINAS_PERSONALIZADAS.esAdmin();

    var html = '<div class="routine-picker-header">';
    html += '  <div class="routine-picker-title">';
    html += '    <span style="font-size: 14px;">📋 Rutina Actual:</span>';
    html += '  </div>';
    html += '  <div style="display: flex; gap: 6px; align-items: center;">';

    if (esAdmin) {
      html += '    <button id="btnAbrirPanelAdmin" class="btn-admin-pill active" title="Panel de Administrador">👑 Modo Admin</button>';
    } else {
      html += '    <button id="btnAbrirLoginAdmin" class="btn-admin-pill" title="Acceso para Entrenador / Administrador">🔐 Admin</button>';
    }

    html += '  </div>';
    html += '</div>';

    html += '<div class="routine-select-control-row">';
    html += '  <select id="selectRutinaActiva" class="routine-custom-select">';
    html += '    <option value="oficial_cgm"' + (rutinaActivaId === 'oficial_cgm' ? ' selected' : '') + '>⭐ Rutina Oficial CGM (Carlos Graña · 4 Días)</option>';

    for (var i = 0; i < rutinas.length; i++) {
      var r = rutinas[i];
      var numDias = Array.isArray(r.dias) ? r.dias.length : 0;
      var etiqueta = '👤 ' + r.titulo + ' (' + numDias + ' Días)';
      html += '    <option value="' + r.id + '"' + (rutinaActivaId === r.id ? ' selected' : '') + '>' + etiqueta + '</option>';
    }
    html += '  </select>';
    html += '</div>';

    contenedor.innerHTML = html;

    var selectEl = $('selectRutinaActiva');
    if (selectEl) {
      selectEl.addEventListener('change', function() {
        var nuevaId = selectEl.value;
        global.CGM_RUTINAS_PERSONALIZADAS.establecerRutinaActiva(nuevaId);
        mostrarNotificacion('Rutina cambiada correctamente', 'exito');
        if (typeof global.cgmRecargarRutinaVisual === 'function') {
          global.cgmRecargarRutinaVisual();
        }
      });
    }

    var btnLogin = $('btnAbrirLoginAdmin');
    if (btnLogin) {
      btnLogin.addEventListener('click', abrirModalLoginAdmin);
    }

    var btnPanel = $('btnAbrirPanelAdmin');
    if (btnPanel) {
      btnPanel.addEventListener('click', abrirModalPanelAdmin);
    }
  }

  // ===========================================================================
  // AUTENTICACIÓN DE ADMINISTRADOR
  // ===========================================================================
  function abrirModalLoginAdmin() {
    var modal = $('adminLoginModal');
    if (modal) {
      modal.classList.add('open');
      var passInput = $('adminPasswordInput');
      if (passInput) {
        passInput.value = '';
        passInput.focus();
      }
      var errorMsg = $('adminLoginError');
      if (errorMsg) errorMsg.style.display = 'none';
    }
  }

  function cerrarModalLoginAdmin() {
    var modal = $('adminLoginModal');
    if (modal) modal.classList.remove('open');
  }

  async function procesarLoginAdmin() {
    var passInput = $('adminPasswordInput');
    var errorMsg = $('adminLoginError');
    if (!passInput) return;

    var clave = passInput.value;
    var ok = await global.CGM_RUTINAS_PERSONALIZADAS.autenticarAdmin(clave);

    if (ok) {
      cerrarModalLoginAdmin();
      mostrarNotificacion('Acceso de Administrador concedido', 'exito');
      renderizarSelectorRutinas();
      abrirModalPanelAdmin();
    } else {
      if (errorMsg) {
        errorMsg.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
        errorMsg.style.display = 'block';
      }
    }
  }

  // ===========================================================================
  // PANEL DE GESTIÓN DE ADMINISTRADOR
  // ===========================================================================
  function abrirModalPanelAdmin() {
    if (!global.CGM_RUTINAS_PERSONALIZADAS.esAdmin()) {
      abrirModalLoginAdmin();
      return;
    }
    var modal = $('adminPanelModal');
    if (modal) {
      renderizarListaRutinasAdmin();
      modal.classList.add('open');
    }
  }

  function cerrarModalPanelAdmin() {
    var modal = $('adminPanelModal');
    if (modal) modal.classList.remove('open');
  }

  function renderizarListaRutinasAdmin() {
    var listaContenedor = $('adminRoutinesList');
    if (!listaContenedor) return;

    var rutinas = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinas();
    var activaId = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinaActivaId();

    if (rutinas.length === 0) {
      listaContenedor.innerHTML = '<div class="admin-empty-notice">No tienes rutinas personalizadas creadas todavía. Pulsa en <strong>«📄 Crear Rutina desde PDF»</strong> para añadir la primera.</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < rutinas.length; i++) {
      var r = rutinas[i];
      var esActiva = (activaId === r.id);
      var totalEjercicios = 0;
      if (Array.isArray(r.dias)) {
        for (var d = 0; d < r.dias.length; d++) {
          totalEjercicios += (r.dias[d].ejercicios || []).length;
        }
      }

      html += '<div class="admin-routine-card' + (esActiva ? ' active-card' : '') + '">';
      html += '  <div class="admin-routine-info">';
      html += '    <div style="display:flex; align-items:center; gap:6px;">';
      html += '      <strong class="admin-routine-name">' + r.titulo + '</strong>';
      if (esActiva) html += '      <span class="badge-gold">En Uso</span>';
      html += '    </div>';
      html += '    <div class="admin-routine-meta">';
      html += '      <span>📅 ' + (r.dias ? r.dias.length : 0) + ' Días</span> · ';
      html += '      <span>🏋️ ' + totalEjercicios + ' Ejercicios</span>';
      if (r.cliente) html += ' · <span>👤 ' + r.cliente + '</span>';
      html += '    </div>';
      html += '  </div>';

      html += '  <div class="admin-routine-actions">';
      html += '    <button class="btn-sm-action btn-share-magic" data-id="' + r.id + '" title="Compartir con el cliente por WhatsApp" style="background: rgba(37, 211, 102, 0.15); border-color: rgba(37, 211, 102, 0.4); color: #4ade80;">📲 WhatsApp</button>';
      html += '    <button class="btn-sm-action btn-select-routine" data-id="' + r.id + '" title="Entrenar esta rutina">' + (esActiva ? '✓ Seleccionada' : 'Seleccionar') + '</button>';
      html += '    <button class="btn-sm-action btn-edit-routine" data-id="' + r.id + '" title="Revisar y editar">✏️ Editar</button>';
      html += '    <button class="btn-sm-action btn-dup-routine" data-id="' + r.id + '" title="Duplicar">📋</button>';
      html += '    <button class="btn-sm-action btn-export-routine" data-id="' + r.id + '" title="Exportar archivo JSON">💾</button>';
      html += '    <button class="btn-sm-action btn-del-routine danger" data-id="' + r.id + '" title="Eliminar">🗑️</button>';
      html += '  </div>';
      html += '</div>';
    }

    listaContenedor.innerHTML = html;

    // Asignar eventos de acciones
    var btnsMagic = listaContenedor.querySelectorAll('.btn-share-magic');
    for (var m = 0; m < btnsMagic.length; m++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          abrirModalEnlaceMagico(btn.dataset.id);
        });
      })(btnsMagic[m]);
    }

    var btnsSelect = listaContenedor.querySelectorAll('.btn-select-routine');
    for (var s = 0; s < btnsSelect.length; s++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          global.CGM_RUTINAS_PERSONALIZADAS.establecerRutinaActiva(btn.dataset.id);
          renderizarListaRutinasAdmin();
          renderizarSelectorRutinas();
          mostrarNotificacion('Rutina activada para entrenar', 'exito');
          if (typeof global.cgmRecargarRutinaVisual === 'function') global.cgmRecargarRutinaVisual();
        });
      })(btnsSelect[s]);
    }

    var btnsEdit = listaContenedor.querySelectorAll('.btn-edit-routine');
    for (var ed = 0; ed < btnsEdit.length; ed++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var r = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinaPorId(btn.dataset.id);
          if (r) {
            cerrarModalPanelAdmin();
            abrirPantallaRevision(r);
          }
        });
      })(btnsEdit[ed]);
    }

    var btnsDup = listaContenedor.querySelectorAll('.btn-dup-routine');
    for (var dp = 0; dp < btnsDup.length; dp++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          global.CGM_RUTINAS_PERSONALIZADAS.duplicarRutina(btn.dataset.id);
          renderizarListaRutinasAdmin();
          renderizarSelectorRutinas();
          mostrarNotificacion('Rutina duplicada', 'info');
        });
      })(btnsDup[dp]);
    }

    var btnsExp = listaContenedor.querySelectorAll('.btn-export-routine');
    for (var ex = 0; ex < btnsExp.length; ex++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          global.CGM_RUTINAS_PERSONALIZADAS.exportarRutinaJSON(btn.dataset.id);
        });
      })(btnsExp[ex]);
    }

    var btnsDel = listaContenedor.querySelectorAll('.btn-del-routine');
    for (var dl = 0; dl < btnsDel.length; dl++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          if (confirm('¿Seguro que deseas eliminar esta rutina personalizada?')) {
            global.CGM_RUTINAS_PERSONALIZADAS.eliminarRutina(btn.dataset.id);
            renderizarListaRutinasAdmin();
            renderizarSelectorRutinas();
            mostrarNotificacion('Rutina eliminada', 'aviso');
            if (typeof global.cgmRecargarRutinaVisual === 'function') global.cgmRecargarRutinaVisual();
          }
        });
      })(btnsDel[dl]);
    }
  }

  // ===========================================================================
  // ENLACE MÁGICO Y COMPARTIR POR WHATSAPP
  // ===========================================================================
  var enlaceMagicoGenerado = '';
  var mensajeWhatsAppGenerado = '';

  async function abrirModalEnlaceMagico(id) {
    var r = global.CGM_RUTINAS_PERSONALIZADAS.obtenerRutinaPorId(id);
    if (!r) return;

    var modal = $('magicLinkModal');
    if (!modal) return;

    try {
      enlaceMagicoGenerado = await global.CGM_RUTINAS_PERSONALIZADAS.generarEnlaceMagico(id);
      var clienteTxt = r.cliente ? (' ' + r.cliente) : '';
      mensajeWhatsAppGenerado = '¡Hola' + clienteTxt + '! 👋 Aquí tienes tu rutina personalizada (' + r.titulo + ') lista para entrenar en la app con los vídeos explicativos de Carlos Graña y registro de pesos:\n\n' + enlaceMagicoGenerado + '\n\nSolo tienes que tocar el enlace desde tu móvil y se cargará automáticamente. ¡A darle caña! 🏋️🔥';

      var textarea = $('magicLinkMessagePreview');
      if (textarea) textarea.value = mensajeWhatsAppGenerado;

      var btnWa = $('btnOpenWhatsAppDirect');
      if (btnWa) {
        btnWa.href = 'https://wa.me/?text=' + encodeURIComponent(mensajeWhatsAppGenerado);
      }

      var badgeCopy = $('magicLinkCopiedBadge');
      if (badgeCopy) badgeCopy.style.display = 'none';

      modal.classList.add('open');
    } catch (err) {
      alert('Error al generar enlace mágico: ' + err.message);
    }
  }

  function cerrarModalEnlaceMagico() {
    var modal = $('magicLinkModal');
    if (modal) modal.classList.remove('open');
  }

  function abrirModalBienvenidaRutina(rutina) {
    var modal = $('welcomeRoutineModal');
    if (!modal) return;

    var titEl = $('welcomeRoutineTitle');
    var cliEl = $('welcomeRoutineClient');

    if (titEl) titEl.textContent = rutina.titulo;
    if (cliEl) cliEl.textContent = rutina.cliente ? ('Atleta: ' + rutina.cliente) : '';

    modal.classList.add('open');
  }

  function cerrarModalBienvenidaRutina() {
    var modal = $('welcomeRoutineModal');
    if (modal) modal.classList.remove('open');
  }

  async function verificarEnlaceMagicoAlEntrar() {
    if (global.CGM_RUTINAS_PERSONALIZADAS && typeof global.CGM_RUTINAS_PERSONALIZADAS.procesarEnlaceMagico === 'function') {
      var rutinaImportada = await global.CGM_RUTINAS_PERSONALIZADAS.procesarEnlaceMagico();
      if (rutinaImportada) {
        renderizarSelectorRutinas();
        if (typeof global.cgmRecargarRutinaVisual === 'function') {
          global.cgmRecargarRutinaVisual();
        }
        abrirModalBienvenidaRutina(rutinaImportada);
      }
    }
  }

  // ===========================================================================
  // SUBIDA Y PROCESAMIENTO DE PDF
  // ===========================================================================
  function abrirModalSubirPDF() {
    cerrarModalPanelAdmin();
    var modal = $('pdfUploadModal');
    if (modal) {
      var fileInput = $('pdfFileInput');
      if (fileInput) fileInput.value = '';
      var statusBox = $('pdfUploadStatus');
      if (statusBox) statusBox.style.display = 'none';
      modal.classList.add('open');
    }
  }

  function cerrarModalSubirPDF() {
    var modal = $('pdfUploadModal');
    if (modal) modal.classList.remove('open');
  }

  async function procesarArchivoPDF(archivo) {
    if (!archivo || !archivo.name.toLowerCase().endsWith('.pdf')) {
      alert('Por favor selecciona un archivo PDF válido.');
      return;
    }

    var statusBox = $('pdfUploadStatus');
    var statusText = $('pdfUploadStatusText');
    if (statusBox) statusBox.style.display = 'flex';
    if (statusText) statusText.textContent = 'Analizando PDF y extrayendo ejercicios...';

    try {
      var rutinaExtraida = await global.CGM_PDF_RUTINA_PARSER.parsear(archivo);

      if (!rutinaExtraida.dias || rutinaExtraida.dias.length === 0) {
        throw new Error('No se detectaron días de entrenamiento en el PDF. Revisa el archivo.');
      }

      cerrarModalSubirPDF();
      abrirPantallaRevision(rutinaExtraida);
    } catch (err) {
      console.error('Error al parsear PDF:', err);
      if (statusText) statusText.textContent = 'Error: ' + err.message;
      alert('No se pudo procesar el PDF: ' + err.message);
    }
  }

  // ===========================================================================
  // PANTALLA DE REVISIÓN Y CORRECCIÓN ANTES DE GUARDAR
  // ===========================================================================
  function abrirPantallaRevision(rutina) {
    rutinaEnEdicion = JSON.parse(JSON.stringify(rutina));
    var modal = $('routineReviewModal');
    if (!modal) return;

    $('reviewRoutineTitle').value = rutinaEnEdicion.titulo || 'Plan de Entrenamiento';
    $('reviewClientName').value = rutinaEnEdicion.cliente || '';

    renderizarDiasRevision();
    modal.classList.add('open');
  }

  function cerrarPantallaRevision() {
    var modal = $('routineReviewModal');
    if (modal) modal.classList.remove('open');
    rutinaEnEdicion = null;
  }

  function renderizarDiasRevision() {
    var contenedor = $('reviewDaysContainer');
    if (!contenedor || !rutinaEnEdicion || !rutinaEnEdicion.dias) return;

    var html = '';
    for (var d = 0; d < rutinaEnEdicion.dias.length; d++) {
      var dia = rutinaEnEdicion.dias[d];
      html += '<div class="review-day-block" data-day-idx="' + d + '">';
      html += '  <div class="review-day-header">';
      html += '    <div style="flex:1;">';
      html += '      <span class="badge-gold">DÍA ' + (d + 1) + '</span>';
      html += '      <input type="text" class="review-day-name-input" data-day-idx="' + d + '" value="' + (dia.nombre || '') + '" placeholder="Grupo muscular (ej. Espalda y Posterior)">';
      html += '    </div>';
      html += '    <button class="btn-del-day danger" data-day-idx="' + d + '" title="Eliminar este día">🗑️ Eliminar Día</button>';
      html += '  </div>';

      html += '  <div class="review-exercises-table">';
      html += '    <div class="review-table-head">';
      html += '      <span style="width: 30px;">#</span>';
      html += '      <span style="flex: 2;">EJERCICIO / INDICACIONES</span>';
      html += '      <span style="flex: 2;">VÍDEO ASOCIADO</span>';
      html += '      <span style="width: 80px; text-align:right;">ACCIONES</span>';
      html += '    </div>';

      for (var e = 0; e < dia.ejercicios.length; e++) {
        var ex = dia.ejercicios[e];
        var db = ex.dbCoincidencia || (ex.dbMatchId && global.CGM_BASE_DATOS_EJERCICIOS ? global.CGM_BASE_DATOS_EJERCICIOS.buscar(ex.dbMatchId) : null);
        var badgeVideo = '';

        if (db) {
          if (db.estado === 'disponible') {
            badgeVideo = '<span class="video-status-pill ok" title="Vídeo de Carlos Graña disponible">🟢 ' + db.nombre + '</span>';
          } else {
            badgeVideo = '<span class="video-status-pill warn" title="Vídeo pendiente de rehacer">🟡 ' + db.nombre + ' (Rehacer)</span>';
          }
        } else {
          badgeVideo = '<span class="video-status-pill none" title="Sin vídeo de Carlos Graña">⚪ Sin vídeo asociado</span>';
        }

        html += '    <div class="review-ex-row" data-day-idx="' + d + '" data-ex-idx="' + e + '">';
        html += '      <div class="review-ex-num">' + (e + 1) + '</div>';
        html += '      <div class="review-ex-main">';
        html += '        <input type="text" class="review-ex-name-input" data-day-idx="' + d + '" data-ex-idx="' + e + '" value="' + ex.nombre + '">';
        html += '        <input type="text" class="review-ex-notes-input" data-day-idx="' + d + '" data-ex-idx="' + e + '" value="' + (ex.indicaciones || '') + '" placeholder="Indicaciones (ej. 3 series de 12)">';
        html += '      </div>';
        html += '      <div class="review-ex-match">';
        html += '        <div class="review-video-badge-wrap">' + badgeVideo + '</div>';
        html += '        <button class="btn-change-video" data-day-idx="' + d + '" data-ex-idx="' + e + '">🔄 Cambiar vídeo</button>';
        html += '      </div>';
        html += '      <div class="review-ex-actions">';
        if (e > 0) html += '        <button class="btn-arrow-up" data-day-idx="' + d + '" data-ex-idx="' + e + '" title="Subir">▲</button>';
        if (e < dia.ejercicios.length - 1) html += '        <button class="btn-arrow-down" data-day-idx="' + d + '" data-ex-idx="' + e + '" title="Bajar">▼</button>';
        html += '        <button class="btn-del-ex danger" data-day-idx="' + d + '" data-ex-idx="' + e + '" title="Eliminar ejercicio">✕</button>';
        html += '      </div>';
        html += '    </div>';
      }

      html += '  </div>'; // Fin table
      html += '  <button class="btn-add-ex-day" data-day-idx="' + d + '">+ Añadir Ejercicio a este Día</button>';
      html += '</div>'; // Fin review-day-block
    }

    html += '<div style="margin-top: 14px; text-align: center;">';
    html += '  <button id="btnAddDayReview" class="btn-secondary">+ Añadir Nuevo Día a la Rutina</button>';
    html += '</div>';

    contenedor.innerHTML = html;
    asignarEventosRevision();
  }

  function asignarEventosRevision() {
    var contenedor = $('reviewDaysContainer');
    if (!contenedor) return;

    // Cambios en nombres de días
    var dayInputs = contenedor.querySelectorAll('.review-day-name-input');
    for (var di = 0; di < dayInputs.length; di++) {
      (function(input) {
        input.addEventListener('input', function() {
          var dIdx = parseInt(input.dataset.dayIdx, 10);
          if (rutinaEnEdicion.dias[dIdx]) rutinaEnEdicion.dias[dIdx].nombre = input.value;
        });
      })(dayInputs[di]);
    }

    // Cambios en nombres de ejercicios
    var exInputs = contenedor.querySelectorAll('.review-ex-name-input');
    for (var ei = 0; ei < exInputs.length; ei++) {
      (function(input) {
        input.addEventListener('input', function() {
          var dIdx = parseInt(input.dataset.dayIdx, 10);
          var eIdx = parseInt(input.dataset.exIdx, 10);
          if (rutinaEnEdicion.dias[dIdx] && rutinaEnEdicion.dias[dIdx].ejercicios[eIdx]) {
            rutinaEnEdicion.dias[dIdx].ejercicios[eIdx].nombre = input.value;
          }
        });
      })(exInputs[ei]);
    }

    // Cambios en indicaciones
    var notesInputs = contenedor.querySelectorAll('.review-ex-notes-input');
    for (var ni = 0; ni < notesInputs.length; ni++) {
      (function(input) {
        input.addEventListener('input', function() {
          var dIdx = parseInt(input.dataset.dayIdx, 10);
          var eIdx = parseInt(input.dataset.exIdx, 10);
          if (rutinaEnEdicion.dias[dIdx] && rutinaEnEdicion.dias[dIdx].ejercicios[eIdx]) {
            rutinaEnEdicion.dias[dIdx].ejercicios[eIdx].indicaciones = input.value;
          }
        });
      })(notesInputs[ni]);
    }

    // Botones de reordenar y eliminar ejercicios
    var btnsUp = contenedor.querySelectorAll('.btn-arrow-up');
    for (var u = 0; u < btnsUp.length; u++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          var eIdx = parseInt(btn.dataset.exIdx, 10);
          var exs = rutinaEnEdicion.dias[dIdx].ejercicios;
          var temp = exs[eIdx];
          exs[eIdx] = exs[eIdx - 1];
          exs[eIdx - 1] = temp;
          renderizarDiasRevision();
        });
      })(btnsUp[u]);
    }

    var btnsDown = contenedor.querySelectorAll('.btn-arrow-down');
    for (var dw = 0; dw < btnsDown.length; dw++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          var eIdx = parseInt(btn.dataset.exIdx, 10);
          var exs = rutinaEnEdicion.dias[dIdx].ejercicios;
          var temp = exs[eIdx];
          exs[eIdx] = exs[eIdx + 1];
          exs[eIdx + 1] = temp;
          renderizarDiasRevision();
        });
      })(btnsDown[dw]);
    }

    var btnsDelEx = contenedor.querySelectorAll('.btn-del-ex');
    for (var de = 0; de < btnsDelEx.length; de++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          var eIdx = parseInt(btn.dataset.exIdx, 10);
          rutinaEnEdicion.dias[dIdx].ejercicios.splice(eIdx, 1);
          renderizarDiasRevision();
        });
      })(btnsDelEx[de]);
    }

    // Añadir ejercicio a un día
    var btnsAddEx = contenedor.querySelectorAll('.btn-add-ex-day');
    for (var ae = 0; ae < btnsAddEx.length; ae++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          rutinaEnEdicion.dias[dIdx].ejercicios.push({
            id: 'custom_e_' + Date.now(),
            nombre: 'Nuevo Ejercicio',
            indicaciones: '3 series de 12 repeticiones',
            series: [
              { tipo: 'normal', insignia: 'SERIE', repeticionesObjetivo: 12 },
              { tipo: 'normal', insignia: 'SERIE', repeticionesObjetivo: 12 },
              { tipo: 'normal', insignia: 'SERIE', repeticionesObjetivo: 12 }
            ],
            dbCoincidencia: null
          });
          renderizarDiasRevision();
        });
      })(btnsAddEx[ae]);
    }

    // Eliminar un día completo
    var btnsDelDay = contenedor.querySelectorAll('.btn-del-day');
    for (var dd = 0; dd < btnsDelDay.length; dd++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          if (confirm('¿Seguro que deseas eliminar este día de la rutina?')) {
            rutinaEnEdicion.dias.splice(dIdx, 1);
            // Re-numerar días
            for (var k = 0; k < rutinaEnEdicion.dias.length; k++) {
              rutinaEnEdicion.dias[k].numero = k + 1;
              rutinaEnEdicion.dias[k].titulo = 'DÍA ' + (k + 1);
              rutinaEnEdicion.dias[k].id = 'D' + (k + 1);
            }
            renderizarDiasRevision();
          }
        });
      })(btnsDelDay[dd]);
    }

    // Añadir nuevo día
    var btnAddDay = $('btnAddDayReview');
    if (btnAddDay) {
      btnAddDay.addEventListener('click', function() {
        var num = rutinaEnEdicion.dias.length + 1;
        rutinaEnEdicion.dias.push({
          id: 'D' + num,
          numero: num,
          titulo: 'DÍA ' + num,
          nombre: 'Día ' + num,
          ejercicios: []
        });
        renderizarDiasRevision();
      });
    }

    // Cambiar vídeo (Modal buscador de BD)
    var btnsChangeVideo = contenedor.querySelectorAll('.btn-change-video');
    for (var cv = 0; cv < btnsChangeVideo.length; cv++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var dIdx = parseInt(btn.dataset.dayIdx, 10);
          var eIdx = parseInt(btn.dataset.exIdx, 10);
          abrirBuscadorVideoParaEjercicio(dIdx, eIdx);
        });
      })(btnsChangeVideo[cv]);
    }
  }

  // ===========================================================================
  // BUSCADOR DE VÍDEO EN LA BASE DE DATOS MAESTRA
  // ===========================================================================
  var ejercicioDestinoParaVideo = null;

  function abrirBuscadorVideoParaEjercicio(dIdx, eIdx) {
    ejercicioDestinoParaVideo = { dIdx: dIdx, eIdx: eIdx };
    var modal = $('videoPickerModal');
    if (!modal) return;

    var inputBusq = $('videoPickerSearchInput');
    if (inputBusq) {
      inputBusq.value = '';
      inputBusq.focus();
    }
    renderizarResultadosBuscadorVideo('');
    modal.classList.add('open');
  }

  function cerrarBuscadorVideo() {
    var modal = $('videoPickerModal');
    if (modal) modal.classList.remove('open');
    ejercicioDestinoParaVideo = null;
  }

  function renderizarResultadosBuscadorVideo(filtro) {
    var listaContenedor = $('videoPickerResultsList');
    if (!listaContenedor || !global.CGM_BASE_DATOS_EJERCICIOS) return;

    var lista = global.CGM_BASE_DATOS_EJERCICIOS.lista || [];
    var fNorm = (filtro || '').toLowerCase().trim();

    var filtrados = lista.filter(function(item) {
      if (!fNorm) return true;
      return item.nombre.toLowerCase().indexOf(fNorm) !== -1 || item.grupo.toLowerCase().indexOf(fNorm) !== -1;
    });

    var html = '<div class="video-picker-item none-item" data-action="sin_video">';
    html += '  <div><strong>⚪ Dejar como ejercicio sin vídeo</strong></div>';
    html += '  <small style="color:var(--text-muted);">No asociar ningún vídeo oficial de Carlos Graña</small>';
    html += '</div>';

    for (var i = 0; i < filtrados.length; i++) {
      var it = filtrados[i];
      var esOk = (it.estado === 'disponible');
      html += '<div class="video-picker-item" data-id="' + it.id + '">';
      html += '  <div style="display:flex; justify-content:space-between; align-items:center;">';
      html += '    <strong>' + it.nombre + '</strong>';
      html += '    <span class="video-status-pill ' + (esOk ? 'ok' : 'warn') + '">' + (esOk ? '🟢 Disponible' : '🟡 Rehacer') + '</span>';
      html += '  </div>';
      html += '  <small style="color:var(--gold-light);">' + it.grupo + ' · ' + it.archivo + '</small>';
      html += '</div>';
    }

    listaContenedor.innerHTML = html;

    var items = listaContenedor.querySelectorAll('.video-picker-item');
    for (var j = 0; j < items.length; j++) {
      (function(el) {
        el.addEventListener('click', function() {
          if (!ejercicioDestinoParaVideo || !rutinaEnEdicion) return;
          var d = ejercicioDestinoParaVideo.dIdx;
          var e = ejercicioDestinoParaVideo.eIdx;
          var targetEx = rutinaEnEdicion.dias[d].ejercicios[e];

          if (el.dataset.action === 'sin_video') {
            targetEx.dbCoincidencia = null;
            targetEx.dbMatchId = null;
          } else {
            var exId = el.dataset.id;
            var matchBD = global.CGM_BASE_DATOS_EJERCICIOS.buscar(exId);
            targetEx.dbCoincidencia = matchBD;
            targetEx.dbMatchId = exId;
          }

          cerrarBuscadorVideo();
          renderizarDiasRevision();
          mostrarNotificacion('Vídeo asociado correctamente', 'exito');
        });
      })(items[j]);
    }
  }

  // ===========================================================================
  // GUARDAR RUTINA CONFIRMADA
  // ===========================================================================
  function guardarRutinaConfirmada() {
    if (!rutinaEnEdicion) return;

    var titulo = $('reviewRoutineTitle').value.trim();
    var cliente = $('reviewClientName').value.trim();

    if (!titulo) {
      alert('Por favor indica un título para la rutina.');
      return;
    }

    rutinaEnEdicion.titulo = titulo;
    rutinaEnEdicion.cliente = cliente;

    // Guardar mediante el gestor oficial
    var guardada = global.CGM_RUTINAS_PERSONALIZADAS.guardarRutina(rutinaEnEdicion);
    global.CGM_RUTINAS_PERSONALIZADAS.establecerRutinaActiva(guardada.id);

    cerrarPantallaRevision();
    renderizarSelectorRutinas();
    mostrarNotificacion('¡Rutina guardada y activada con éxito!', 'exito');

    if (typeof global.cgmRecargarRutinaVisual === 'function') {
      global.cgmRecargarRutinaVisual();
    }
  }

  // ===========================================================================
  // INICIALIZACIÓN GLOBAL DE EVENTOS
  // ===========================================================================
  function inicializarUI() {
    renderizarSelectorRutinas();

    // Eventos de modal login admin
    var btnLoginSubmit = $('adminLoginSubmitBtn');
    if (btnLoginSubmit) btnLoginSubmit.addEventListener('click', procesarLoginAdmin);

    var btnLoginCancel = $('adminLoginCancelBtn');
    if (btnLoginCancel) btnLoginCancel.addEventListener('click', cerrarModalLoginAdmin);

    var passInput = $('adminPasswordInput');
    if (passInput) {
      passInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') procesarLoginAdmin();
      });
    }

    // Eventos de panel admin
    var btnCloseAdmin = $('closeAdminPanelBtn');
    if (btnCloseAdmin) btnCloseAdmin.addEventListener('click', cerrarModalPanelAdmin);

    var btnNewPdf = $('btnAdminNewFromPdf');
    if (btnNewPdf) btnNewPdf.addEventListener('click', abrirModalSubirPDF);

    var btnLogout = $('btnAdminLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', function() {
        global.CGM_RUTINAS_PERSONALIZADAS.cerrarSesionAdmin();
        cerrarModalPanelAdmin();
        renderizarSelectorRutinas();
        mostrarNotificacion('Sesión de administrador cerrada', 'info');
      });
    }

    var btnImportJson = $('btnAdminImportJson');
    var fileImportJson = $('adminImportJsonInput');
    if (btnImportJson && fileImportJson) {
      btnImportJson.addEventListener('click', function() { fileImportJson.click(); });
      fileImportJson.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(evt) {
          try {
            global.CGM_RUTINAS_PERSONALIZADAS.importarRutinaJSON(evt.target.result);
            renderizarListaRutinasAdmin();
            renderizarSelectorRutinas();
            mostrarNotificacion('Rutina importada desde JSON', 'exito');
          } catch (err) {
            alert('Error al importar JSON: ' + err.message);
          }
        };
        reader.readAsText(file);
      });
    }

    // Eventos de subida de PDF
    var btnClosePdfModal = $('closePdfModalBtn');
    if (btnClosePdfModal) btnClosePdfModal.addEventListener('click', cerrarModalSubirPDF);

    var dropZone = $('pdfDropZone');
    var fileInput = $('pdfFileInput');

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', function() { fileInput.click(); });
      dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
      dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('dragover');
      });
      dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          procesarArchivoPDF(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files.length > 0) {
          procesarArchivoPDF(e.target.files[0]);
        }
      });
    }

    // Eventos de revisión
    var btnSaveReview = $('btnSaveRoutineReview');
    if (btnSaveReview) btnSaveReview.addEventListener('click', guardarRutinaConfirmada);

    var btnCancelReview = $('btnCancelRoutineReview');
    if (btnCancelReview) btnCancelReview.addEventListener('click', cerrarPantallaRevision);

    // Eventos de buscador de vídeo
    var btnCloseVideoPicker = $('closeVideoPickerBtn');
    if (btnCloseVideoPicker) btnCloseVideoPicker.addEventListener('click', cerrarBuscadorVideo);

    var searchVideoInput = $('videoPickerSearchInput');
    if (searchVideoInput) {
      searchVideoInput.addEventListener('input', function(e) {
        renderizarResultadosBuscadorVideo(e.target.value);
      });
    }

    // Eventos de modal compartir enlace mágico
    var btnCloseMagic = $('closeMagicLinkBtn');
    if (btnCloseMagic) btnCloseMagic.addEventListener('click', cerrarModalEnlaceMagico);

    function copiarAlPortapapeles(texto) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function() {
          mostrarBadgeCopiado();
        }).catch(function() {
          fallbackCopiar(texto);
        });
      } else {
        fallbackCopiar(texto);
      }
    }

    function fallbackCopiar(texto) {
      var aux = document.createElement('textarea');
      aux.value = texto;
      document.body.appendChild(aux);
      aux.select();
      try {
        document.execCommand('copy');
        mostrarBadgeCopiado();
      } catch (e) {
        prompt('Copia manualmente este texto:', texto);
      }
      document.body.removeChild(aux);
    }

    function mostrarBadgeCopiado() {
      var badge = $('magicLinkCopiedBadge');
      if (badge) {
        badge.style.display = 'inline';
        setTimeout(function() {
          badge.style.display = 'none';
        }, 2500);
      }
      mostrarNotificacion('¡Copiado al portapapeles!', 'exito');
    }

    var btnCopyLink = $('btnCopyMagicLinkOnly');
    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', function() {
        copiarAlPortapapeles(enlaceMagicoGenerado);
      });
    }

    var btnCopyMsg = $('btnCopyFullMessage');
    if (btnCopyMsg) {
      btnCopyMsg.addEventListener('click', function() {
        copiarAlPortapapeles(mensajeWhatsAppGenerado);
      });
    }

    // Eventos de modal de bienvenida para cliente
    var btnCloseWelcome = $('btnCloseWelcomeModal');
    if (btnCloseWelcome) btnCloseWelcome.addEventListener('click', cerrarModalBienvenidaRutina);

    var btnStartWelcome = $('btnStartWelcomeRoutine');
    if (btnStartWelcome) {
      btnStartWelcome.addEventListener('click', function() {
        cerrarModalBienvenidaRutina();
        if (typeof global.cgmRecargarRutinaVisual === 'function') {
          global.cgmRecargarRutinaVisual();
        }
      });
    }

    // Comprobar si se abrió la app con un enlace mágico
    verificarEnlaceMagicoAlEntrar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarUI);
  } else {
    inicializarUI();
  }

  global.CGM_RUTINA_PDF_UI = {
    renderizarSelectorRutinas: renderizarSelectorRutinas,
    abrirModalSubirPDF: abrirModalSubirPDF,
    abrirPantallaRevision: abrirPantallaRevision
  };

})(typeof window !== 'undefined' ? window : this);
