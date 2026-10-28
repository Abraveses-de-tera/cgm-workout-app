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
    INDICE_ROTACION: 'cgm_indice_rotacion_v4',
    NOTAS_EJERCICIOS: 'cgm_notas_ejercicios_v4',
    VIDEOS_EJERCICIOS: 'cgm_videos_ejercicios_v4'
  };

  var AJUSTES_PREDETERMINADOS = {
    sonidoActivado: true,
    vibracionActivada: true,
    segundosDescanso: 90,
    pantallaEncendida: true,
    tecladoTactilGym: true
  };

  var estado = {
    indiceRotacion: 0,
    entrenamientoActivo: null,
    historial: [],
    records: {},
    notasEjercicios: {},
    videosEjercicios: {},
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

  var keypadActivo = {
    exIdx: null,
    sIdx: null,
    campo: 'peso',
    buffer: ''
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
    try { dibujarEstadisticasGlobales(); } catch (e) { console.error('Error en estadísticas:', e); }
    try { dibujarRecords(); } catch (e) { console.error('Error en records:', e); }
    try { poblarSelectorEjercicios(); } catch (e) { console.error('Error en selector ejercicios:', e); }
    try { dibujarGraficoProgresion(); } catch (e) { console.error('Error en gráfico progresión:', e); }
    try { actualizarCalculadoraDiscos(); } catch (e) { console.error('Error en discos:', e); }
    try { actualizarCalculadoraDescarga(); } catch (e) { console.error('Error en descarga:', e); }
    try { actualizarCalculadora1RM(); } catch (e) { console.error('Error en 1RM:', e); }
    try { renderizarCatalogoBD(); } catch (e) { console.error('Error en catálogo BD:', e); }

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

      var notas = localStorage.getItem(CLAVES_ALMACENAMIENTO.NOTAS_EJERCICIOS);
      if (notas) estado.notasEjercicios = JSON.parse(notas);

      var vids = localStorage.getItem(CLAVES_ALMACENAMIENTO.VIDEOS_EJERCICIOS);
      if (vids) estado.videosEjercicios = JSON.parse(vids);

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
    var checkKeypad = $('settingGymKeypad');
    var selectDescanso = $('settingDefaultRest');
    var btnSonido = $('soundToggleBtn');

    if (checkSonido) checkSonido.checked = estado.ajustes.sonidoActivado;
    if (checkVibrar) checkVibrar.checked = estado.ajustes.vibracionActivada;
    if (checkKeypad) checkKeypad.checked = estado.ajustes.tecladoTactilGym !== false;
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
      localStorage.setItem(CLAVES_ALMACENAMIENTO.NOTAS_EJERCICIOS, JSON.stringify(estado.notasEjercicios));
      localStorage.setItem(CLAVES_ALMACENAMIENTO.VIDEOS_EJERCICIOS, JSON.stringify(estado.videosEjercicios));
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

    if (idPestana === 'tab-history') {
      try { dibujarEstadisticasGlobales(); } catch (e) {}
      try { dibujarRecords(); } catch (e) {}
      try { dibujarGraficoProgresion(); } catch (e) {}
    } else if (idPestana === 'tab-tools') {
      try { actualizarCalculadoraDiscos(); } catch (e) {}
      try { actualizarCalculadoraDescarga(); } catch (e) {}
      try { actualizarCalculadora1RM(); } catch (e) {}
      try { renderizarCatalogoBD(); } catch (e) {}
    }

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
      html += '    <div style="display:flex;gap:6px;align-items:center;">';
      html += '      <button class="btn-video-trigger" data-ex-idx="' + exIdx + '" data-ex-id="' + ex.id + '" title="Ver vídeo explicativo de la técnica sin salir de la app">🎬 Vídeo</button>';
      html += '      <button class="icon-btn plate-modal-trigger" data-ex-idx="' + exIdx + '" title="Calcular discos para este ejercicio">⚖️</button>';
      html += '    </div>';
      html += '  </div>';

      if (ex.indicaciones) {
        html += '<div class="exercise-notes-banner"><span>💡</span><div>' + ex.indicaciones + '</div></div>';
      }

      var exNota = (estado.notasEjercicios && estado.notasEjercicios[ex.id]) ? estado.notasEjercicios[ex.id] : '';
      html += '<div class="exercise-custom-note-wrap" data-ex-id="' + ex.id + '">';
      html += '  <div class="custom-note-display"' + (exNota ? ' style="display:flex;"' : ' style="display:none;"') + '>';
      html += '    <span class="custom-note-pin">📌 Mi ajuste:</span>';
      html += '    <span class="custom-note-text">' + exNota + '</span>';
      html += '    <button class="btn-note-edit" data-ex-id="' + ex.id + '" title="Editar ajuste">✎</button>';
      html += '  </div>';
      html += '  <div class="custom-note-input-wrap"' + (exNota ? ' style="display:none;"' : ' style="display:block;"') + '>';
      html += '    <input type="text" class="custom-note-input" data-ex-id="' + ex.id + '" placeholder="+ Añadir ajuste (ej. agujero 4, asiento posición 2...)" value="' + exNota + '">';
      html += '  </div>';
      html += '</div>';

      html += '<div class="backoff-helper-pill' + (pesoDescarga ? ' visible' : '') + '" data-ex-idx="' + exIdx + '" data-peso="' + (pesoDescarga || '') + '">';
      html += '  <span>📉 Descarga recomendada (−20 %): <strong>' + (pesoDescarga ? pesoDescarga + ' kg' : '') + '</strong></span>';
      html += '  <button class="apply-btn">Poner en Serie 2</button>';
      html += '</div>';

      html += '<div class="sets-table">';
      html += '  <div class="set-row-header"><span>SERIE</span><span style="text-align:left">TIPO / ANTERIOR</span><span>KG</span><span>REPETICIONES</span><span>LISTO</span></div>';

      for (var sIdx = 0; sIdx < ex.series.length; sIdx++) {
        var s = ex.series[sIdx];
        var textoAnterior = (s.pesoAnterior !== null && s.repeticionesAnteriores !== null) ? s.pesoAnterior + 'kg × ' + s.repeticionesAnteriores : '—';

        var onermEstHtml = '';
        if (s.peso && s.repeticiones) {
          var wVal = parseFloat(s.peso);
          var rVal = parseInt(s.repeticiones, 10);
          if (!isNaN(wVal) && wVal > 0 && !isNaN(rVal) && rVal > 0) {
            var est1rm = Math.round(wVal * (1 + rVal / 30) * 10) / 10;
            onermEstHtml = '<span class="live-onerm-badge">1RM: ' + est1rm + 'kg</span>';
          }
        }

        var esCopiable = (s.pesoAnterior !== null && s.repeticionesAnteriores !== null);
        var copyClass = esCopiable ? 'previous-hint copyable' : 'previous-hint';
        var copyTitle = esCopiable ? ' title="Toca para copiar peso y repeticiones de la sesión anterior (1 toque)"' : '';
        var copyBadge = esCopiable ? ' 📋' : '';

        var usarTecladoGym = !!(estado.ajustes && estado.ajustes.tecladoTactilGym !== false);
        var inputAttr = usarTecladoGym ? ' readonly inputmode="none"' : ' type="number" step="0.5"';
        var repsAttr = usarTecladoGym ? ' readonly inputmode="none"' : ' type="number" step="1"';
        var isWeightFocused = (keypadActivo.exIdx === exIdx && keypadActivo.sIdx === sIdx && keypadActivo.campo === 'peso');
        var isRepsFocused = (keypadActivo.exIdx === exIdx && keypadActivo.sIdx === sIdx && keypadActivo.campo === 'reps');

        html += '<div class="set-row' + (s.completada ? ' done' : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '">';
        html += '  <div class="set-index">' + s.numero + '</div>';
        html += '  <div class="set-badge-col">';
        html += '    <span class="set-tag ' + s.tipo + '">' + s.insignia + '</span>';
        html += '    <span class="' + copyClass + '"' + copyTitle + ' data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '">Ant: ' + textoAnterior + copyBadge + '</span>';
        if (onermEstHtml) html += '    ' + onermEstHtml;
        html += '  </div>';
        html += '  <div class="set-input-box"><input type="text" class="set-input weight-input' + (isWeightFocused ? ' active-gym-focus' : '') + '"' + inputAttr + ' placeholder="' + (s.pesoAnterior || '0') + '" value="' + (s.peso !== undefined ? s.peso : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '"></div>';
        html += '  <div class="set-input-box"><input type="text" class="set-input reps-input' + (isRepsFocused ? ' active-gym-focus' : '') + '"' + repsAttr + ' placeholder="' + (s.repeticionesObjetivo || '12') + '" value="' + (s.repeticiones !== undefined ? s.repeticiones : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + sIdx + '"></div>';
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

    // Atajo táctil: Copiar marca anterior con 1 solo toque
    var copyHints = contenedor.querySelectorAll('.previous-hint.copyable');
    for (var ch = 0; ch < copyHints.length; ch++) {
      (function(hint) {
        hint.addEventListener('click', function(e) {
          e.stopPropagation();
          var exIdx = parseInt(hint.dataset.exIdx, 10);
          var sIdx = parseInt(hint.dataset.setIdx, 10);
          copiarMarcaAnteriorSerie(exIdx, sIdx);
        });
      })(copyHints[ch]);
    }

    var inputsPeso = contenedor.querySelectorAll('.weight-input');
    for (var i = 0; i < inputsPeso.length; i++) {
      (function(input) {
        var exIdx = parseInt(input.dataset.exIdx, 10);
        var sIdx = parseInt(input.dataset.setIdx, 10);

        if (estado.ajustes.tecladoTactilGym !== false) {
          input.addEventListener('click', function(e) {
            e.preventDefault();
            abrirTecladoGym(exIdx, sIdx, 'peso');
          });
        }

        input.addEventListener('input', function() {
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
    for (var j = 0; j < inputsReps.length; j++) {
      (function(input) {
        var exIdx = parseInt(input.dataset.exIdx, 10);
        var sIdx = parseInt(input.dataset.setIdx, 10);

        if (estado.ajustes.tecladoTactilGym !== false) {
          input.addEventListener('click', function(e) {
            e.preventDefault();
            abrirTecladoGym(exIdx, sIdx, 'reps');
          });
        }

        input.addEventListener('input', function() {
          if (estado.entrenamientoActivo && estado.entrenamientoActivo.ejercicios[exIdx] && estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) {
            estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx].repeticiones = input.value;
            guardarDatos();
          }
        });
      })(inputsReps[j]);
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

    // Botones de vídeo explicativo
    var botonesVideo = contenedor.querySelectorAll('.btn-video-trigger');
    for (var v = 0; v < botonesVideo.length; v++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var exIdx = parseInt(btn.dataset.exIdx, 10);
          var ex = estado.entrenamientoActivo.ejercicios[exIdx];
          if (ex) {
            abrirModalVideo(ex.id, ex.nombre, ex.indicaciones);
          }
        });
      })(botonesVideo[v]);
    }

    // Eventos para notas de ejercicios
    var inputsNotas = contenedor.querySelectorAll('.custom-note-input');
    for (var n = 0; n < inputsNotas.length; n++) {
      (function(input) {
        var guardarNota = function() {
          var id = input.dataset.exId;
          var val = input.value.trim();
          estado.notasEjercicios[id] = val;
          guardarDatos();
          var wrap = input.closest('.exercise-custom-note-wrap');
          if (wrap) {
            var display = wrap.querySelector('.custom-note-display');
            var text = wrap.querySelector('.custom-note-text');
            var inputWrap = wrap.querySelector('.custom-note-input-wrap');
            if (val) {
              if (text) text.textContent = val;
              if (display) display.style.display = 'flex';
              if (inputWrap) inputWrap.style.display = 'none';
            }
          }
        };
        input.addEventListener('change', guardarNota);
        input.addEventListener('blur', guardarNota);
        input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            guardarNota();
            input.blur();
          }
        });
      })(inputsNotas[n]);
    }

    var botonesEditarNota = contenedor.querySelectorAll('.btn-note-edit');
    for (var b = 0; b < botonesEditarNota.length; b++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var wrap = btn.closest('.exercise-custom-note-wrap');
          if (wrap) {
            var display = wrap.querySelector('.custom-note-display');
            var inputWrap = wrap.querySelector('.custom-note-input-wrap');
            var input = wrap.querySelector('.custom-note-input');
            if (display) display.style.display = 'none';
            if (inputWrap) inputWrap.style.display = 'block';
            if (input) {
              input.focus();
              input.select();
            }
          }
        });
      })(botonesEditarNota[b]);
    }
  }

  // ===========================================================================
  // CONTROLADOR DEL TECLADO TÁCTIL DE GIMNASIO (CGM SMART KEYPAD)
  // Permite ingresar peso y reps con 1 toque o steppers sin abrir teclado del móvil
  // ===========================================================================

  function copiarMarcaAnteriorSerie(exIdx, sIdx) {
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[exIdx] || !estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) return;
    var s = estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx];
    if (s.pesoAnterior !== null && s.repeticionesAnteriores !== null) {
      s.peso = String(s.pesoAnterior);
      s.repeticiones = String(s.repeticionesAnteriores);
      keypadActivo.buffer = '';
      guardarDatos();
      dibujarEjerciciosActivos();
      vibrar([40, 20, 40]);
      audio.sonar(587.33, 'sine', 0.1);
      if (keypadActivo.exIdx === exIdx && keypadActivo.sIdx === sIdx) {
        actualizarPantallaTeclado();
      }
    }
  }

  function abrirTecladoGym(exIdx, sIdx, campo) {
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[exIdx] || !estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx]) return;
    var ex = estado.entrenamientoActivo.ejercicios[exIdx];
    var s = ex.series[sIdx];

    keypadActivo.exIdx = exIdx;
    keypadActivo.sIdx = sIdx;
    keypadActivo.buffer = '';

    var sheet = $('gymKeypadSheet');
    if (sheet) sheet.classList.add('open');

    var nameEl = $('keypadExName');
    if (nameEl) nameEl.textContent = ex.nombre;

    var badgeEl = $('keypadSetBadge');
    if (badgeEl) badgeEl.textContent = 'Serie ' + s.numero + (s.insignia ? ' (' + s.insignia + ')' : '');

    var prevEl = $('keypadPrevHint');
    if (prevEl) {
      if (s.pesoAnterior !== null && s.repeticionesAnteriores !== null) {
        prevEl.textContent = 'Ant: ' + s.pesoAnterior + 'k × ' + s.repeticionesAnteriores;
      } else {
        prevEl.textContent = 'Copiar';
      }
    }

    seleccionarCampoTeclado(campo || 'peso');

    // Scroll de la fila hacia una posición visible por encima de la barra inferior
    var setRow = document.querySelector('.set-row[data-ex-idx="' + exIdx + '"][data-set-idx="' + sIdx + '"]');
    if (setRow && typeof setRow.scrollIntoView === 'function') {
      try {
        setRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {}
    }
  }

  function cerrarTecladoGym() {
    confirmarBufferTeclado();
    keypadActivo.exIdx = null;
    keypadActivo.sIdx = null;
    keypadActivo.buffer = '';

    var sheet = $('gymKeypadSheet');
    if (sheet) sheet.classList.remove('open');
    removerResalteInputs();
  }

  function confirmarBufferTeclado() {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx] || !estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx]) return;
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];

    if (keypadActivo.buffer !== '') {
      if (keypadActivo.campo === 'peso') {
        s.peso = keypadActivo.buffer;
      } else {
        s.repeticiones = keypadActivo.buffer;
      }
      keypadActivo.buffer = '';
      guardarDatos();
    }
  }

  function seleccionarCampoTeclado(campo) {
    confirmarBufferTeclado();
    keypadActivo.campo = campo;
    keypadActivo.buffer = '';

    var tabWeight = $('keypadTabWeight');
    var tabReps = $('keypadTabReps');
    var steppersW = $('keypadWeightSteppers');
    var steppersR = $('keypadRepsSteppers');

    if (campo === 'peso') {
      if (tabWeight) tabWeight.classList.add('active');
      if (tabReps) tabReps.classList.remove('active');
      if (steppersW) steppersW.style.display = 'flex';
      if (steppersR) steppersR.style.display = 'none';
    } else {
      if (tabWeight) tabWeight.classList.remove('active');
      if (tabReps) tabReps.classList.add('active');
      if (steppersW) steppersW.style.display = 'none';
      if (steppersR) steppersR.style.display = 'flex';
    }

    actualizarPantallaTeclado();
    resaltarInputActivo();
  }

  function actualizarPantallaTeclado() {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    if (!estado.entrenamientoActivo || !estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx] || !estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx]) return;
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];

    var pesoAMostrar = '';
    if (keypadActivo.campo === 'peso' && keypadActivo.buffer !== '') {
      pesoAMostrar = keypadActivo.buffer;
    } else if (s.peso !== undefined && s.peso !== '') {
      pesoAMostrar = s.peso;
    } else if (s.pesoAnterior !== null && s.pesoAnterior !== undefined) {
      pesoAMostrar = s.pesoAnterior;
    } else {
      pesoAMostrar = '0';
    }

    var repsAMostrar = '';
    if (keypadActivo.campo === 'reps' && keypadActivo.buffer !== '') {
      repsAMostrar = keypadActivo.buffer;
    } else if (s.repeticiones !== undefined && s.repeticiones !== '') {
      repsAMostrar = s.repeticiones;
    } else if (s.repeticionesObjetivo) {
      repsAMostrar = s.repeticionesObjetivo;
    } else if (s.repeticionesAnteriores !== null && s.repeticionesAnteriores !== undefined) {
      repsAMostrar = s.repeticionesAnteriores;
    } else {
      repsAMostrar = '10';
    }

    var dispW = $('keypadDisplayWeight');
    if (dispW) dispW.textContent = String(pesoAMostrar);

    var dispR = $('keypadDisplayReps');
    if (dispR) dispR.textContent = String(repsAMostrar);

    // Actualizar visualmente los inputs en la tabla
    var wInput = document.querySelector('.weight-input[data-ex-idx="' + keypadActivo.exIdx + '"][data-set-idx="' + keypadActivo.sIdx + '"]');
    if (wInput) wInput.value = (s.peso !== undefined && s.peso !== null) ? s.peso : '';

    var rInput = document.querySelector('.reps-input[data-ex-idx="' + keypadActivo.exIdx + '"][data-set-idx="' + keypadActivo.sIdx + '"]');
    if (rInput) rInput.value = (s.repeticiones !== undefined && s.repeticiones !== null) ? s.repeticiones : '';
  }

  function aplicarDeltaPeso(delta) {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    confirmarBufferTeclado();
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];

    var base = parseFloat(s.peso);
    if (isNaN(base)) {
      base = parseFloat(s.pesoAnterior);
      if (isNaN(base)) base = 0;
    }

    var nuevo = Math.max(0, Math.round((base + delta) * 10) / 10);
    s.peso = String(nuevo);
    guardarDatos();
    actualizarPantallaTeclado();
    vibrar([25]);
  }

  function aplicarDeltaReps(delta) {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    confirmarBufferTeclado();
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];

    var base = parseInt(s.repeticiones, 10);
    if (isNaN(base)) {
      base = parseInt(s.repeticionesObjetivo, 10) || parseInt(s.repeticionesAnteriores, 10) || 10;
    }

    var nuevo = Math.max(1, base + delta);
    s.repeticiones = String(nuevo);
    guardarDatos();
    actualizarPantallaTeclado();
    vibrar([25]);
  }

  function aplicarPresetReps(val) {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    confirmarBufferTeclado();
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];
    s.repeticiones = String(val);
    guardarDatos();
    actualizarPantallaTeclado();
    vibrar([30]);
  }

  function presionarTeclaNumpad(tecla) {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    var s = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx].series[keypadActivo.sIdx];

    if (tecla === 'backspace') {
      if (keypadActivo.buffer.length > 0) {
        keypadActivo.buffer = keypadActivo.buffer.slice(0, -1);
      } else {
        if (keypadActivo.campo === 'peso') s.peso = '';
        else s.repeticiones = '';
      }
    } else if (tecla === '.') {
      if (keypadActivo.campo !== 'peso') return;
      if (keypadActivo.buffer === '') {
        keypadActivo.buffer = '0.';
      } else if (keypadActivo.buffer.indexOf('.') === -1) {
        keypadActivo.buffer += '.';
      }
    } else {
      if (keypadActivo.buffer === '' || keypadActivo.buffer === '0') {
        keypadActivo.buffer = String(tecla);
      } else if (keypadActivo.buffer.length < 5) {
        keypadActivo.buffer += String(tecla);
      }
    }

    if (keypadActivo.buffer !== '') {
      if (keypadActivo.campo === 'peso') s.peso = keypadActivo.buffer;
      else s.repeticiones = keypadActivo.buffer;
    }
    guardarDatos();
    actualizarPantallaTeclado();
    vibrar([15]);
  }

  function avanzarSiguienteCampoTeclado() {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    confirmarBufferTeclado();

    if (keypadActivo.campo === 'peso') {
      seleccionarCampoTeclado('reps');
      return;
    }

    var ex = estado.entrenamientoActivo.ejercicios[keypadActivo.exIdx];
    if (keypadActivo.sIdx + 1 < ex.series.length) {
      abrirTecladoGym(keypadActivo.exIdx, keypadActivo.sIdx + 1, 'peso');
    } else if (keypadActivo.exIdx + 1 < estado.entrenamientoActivo.ejercicios.length) {
      abrirTecladoGym(keypadActivo.exIdx + 1, 0, 'peso');
    } else {
      cerrarTecladoGym();
    }
  }

  function marcarSerieHechaDesdeTeclado() {
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    confirmarBufferTeclado();
    var exIdx = keypadActivo.exIdx;
    var sIdx = keypadActivo.sIdx;
    var s = estado.entrenamientoActivo.ejercicios[exIdx].series[sIdx];

    if (!s.completada) {
      alternarSerieCompletada(exIdx, sIdx);
    }

    var ex = estado.entrenamientoActivo.ejercicios[exIdx];
    if (sIdx + 1 < ex.series.length) {
      abrirTecladoGym(exIdx, sIdx + 1, 'peso');
    } else if (exIdx + 1 < estado.entrenamientoActivo.ejercicios.length) {
      abrirTecladoGym(exIdx + 1, 0, 'peso');
    } else {
      cerrarTecladoGym();
    }
  }

  function activarTecladoNativo() {
    var exIdx = keypadActivo.exIdx;
    var sIdx = keypadActivo.sIdx;
    var campo = keypadActivo.campo;
    cerrarTecladoGym();

    if (exIdx === null || sIdx === null) return;
    var selector = campo === 'peso' ? '.weight-input' : '.reps-input';
    var input = document.querySelector(selector + '[data-ex-idx="' + exIdx + '"][data-set-idx="' + sIdx + '"]');
    if (input) {
      input.removeAttribute('readonly');
      input.removeAttribute('inputmode');
      input.type = 'number';
      input.focus();
    }
  }

  function resaltarInputActivo() {
    removerResalteInputs();
    if (keypadActivo.exIdx === null || keypadActivo.sIdx === null) return;
    var selector = keypadActivo.campo === 'peso' ? '.weight-input' : '.reps-input';
    var input = document.querySelector(selector + '[data-ex-idx="' + keypadActivo.exIdx + '"][data-set-idx="' + keypadActivo.sIdx + '"]');
    if (input) {
      input.classList.add('active-gym-focus');
    }
  }

  function removerResalteInputs() {
    var focused = document.querySelectorAll('.active-gym-focus');
    for (var f = 0; f < focused.length; f++) {
      focused[f].classList.remove('active-gym-focus');
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
    dibujarEstadisticasGlobales();
    dibujarRecords();
    dibujarGraficoProgresion();
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
  // VÍDEOS EXPLICATIVOS DE TÉCNICA (GOOGLE DRIVE / YOUTUBE)
  // ===========================================================================
  var ejercicioVideoActualId = null;
  var videoActualData = {
    exId: null,
    nombre: '',
    matchBD: null,
    driveId: '',
    driveUrl: '',
    youtubeId: '',
    fuenteActiva: 'drive'
  };

  // Mapa de demostraciones técnicas activas para reproducción inmediata en la app
  var VIDEOS_DEMOSTRACION = {
    // DÍA 1: Espalda y Posterior
    'd1_e1': 'Jb_T2B5zQ5c', // Pull over en polea
    'd1_e2': 'eGo4IYlbE5g', // Dominadas
    'd1_e3': 'G8l_8chR5BE', // Remo con barra
    'd1_e4': 'CAwf7n6Luuc', // Jalón agarre cerrado
    'd1_e5': 'G8l_8chR5BE', // Remo Dorian
    'd1_e6': 'rep-qVOkqgk', // Posterior en máquina
    'd1_e7': 'G8l_8chR5BE', // Remo al mentón en polea

    // DÍA 2: Pecho y Hombro
    'd2_e1': '8iPEnn-ltC8', // Press inclinado
    'd2_e2': 'eozdVDA78K0', // Aperturas
    'd2_e3': 'LfyQBUKR8SE', // Press declinado
    'd2_e4': 'eozdVDA78K0', // Cruce de poleas
    'd2_e5': '3VcKaXpzqRo', // Elevaciones laterales
    'd2_e6': '2yjwXTZQDDI', // Press militar
    'd2_e7': '3VcKaXpzqRo', // Elevaciones frontales

    // DÍA 3: Pierna Completa
    'd3_e1': '1Tq3QdYUuHs', // Femoral tumbado
    'd3_e2': 'YyvSfVjQeL0', // Extensiones de cuádriceps
    'd3_e3': '0tn5K9NlCfo', // Sentadilla pendular / hack
    'd3_e4': 'IZxyjW7MPJQ', // Prensa
    'd3_e5': 'ELOCsoDSmrg', // Aductor
    'd3_e6': 'ELOCsoDSmrg', // Femoral sentado

    // DÍA 4: Brazos (Bíceps y Tríceps)
    'd4_e1': 'ykJmrZ5v0Oo', // Curl de bíceps con mancuernas
    'd4_e2': '2-LAMcpzODU', // Tríceps en polea con cuerda
    'd4_e3': 'fIWP-FRFNU0', // Curl de bíceps en banco Scott
    'd4_e4': '2-LAMcpzODU', // Tríceps tras nuca unilateral
    'd4_e5': 'zC3nLlEvin4', // Curl martillo
    'd4_e6': '2z8JmcrW-As', // Fondos

    // IDs del catálogo de 103 ejercicios
    'dominadas': 'eGo4IYlbE5g',
    'dominadas_asistidas': 'eGo4IYlbE5g',
    'pullover': 'Jb_T2B5zQ5c',
    'remo_con_barra': 'G8l_8chR5BE',
    'remo_con_barra_polea': 'G8l_8chR5BE',
    'remo_con_mancuerna': 'G8l_8chR5BE',
    'remo_gironda': 'CAwf7n6Luuc',
    'jalon_agarre_cerrado': 'CAwf7n6Luuc',
    'jalon_agarre_abierto': 'CAwf7n6Luuc',
    'jalon_agarre_neutro': 'CAwf7n6Luuc',
    'jalon_al_pecho_agarre_neutro': 'CAwf7n6Luuc',
    'jalon_al_pecho_agarre_v': 'CAwf7n6Luuc',
    'jalon_unilateral': 'CAwf7n6Luuc',
    'jalon_unilateral_en_polea': 'CAwf7n6Luuc',
    'facepull': 'rep-qVOkqgk',
    'pajaros_en_maquina': 'rep-qVOkqgk',
    'hombro_posterior_en_polea': 'rep-qVOkqgk',
    'hombro_posterior_mancuerna': 'rep-qVOkqgk',
    'press_militar_con_mancuerna': '2yjwXTZQDDI',
    'elevaciones_laterales': '3VcKaXpzqRo',
    'elevaciones_laterales_polea': '3VcKaXpzqRo',
    'elevaciones_laterales_sentado': '3VcKaXpzqRo',
    'elevaciones_laterales_apoyado_en_banco': '3VcKaXpzqRo',
    'elevaciones_laterales_en_maquina': '3VcKaXpzqRo',
    'elevaciones_laterales_en_polea': '3VcKaXpzqRo',
    'elevaciones_frontales': '3VcKaXpzqRo',
    'elevaciones_frontales_polea': '3VcKaXpzqRo',
    'elevaciones_frontales_apoyado_en_banco': '3VcKaXpzqRo',
    'press_banca': '8iPEnn-ltC8',
    'press_inclinado_en_maquina': '8iPEnn-ltC8',
    'press_inclinado_con_mancuerna': '8iPEnn-ltC8',
    'press_declinado': 'LfyQBUKR8SE',
    'press_con_mancuerna': '8iPEnn-ltC8',
    'press_plano_en_maquina': '8iPEnn-ltC8',
    'press_sentado_en_maquina': '8iPEnn-ltC8',
    'aperturas_con_mancuerna': 'eozdVDA78K0',
    'aperturas_en_maquina': 'eozdVDA78K0',
    'aperturas_con_mancuerna_banco_plano': 'eozdVDA78K0',
    'contractora': 'eozdVDA78K0',
    'cruces_en_polea_desde_abajo': 'eozdVDA78K0',
    'cruces_en_polea_desde_arriba': 'eozdVDA78K0',
    'flexiones': '2z8JmcrW-As',
    'prensa': 'IZxyjW7MPJQ',
    'prensa_horizontal': 'IZxyjW7MPJQ',
    'sentadilla_hack': '0tn5K9NlCfo',
    'sentadilla_multipower': '0tn5K9NlCfo',
    'sentadilla_bulgara_en_maquina_smith': '0tn5K9NlCfo',
    'sentadilla_profunda_pies_juntos': '0tn5K9NlCfo',
    'sentadilla_sumo': '0tn5K9NlCfo',
    'extension_de_cuadriceps': 'YyvSfVjQeL0',
    'femoral_tumbado': '1Tq3QdYUuHs',
    'femoral_tumbado_en_maquina': '1Tq3QdYUuHs',
    'femoral_sentado': 'ELOCsoDSmrg',
    'femoral_de_pie': '1Tq3QdYUuHs',
    'femoral_de_pie_en_maquina': '1Tq3QdYUuHs',
    'aductor_en_maquina': 'ELOCsoDSmrg',
    'aduccion_en_maquina': 'ELOCsoDSmrg',
    'gemelos_en_prensa': 'IZxyjW7MPJQ',
    'gemelos_en_maquina': 'IZxyjW7MPJQ',
    'gemelo_de_pie': 'IZxyjW7MPJQ',
    'gemelo_sentado': 'IZxyjW7MPJQ',
    'hip_thrust': '0tn5K9NlCfo',
    'peso_muerto_rumano_con_barra': 'G8l_8chR5BE',
    'peso_muerto_convencional': 'G8l_8chR5BE',
    'peso_muerto_con_barra': 'G8l_8chR5BE',
    'sldl': 'G8l_8chR5BE',
    'curl_biceps_mancuernas': 'ykJmrZ5v0Oo',
    'curl_biceps_alterno': 'ykJmrZ5v0Oo',
    'curl_biceps_barra_z': 'fIWP-FRFNU0',
    'curl_biceps_polea': 'ykJmrZ5v0Oo',
    'curl_biceps_polea_alta': 'ykJmrZ5v0Oo',
    'curl_concentrado': 'ykJmrZ5v0Oo',
    'curl_arana': 'fIWP-FRFNU0',
    'curl_bayesian_unilateral': 'ykJmrZ5v0Oo',
    'curl_martillo_mancuernas': 'zC3nLlEvin4',
    'fondos': '2z8JmcrW-As',
    'triceps_en_polea_con_cuerda': '2-LAMcpzODU',
    'triceps_en_polea_con_barra': '2-LAMcpzODU',
    'triceps_polea_unilateral': '2-LAMcpzODU',
    'press_frances': '2-LAMcpzODU',
    'press_frances_con_mancuerna': '2-LAMcpzODU',
    'press_frances_sobre_cabeza': '2-LAMcpzODU',
    'press_trasnuca': '2-LAMcpzODU',
    'press_trasnuca_con_mancuerna': '2-LAMcpzODU',
    'press_trasnuca_con_mancuerna_a_una_mano': '2-LAMcpzODU',
    'press_triceps_fuerza': '2-LAMcpzODU',
    'patada_de_triceps': '2-LAMcpzODU',
    'curl_antebrazo_barra_z': 'fIWP-FRFNU0',
    'extension_antebrazo_barra_z': 'fIWP-FRFNU0',
    'plancha_abdominal': 'eGo4IYlbE5g',
    'elevaciones_de_pierna': 'eGo4IYlbE5g',
    'elevaciones_de_rodillas': 'eGo4IYlbE5g',
    'crunch_abdominal': 'eGo4IYlbE5g',
    'crunch_abdominal_en_polea': 'eGo4IYlbE5g',
    'crunch_abdominal_declinado': 'eGo4IYlbE5g',
    'crunch_abdominal_en_banco_plano': 'eGo4IYlbE5g',
    'crunch_abdominal_en_maquina': 'eGo4IYlbE5g'
  };

  function normalizarUrlVideo(url) {
    if (!url) return '';
    url = url.trim();

    // 1. Google Drive: /file/d/FILE_ID/view o /open?id=FILE_ID
    var matchDrive = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchDrive && matchDrive[1]) {
      return 'https://drive.google.com/file/d/' + matchDrive[1] + '/preview';
    }
    var matchDriveId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchDriveId && matchDriveId[1]) {
      return 'https://drive.google.com/file/d/' + matchDriveId[1] + '/preview';
    }

    // 2. YouTube
    var matchYt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]+)/);
    if (matchYt && matchYt[1]) {
      return 'https://www.youtube-nocookie.com/embed/' + matchYt[1] + '?autoplay=1&rel=0&playsinline=1';
    }

    return url;
  }

  function abrirModalVideo(exId, exNombre, exIndicaciones) {
    ejercicioVideoActualId = exId;
    var modal = $('videoModal');
    var titulo = $('videoModalExerciseName');
    var notes = $('videoModalNotes');
    var tabDrive = $('btnTabDrive');
    var tabYt = $('btnTabYoutube');
    var btnDirect = $('btnOpenDriveDirect');
    if (!modal) return;

    // Buscar en la Base de Datos Maestra de 103 ejercicios
    var matchBD = (window.CGM_BASE_DATOS_EJERCICIOS && window.CGM_BASE_DATOS_EJERCICIOS.buscar) ?
      (window.CGM_BASE_DATOS_EJERCICIOS.buscar(exId) || window.CGM_BASE_DATOS_EJERCICIOS.buscar(exNombre)) : null;

    var nombreFinal = exNombre || (matchBD ? matchBD.nombre : 'Técnica del Ejercicio');
    var driveId = (matchBD && matchBD.driveId) ? matchBD.driveId : '';
    var driveUrl = (matchBD && matchBD.driveUrl) ? matchBD.driveUrl : (driveId ? ('https://drive.google.com/file/d/' + driveId + '/view') : '');
    var youtubeId = (matchBD && matchBD.youtubeId) ? matchBD.youtubeId : (VIDEOS_DEMOSTRACION[exId] || 'eGo4IYlbE5g');
    var esRehacer = matchBD ? (matchBD.estado === 'rehacer') : false;
    var tieneDrive = !!(driveId && !esRehacer);

    videoActualData.exId = exId;
    videoActualData.nombre = nombreFinal;
    videoActualData.matchBD = matchBD;
    videoActualData.driveId = driveId;
    videoActualData.driveUrl = driveUrl;
    videoActualData.youtubeId = youtubeId;

    if (titulo) titulo.textContent = nombreFinal;
    if (notes) {
      if (exIndicaciones) {
        notes.textContent = '💡 ' + exIndicaciones;
        notes.style.display = 'block';
      } else {
        notes.style.display = 'none';
      }
    }

    if (btnDirect) {
      if (tieneDrive && driveUrl) {
        btnDirect.href = driveUrl;
        btnDirect.style.display = 'inline-flex';
      } else {
        btnDirect.style.display = 'none';
      }
    }

    if (tieneDrive) {
      if (tabDrive) {
        tabDrive.classList.add('active');
        tabDrive.classList.remove('disabled');
      }
      if (tabYt) tabYt.classList.remove('active');
      reproducirVideoNativoDrive(driveId);
      videoActualData.fuenteActiva = 'drive';
    } else {
      if (tabDrive) {
        tabDrive.classList.remove('active');
        tabDrive.classList.add('disabled');
      }
      if (tabYt) tabYt.classList.add('active');
      reproducirVideoYoutube(youtubeId);
      videoActualData.fuenteActiva = 'youtube';
    }

    modal.classList.add('open');
  }

  function reproducirVideoNativoDrive(driveId) {
    var videoNative = $('videoNativePlayer');
    var iframe = $('videoIframe');
    if (!driveId) return;

    var urlDirecta = 'https://drive.usercontent.google.com/download?id=' + driveId + '&export=download';

    if (videoNative) {
      videoNative.style.display = 'block';
      videoNative.src = urlDirecta;
      videoNative.muted = true;
      videoNative.loop = true;
      videoNative.playsInline = true;
      videoNative.autoplay = true;

      videoNative.onerror = function() {
        console.warn('Fallback a iframe de Drive');
        videoNative.style.display = 'none';
        if (iframe) {
          iframe.src = 'https://drive.google.com/file/d/' + driveId + '/preview';
          iframe.style.display = 'block';
        }
      };

      try {
        var prom = videoNative.play();
        if (prom && typeof prom.catch === 'function') {
          prom.catch(function(e) {
            console.log('Autoplay silencioso:', e);
          });
        }
      } catch (err) {}
    }

    if (iframe) {
      iframe.style.display = 'none';
      iframe.src = '';
    }
  }

  function reproducirVideoYoutube(youtubeId) {
    var videoNative = $('videoNativePlayer');
    var iframe = $('videoIframe');

    if (videoNative) {
      videoNative.pause();
      videoNative.src = '';
      videoNative.style.display = 'none';
    }

    if (iframe) {
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + (youtubeId || 'eGo4IYlbE5g') + '?autoplay=1&controls=0&rel=0&playsinline=1&loop=1&playlist=' + (youtubeId || 'eGo4IYlbE5g');
      iframe.style.display = 'block';
    }
  }

  function cerrarModalVideo() {
    var modal = $('videoModal');
    var iframe = $('videoIframe');
    var videoNative = $('videoNativePlayer');

    if (videoNative) {
      videoNative.pause();
      videoNative.src = '';
    }
    if (iframe) iframe.src = '';
    if (modal) modal.classList.remove('open');
    ejercicioVideoActualId = null;
  }

  // ===========================================================================
  // CATÁLOGO MAESTRO DE EJERCICIOS Y VÍDEOS (HERRAMIENTAS)
  // ===========================================================================
  function renderizarCatalogoBD(filtroTexto, filtroGrupo) {
    var contenedor = $('dbExercisesList');
    if (!contenedor || !window.CGM_BASE_DATOS_EJERCICIOS) return;

    var lista = window.CGM_BASE_DATOS_EJERCICIOS.lista;
    var stats = window.CGM_BASE_DATOS_EJERCICIOS.estadisticas();

    var elTotal = $('dbTotalCount');
    var elReady = $('dbReadyCount');
    var elPending = $('dbPendingCount');
    if (elTotal) elTotal.textContent = stats.total;
    if (elReady) elReady.textContent = stats.disponibles;
    if (elPending) elPending.textContent = stats.rehacer;

    var busqueda = (filtroTexto || '').toLowerCase().trim();
    var grupo = filtroGrupo || ($('dbGroupFilter') ? $('dbGroupFilter').value : 'todos');

    var filtrados = lista.filter(function(item) {
      if (grupo !== 'todos' && item.grupo !== grupo) return false;
      if (busqueda) {
        var textoItem = (item.nombre + ' ' + item.grupo + ' ' + (item.archivo || '')).toLowerCase();
        if (textoItem.indexOf(busqueda) === -1) return false;
      }
      return true;
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">No se encontraron ejercicios con ese criterio.</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < filtrados.length; i++) {
      var ex = filtrados[i];
      var esRehacer = ex.estado === 'rehacer';
      var tieneDrive = !!(ex.driveId && !esRehacer);

      html += '<div class="db-exercise-item">';
      html += '  <div class="db-ex-info">';
      html += '    <div class="db-ex-name">' + ex.nombre + '</div>';
      html += '    <div class="db-ex-meta">';
      html += '      <span class="db-ex-group">' + ex.grupo + '</span>';
      if (tieneDrive) {
        html += '      <span class="db-ex-status disponible">🟢 Vídeo Carlos Graña</span>';
      } else {
        html += '      <span class="db-ex-status rehacer">⏳ Pendiente rehacer</span>';
      }
      html += '    </div>';
      html += '  </div>';
      html += '  <div style="display: flex; gap: 6px; align-items: center;">';
      if (tieneDrive && ex.driveUrl) {
        html += '    <a class="btn-ghost-sm" href="' + ex.driveUrl + '" target="_blank" rel="noopener noreferrer" title="Abrir en Google Drive" style="font-size: 10px; padding: 4px 7px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px;">↗️ Drive</a>';
      }
      html += '    <button class="btn-db-video" data-id="' + ex.id + '" data-name="' + ex.nombre.replace(/"/g, '&quot;') + '">🎬 Vídeo</button>';
      html += '  </div>';
      html += '</div>';
    }

    contenedor.innerHTML = html;

    var botones = contenedor.querySelectorAll('.btn-db-video');
    for (var b = 0; b < botones.length; b++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          abrirModalVideo(btn.dataset.id, btn.dataset.name, 'Ejercicio del catálogo maestro de Carlos Graña');
        });
      })(botones[b]);
    }
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

  function dibujarEstadisticasGlobales() {
    var elSesiones = $('statTotalWorkouts');
    var elTonelaje = $('statTotalTonnage');
    var elRacha = $('statStreakDays');
    if (!elSesiones || !elTonelaje || !elRacha) return;

    var sesiones = estado.historial.length;
    var volumenTotalKg = 0;
    var diasActivosUltimos30 = 0;
    var ahora = Date.now();
    var limite30Dias = ahora - (30 * 24 * 60 * 60 * 1000);
    var diasRegistrados = {};

    for (var i = 0; i < estado.historial.length; i++) {
      var item = estado.historial[i];
      if (item.volumenKg) volumenTotalKg += item.volumenKg;
      if (item.fecha) {
        var fechaTime = new Date(item.fecha).getTime();
        if (fechaTime >= limite30Dias) {
          var claveFecha = item.fecha.slice(0, 10);
          if (!diasRegistrados[claveFecha]) {
            diasRegistrados[claveFecha] = true;
            diasActivosUltimos30++;
          }
        }
      }
    }

    elSesiones.textContent = String(sesiones);

    if (volumenTotalKg >= 1000) {
      elTonelaje.textContent = (volumenTotalKg / 1000).toFixed(1) + ' t';
    } else {
      elTonelaje.textContent = Math.round(volumenTotalKg) + ' kg';
    }

    elRacha.textContent = diasActivosUltimos30 + ' d';
  }

  function poblarSelectorEjercicios() {
    var select = $('progressionExerciseSelect');
    if (!select || select.options.length > 0) return;

    var html = '';
    var diasClaves = Object.keys(DIAS_ENTRENAMIENTO);
    for (var d = 0; d < diasClaves.length; d++) {
      var dia = DIAS_ENTRENAMIENTO[diasClaves[d]];
      html += '<optgroup label="' + dia.titulo + ': ' + dia.nombre + '">';
      for (var e = 0; e < dia.ejercicios.length; e++) {
        var ex = dia.ejercicios[e];
        html += '<option value="' + ex.id + '">' + ex.nombre + '</option>';
      }
      html += '</optgroup>';
    }
    select.innerHTML = html;
  }

  function dibujarGraficoProgresion() {
    var select = $('progressionExerciseSelect');
    var contenedor = $('progressionChartContainer');
    var badgeGanancia = $('chartGainBadge');
    if (!contenedor) return;

    poblarSelectorEjercicios();
    var exId = select ? select.value : 'd1_e3';
    if (!exId && select && select.options.length > 0) {
      exId = select.options[0].value;
    }

    // Extraer puntos cronológicos (de más antiguo a más nuevo)
    var puntos = [];
    for (var i = estado.historial.length - 1; i >= 0; i--) {
      var sesion = estado.historial[i];
      if (!sesion.ejercicios) continue;
      for (var e = 0; e < sesion.ejercicios.length; e++) {
        var ex = sesion.ejercicios[e];
        if (ex.id === exId && Array.isArray(ex.series)) {
          var pesoMax = 0;
          var repsMax = 0;
          for (var s = 0; s < ex.series.length; s++) {
            var serie = ex.series[s];
            if (serie.completada && serie.peso) {
              var w = parseFloat(serie.peso);
              var r = parseInt(serie.repeticiones, 10) || 0;
              if (!isNaN(w) && w > pesoMax) {
                pesoMax = w;
                repsMax = r;
              }
            }
          }
          if (pesoMax > 0) {
            var fechaObj = new Date(sesion.fecha);
            var fechaCorta = fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
            puntos.push({
              fecha: fechaCorta,
              peso: pesoMax,
              reps: repsMax
            });
          }
        }
      }
    }

    if (puntos.length === 0) {
      if (badgeGanancia) {
        badgeGanancia.textContent = 'Sin datos';
        badgeGanancia.style.color = 'var(--text-muted)';
      }
      contenedor.innerHTML = '<div class="chart-empty-state"><span style="font-size: 28px; margin-bottom: 8px;">📊</span><strong>Sin registros todavía para este ejercicio</strong><span>Completa tu primer entrenamiento y aquí se dibujará automáticamente tu curva de sobrecarga progresiva.</span></div>';
      return;
    }

    // Calcular ganancia
    var primero = puntos[0].peso;
    var ultimo = puntos[puntos.length - 1].peso;
    var diff = Math.round((ultimo - primero) * 10) / 10;
    if (badgeGanancia) {
      if (diff > 0) {
        var pct = primero > 0 ? Math.round((diff / primero) * 100) : 0;
        badgeGanancia.textContent = '+' + diff + ' kg (+' + pct + '%)';
        badgeGanancia.style.color = 'var(--gold-light)';
      } else if (diff === 0) {
        badgeGanancia.textContent = 'Manteniendo ' + ultimo + ' kg';
        badgeGanancia.style.color = 'var(--text-main)';
      } else {
        badgeGanancia.textContent = diff + ' kg';
        badgeGanancia.style.color = 'var(--danger)';
      }
    }

    if (puntos.length === 1) {
      contenedor.innerHTML = '<div class="chart-empty-state"><span style="font-size: 28px; margin-bottom: 8px;">🎯</span><strong style="color:var(--gold-light);font-size:16px;">Primera marca: ' + puntos[0].peso + ' kg (' + puntos[0].fecha + ')</strong><span>¡Buen trabajo! En cuanto registres tu siguiente sesión se trazará la línea de evolución.</span></div>';
      return;
    }

    // Dibujar SVG
    var svgWidth = 320;
    var svgHeight = 150;
    var padLeft = 38;
    var padRight = 24;
    var padTop = 26;
    var padBottom = 26;
    var wPlot = svgWidth - padLeft - padRight;
    var hPlot = svgHeight - padTop - padBottom;

    var minW = Infinity;
    var maxW = -Infinity;
    for (var p = 0; p < puntos.length; p++) {
      if (puntos[p].peso < minW) minW = puntos[p].peso;
      if (puntos[p].peso > maxW) maxW = puntos[p].peso;
    }

    if (minW === maxW) {
      minW = Math.max(0, minW - 5);
      maxW = maxW + 5;
    } else {
      var margen = (maxW - minW) * 0.15;
      minW = Math.max(0, minW - margen);
      maxW = maxW + margen;
    }

    var coordenadas = [];
    for (var i = 0; i < puntos.length; i++) {
      var x = padLeft + (i / (puntos.length - 1)) * wPlot;
      var y = padTop + hPlot - ((puntos[i].peso - minW) / (maxW - minW)) * hPlot;
      coordenadas.push({ x: x, y: y, peso: puntos[i].peso, fecha: puntos[i].fecha, reps: puntos[i].reps });
    }

    var pathLine = '';
    for (var c = 0; c < coordenadas.length; c++) {
      pathLine += (c === 0 ? 'M ' : 'L ') + coordenadas[c].x.toFixed(1) + ' ' + coordenadas[c].y.toFixed(1) + ' ';
    }

    var areaLine = pathLine + 'L ' + coordenadas[coordenadas.length - 1].x.toFixed(1) + ' ' + (padTop + hPlot) + ' L ' + coordenadas[0].x.toFixed(1) + ' ' + (padTop + hPlot) + ' Z';

    var svg = '<svg class="progression-svg" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '">';
    svg += '<defs>';
    svg += '  <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">';
    svg += '    <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>';
    svg += '    <stop offset="100%" stop-color="#d4af37" stop-opacity="0.0"/>';
    svg += '  </linearGradient>';
    svg += '</defs>';

    // Líneas horizontales de guía (rejilla)
    var niveles = 3;
    for (var n = 0; n <= niveles; n++) {
      var yGrid = padTop + (n / niveles) * hPlot;
      var valorGrid = Math.round(maxW - (n / niveles) * (maxW - minW));
      svg += '<line x1="' + padLeft + '" y1="' + yGrid + '" x2="' + (padLeft + wPlot) + '" y2="' + yGrid + '" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>';
      svg += '<text x="' + (padLeft - 6) + '" y="' + (yGrid + 3) + '" fill="rgba(255,255,255,0.4)" font-size="9" text-anchor="end">' + valorGrid + '</text>';
    }

    // Relleno sombreado
    svg += '<path d="' + areaLine + '" fill="url(#goldAreaGrad)"/>';

    // Línea dorada de evolución
    svg += '<path d="' + pathLine + '" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';

    // Puntos y etiquetas
    for (var k = 0; k < coordenadas.length; k++) {
      var pt = coordenadas[k];
      svg += '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="4.5" fill="#f3e5ab" stroke="#0a0c10" stroke-width="2"/>';
      svg += '<text x="' + pt.x.toFixed(1) + '" y="' + (pt.y - 8).toFixed(1) + '" fill="#fff" font-size="10" font-weight="800" text-anchor="middle">' + pt.peso + '</text>';
      svg += '<text x="' + pt.x.toFixed(1) + '" y="' + (padTop + hPlot + 16) + '" fill="rgba(255,255,255,0.5)" font-size="9" text-anchor="middle">' + pt.fecha + '</text>';
    }

    svg += '</svg>';
    contenedor.innerHTML = svg;
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

  function actualizarCalculadora1RM() {
    var inputPeso = $('onermWeightInput');
    var inputReps = $('onermRepsInput');
    var resultEl = $('onermEstimatedValue');
    var gridEl = $('onermPercentagesGrid');
    if (!inputPeso || !inputReps || !resultEl || !gridEl) return;

    var peso = parseFloat(inputPeso.value) || 0;
    var reps = parseInt(inputReps.value, 10) || 1;

    if (peso <= 0 || reps <= 0) {
      resultEl.textContent = '0 kg';
      gridEl.innerHTML = '';
      return;
    }

    // Fórmulas estándar de Epley y Brzycki
    var epley = peso * (1 + reps / 30);
    var brzycki = reps < 37 ? (peso / (1.0278 - 0.0278 * reps)) : epley;
    var estimacion = reps === 1 ? peso : ((epley + brzycki) / 2);
    var onermFinal = Math.round(estimacion * 10) / 10;

    resultEl.textContent = onermFinal.toFixed(1) + ' kg';

    var porcentajes = [
      { pct: 100, reps: '1 rep', desc: 'Fuerza Máxima (1RM)' },
      { pct: 95, reps: '2 reps', desc: 'Fuerza Pico' },
      { pct: 90, reps: '3-4 reps', desc: 'Serie Pesada CGM' },
      { pct: 85, reps: '5-6 reps', desc: 'Fuerza-Hipertrofia' },
      { pct: 80, reps: '8-10 reps', desc: 'Serie Descarga (-20%)' },
      { pct: 75, reps: '10-12 reps', desc: 'Hipertrofia Clásica' },
      { pct: 70, reps: '12-15 reps', desc: 'Resistencia y Bombeo' },
      { pct: 65, reps: '15-20 reps', desc: 'Capilarización' }
    ];

    var html = '';
    for (var i = 0; i < porcentajes.length; i++) {
      var item = porcentajes[i];
      var pesoPct = Math.round((onermFinal * (item.pct / 100)) / 2.5) * 2.5;
      html += '<div class="onerm-row">';
      html += '  <div><span class="onerm-row-pct">' + item.pct + '%</span> <span class="onerm-row-target">(' + item.reps + ')</span></div>';
      html += '  <div class="onerm-row-weight">' + pesoPct + ' kg</div>';
      html += '</div>';
    }
    gridEl.innerHTML = html;
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

    // Modal de vídeo explicativo
    escuchar($('closeVideoModalBtn'), 'click', cerrarModalVideo);
    escuchar($('closeVideoModalFooterBtn'), 'click', cerrarModalVideo);
    escuchar($('videoModal'), 'click', function(e) {
      if (e.target === $('videoModal')) cerrarModalVideo();
    });

    // Pestañas selectoras de reproductor de vídeo
    escuchar($('btnTabDrive'), 'click', function() {
      if (!videoActualData.driveId) return;
      var tabDrive = $('btnTabDrive');
      var tabYt = $('btnTabYoutube');
      if (tabDrive) tabDrive.classList.add('active');
      if (tabYt) tabYt.classList.remove('active');
      reproducirVideoNativoDrive(videoActualData.driveId);
      videoActualData.fuenteActiva = 'drive';
    });

    escuchar($('btnTabYoutube'), 'click', function() {
      var tabDrive = $('btnTabDrive');
      var tabYt = $('btnTabYoutube');
      if (tabYt) tabYt.classList.add('active');
      if (tabDrive) tabDrive.classList.remove('active');
      var ytId = videoActualData.youtubeId || 'eGo4IYlbE5g';
      reproducirVideoYoutube(ytId);
      videoActualData.fuenteActiva = 'youtube';
    });

    // Toque sobre el vídeo para pausar o continuar sin botones molestos en pantalla
    var videoNative = $('videoNativePlayer');
    if (videoNative) {
      videoNative.addEventListener('click', function() {
        if (videoNative.paused) {
          videoNative.play();
        } else {
          videoNative.pause();
        }
      });
    }

    // Calculadoras
    escuchar($('calcTargetWeight'), 'input', actualizarCalculadoraDiscos);
    escuchar($('calcBarWeight'), 'change', actualizarCalculadoraDiscos);
    escuchar($('topSetInput'), 'input', actualizarCalculadoraDescarga);
    escuchar($('onermWeightInput'), 'input', actualizarCalculadora1RM);
    escuchar($('onermRepsInput'), 'input', actualizarCalculadora1RM);
    escuchar($('progressionExerciseSelect'), 'change', dibujarGraficoProgresion);

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

    escuchar($('settingGymKeypad'), 'change', function(e) {
      estado.ajustes.tecladoTactilGym = e.target.checked;
      guardarDatos();
      dibujarEjerciciosActivos();
    });

    // =========================================================================
    // EVENTOS DEL TECLADO TÁCTIL DE GIMNASIO (SMART KEYPAD)
    // =========================================================================
    escuchar($('closeKeypadBtn'), 'click', cerrarTecladoGym);
    escuchar($('gymKeypadBackdrop'), 'click', cerrarTecladoGym);

    escuchar($('keypadTabWeight'), 'click', function() {
      seleccionarCampoTeclado('peso');
    });

    escuchar($('keypadTabReps'), 'click', function() {
      seleccionarCampoTeclado('reps');
    });

    escuchar($('keypadCopyPrevBtn'), 'click', function() {
      if (keypadActivo.exIdx !== null && keypadActivo.sIdx !== null) {
        copiarMarcaAnteriorSerie(keypadActivo.exIdx, keypadActivo.sIdx);
      }
    });

    escuchar($('keypadNextFieldBtn'), 'click', avanzarSiguienteCampoTeclado);
    escuchar($('keypadDoneSetBtn'), 'click', marcarSerieHechaDesdeTeclado);
    escuchar($('keypadNativeKeyboardBtn'), 'click', activarTecladoNativo);

    // Steppers de peso (-10, -5, -2.5, -1, +1, +2.5, +5, +10)
    var weightSteps = document.querySelectorAll('#keypadWeightSteppers .keypad-step-btn');
    for (var ws = 0; ws < weightSteps.length; ws++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var delta = parseFloat(btn.dataset.delta);
          if (!isNaN(delta)) aplicarDeltaPeso(delta);
        });
      })(weightSteps[ws]);
    }

    // Steppers de repeticiones (+/-)
    var repsSteps = document.querySelectorAll('#keypadRepsSteppers .keypad-step-btn');
    for (var rs = 0; rs < repsSteps.length; rs++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var delta = parseInt(btn.dataset.repDelta, 10);
          if (!isNaN(delta)) aplicarDeltaReps(delta);
        });
      })(repsSteps[rs]);
    }

    // Presets de repeticiones (6, 8, 10, 12, 15)
    var repsPresets = document.querySelectorAll('#keypadRepsSteppers .keypad-preset-rep');
    for (var rp = 0; rp < repsPresets.length; rp++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var val = parseInt(btn.dataset.repSet, 10);
          if (!isNaN(val)) aplicarPresetReps(val);
        });
      })(repsPresets[rp]);
    }

    // Teclas del numpad (1 a 9, 0, ., ⌫)
    var numpadKeys = document.querySelectorAll('.gym-numpad-grid .numpad-key');
    for (var nk = 0; nk < numpadKeys.length; nk++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var k = btn.dataset.key;
          if (k) presionarTeclaNumpad(k);
        });
      })(numpadKeys[nk]);
    }

    // Catálogo Maestro de Ejercicios
    escuchar($('dbSearchInput'), 'input', function(e) {
      var grupo = $('dbGroupFilter') ? $('dbGroupFilter').value : 'todos';
      renderizarCatalogoBD(e.target.value, grupo);
    });

    escuchar($('dbGroupFilter'), 'change', function(e) {
      var txt = $('dbSearchInput') ? $('dbSearchInput').value : '';
      renderizarCatalogoBD(txt, e.target.value);
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
      navigator.serviceWorker.register('./sw.js?v=6').then(function(reg) {
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
