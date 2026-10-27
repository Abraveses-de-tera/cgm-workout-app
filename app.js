// =============================================================================
// CGM RENDIMIENTO · CONTROLADOR DE LA APLICACIÓN (v4.0)
// Rutina de 4 Días Rotativos · Carlos Graña
// 100% en castellano y sin atarse a días de la semana
// =============================================================================

(function() {
  'use strict';

  // 1. DATOS DE LOS 4 DÍAS DE ENTRENAMIENTO
  var DIAS_ENTRENAMIENTO = {
    D1: {
      id: "D1",
      numero: 1,
      titulo: "DÍA 1",
      nombre: "Espalda y Deltoides Posterior",
      categoria: "Espalda y parte trasera del hombro",
      descripcion: "Amplitud y grosor dorsal, remos pesados y deltoides posterior.",
      ejercicios: [
        {
          id: "d1_e1",
          nombre: "Pull over en polea",
          indicaciones: "3 series de 12 repeticiones. Movimiento controlado, estiramiento completo arriba sin doblar muñecas.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d1_e2",
          nombre: "Dominadas",
          indicaciones: "1 serie con peso añadido (lastre) a 8 repeticiones + 1 serie sin peso al fallo muscular.",
          series: [
            { tipo: "lastre", insignia: "CON LASTRE", repeticionesObjetivo: 8 },
            { tipo: "fallo", insignia: "AL FALLO", repeticionesObjetivo: "Al fallo" }
          ]
        },
        {
          id: "d1_e3",
          nombre: "Remo con barra",
          indicaciones: "Serie pesada + serie de descarga (−20 %) + 3.ª serie con el peso de la descarga y descendente.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", insignia: "SERIE PESADA", repeticionesObjetivo: 6 },
            { tipo: "descarga", insignia: "DESCARGA -20%", repeticionesObjetivo: 8 },
            { tipo: "descendente", insignia: "DESCENDENTE", repeticionesObjetivo: 8 }
          ]
        },
        {
          id: "d1_e4",
          nombre: "Jalón agarre cerrado",
          indicaciones: "3 series de 12 repeticiones. En la última serie, baja de peso al terminar y continúa (descendente).",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "descendente", insignia: "DESCENDENTE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d1_e5",
          nombre: "Remo Dorian",
          indicaciones: "3 series de 12 repeticiones. Agarre con palmas hacia arriba (supino), torso a 45 grados, tirando hacia la cadera.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d1_e6",
          nombre: "Posterior en máquina",
          indicaciones: "3 series de 15 repeticiones. Pájaros en máquina. Codos alineados con los hombros.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d1_e7",
          nombre: "Remo al mentón en polea",
          indicaciones: "3 series de 15 repeticiones. Agarre medio en polea baja, subiendo hacia el pecho/mentón.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 }
          ]
        }
      ]
    },

    D2: {
      id: "D2",
      numero: 2,
      titulo: "DÍA 2",
      nombre: "Pecho y Hombro",
      categoria: "Pectoral y deltoides frontal/lateral",
      descripcion: "Empujes pesados con serie de descarga, aperturas y bombeo de hombros.",
      ejercicios: [
        {
          id: "d2_e1",
          nombre: "Press inclinado",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Banco a 30-45 grados. Escápulas retraídas.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", insignia: "SERIE PESADA", repeticionesObjetivo: 6 },
            { tipo: "descarga", insignia: "DESCARGA -20%", repeticionesObjetivo: 8 }
          ]
        },
        {
          id: "d2_e2",
          nombre: "Aperturas",
          indicaciones: "3 series de 12 repeticiones. Con mancuernas o en polea. Siente el estiramiento al bajar.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d2_e3",
          nombre: "Press declinado",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Gran estímulo para la parte media y baja del pectoral.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", insignia: "SERIE PESADA", repeticionesObjetivo: 6 },
            { tipo: "descarga", insignia: "DESCARGA -20%", repeticionesObjetivo: 8 }
          ]
        },
        {
          id: "d2_e4",
          nombre: "Cruce de poleas",
          indicaciones: "2 series de 12 repeticiones. Aguanta 1 segundo apretando al frente.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d2_e5",
          nombre: "Elevaciones laterales",
          indicaciones: "4 series de 12 repeticiones. En la 4.ª serie, baja peso inmediatamente y sigue al fallo.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "descendente", insignia: "DESCENDENTE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d2_e6",
          nombre: "Press militar",
          indicaciones: "2 series de 8 repeticiones. Con barra o mancuernas. Core firme sin arquear la espalda.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 8 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 8 }
          ]
        },
        {
          id: "d2_e7",
          nombre: "Elevaciones frontales",
          indicaciones: "2 series de 12 repeticiones. Con mancuernas o polea. Subida controlada hasta la vista.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
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
      descripcion: "Trabajo completo de piernas: isquios, prensa pesada, sentadilla y aductor.",
      ejercicios: [
        {
          id: "d3_e1",
          nombre: "Femoral tumbado",
          indicaciones: "3 series de 12 repeticiones. Mantén la cadera pegada al banco.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d3_e2",
          nombre: "Extensiones de cuádriceps",
          indicaciones: "3 series de 15 repeticiones. Pausa de 1 segundo arriba para apretar el cuádriceps.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d3_e3",
          nombre: "Sentadilla pendular",
          indicaciones: "3 series de 12 repeticiones. Si no tienes péndulo, usa sentadilla Hack o Multipower.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d3_e4",
          nombre: "Prensa",
          indicaciones: "Serie pesada + serie de descarga (−20 %). Baja profundo sin despegar los glúteos del asiento.",
          tieneCalculoDescarga: true,
          series: [
            { tipo: "pesada", insignia: "SERIE PESADA", repeticionesObjetivo: 8 },
            { tipo: "descarga", insignia: "DESCARGA -20%", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d3_e5",
          nombre: "Aductor",
          indicaciones: "3 series de 15 repeticiones. En máquina de aductor, abriendo y cerrando con control.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 15 }
          ]
        },
        {
          id: "d3_e6",
          nombre: "Femoral sentado",
          indicaciones: "3 series de 12 repeticiones. Gran estiramiento en la bajada, controla el peso.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
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
      descripcion: "Entrenamiento enfocado en brazos: diferentes ángulos para bíceps y tríceps.",
      ejercicios: [
        {
          id: "d4_e1",
          nombre: "Curl de bíceps con mancuernas",
          indicaciones: "3 series de 12 repeticiones. Gira las muñecas hacia afuera arriba.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d4_e2",
          nombre: "Tríceps en polea con cuerda",
          indicaciones: "3 series de 12 repeticiones. Abre la cuerda abajo para activar la cabeza lateral.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 12 }
          ]
        },
        {
          id: "d4_e3",
          nombre: "Curl de bíceps en banco Scott",
          indicaciones: "3 series de 10 repeticiones. Brazos bien apoyados sin despegar los codos.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e4",
          nombre: "Tríceps tras nuca unilateral",
          indicaciones: "3 series de 10 repeticiones con cada brazo. En polea o con mancuerna tras nuca.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e5",
          nombre: "Curl martillo",
          indicaciones: "2 series de 10 repeticiones. Con palmas enfrentadas para dar grosor al brazo.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 }
          ]
        },
        {
          id: "d4_e6",
          nombre: "Fondos",
          indicaciones: "2 series de 10 repeticiones. En paralelas o entre bancos.",
          series: [
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 },
            { tipo: "normal", insignia: "SERIE", repeticionesObjetivo: 10 }
          ]
        }
      ]
    }
  };

  // Secuencia rotativa ordenada de sesiones
  var SECUENCIA_ROTATIVA = [
    { id: "D1", nombre: "Día 1: Espalda y Posterior", esRepeticion: false },
    { id: "D2", nombre: "Día 2: Pecho y Hombro", esRepeticion: false },
    { id: "D3", nombre: "Día 3: Pierna Completa", esRepeticion: false },
    { id: "D4", nombre: "Día 4: Brazos", esRepeticion: false },
    { id: "D1", nombre: "Día 1: Espalda (Repetición)", esRepeticion: true },
    { id: "D2", nombre: "Día 2: Pecho y Hombro", esRepeticion: false },
    { id: "D3", nombre: "Día 3: Pierna Completa", esRepeticion: false },
    { id: "D4", nombre: "Día 4: Brazos", esRepeticion: false },
    { id: "D2", nombre: "Día 2: Pecho (Repetición)", esRepeticion: true }
  ];

  // ===========================================================================
  // ALMACENAMIENTO Y ESTADO
  // ===========================================================================
  var CLAVES_ALMACENAMIENTO = {
    ENTRENAMIENTO_ACTIVO: 'cgm_entrenamiento_activo_v4',
    HISTORIAL: 'cgm_historial_v4',
    RECORDS: 'cgm_records_v4',
    AJUSTES: 'cgm_ajustes_v4',
    INDICE_ROTACION: 'cgm_indice_rotacion_v4'
  };

  var AJUSTES_PREDETERMINADOS = {
    sonidoActivado: true,
    vibracionActivada: true,
    segundosDescanso: 90,
    pantallaEncendida: true
  };

  var estado = {
    indiceRotacion: 0,
    entrenamientoActivo: null,
    historial: [],
    records: {},
    ajustes: Object.assign({}, AJUSTES_PREDETERMINADOS),
    cronometroDescanso: {
      duracion: 90,
      restante: 90,
      intervaloId: null,
      activo: false
    },
    intervaloEntrenamiento: null,
    bloqueoPantalla: null,
    peticionInstalacionPWA: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escuchar(el, evento, funcion) {
    if (el) el.addEventListener(evento, funcion);
  }

  // ===========================================================================
  // SONIDOS EN EL GIMNASIO (100% SIN INTERNET)
  // ===========================================================================
  var audio = {
    ctx: null,
    iniciar: function() {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
    },
    sonar: function(frecuencia, tipo, duracion) {
      if (!estado.ajustes.sonidoActivado) return;
      try {
        this.iniciar();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        var osc = this.ctx.createOscillator();
        var ganancia = this.ctx.createGain();
        osc.type = tipo || 'sine';
        osc.frequency.setValueAtTime(frecuencia || 880, this.ctx.currentTime);
        ganancia.gain.setValueAtTime(0.2, this.ctx.currentTime);
        ganancia.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (duracion || 0.15));
        osc.connect(ganancia);
        ganancia.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + (duracion || 0.15));
      } catch (e) { /* ignorar */ }
    },
    serieLista: function() {
      var self = this;
      self.sonar(523.25, 'triangle', 0.1);
      setTimeout(function() { self.sonar(659.25, 'triangle', 0.15); }, 100);
    },
    descansoTerminado: function() {
      var self = this;
      self.sonar(880, 'sine', 0.15);
      setTimeout(function() { self.sonar(880, 'sine', 0.15); }, 180);
      setTimeout(function() { self.sonar(1174.66, 'sine', 0.35); }, 360);
    }
  };

  function vibrar(patron) {
    if (estado.ajustes.vibracionActivada && 'vibrate' in navigator) {
      try { navigator.vibrate(patron || [60]); } catch (e) { /* ignorar */ }
    }
  }

  function controlarPantalla(encender) {
    if (!('wakeLock' in navigator)) return;
    try {
      if (encender && !estado.bloqueoPantalla) {
        navigator.wakeLock.request('screen').then(function(sentinela) {
          estado.bloqueoPantalla = sentinela;
          var btn = $('wakeLockBtn');
          if (btn) btn.classList.add('active');
          sentinela.addEventListener('release', function() {
            estado.bloqueoPantalla = null;
            if (btn) btn.classList.remove('active');
          });
        }).catch(function() {});
      } else if (!encender && estado.bloqueoPantalla) {
        estado.bloqueoPantalla.release().catch(function() {});
        estado.bloqueoPantalla = null;
        var btn = $('wakeLockBtn');
        if (btn) btn.classList.remove('active');
      }
    } catch (err) { /* ignorar */ }
  }

  // ===========================================================================
  // INICIALIZACIÓN
  // ===========================================================================
  function iniciarApp() {
    try { cargarDatos(); } catch (e) { console.error('Error al cargar datos:', e); }
    try { configurarEventos(); } catch (e) { console.error('Error en eventos:', e); }
    try { configurarPWA(); } catch (e) { console.warn('PWA:', e); }
    try { mostrarSiguienteEntrenamiento(); } catch (e) { console.error('Error en entrenamiento sugerido:', e); }
    try { dibujarSecuenciaCiclo(); } catch (e) { console.error('Error en secuencia:', e); }
    try { dibujarHistorial(); } catch (e) { console.error('Error en historial:', e); }
    try { dibujarRecords(); } catch (e) { console.error('Error en records:', e); }
    try { actualizarCalculadoraDiscos(); } catch (e) { console.error('Error en discos:', e); }
    try { actualizarCalculadoraDescarga(); } catch (e) { console.error('Error en descarga:', e); }

    if (estado.entrenamientoActivo) {
      try { reanudarEntrenamiento(); } catch (e) {
        console.error('Error al reanudar:', e);
        estado.entrenamientoActivo = null;
        guardarDatos();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarApp);
  } else {
    iniciarApp();
  }

  function cargarDatos() {
    try {
      var h = localStorage.getItem(CLAVES_ALMACENAMIENTO.HISTORIAL) || localStorage.getItem('cgm_workout_history');
      if (h) estado.historial = JSON.parse(h);

      var r = localStorage.getItem(CLAVES_ALMACENAMIENTO.RECORDS) || localStorage.getItem('cgm_personal_records');
      if (r) estado.records = JSON.parse(r);

      var a = localStorage.getItem(CLAVES_ALMACENAMIENTO.AJUSTES);
      if (a) estado.ajustes = Object.assign({}, AJUSTES_PREDETERMINADOS, JSON.parse(a));

      var idx = localStorage.getItem(CLAVES_ALMACENAMIENTO.INDICE_ROTACION);
      if (idx !== null) estado.indiceRotacion = parseInt(idx, 10) || 0;

      var act = localStorage.getItem(CLAVES_ALMACENAMIENTO.ENTRENAMIENTO_ACTIVO) || localStorage.getItem('cgm_active_workout');
      if (act) {
        var parsed = JSON.parse(act);
        if (parsed && parsed.idDia && Array.isArray(parsed.ejercicios)) {
          estado.entrenamientoActivo = parsed;
        }
      }
    } catch (e) {
      console.warn('Lectura de almacenamiento:', e);
    }

    var checkSonido = $('settingSound');
    var checkVibrar = $('settingVibrate');
    var selectDescanso = $('settingDefaultRest');
    var btnSonido = $('soundToggleBtn');

    if (checkSonido) checkSonido.checked = estado.ajustes.sonidoActivado;
    if (checkVibrar) checkVibrar.checked = estado.ajustes.vibracionActivada;
    if (selectDescanso) selectDescanso.value = String(estado.ajustes.segundosDescanso);
    if (btnSonido) {
      btnSonido.classList.toggle('active', estado.ajustes.sonidoActivado);
      btnSonido.textContent = estado.ajustes.sonidoActivado ? '🔔' : '🔕';
    }
  }

  function guardarDatos() {
    try {
      localStorage.setItem(CLAVES_ALMACENAMIENTO.HISTORIAL, JSON.stringify(estado.historial));
      localStorage.setItem(CLAVES_ALMACENAMIENTO.RECORDS, JSON.stringify(estado.records));
      localStorage.setItem(CLAVES_ALMACENAMIENTO.AJUSTES, JSON.stringify(estado.ajustes));
      localStorage.setItem(CLAVES_ALMACENAMIENTO.INDICE_ROTACION, String(estado.indiceRotacion));
      if (estado.entrenamientoActivo) {
        localStorage.setItem(CLAVES_ALMACENAMIENTO.ENTRENAMIENTO_ACTIVO, JSON.stringify(estado.entrenamientoActivo));
      } else {
        localStorage.removeItem(CLAVES_ALMACENAMIENTO.ENTRENAMIENTO_ACTIVO);
      }
    } catch (e) {
      console.error('Guardado en almacenamiento:', e);
    }
  }

  // ===========================================================================
  // NAVEGACIÓN ENTRE PESTAÑAS
  // ===========================================================================
  function cambiarPestana(idPestana) {
    var vistas = document.querySelectorAll('.tab-view');
    for (var i = 0; i < vistas.length; i++) vistas[i].classList.remove('active');

    var botonesNav = document.querySelectorAll('.nav-item');
    for (var i = 0; i < botonesNav.length; i++) botonesNav[i].classList.remove('active');

    var destino = $(idPestana);
    if (destino) destino.classList.add('active');

    var botonActivo = document.querySelector('.nav-item[data-tab="' + idPestana + '"]');
    if (botonActivo) botonActivo.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===========================================================================
  // RUTINA Y ROTACIÓN DE DÍAS (SIN DÍAS DE LA SEMANA)
  // ===========================================================================
  function obtenerSiguienteDia() {
    // Si la rotación supera la lista, volvemos a empezar
    var paso = SECUENCIA_ROTATIVA[estado.indiceRotacion % SECUENCIA_ROTATIVA.length];
    return DIAS_ENTRENAMIENTO[paso.id] || DIAS_ENTRENAMIENTO.D1;
  }

  function mostrarSiguienteEntrenamiento() {
    var dia = obtenerSiguienteDia();
    var tituloEl = $('todayWorkoutTitle');
    var descEl = $('todayWorkoutDesc');
    var btnEmpezar = $('startTodayWorkoutBtn');
    var badgeFecha = $('currentDateBadge');

    if (badgeFecha) {
      badgeFecha.textContent = 'DÍA ' + dia.numero;
    }

    if (tituloEl) {
      tituloEl.textContent = dia.titulo + ': ' + dia.nombre;
    }
    if (descEl) {
      descEl.textContent = dia.descripcion;
    }
    if (btnEmpezar) {
      btnEmpezar.dataset.idDia = dia.id;
      btnEmpezar.innerHTML = '<span>▶</span> Empezar ' + dia.titulo + ' (' + dia.nombre + ')';
    }
  }

  function dibujarSecuenciaCiclo() {
    var contenedor = $('cycleStepsList');
    if (!contenedor) return;

    var actualIdx = estado.indiceRotacion % SECUENCIA_ROTATIVA.length;
    var html = '';

    for (var i = 0; i < SECUENCIA_ROTATIVA.length; i++) {
      var item = SECUENCIA_ROTATIVA[i];
      var esSiguiente = (i === actualIdx);
      var diaObj = DIAS_ENTRENAMIENTO[item.id];

      html += '<div class="schedule-day-card' + (esSiguiente ? ' today' : '') + '" data-id-dia="' + item.id + '" data-paso="' + i + '" style="cursor:pointer;">';
      html += '  <div class="schedule-day-left">';
      html += '    <span class="day-tag" style="width:auto;padding-right:8px;">' + (i + 1) + 'º</span>';
      html += '    <div class="day-routine-name">' + item.nombre;
      if (item.esRepeticion) html += ' <span class="repeat-badge">REPETICIÓN</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <div class="day-badge-action">';
      html += esSiguiente ? '<span style="color:var(--gold-light);font-weight:800;">👉 TOCA AHORA</span>' : '<span>Entrenar ➔</span>';
      html += '  </div>';
      html += '</div>';
    }

    contenedor.innerHTML = html;

    var tarjetas = contenedor.querySelectorAll('.schedule-day-card');
    for (var i = 0; i < tarjetas.length; i++) {
      (function(tarjeta) {
        tarjeta.addEventListener('click', function() {
          var idDia = tarjeta.dataset.idDia;
          var paso = parseInt(tarjeta.dataset.paso, 10);
          if (!isNaN(paso)) {
            estado.indiceRotacion = paso;
            guardarDatos();
          }
          if (idDia) iniciarEntrenamiento(idDia);
        });
      })(tarjetas[i]);
    }
  }

  // ===========================================================================
  // MODO ENTRENAMIENTO ACTIVO
  // ===========================================================================
  function iniciarEntrenamiento(idDia) {
    var plantilla = DIAS_ENTRENAMIENTO[idDia];
    if (!plantilla) return;

    if (estado.entrenamientoActivo && estado.entrenamientoActivo.idDia !== idDia) {
      if (!confirm('Tienes una sesión de ' + estado.entrenamientoActivo.titulo + ' en curso. ¿Deseas descartarla y empezar ' + plantilla.titulo + '?')) return;
    }

    // Buscar sesión anterior para autocompletar pesos previos
    var sesionAnterior = null;
    for (var i = 0; i < estado.historial.length; i++) {
      if (estado.historial[i].idDia === idDia) {
        sesionAnterior = estado.historial[i];
        break;
      }
    }

    var ejercicios = [];
    for (var ei = 0; ei < plantilla.ejercicios.length; ei++) {
      var ej = plantilla.ejercicios[ei];
      var ejAnterior = null;
      if (sesionAnterior && Array.isArray(sesionAnterior.ejercicios)) {
        for (var j = 0; j < sesionAnterior.ejercicios.length; j++) {
          if (sesionAnterior.ejercicios[j].id === ej.id) {
            ejAnterior = sesionAnterior.ejercicios[j];
            break;
          }
        }
      }

      var series = [];
      for (var si = 0; si < ej.series.length; si++) {
        var s = ej.series[si];
        var sAnterior = (ejAnterior && ejAnterior.series && ejAnterior.series[si]) ? ejAnterior.series[si] : null;

        series.push({
          numero: si + 1,
          tipo: s.tipo,
          insignia: s.insignia || 'SERIE',
          repeticionesObjetivo: s.repeticionesObjetivo,
          peso: sAnterior ? sAnterior.peso : '',
          repeticiones: sAnterior ? sAnterior.repeticiones : (typeof s.repeticionesObjetivo === 'number' ? s.repeticionesObjetivo : ''),
          completada: false,
          pesoAnterior: sAnterior ? sAnterior.peso : null,
          repeticionesAnteriores: sAnterior ? sAnterior.repeticiones : null
        });
      }

      ejercicios.push({
        id: ej.id,
        nombre: ej.nombre,
        indicaciones: ej.indicaciones,
        tieneCalculoDescarga: ej.tieneCalculoDescarga || false,
        series: series
      });
    }

    estado.entrenamientoActivo = {
      idDia: plantilla.id,
      titulo: plantilla.titulo + ': ' + plantilla.nombre,
      categoria: plantilla.categoria,
      inicio: Date.now(),
      ejercicios: ejercicios
    };

    guardarDatos();
    reanudarEntrenamiento();
    cambiarPestana('tab-workout');
    controlarPantalla(true);
  }

  function reanudarEntrenamiento() {
    if (!estado.entrenamientoActivo) return;
    $('noActiveWorkoutView').style.display = 'none';
    $('activeWorkoutContent').style.display = 'block';
    $('activeWorkoutName').textContent = estado.entrenamientoActivo.titulo;
    $('activeWorkoutSubtitle').textContent = estado.entrenamientoActivo.categoria + ' · CGM Rendimiento';
    dibujarEjerciciosActivos();
    iniciarCronometroEntrenamiento();
    actualizarProgresoEntrenamiento();
  }

  function iniciarCronometroEntrenamiento() {
    if (estado.intervaloEntrenamiento) clearInterval(estado.intervaloEntrenamiento);
    var timerEl = $('workoutElapsedTimer');

    function actualizar() {
      if (!estado.entrenamientoActivo) return;
      var transcurrido = Math.floor((Date.now() - estado.entrenamientoActivo.inicio) / 1000);
      var mins = Math.floor(transcurrido / 60);
      var secs = transcurrido % 60;
      if (timerEl) timerEl.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
    actualizar();
    estado.intervaloEntrenamiento = setInterval(actualizar, 1000);
  }

  function dibujarEjerciciosActivos() {
    var contenedor = $('exercisesContainer');
    if (!contenedor || !estado.entrenamientoActivo || !Array.isArray(estado.entrenamientoActivo.ejercicios)) return;

    var html = '';
    var exs = estado.entrenamientoActivo.ejercicios;

    for (var exIdx = 0; exIdx < exs.length; exIdx++) {
      var ex = exs[exIdx];
      var todosCompletos = true;
      for (var k = 0; k < ex.series.length; k++) {
        if (!ex.series[k].completada) { todosCompletos = false; break; }
      }

      var pesoDescarga = null;
      if (ex.tieneCalculoDescarga && ex.series[0] && ex.series[0].peso) {
        var pesoTop = parseFloat(ex.series[0].peso);
        if (!isNaN(pesoTop) && pesoTop > 0) {
          var calculo = pesoTop * 0.8;
          pesoDescarga = '' + (Math.round(calculo / 2.5) * 2.5);
        }
      }

      html += '<div class="exercise-card' + (todosCompletos ? ' completed' : '') + '" data-ex-idx="' + exIdx + '">';
      html += '  <div class="exercise-header">';
      html += '    <div class="exercise-title-group">';
      html += '      <span class="exercise-number">EJERCICIO ' + (exIdx + 1) + ' DE ' + exs.length + '</span>';
      html += '      <h3 class="exercise-name">' + ex.nombre + '</h3>';
      html += '    </div>';
      html += '    <button class="icon-btn plate-modal-trigger" data-ex-idx="' + exIdx + '" title="Calcular discos para este ejercicio">⚖️</button>';
      html += '  </div>';

      if (ex.indicaciones) {
        html += '<div class="exercise-notes-banner"><span>💡</span><div>' + ex.indicaciones + '</div></div>';
      }

      html += '<div class="backoff-helper-pill' + (pesoDescarga ? ' visible' : '') + '" data-ex-idx="' + exIdx + '" data-peso="' + (pesoDescarga || '') + '">';
      html += '  <span>📉 Descarga recomendada (−20 %): <strong>' + (pesoDescarga ? pesoDescarga + ' kg' : '') + '</strong></span>';
      html += '  <button class="apply-btn">Poner en Serie 2</button>';
      html += '</div>';

      html += '<div class="sets-table">';
      html += '  <div class="set-row-header"><span>SERIE</span><span style="text-align:left">TIPO / ANTERIOR</span><span>KG</span><span>REPETICIONES</span><span>LISTO</span></div>';

      for (var sIdx = 0; sIdx < ex.series.length; sIdx++) {
        var s = ex.series[sIdx];
        var textoAnterior = (s.pesoAnterior !== null && s.repeticionesAnteriores !== null) ? s.pesoAnterior + 'kg × ' + s.repeticionesAnteriores : '—';

        html += '<div class="set-row' + (s.completada ? ' done' : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '">';
        html += '  <div class="set-index">' + s.numero + '</div>';
        html += '  <div class="set-badge-col">';
        html += '    <span class="set-tag ' + s.tipo + '">' + s.insignia + '</span>';
        html += '    <span class="previous-hint">Ant: ' + textoAnterior + '</span>';
        html += '  </div>';
        html += '  <div class="set-input-box"><input type="number" step="0.5" class="set-input weight-input" placeholder="' + (s.pesoAnterior || '0') + '" value="' + (s.peso !== undefined ? s.peso : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '"></div>';
        html += '  <div class="set-input-box"><input type="number" step="1" class="set-input reps-input" placeholder="' + (s.repeticionesObjetivo || '12') + '" value="' + (s.repeticiones !== undefined ? s.repeticiones : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '"></div>';
        html += '  <div style="display:flex;justify-content:center"><button class="check-btn toggle-set-btn" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '">' + (s.completada ? '✓' : '○') + '</button></div>';
        html += '</div>';
      }
      html += '</div>';

      html += '<div class="exercise-footer"><button class="btn-ghost-sm add-set-btn" data-ex-idx="' + exIdx + '">+ Añadir Serie Extra</button></div>';
      html += '</div>';
    }

    contenedor.innerHTML = html;
    asignarEventosEjercicios();
  }

  function actualizarCartelDescarga(exIdx, pesoValor) {
    var contenedor = $('exercisesContainer');
    if (!contenedor) return;
    var tarjeta = contenedor.querySelector('.exercise-card[data-ex-idx="' + exIdx + '"]');
    if (!tarjeta) return;
    var cartel = tarjeta.querySelector('.backoff-helper-pill');
    var pesoTop = parseFloat(pesoValor);
    if (!isNaN(pesoTop) && pesoTop > 0) {
      var calculo = pesoTop * 0.8;
      var pesoFinal = '' + (Math.round(calculo / 2.5) * 2.5);
      if (cartel) {
        cartel.dataset.peso = pesoFinal;
        var strong = cartel.querySelector('strong');
        if (strong) strong.textContent = pesoFinal + ' kg';
        cartel.classList.add('visible');
      }
    } else if (cartel) {
      cartel.classList.remove('visible');
    }
  }

  function asignarEventosEjercicios() {
    var contenedor = $('exercisesContainer');
    if (!contenedor) return;

    var inputsPeso = contenedor.querySelectorAll('.weight-input');
    for (var i = 0; i < inputsPeso.length; i++) {
      (function(input) {
        input.addEventListener('input', function() {
          var exIdx = parseInt(input.dataset.exIdx, 10);
          var sIdx = parseInt(input.dataset.setIdx, 10);
          if (estado.entrenamientoActivo && estado.entrenamientoActivo.ejercicios[exIdx] && estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) {
            estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx].peso = input.value;
            guardarDatos();
            if (sIdx === 0 && estado.entrenamientoActivo.ejercicios[exIdx].tieneCalculoDescarga) {
              actualizarCartelDescarga(exIdx, input.value);
            }
          }
        });
      })(inputsPeso[i]);
    }

    var inputsReps = contenedor.querySelectorAll('.reps-input');
    for (var i = 0; i < inputsReps.length; i++) {
      (function(input) {
        input.addEventListener('input', function() {
          var exIdx = parseInt(input.dataset.exIdx, 10);
          var sIdx = parseInt(input.dataset.setIdx, 10);
          if (estado.entrenamientoActivo && estado.entrenamientoActivo.ejercicios[exIdx] && estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) {
            estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx].repeticiones = input.value;
            guardarDatos();
          }
        });
      })(inputsReps[i]);
    }

    var botonesCheck = contenedor.querySelectorAll('.toggle-set-btn');
    for (var i = 0; i < botonesCheck.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          alternarSerieCompletada(parseInt(btn.dataset.exIdx, 10), parseInt(btn.dataset.setIdx, 10));
        });
      })(botonesCheck[i]);
    }

    var botonesAnadir = contenedor.querySelectorAll('.add-set-btn');
    for (var i = 0; i < botonesAnadir.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          anadirSerieExtra(parseInt(btn.dataset.exIdx, 10));
        });
      })(botonesAnadir[i]);
    }

    var cartelesDescarga = contenedor.querySelectorAll('.backoff-helper-pill');
    for (var i = 0; i < cartelesDescarga.length; i++) {
      (function(cartel) {
        cartel.addEventListener('click', function() {
          var exIdx = parseInt(cartel.dataset.exIdx, 10);
          var peso = cartel.dataset.peso;
          if (estado.entrenamientoActivo && estado.entrenamientoActivo.ejercicios[exIdx] && estado.entrenamientoActivo.ejercicios[exIdx].series[1]) {
            estado.entrenamientoActivo.ejercicios[exIdx].series[1].peso = peso;
            guardarDatos();
            dibujarEjerciciosActivos();
            vibrar([40]);
          }
        });
      })(cartelesDescarga[i]);
    }

    var botonesDiscos = contenedor.querySelectorAll('.plate-modal-trigger');
    for (var i = 0; i < botonesDiscos.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var exIdx = parseInt(btn.dataset.exIdx, 10);
          var ex = estado.entrenamientoActivo.ejercicios[exIdx];
          var peso = (ex.series[0] && ex.series[0].peso) ? ex.series[0].peso : 60;
          $('calcTargetWeight').value = peso;
          actualizarCalculadoraDiscos();
          cambiarPestana('tab-tools');
        });
      })(botonesDiscos[i]);
    }
  }

  function alternarSerieCompletada(exIdx, sIdx) {
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[exIdx] || !estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) return;
    var s = estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx];
    s.completada = !s.completada;

    if (s.completada) {
      if (!s.repeticiones && s.repeticionesObjetivo && typeof s.repeticionesObjetivo === 'number') {
        s.repeticiones = s.repeticionesObjetivo;
      }
      audio.serieLista();
      vibrar([60, 40, 80]);
      iniciarCronometroDescanso(estado.ajustes.segundosDescanso);
    }

    guardarDatos();
    dibujarEjerciciosActivos();
    actualizarProgresoEntrenamiento();
  }

  function anadirSerieExtra(exIdx) {
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[exIdx]) return;
    var ex = estado.entrenamientoActivo.ejercicios[exIdx];
    var ultima = ex.series[ex.series.length - 1];
    ex.series.push({
      numero: ex.series.length + 1,
      tipo: 'normal',
      insignia: 'EXTRA',
      repeticionesObjetivo: ultima ? ultima.repeticionesObjetivo : 12,
      peso: ultima ? ultima.peso : '',
      repeticiones: ultima ? ultima.repeticiones : '',
      completada: false,
      pesoAnterior: null,
      repeticionesAnteriores: null
    });
    guardarDatos();
    dibujarEjerciciosActivos();
  }

  function actualizarProgresoEntrenamiento() {
    if (!estado.entrenamientoActivo || !Array.isArray(estado.entrenamientoActivo.ejercicios)) return;
    var total = 0, hechas = 0;
    var exs = estado.entrenamientoActivo.ejercicios;
    for (var i = 0; i < exs.length; i++) {
      for (var j = 0; j < exs[i].series.length; j++) {
        total++;
        if (exs[i].series[j].completada) hechas++;
      }
    }
    var porcentaje = total > 0 ? (hechas / total) * 100 : 0;
    var barra = $('workoutProgressBar');
    if (barra) barra.style.width = porcentaje + '%';
  }

  // ===========================================================================
  // CRONÓMETRO DE DESCANSO
  // ===========================================================================
  function iniciarCronometroDescanso(segundos) {
    detenerCronometroDescanso();
    estado.cronometroDescanso.duracion = segundos;
    estado.cronometroDescanso.restante = segundos;
    estado.cronometroDescanso.activo = true;

    var barra = $('restTimerBar');
    if (barra) barra.classList.add('visible');
    actualizarPantallaDescanso();

    var inicio = Date.now();
    var objetivoMs = segundos * 1000;

    estado.cronometroDescanso.intervaloId = setInterval(function() {
      var transcurrido = Date.now() - inicio;
      var restanteMs = objetivoMs - transcurrido;
      var restanteSegs = Math.ceil(restanteMs / 1000);
      if (restanteSegs <= 0) {
        detenerCronometroDescanso();
        alTerminarDescanso();
      } else {
        estado.cronometroDescanso.restante = restanteSegs;
        actualizarPantallaDescanso();
      }
    }, 250);
  }

  function detenerCronometroDescanso() {
    if (estado.cronometroDescanso.intervaloId) {
      clearInterval(estado.cronometroDescanso.intervaloId);
      estado.cronometroDescanso.intervaloId = null;
    }
    estado.cronometroDescanso.activo = false;
  }

  function actualizarPantallaDescanso() {
    var mins = Math.floor(estado.cronometroDescanso.restante / 60);
    var secs = estado.cronometroDescanso.restante % 60;
    var numEl = $('restTimerSeconds');
    if (numEl) numEl.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

    var circulo = $('timerProgressCircle');
    if (circulo) {
      var circunferencia = 113.1;
      var fraccion = estado.cronometroDescanso.restante / estado.cronometroDescanso.duracion;
      circulo.style.strokeDashoffset = circunferencia * (1 - fraccion);
    }
  }

  function alTerminarDescanso() {
    var numEl = $('restTimerSeconds');
    if (numEl) numEl.textContent = '00:00';
    audio.descansoTerminado();
    vibrar([200, 100, 200, 100, 300]);
    setTimeout(function() {
      var barra = $('restTimerBar');
      if (barra && !estado.cronometroDescanso.activo) barra.classList.remove('visible');
    }, 3500);
  }

  // ===========================================================================
  // FINALIZAR ENTRENAMIENTO
  // ===========================================================================
  function finalizarEntrenamiento() {
    if (!estado.entrenamientoActivo) return;
    var duracionSegs = Math.floor((Date.now() - estado.entrenamientoActivo.inicio) / 1000);
    var duracionMins = Math.max(1, Math.round(duracionSegs / 60));

    var volumenTotal = 0, seriesHechas = 0;
    var nuevosRecords = [];
    var exs = estado.entrenamientoActivo.ejercicios;

    for (var i = 0; i < exs.length; i++) {
      for (var j = 0; j < exs[i].series.length; j++) {
        var s = exs[i].series[j];
        if (s.completada && s.peso && s.repeticiones) {
          var w = parseFloat(s.peso);
          var r = parseInt(s.repeticiones, 10);
          if (!isNaN(w) && !isNaN(r)) {
            volumenTotal += w * r;
            seriesHechas++;
            var recordActual = estado.records[exs[i].id] || 0;
            if (w > recordActual) {
              estado.records[exs[i].id] = w;
              nuevosRecords.push({ ejercicio: exs[i].nombre, peso: w, repeticiones: r });
            }
          }
        }
      }
    }

    var registro = {
      id: 'sesion_' + Date.now(),
      idDia: estado.entrenamientoActivo.idDia,
      titulo: estado.entrenamientoActivo.titulo,
      fecha: new Date().toISOString(),
      duracionMinutos: duracionMins,
      volumenKg: Math.round(volumenTotal),
      seriesCompletadas: seriesHechas,
      ejercicios: exs
    };
    estado.historial.unshift(registro);

    // Avanzar la rotación al siguiente día automáticamente
    estado.indiceRotacion = (estado.indiceRotacion + 1) % SECUENCIA_ROTATIVA.length;

    var tituloFinalizado = estado.entrenamientoActivo.titulo;
    estado.entrenamientoActivo = null;
    guardarDatos();

    if (estado.intervaloEntrenamiento) clearInterval(estado.intervaloEntrenamiento);
    detenerCronometroDescanso();
    controlarPantalla(false);
    dispararConfeti();

    mostrarModalResumen({
      titulo: tituloFinalizado,
      duracion: duracionMins + ' min',
      volumen: Math.round(volumenTotal).toLocaleString('es-ES') + ' kg',
      series: seriesHechas,
      records: nuevosRecords
    });

    dibujarHistorial();
    dibujarRecords();
    mostrarSiguienteEntrenamiento();
    dibujarSecuenciaCiclo();

    $('noActiveWorkoutView').style.display = 'block';
    $('activeWorkoutContent').style.display = 'none';
  }

  function mostrarModalResumen(resumen) {
    $('summaryWorkoutName').textContent = resumen.titulo;
    $('summaryDuration').textContent = resumen.duracion;
    $('summaryVolume').textContent = resumen.volumen;
    $('summarySets').textContent = resumen.series;

    var seccionRecords = $('summaryPrsSection');
    var listaRecords = $('summaryPrsList');
    if (resumen.records && resumen.records.length > 0) {
      seccionRecords.style.display = 'block';
      var html = '';
      for (var i = 0; i < resumen.records.length; i++) {
        var r = resumen.records[i];
        html += '<div style="font-size:12px;color:#fff;margin-bottom:2px">⭐ <strong>' + r.ejercicio + ':</strong> ' + r.peso + ' kg × ' + r.repeticiones + ' repeticiones</div>';
      }
      listaRecords.innerHTML = html;
    } else {
      seccionRecords.style.display = 'none';
    }

    var btnCompartir = $('shareWhatsAppBtn');
    btnCompartir.onclick = function() {
      var texto = encodeURIComponent(
        '💪 *Entrenamiento CGM Rendimiento Completado*\n' +
        '📅 *Sesión:* ' + resumen.titulo + '\n' +
        '⏱️ *Tiempo:* ' + resumen.duracion + '\n' +
        '🏋️ *Volumen total:* ' + resumen.volumen + '\n' +
        '✅ *Series hechas:* ' + resumen.series + '\n' +
        (resumen.records.length > 0 ? '🔥 *Récords:* ' + resumen.records.map(function(rc) { return rc.ejercicio + ' (' + rc.peso + 'kg)'; }).join(', ') + '\n' : '') +
        '\n_Carlos Graña · Frecuencia 1,5_'
      );
      window.open('https://api.whatsapp.com/send?text=' + texto, '_blank');
    };

    $('summaryModal').classList.add('open');
  }

  // ===========================================================================
  // HISTORIAL Y RÉCORDS
  // ===========================================================================
  function dibujarHistorial() {
    var contenedor = $('historyList');
    var badge = $('historyCountBadge');
    if (!contenedor) return;
    if (badge) badge.textContent = estado.historial.length + ' sesiones';

    if (estado.historial.length === 0) {
      contenedor.innerHTML = '<div class="cgm-card text-center" style="padding:28px 16px"><p style="color:var(--text-dim);font-size:13px">No hay entrenamientos guardados todavía.</p></div>';
      return;
    }

    var html = '';
    for (var i = 0; i < estado.historial.length; i++) {
      var item = estado.historial[i];
      var fechaObj = new Date(item.fecha);
      var fechaStr = fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

      html += '<div class="history-item">';
      html += '  <div class="history-header"><div>';
      html += '    <div class="history-title">' + item.titulo + '</div>';
      html += '    <div class="history-date">' + fechaStr + '</div>';
      html += '  </div><span class="badge-gold">' + item.idDia + '</span></div>';
      html += '  <div class="history-stats-row">';
      html += '    <div class="history-stat">⏱ <strong>' + item.duracionMinutos + ' min</strong></div>';
      html += '    <div class="history-stat">⚖ <strong>' + item.volumenKg.toLocaleString('es-ES') + ' kg</strong></div>';
      html += '    <div class="history-stat">✓ <strong>' + item.seriesCompletadas + ' series</strong></div>';
      html += '  </div>';
      html += '</div>';
    }
    contenedor.innerHTML = html;
  }

  function dibujarRecords() {
    var grid = $('prsGrid');
    if (!grid) return;
    var claves = Object.keys(estado.records);
    if (claves.length === 0) {
      grid.innerHTML = '<div style="font-size:12px;color:var(--text-dim);text-align:center;padding:10px">Se registrarán automáticamente según vayas completando tus series pesadas.</div>';
      return;
    }

    var idANombre = {};
    var diasClaves = Object.keys(DIAS_ENTRENAMIENTO);
    for (var d = 0; d < diasClaves.length; d++) {
      var exs = DIAS_ENTRENAMIENTO[diasClaves[d]].ejercicios;
      for (var e = 0; e < exs.length; e++) {
        idANombre[exs[e].id] = exs[e].nombre;
      }
    }

    var html = '';
    for (var i = 0; i < claves.length; i++) {
      html += '<div class="pr-card"><span class="pr-name">' + (idANombre[claves[i]] || claves[i]) + '</span><span class="pr-val">' + estado.records[claves[i]] + ' kg</span></div>';
    }
    grid.innerHTML = html;
  }

  // ===========================================================================
  // CALCULADORAS (DISCOS Y DESCARGA)
  // ===========================================================================
  function actualizarCalculadoraDiscos() {
    var inputObjetivo = $('calcTargetWeight');
    var selectBarra = $('calcBarWeight');
    var labelLado = $('weightPerSideLabel');
    var visual = $('platesVisual');
    var listaTexto = $('platesTextList');
    if (!inputObjetivo || !selectBarra) return;

    var objetivo = parseFloat(inputObjetivo.value) || 0;
    var barra = parseFloat(selectBarra.value) || 0;

    if (objetivo < barra) {
      if (labelLado) labelLado.textContent = '0 kg (el peso es menor al peso de la barra)';
      if (visual) visual.innerHTML = '';
      if (listaTexto) listaTexto.textContent = '';
      return;
    }

    var porLado = (objetivo - barra) / 2;
    if (labelLado) labelLado.textContent = porLado + ' kg en cada lado';

    var tiposDiscos = [
      { peso: 25, css: 'plate-25', etiqueta: '25' },
      { peso: 20, css: 'plate-20', etiqueta: '20' },
      { peso: 15, css: 'plate-15', etiqueta: '15' },
      { peso: 10, css: 'plate-10', etiqueta: '10' },
      { peso: 5,  css: 'plate-5',  etiqueta: '5' },
      { peso: 2.5, css: 'plate-2_5', etiqueta: '2.5' },
      { peso: 1.25, css: 'plate-1_25', etiqueta: '1.25' }
    ];

    var restante = porLado;
    var discosUsados = [];

    for (var i = 0; i < tiposDiscos.length; i++) {
      var d = tiposDiscos[i];
      while (restante >= d.peso - 0.001) {
        discosUsados.push(d);
        restante = Math.round((restante - d.peso) * 100) / 100;
      }
    }

    if (visual) {
      var vhtml = '';
      for (var i = 0; i < discosUsados.length; i++) {
        vhtml += '<div class="plate-disc ' + discosUsados[i].css + '" title="' + discosUsados[i].peso + ' kg">' + discosUsados[i].etiqueta + '</div>';
      }
      visual.innerHTML = vhtml;
    }

    if (listaTexto) {
      if (discosUsados.length === 0) {
        listaTexto.textContent = 'Solo la barra vacía.';
      } else {
        var cuentas = {};
        for (var i = 0; i < discosUsados.length; i++) {
          var p = discosUsados[i].peso;
          cuentas[p] = (cuentas[p] || 0) + 1;
        }
        var partes = [];
        var cClaves = Object.keys(cuentas);
        for (var i = 0; i < cClaves.length; i++) {
          partes.push(cuentas[cClaves[i]] + ' de ' + cClaves[i] + ' kg');
        }
        listaTexto.textContent = 'Discos por lado: ' + partes.join(', ');
      }
    }
  }

  function actualizarCalculadoraDescarga() {
    var inputTop = $('topSetInput');
    var resultado = $('backOffResult');
    if (!inputTop || !resultado) return;
    var pesoTop = parseFloat(inputTop.value) || 0;
    if (pesoTop <= 0) {
      resultado.textContent = '0.0 kg';
      return;
    }
    var calculo = pesoTop * 0.8;
    var redondeado = Math.round(calculo / 2.5) * 2.5;
    resultado.textContent = redondeado + ' kg (−20 %)';
  }

  // ===========================================================================
  // CONFETI
  // ===========================================================================
  function dispararConfeti() {
    var canvas = $('confettiCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particulas = [];
    var colores = ['#D4AF37', '#FDE68A', '#997819', '#ffffff', '#10B981', '#38BDF8'];
    for (var i = 0; i < 90; i++) {
      particulas.push({
        x: canvas.width / 2, y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colores[Math.floor(Math.random() * colores.length)],
        alpha: 1, rotacion: Math.random() * 360
      });
    }

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var vivas = false;
      for (var i = 0; i < particulas.length; i++) {
        var p = particulas[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.4; p.alpha -= 0.015;
        if (p.alpha > 0) {
          vivas = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotacion * Math.PI / 180);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      if (vivas) requestAnimationFrame(animar);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animar();
  }

  // ===========================================================================
  // EVENTOS GLOBALES
  // ===========================================================================
  function configurarEventos() {
    var navs = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navs.length; i++) {
      (function(item) {
        item.addEventListener('click', function() {
          if (item.dataset.tab) cambiarPestana(item.dataset.tab);
        });
      })(navs[i]);
    }

    // Botón empezar sugerido
    escuchar($('startTodayWorkoutBtn'), 'click', function() {
      var id = $('startTodayWorkoutBtn').dataset.idDia || 'D1';
      iniciarEntrenamiento(id);
    });

    // 4 Días directos
    var tarjetasDirectas = document.querySelectorAll('.direct-day-card');
    for (var i = 0; i < tarjetasDirectas.length; i++) {
      (function(card) {
        card.addEventListener('click', function() {
          if (card.dataset.day) iniciarEntrenamiento(card.dataset.day);
        });
      })(tarjetasDirectas[i]);
    }

    escuchar($('goToRoutineBtn'), 'click', function() { cambiarPestana('tab-routine'); });

    escuchar($('finishWorkoutBtn'), 'click', function() {
      if (confirm('¿Has completado el entrenamiento y deseas guardar los resultados?')) finalizarEntrenamiento();
    });

    escuchar($('discardWorkoutBtn'), 'click', function() {
      if (confirm('¿Seguro que deseas descartar esta sesión? Los datos no guardados se perderán.')) {
        estado.entrenamientoActivo = null;
        guardarDatos();
        if (estado.intervaloEntrenamiento) clearInterval(estado.intervaloEntrenamiento);
        detenerCronometroDescanso();
        controlarPantalla(false);
        $('noActiveWorkoutView').style.display = 'block';
        $('activeWorkoutContent').style.display = 'none';
        cambiarPestana('tab-routine');
      }
    });

    // Controles de cronómetro
    escuchar($('timerAdd15Btn'), 'click', function() {
      estado.cronometroDescanso.restante += 15;
      estado.cronometroDescanso.duracion += 15;
      actualizarPantallaDescanso();
    });
    escuchar($('timerSub15Btn'), 'click', function() {
      estado.cronometroDescanso.restante = Math.max(0, estado.cronometroDescanso.restante - 15);
      actualizarPantallaDescanso();
      if (estado.cronometroDescanso.restante === 0) alTerminarDescanso();
    });
    escuchar($('timerSkipBtn'), 'click', function() {
      detenerCronometroDescanso();
      var barra = $('restTimerBar');
      if (barra) barra.classList.remove('visible');
    });
    escuchar($('timerCloseBtn'), 'click', function() {
      var barra = $('restTimerBar');
      if (barra) barra.classList.remove('visible');
    });

    // Botones superiores
    escuchar($('soundToggleBtn'), 'click', function() {
      estado.ajustes.sonidoActivado = !estado.ajustes.sonidoActivado;
      guardarDatos();
      var btn = $('soundToggleBtn');
      if (btn) {
        btn.classList.toggle('active', estado.ajustes.sonidoActivado);
        btn.textContent = estado.ajustes.sonidoActivado ? '🔔' : '🔕';
      }
      var check = $('settingSound');
      if (check) check.checked = estado.ajustes.sonidoActivado;
    });

    escuchar($('wakeLockBtn'), 'click', function() {
      controlarPantalla(!estado.bloqueoPantalla);
    });

    escuchar($('plateCalcQuickBtn'), 'click', function() { cambiarPestana('tab-tools'); });

    escuchar($('closeSummaryModalBtn'), 'click', function() {
      var modal = $('summaryModal');
      if (modal) modal.classList.remove('open');
      cambiarPestana('tab-routine');
    });

    // Calculadoras
    escuchar($('calcTargetWeight'), 'input', actualizarCalculadoraDiscos);
    escuchar($('calcBarWeight'), 'change', actualizarCalculadoraDiscos);
    escuchar($('topSetInput'), 'input', actualizarCalculadoraDescarga);

    // Ajustes
    escuchar($('settingSound'), 'change', function(e) {
      estado.ajustes.sonidoActivado = e.target.checked;
      guardarDatos();
      var btn = $('soundToggleBtn');
      if (btn) {
        btn.classList.toggle('active', estado.ajustes.sonidoActivado);
        btn.textContent = estado.ajustes.sonidoActivado ? '🔔' : '🔕';
      }
    });

    escuchar($('settingVibrate'), 'change', function(e) {
      estado.ajustes.vibracionActivada = e.target.checked;
      guardarDatos();
    });

    escuchar($('settingDefaultRest'), 'change', function(e) {
      estado.ajustes.segundosDescanso = parseInt(e.target.value, 10);
      guardarDatos();
    });

    // Copia de seguridad
    escuchar($('exportDataBtn'), 'click', descargarCopiaSeguridad);
    escuchar($('importDataInput'), 'change', restaurarCopiaSeguridad);
    escuchar($('resetDataBtn'), 'click', borrarTodo);
  }

  function descargarCopiaSeguridad() {
    var datos = {
      aplicacion: 'CGM Rendimiento Rutina',
      version: '4.0',
      fechaExportacion: new Date().toISOString(),
      historial: estado.historial,
      records: estado.records,
      ajustes: estado.ajustes,
      indiceRotacion: estado.indiceRotacion
    };
    var blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cgm-entreno-copia-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function restaurarCopiaSeguridad(e) {
    var archivo = e.target.files[0];
    if (!archivo) return;
    var lector = new FileReader();
    lector.onload = function(evento) {
      try {
        var datos = JSON.parse(evento.target.result);
        if (datos.historial) estado.historial = datos.historial;
        if (datos.records) estado.records = datos.records;
        if (datos.ajustes) estado.ajustes = Object.assign({}, AJUSTES_PREDETERMINADOS, datos.ajustes);
        if (datos.indiceRotacion !== undefined) estado.indiceRotacion = datos.indiceRotacion;

        guardarDatos();
        dibujarHistorial();
        dibujarRecords();
        mostrarSiguienteEntrenamiento();
        dibujarSecuenciaCiclo();
        alert('¡Copia de seguridad restaurada con éxito!');
      } catch (err) {
        alert('El archivo seleccionado no es válido.');
      }
    };
    lector.readAsText(archivo);
  }

  function borrarTodo() {
    if (confirm('ADVERTENCIA: ¿Seguro que deseas borrar todo el historial y empezar de cero?')) {
      localStorage.clear();
      location.reload();
    }
  }

  function configurarPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js?v=4').then(function(reg) {
        console.log('SW registrado correctamente:', reg.scope);
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        reg.update();
      }).catch(function(err) {
        console.warn('SW aviso:', err);
      });
    }

    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      estado.peticionInstalacionPWA = e;
      var banner = $('pwaBanner');
      if (banner) banner.classList.add('show');
    });

    escuchar($('pwaInstallBtn'), 'click', function() {
      if (estado.peticionInstalacionPWA) {
        estado.peticionInstalacionPWA.prompt();
        estado.peticionInstalacionPWA.userChoice.then(function() {
          estado.peticionInstalacionPWA = null;
          var banner = $('pwaBanner');
          if (banner) banner.classList.remove('show');
        });
      } else {
        alert('En iPhone: toca el botón Compartir de Safari y selecciona "Añadir a pantalla de inicio". En Android: toca los tres puntos y "Instalar aplicación".');
      }
    });
  }

})();
