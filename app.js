// CGM PERFORMANCE · APPLICATION CONTROLLER
// Rutina Frecuencia 1,5 · Carlos Graña
// Wrapped in IIFE to avoid scope collisions with routine-data.js

(function() {
  'use strict';

  // Leer datos de rutina desde el global que routine-data.js expone
  var _data = window.CGM_DATA || {};
  var ROUTINE_INFO = _data.ROUTINE_INFO;
  var SCHEDULE_WEEKS = _data.SCHEDULE_WEEKS || [];
  var WORKOUT_DAYS = _data.WORKOUT_DAYS || {};

  // ===========================================================================
  // ESTADO GLOBAL & PERSISTENCIA (LOCALSTORAGE)
  // ===========================================================================
  var STORAGE_KEYS = {
    ACTIVE_WORKOUT: 'cgm_active_workout',
    HISTORY: 'cgm_workout_history',
    PRS: 'cgm_personal_records',
    SETTINGS: 'cgm_user_settings',
    SELECTED_WEEK: 'cgm_selected_week'
  };

  var DEFAULT_SETTINGS = {
    soundEnabled: true,
    vibrateEnabled: true,
    defaultRestSeconds: 90,
    wakeLockEnabled: true
  };

  var appState = {
    currentWeek: 1,
    activeWorkout: null,
    history: [],
    prs: {},
    settings: assign({}, DEFAULT_SETTINGS),
    restTimer: {
      duration: 90,
      remaining: 90,
      intervalId: null,
      isRunning: false
    },
    workoutTimerInterval: null,
    wakeLockSentinel: null,
    deferredPwaPrompt: null
  };

  // Simple polyfill for Object.assign
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)) target[key] = src[key];
        }
      }
    }
    return target;
  }

  // Safe getElementById helper
  function $(id) {
    return document.getElementById(id);
  }

  // Safe addEventListener helper
  function on(el, event, fn) {
    if (el) el.addEventListener(event, fn);
  }

  // ===========================================================================
  // WEB AUDIO API (SONIDOS OFFLINE)
  // ===========================================================================
  var sounds = {
    ctx: null,
    init: function() {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
    },
    playBeep: function(freq, type, duration) {
      if (!appState.settings.soundEnabled) return;
      freq = freq || 880;
      type = type || 'sine';
      duration = duration || 0.15;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) { /* ignore */ }
    },
    playSetComplete: function() {
      var self = this;
      self.playBeep(523.25, 'triangle', 0.1);
      setTimeout(function() { self.playBeep(659.25, 'triangle', 0.15); }, 100);
    },
    playTimerFinish: function() {
      var self = this;
      self.playBeep(880, 'sine', 0.15);
      setTimeout(function() { self.playBeep(880, 'sine', 0.15); }, 180);
      setTimeout(function() { self.playBeep(1174.66, 'sine', 0.35); }, 360);
    }
  };

  // ===========================================================================
  // HAPTICS
  // ===========================================================================
  function triggerHaptic(pattern) {
    pattern = pattern || [60];
    if (appState.settings.vibrateEnabled && 'vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) { /* ignore */ }
    }
  }

  // ===========================================================================
  // WAKE LOCK
  // ===========================================================================
  function toggleWakeLock(enable) {
    if (!('wakeLock' in navigator)) return;
    try {
      if (enable && !appState.wakeLockSentinel) {
        navigator.wakeLock.request('screen').then(function(sentinel) {
          appState.wakeLockSentinel = sentinel;
          var btn = $('wakeLockBtn');
          if (btn) btn.classList.add('active');
          sentinel.addEventListener('release', function() {
            appState.wakeLockSentinel = null;
            if (btn) btn.classList.remove('active');
          });
        }).catch(function() {});
      } else if (!enable && appState.wakeLockSentinel) {
        appState.wakeLockSentinel.release().catch(function() {});
        appState.wakeLockSentinel = null;
        var btn = $('wakeLockBtn');
        if (btn) btn.classList.remove('active');
      }
    } catch (err) { /* ignore */ }
  }

  // ===========================================================================
  // INICIALIZACIÓN
  // ===========================================================================
  document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    setupEventListeners();
    setupPWA();
    determineTodaySchedule();
    renderScheduleWeek(appState.currentWeek);
    renderHistory();
    renderPRs();
    updatePlateCalculator();
    updateQuickBackOff();

    if (appState.activeWorkout) {
      resumeActiveWorkout();
    }
  });

  function loadStoredData() {
    try {
      var h = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (h) appState.history = JSON.parse(h);
      var p = localStorage.getItem(STORAGE_KEYS.PRS);
      if (p) appState.prs = JSON.parse(p);
      var s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (s) appState.settings = assign({}, DEFAULT_SETTINGS, JSON.parse(s));
      var a = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      if (a) appState.activeWorkout = JSON.parse(a);
      var w = localStorage.getItem(STORAGE_KEYS.SELECTED_WEEK);
      if (w) appState.currentWeek = parseInt(w, 10);
    } catch (e) {
      console.error('Error cargando datos:', e);
    }

    var soundCheck = $('settingSound');
    var vibrateCheck = $('settingVibrate');
    var defaultRestSelect = $('settingDefaultRest');
    var soundBtn = $('soundToggleBtn');

    if (soundCheck) soundCheck.checked = appState.settings.soundEnabled;
    if (vibrateCheck) vibrateCheck.checked = appState.settings.vibrateEnabled;
    if (defaultRestSelect) defaultRestSelect.value = String(appState.settings.defaultRestSeconds);
    if (soundBtn) {
      soundBtn.classList.toggle('active', appState.settings.soundEnabled);
      soundBtn.textContent = appState.settings.soundEnabled ? '🔔' : '🔕';
    }
  }

  function saveAppState() {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(appState.history));
      localStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(appState.prs));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(appState.settings));
      localStorage.setItem(STORAGE_KEYS.SELECTED_WEEK, String(appState.currentWeek));
      if (appState.activeWorkout) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(appState.activeWorkout));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      }
    } catch (e) {
      console.error('Error guardando datos:', e);
    }
  }

  // ===========================================================================
  // NAVEGACIÓN TABS
  // ===========================================================================
  function switchTab(tabId) {
    var views = document.querySelectorAll('.tab-view');
    for (var i = 0; i < views.length; i++) views[i].classList.remove('active');
    var navs = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navs.length; i++) navs[i].classList.remove('active');

    var target = $(tabId);
    if (target) target.classList.add('active');
    var navItem = document.querySelector('.nav-item[data-tab="' + tabId + '"]');
    if (navItem) navItem.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===========================================================================
  // CALENDARIO FRECUENCIA 1,5 & PLAN DE HOY
  // ===========================================================================
  function determineTodaySchedule() {
    var date = new Date();
    var dayOfWeek = date.getDay();
    var options = { weekday: 'long', day: 'numeric', month: 'short' };
    var dateStr = date.toLocaleDateString('es-ES', options);

    var dateBadge = $('currentDateBadge');
    if (dateBadge) dateBadge.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    var currentWeekData = null;
    for (var i = 0; i < SCHEDULE_WEEKS.length; i++) {
      if (SCHEDULE_WEEKS[i].week === appState.currentWeek) {
        currentWeekData = SCHEDULE_WEEKS[i];
        break;
      }
    }
    if (!currentWeekData) currentWeekData = SCHEDULE_WEEKS[0];

    var daySchedule = null;
    for (var i = 0; i < currentWeekData.days.length; i++) {
      if (currentWeekData.days[i].dayIndex === dayOfWeek) {
        daySchedule = currentWeekData.days[i];
        break;
      }
    }

    var titleEl = $('todayWorkoutTitle');
    var descEl = $('todayWorkoutDesc');
    var startBtn = $('startTodayWorkoutBtn');

    if (daySchedule && !daySchedule.isRest && daySchedule.workoutId) {
      var workout = WORKOUT_DAYS[daySchedule.workoutId];
      if (titleEl) titleEl.textContent = daySchedule.workoutName + ' · ' + (workout ? workout.name : '');
      if (descEl) descEl.textContent = workout ? workout.description : 'Sesión programada para hoy.';
      if (startBtn) {
        startBtn.dataset.workoutId = daySchedule.workoutId;
        startBtn.disabled = false;
        startBtn.innerHTML = '<span>▶</span> Empezar ' + daySchedule.workoutId + ' (' + (workout ? workout.name : '') + ')';
      }
    } else {
      if (titleEl) titleEl.textContent = "Día de Descanso Programado";
      if (descEl) descEl.textContent = "Recuperación muscular y recarga de glucógeno. También puedes adelantar o elegir otra sesión abajo.";
      if (startBtn) {
        startBtn.dataset.workoutId = "D1";
        startBtn.innerHTML = '<span>▶</span> Elegir un entrenamiento';
      }
    }
  }

  function renderScheduleWeek(weekNumber) {
    appState.currentWeek = weekNumber;
    saveAppState();

    var pills = document.querySelectorAll('.week-pill');
    for (var i = 0; i < pills.length; i++) {
      var w = parseInt(pills[i].dataset.week, 10);
      pills[i].classList.toggle('active', w === weekNumber);
    }

    var weekData = null;
    for (var i = 0; i < SCHEDULE_WEEKS.length; i++) {
      if (SCHEDULE_WEEKS[i].week === weekNumber) {
        weekData = SCHEDULE_WEEKS[i];
        break;
      }
    }
    if (!weekData) return;

    var grid = $('scheduleGrid');
    if (!grid) return;

    var todayIndex = new Date().getDay();
    var html = '';

    for (var i = 0; i < weekData.days.length; i++) {
      var d = weekData.days[i];
      var isToday = d.dayIndex === todayIndex;
      var isRest = d.isRest;
      var cardClass = 'schedule-day-card' + (isToday ? ' today' : '') + (isRest ? ' rest' : '');

      html += '<div class="' + cardClass + '" data-workout-id="' + (d.workoutId || '') + '" data-is-rest="' + isRest + '">';
      html += '  <div class="schedule-day-left">';
      html += '    <span class="day-tag">' + d.day.substring(0, 3) + '</span>';
      html += '    <div class="day-routine-name">' + d.workoutName;
      if (d.isRepeated) html += ' <span class="repeat-badge">REPETICIÓN</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <div class="day-badge-action">';
      html += isRest ? '<span>💤 Descanso</span>' : '<span>Entrenar ➔</span>';
      html += '  </div>';
      html += '</div>';
    }
    grid.innerHTML = html;

    var cards = grid.querySelectorAll('.schedule-day-card');
    for (var i = 0; i < cards.length; i++) {
      (function(card) {
        card.addEventListener('click', function() {
          var workoutId = card.dataset.workoutId;
          var isRest = card.dataset.isRest === 'true';
          if (!isRest && workoutId) startWorkout(workoutId);
        });
      })(cards[i]);
    }

    determineTodaySchedule();
  }

  // ===========================================================================
  // MOTOR DE ENTRENO ACTIVO
  // ===========================================================================
  function startWorkout(workoutId) {
    var template = WORKOUT_DAYS[workoutId];
    if (!template) return;

    if (appState.activeWorkout && appState.activeWorkout.workoutId !== workoutId) {
      if (!confirm('Tienes una sesión de ' + appState.activeWorkout.title + ' en curso. ¿Deseas descartarla e iniciar ' + template.title + '?')) return;
    }

    var previousSession = null;
    for (var i = 0; i < appState.history.length; i++) {
      if (appState.history[i].workoutId === workoutId) {
        previousSession = appState.history[i];
        break;
      }
    }

    var exercises = [];
    for (var ei = 0; ei < template.exercises.length; ei++) {
      var ex = template.exercises[ei];
      var prevEx = null;
      if (previousSession) {
        for (var j = 0; j < previousSession.exercises.length; j++) {
          if (previousSession.exercises[j].id === ex.id) {
            prevEx = previousSession.exercises[j];
            break;
          }
        }
      }

      var sets = [];
      for (var si = 0; si < ex.sets.length; si++) {
        var s = ex.sets[si];
        var prevSet = (prevEx && prevEx.sets && prevEx.sets[si]) ? prevEx.sets[si] : null;
        sets.push({
          index: si + 1,
          type: s.type,
          badge: s.badge || 'SERIE',
          label: s.label,
          helper: s.helper || '',
          targetReps: s.targetReps,
          weight: prevSet ? prevSet.weight : '',
          reps: prevSet ? prevSet.reps : (typeof s.targetReps === 'number' ? s.targetReps : ''),
          completed: false,
          prevWeight: prevSet ? prevSet.weight : null,
          prevReps: prevSet ? prevSet.reps : null
        });
      }

      exercises.push({
        id: ex.id,
        name: ex.name,
        notes: ex.notes,
        hasBackOffCalculation: ex.hasBackOffCalculation || false,
        sets: sets
      });
    }

    appState.activeWorkout = {
      workoutId: template.id,
      title: template.title + ': ' + template.name,
      category: template.category,
      startTime: Date.now(),
      exercises: exercises
    };

    saveAppState();
    resumeActiveWorkout();
    switchTab('tab-workout');
    toggleWakeLock(true);
  }

  function resumeActiveWorkout() {
    if (!appState.activeWorkout) return;
    $('noActiveWorkoutView').style.display = 'none';
    $('activeWorkoutContent').style.display = 'block';
    $('activeWorkoutName').textContent = appState.activeWorkout.title;
    $('activeWorkoutSubtitle').textContent = appState.activeWorkout.category + ' · CGM Performance';
    renderActiveExercises();
    startWorkoutElapsedTimer();
    updateWorkoutProgress();
  }

  function startWorkoutElapsedTimer() {
    if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);
    var timerEl = $('workoutElapsedTimer');

    function updateElapsed() {
      if (!appState.activeWorkout) return;
      var elapsed = Math.floor((Date.now() - appState.activeWorkout.startTime) / 1000);
      var mins = Math.floor(elapsed / 60);
      var secs = elapsed % 60;
      if (timerEl) timerEl.textContent = pad(mins) + ':' + pad(secs);
    }
    updateElapsed();
    appState.workoutTimerInterval = setInterval(updateElapsed, 1000);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function renderActiveExercises() {
    var container = $('exercisesContainer');
    if (!container || !appState.activeWorkout) return;

    var html = '';
    var exs = appState.activeWorkout.exercises;

    for (var exIdx = 0; exIdx < exs.length; exIdx++) {
      var ex = exs[exIdx];
      var allDone = true;
      for (var k = 0; k < ex.sets.length; k++) {
        if (!ex.sets[k].completed) { allDone = false; break; }
      }

      var backoffWeight = null;
      if (ex.hasBackOffCalculation && ex.sets[0] && ex.sets[0].weight) {
        var topW = parseFloat(ex.sets[0].weight);
        if (!isNaN(topW) && topW > 0) {
          var raw = topW * 0.8;
          backoffWeight = '' + (Math.round(raw / 2.5) * 2.5);
        }
      }

      html += '<div class="exercise-card' + (allDone ? ' completed' : '') + '" data-ex-idx="' + exIdx + '">';
      html += '  <div class="exercise-header">';
      html += '    <div class="exercise-title-group">';
      html += '      <span class="exercise-number">EJERCICIO ' + (exIdx + 1) + ' DE ' + exs.length + '</span>';
      html += '      <h3 class="exercise-name">' + ex.name + '</h3>';
      html += '    </div>';
      html += '    <button class="icon-btn plate-modal-trigger" data-ex-idx="' + exIdx + '" title="Calcular discos">⚖️</button>';
      html += '  </div>';

      if (ex.notes) {
        html += '<div class="exercise-notes-banner"><span>💡</span><div>' + ex.notes + '</div></div>';
      }

      if (backoffWeight) {
        html += '<div class="backoff-helper-pill visible" data-ex-idx="' + exIdx + '" data-weight="' + backoffWeight + '">';
        html += '  <span>📉 Sugerencia Back-off (-20%): <strong>' + backoffWeight + ' kg</strong></span>';
        html += '  <button class="apply-btn">Aplicar a Serie 2</button>';
        html += '</div>';
      }

      html += '<div class="sets-table">';
      html += '  <div class="set-row-header"><span>SET</span><span style="text-align:left">TIPO / ANTERIOR</span><span>KG</span><span>REPS</span><span>LISTO</span></div>';

      for (var setIdx = 0; setIdx < ex.sets.length; setIdx++) {
        var set = ex.sets[setIdx];
        var prevText = (set.prevWeight !== null && set.prevReps !== null) ? set.prevWeight + 'kg × ' + set.prevReps : '—';

        html += '<div class="set-row' + (set.completed ? ' done' : '') + '" data-ex-idx="' + exIdx + '" data-set-idx="' + setIdx + '">';
        html += '  <div class="set-index">' + set.index + '</div>';
        html += '  <div class="set-badge-col">';
        html += '    <span class="set-tag ' + set.type + '">' + set.badge + '</span>';
        html += '    <span class="previous-hint">Ant: ' + prevText + '</span>';
        html += '  </div>';
        html += '  <div class="set-input-box"><input type="number" step="0.5" class="set-input weight-input" placeholder="' + (set.prevWeight || '0') + '" value="' + set.weight + '" data-ex-idx="' + exIdx + '" data-set-idx="' + setIdx + '"></div>';
        html += '  <div class="set-input-box"><input type="number" step="1" class="set-input reps-input" placeholder="' + (set.targetReps || '12') + '" value="' + set.reps + '" data-ex-idx="' + exIdx + '" data-set-idx="' + setIdx + '"></div>';
        html += '  <div style="display:flex;justify-content:center"><button class="check-btn toggle-set-btn" data-ex-idx="' + exIdx + '" data-set-idx="' + setIdx + '">' + (set.completed ? '✓' : '○') + '</button></div>';
        html += '</div>';
      }
      html += '</div>';

      html += '<div class="exercise-footer"><button class="btn-ghost-sm add-set-btn" data-ex-idx="' + exIdx + '">+ Añadir Serie Extra</button></div>';
      html += '</div>';
    }

    container.innerHTML = html;
    attachExerciseEventHandlers();
  }

  function attachExerciseEventHandlers() {
    var container = $('exercisesContainer');
    if (!container) return;

    var weightInputs = container.querySelectorAll('.weight-input');
    for (var i = 0; i < weightInputs.length; i++) {
      (function(input) {
        input.addEventListener('input', function() {
          var exIdx = parseInt(input.dataset.exIdx, 10);
          var setIdx = parseInt(input.dataset.setIdx, 10);
          appState.activeWorkout.exercises[exIdx].sets[setIdx].weight = input.value;
          saveAppState();
          if (setIdx === 0 && appState.activeWorkout.exercises[exIdx].hasBackOffCalculation) {
            renderActiveExercises();
          }
        });
      })(weightInputs[i]);
    }

    var repsInputs = container.querySelectorAll('.reps-input');
    for (var i = 0; i < repsInputs.length; i++) {
      (function(input) {
        input.addEventListener('input', function() {
          var exIdx = parseInt(input.dataset.exIdx, 10);
          var setIdx = parseInt(input.dataset.setIdx, 10);
          appState.activeWorkout.exercises[exIdx].sets[setIdx].reps = input.value;
          saveAppState();
        });
      })(repsInputs[i]);
    }

    var checkBtns = container.querySelectorAll('.toggle-set-btn');
    for (var i = 0; i < checkBtns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          toggleSetCompleted(parseInt(btn.dataset.exIdx, 10), parseInt(btn.dataset.setIdx, 10));
        });
      })(checkBtns[i]);
    }

    var addBtns = container.querySelectorAll('.add-set-btn');
    for (var i = 0; i < addBtns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          addExtraSet(parseInt(btn.dataset.exIdx, 10));
        });
      })(addBtns[i]);
    }

    var backoffPills = container.querySelectorAll('.backoff-helper-pill');
    for (var i = 0; i < backoffPills.length; i++) {
      (function(pill) {
        pill.addEventListener('click', function() {
          var exIdx = parseInt(pill.dataset.exIdx, 10);
          var weight = pill.dataset.weight;
          if (appState.activeWorkout.exercises[exIdx].sets[1]) {
            appState.activeWorkout.exercises[exIdx].sets[1].weight = weight;
            saveAppState();
            renderActiveExercises();
            triggerHaptic([40]);
          }
        });
      })(backoffPills[i]);
    }

    var plateBtns = container.querySelectorAll('.plate-modal-trigger');
    for (var i = 0; i < plateBtns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var exIdx = parseInt(btn.dataset.exIdx, 10);
          var ex = appState.activeWorkout.exercises[exIdx];
          var w = (ex.sets[0] && ex.sets[0].weight) ? ex.sets[0].weight : 60;
          $('calcTargetWeight').value = w;
          updatePlateCalculator();
          switchTab('tab-tools');
        });
      })(plateBtns[i]);
    }
  }

  function toggleSetCompleted(exIdx, setIdx) {
    var set = appState.activeWorkout.exercises[exIdx].sets[setIdx];
    set.completed = !set.completed;

    if (set.completed) {
      if (!set.reps && set.targetReps && typeof set.targetReps === 'number') {
        set.reps = set.targetReps;
      }
      sounds.playSetComplete();
      triggerHaptic([60, 40, 80]);
      startRestTimer(appState.settings.defaultRestSeconds);
    }

    saveAppState();
    renderActiveExercises();
    updateWorkoutProgress();
  }

  function addExtraSet(exIdx) {
    var ex = appState.activeWorkout.exercises[exIdx];
    var last = ex.sets[ex.sets.length - 1];
    ex.sets.push({
      index: ex.sets.length + 1,
      type: 'normal',
      badge: 'EXTRA',
      label: 'Serie ' + (ex.sets.length + 1),
      helper: '',
      targetReps: last ? last.targetReps : 12,
      weight: last ? last.weight : '',
      reps: last ? last.reps : '',
      completed: false,
      prevWeight: null,
      prevReps: null
    });
    saveAppState();
    renderActiveExercises();
  }

  function updateWorkoutProgress() {
    if (!appState.activeWorkout) return;
    var total = 0, done = 0;
    var exs = appState.activeWorkout.exercises;
    for (var i = 0; i < exs.length; i++) {
      for (var j = 0; j < exs[i].sets.length; j++) {
        total++;
        if (exs[i].sets[j].completed) done++;
      }
    }
    var pct = total > 0 ? (done / total) * 100 : 0;
    var bar = $('workoutProgressBar');
    if (bar) bar.style.width = pct + '%';
  }

  // ===========================================================================
  // CRONÓMETRO DE DESCANSO
  // ===========================================================================
  function startRestTimer(seconds) {
    stopRestTimer();
    appState.restTimer.duration = seconds;
    appState.restTimer.remaining = seconds;
    appState.restTimer.isRunning = true;

    var bar = $('restTimerBar');
    if (bar) bar.classList.add('visible');
    updateTimerDisplay();

    var startTime = Date.now();
    var targetMs = seconds * 1000;

    appState.restTimer.intervalId = setInterval(function() {
      var elapsed = Date.now() - startTime;
      var remMs = targetMs - elapsed;
      var remSecs = Math.ceil(remMs / 1000);
      if (remSecs <= 0) {
        stopRestTimer();
        onTimerFinished();
      } else {
        appState.restTimer.remaining = remSecs;
        updateTimerDisplay();
      }
    }, 250);
  }

  function stopRestTimer() {
    if (appState.restTimer.intervalId) {
      clearInterval(appState.restTimer.intervalId);
      appState.restTimer.intervalId = null;
    }
    appState.restTimer.isRunning = false;
  }

  function updateTimerDisplay() {
    var mins = Math.floor(appState.restTimer.remaining / 60);
    var secs = appState.restTimer.remaining % 60;
    var numEl = $('restTimerSeconds');
    if (numEl) numEl.textContent = pad(mins) + ':' + pad(secs);

    var circle = $('timerProgressCircle');
    if (circle) {
      var circumference = 113.1;
      var fraction = appState.restTimer.remaining / appState.restTimer.duration;
      circle.style.strokeDashoffset = circumference * (1 - fraction);
    }
  }

  function onTimerFinished() {
    var numEl = $('restTimerSeconds');
    if (numEl) numEl.textContent = '00:00';
    sounds.playTimerFinish();
    triggerHaptic([200, 100, 200, 100, 300]);
    setTimeout(function() {
      var bar = $('restTimerBar');
      if (bar && !appState.restTimer.isRunning) bar.classList.remove('visible');
    }, 3500);
  }

  // ===========================================================================
  // FINALIZAR ENTRENAMIENTO
  // ===========================================================================
  function finishWorkout() {
    if (!appState.activeWorkout) return;
    var durationSecs = Math.floor((Date.now() - appState.activeWorkout.startTime) / 1000);
    var durationMins = Math.max(1, Math.round(durationSecs / 60));

    var totalVolume = 0, completedSets = 0;
    var newPrs = [];
    var exs = appState.activeWorkout.exercises;

    for (var i = 0; i < exs.length; i++) {
      for (var j = 0; j < exs[i].sets.length; j++) {
        var s = exs[i].sets[j];
        if (s.completed && s.weight && s.reps) {
          var w = parseFloat(s.weight);
          var r = parseInt(s.reps, 10);
          if (!isNaN(w) && !isNaN(r)) {
            totalVolume += w * r;
            completedSets++;
            var currentPr = appState.prs[exs[i].id] || 0;
            if (w > currentPr) {
              appState.prs[exs[i].id] = w;
              newPrs.push({ exercise: exs[i].name, weight: w, reps: r });
            }
          }
        }
      }
    }

    var record = {
      id: 'wo_' + Date.now(),
      workoutId: appState.activeWorkout.workoutId,
      title: appState.activeWorkout.title,
      date: new Date().toISOString(),
      durationMinutes: durationMins,
      totalVolumeKg: Math.round(totalVolume),
      setsCompleted: completedSets,
      exercises: exs
    };
    appState.history.unshift(record);

    var finishedTitle = appState.activeWorkout.title;
    appState.activeWorkout = null;
    saveAppState();

    if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);
    stopRestTimer();
    toggleWakeLock(false);
    triggerConfetti();

    showSummaryModal({
      title: finishedTitle,
      duration: durationMins + ' min',
      volume: Math.round(totalVolume).toLocaleString('es-ES') + ' kg',
      sets: completedSets,
      newPrs: newPrs
    });

    renderHistory();
    renderPRs();
    $('noActiveWorkoutView').style.display = 'block';
    $('activeWorkoutContent').style.display = 'none';
  }

  function showSummaryModal(summary) {
    $('summaryWorkoutName').textContent = summary.title;
    $('summaryDuration').textContent = summary.duration;
    $('summaryVolume').textContent = summary.volume;
    $('summarySets').textContent = summary.sets;

    var prsSection = $('summaryPrsSection');
    var prsList = $('summaryPrsList');
    if (summary.newPrs && summary.newPrs.length > 0) {
      prsSection.style.display = 'block';
      var prsHtml = '';
      for (var i = 0; i < summary.newPrs.length; i++) {
        var pr = summary.newPrs[i];
        prsHtml += '<div style="font-size:12px;color:#fff;margin-bottom:2px">⭐ <strong>' + pr.exercise + ':</strong> ' + pr.weight + ' kg × ' + pr.reps + ' reps</div>';
      }
      prsList.innerHTML = prsHtml;
    } else {
      prsSection.style.display = 'none';
    }

    var shareBtn = $('shareWhatsAppBtn');
    shareBtn.onclick = function() {
      var text = encodeURIComponent(
        '💪 *Entreno CGM Performance Completado*\n' +
        '📅 *Sesión:* ' + summary.title + '\n' +
        '⏱️ *Tiempo:* ' + summary.duration + '\n' +
        '🏋️ *Volumen total:* ' + summary.volume + '\n' +
        '✅ *Series realizadas:* ' + summary.sets + '\n' +
        '\n_Plan personalizado Carlos Graña · Frecuencia 1,5_'
      );
      window.open('https://api.whatsapp.com/send?text=' + text, '_blank');
    };

    $('summaryModal').classList.add('open');
  }

  // ===========================================================================
  // HISTORIAL & PRs
  // ===========================================================================
  function renderHistory() {
    var container = $('historyList');
    var badge = $('historyCountBadge');
    if (!container) return;
    if (badge) badge.textContent = appState.history.length + ' sesiones';

    if (appState.history.length === 0) {
      container.innerHTML = '<div class="cgm-card text-center" style="padding:28px 16px"><p style="color:var(--text-dim);font-size:13px">No hay entrenamientos guardados todavía.</p></div>';
      return;
    }

    var html = '';
    for (var i = 0; i < appState.history.length; i++) {
      var item = appState.history[i];
      var dateObj = new Date(item.date);
      var dateStr = dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

      html += '<div class="history-item">';
      html += '  <div class="history-header"><div>';
      html += '    <div class="history-title">' + item.title + '</div>';
      html += '    <div class="history-date">' + dateStr + '</div>';
      html += '  </div><span class="badge-gold">' + item.workoutId + '</span></div>';
      html += '  <div class="history-stats-row">';
      html += '    <div class="history-stat">⏱ <strong>' + item.durationMinutes + ' min</strong></div>';
      html += '    <div class="history-stat">⚖ <strong>' + item.totalVolumeKg.toLocaleString('es-ES') + ' kg</strong></div>';
      html += '    <div class="history-stat">✓ <strong>' + item.setsCompleted + ' series</strong></div>';
      html += '  </div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  function renderPRs() {
    var grid = $('prsGrid');
    if (!grid) return;
    var keys = Object.keys(appState.prs);
    if (keys.length === 0) {
      grid.innerHTML = '<div style="font-size:12px;color:var(--text-dim);text-align:center;padding:10px">Se registrarán automáticamente al completar tus series pesadas.</div>';
      return;
    }

    var idToName = {};
    var dayKeys = Object.keys(WORKOUT_DAYS);
    for (var d = 0; d < dayKeys.length; d++) {
      var exs = WORKOUT_DAYS[dayKeys[d]].exercises;
      for (var e = 0; e < exs.length; e++) {
        idToName[exs[e].id] = exs[e].name;
      }
    }

    var html = '';
    for (var i = 0; i < keys.length; i++) {
      html += '<div class="pr-card"><span class="pr-name">' + (idToName[keys[i]] || keys[i]) + '</span><span class="pr-val">' + appState.prs[keys[i]] + ' kg</span></div>';
    }
    grid.innerHTML = html;
  }

  // ===========================================================================
  // CALCULADORA DE DISCOS
  // ===========================================================================
  function updatePlateCalculator() {
    var targetInput = $('calcTargetWeight');
    var barSelect = $('calcBarWeight');
    var sideLabel = $('weightPerSideLabel');
    var visual = $('platesVisual');
    var textList = $('platesTextList');
    if (!targetInput || !barSelect) return;

    var target = parseFloat(targetInput.value) || 0;
    var bar = parseFloat(barSelect.value) || 0;

    if (target < bar) {
      if (sideLabel) sideLabel.textContent = '0 kg (peso menor a la barra)';
      if (visual) visual.innerHTML = '';
      if (textList) textList.textContent = '';
      return;
    }

    var perSide = (target - bar) / 2;
    if (sideLabel) sideLabel.textContent = perSide + ' kg por lado';

    var plateTypes = [
      { weight: 25, css: 'plate-25', label: '25' },
      { weight: 20, css: 'plate-20', label: '20' },
      { weight: 15, css: 'plate-15', label: '15' },
      { weight: 10, css: 'plate-10', label: '10' },
      { weight: 5,  css: 'plate-5',  label: '5' },
      { weight: 2.5, css: 'plate-2_5', label: '2.5' },
      { weight: 1.25, css: 'plate-1_25', label: '1.25' }
    ];

    var remaining = perSide; // Keep as number!
    var platesUsed = [];

    for (var i = 0; i < plateTypes.length; i++) {
      var plate = plateTypes[i];
      while (remaining >= plate.weight - 0.001) {
        platesUsed.push(plate);
        remaining = Math.round((remaining - plate.weight) * 100) / 100; // Avoid float issues
      }
    }

    if (visual) {
      var vhtml = '';
      for (var i = 0; i < platesUsed.length; i++) {
        vhtml += '<div class="plate-disc ' + platesUsed[i].css + '" title="' + platesUsed[i].weight + ' kg">' + platesUsed[i].label + '</div>';
      }
      visual.innerHTML = vhtml;
    }

    if (textList) {
      if (platesUsed.length === 0) {
        textList.textContent = 'Solo la barra vacía.';
      } else {
        var counts = {};
        for (var i = 0; i < platesUsed.length; i++) {
          var w = platesUsed[i].weight;
          counts[w] = (counts[w] || 0) + 1;
        }
        var parts = [];
        var cKeys = Object.keys(counts);
        for (var i = 0; i < cKeys.length; i++) {
          parts.push(counts[cKeys[i]] + '×' + cKeys[i] + 'kg');
        }
        textList.textContent = 'Discos por lado: ' + parts.join(', ');
      }
    }
  }

  function updateQuickBackOff() {
    var topInput = $('topSetInput');
    var resultDiv = $('backOffResult');
    if (!topInput || !resultDiv) return;
    var topWeight = parseFloat(topInput.value) || 0;
    if (topWeight <= 0) {
      resultDiv.textContent = '0 kg';
      return;
    }
    var raw = topWeight * 0.8;
    var rounded = Math.round(raw / 2.5) * 2.5;
    resultDiv.textContent = rounded + ' kg (−20%)';
  }

  // ===========================================================================
  // CONFETTI
  // ===========================================================================
  function triggerConfetti() {
    var canvas = $('confettiCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];
    var colors = ['#D4AF37', '#FDE68A', '#997819', '#ffffff', '#10B981', '#38BDF8'];
    for (var i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2, y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1, rotation: Math.random() * 360
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.4; p.alpha -= 0.015;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      if (alive) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  // ===========================================================================
  // EVENT LISTENERS
  // ===========================================================================
  function setupEventListeners() {
    // Navegación
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
      (function(item) {
        item.addEventListener('click', function() {
          if (item.dataset.tab) switchTab(item.dataset.tab);
        });
      })(navItems[i]);
    }

    // Semanas
    var weekPills = document.querySelectorAll('.week-pill');
    for (var i = 0; i < weekPills.length; i++) {
      (function(pill) {
        pill.addEventListener('click', function() {
          renderScheduleWeek(parseInt(pill.dataset.week, 10));
        });
      })(weekPills[i]);
    }

    // Empezar hoy
    on($('startTodayWorkoutBtn'), 'click', function() {
      var wId = $('startTodayWorkoutBtn').dataset.workoutId || 'D1';
      startWorkout(wId);
    });

    // Días directos
    var directCards = document.querySelectorAll('.direct-day-card');
    for (var i = 0; i < directCards.length; i++) {
      (function(card) {
        card.addEventListener('click', function() {
          if (card.dataset.day) startWorkout(card.dataset.day);
        });
      })(directCards[i]);
    }

    // Ir a rutina
    on($('goToRoutineBtn'), 'click', function() { switchTab('tab-routine'); });

    // Finalizar / Descartar
    on($('finishWorkoutBtn'), 'click', function() {
      if (confirm('¿Has completado tu entrenamiento y deseas guardar los resultados?')) finishWorkout();
    });
    on($('discardWorkoutBtn'), 'click', function() {
      if (confirm('¿Estás seguro de descartar esta sesión? Los datos no guardados se perderán.')) {
        appState.activeWorkout = null;
        saveAppState();
        if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);
        stopRestTimer();
        toggleWakeLock(false);
        $('noActiveWorkoutView').style.display = 'block';
        $('activeWorkoutContent').style.display = 'none';
        switchTab('tab-routine');
      }
    });

    // Rest Timer
    on($('timerAdd15Btn'), 'click', function() {
      appState.restTimer.remaining += 15;
      appState.restTimer.duration += 15;
      updateTimerDisplay();
    });
    on($('timerSub15Btn'), 'click', function() {
      appState.restTimer.remaining = Math.max(0, appState.restTimer.remaining - 15);
      updateTimerDisplay();
      if (appState.restTimer.remaining === 0) onTimerFinished();
    });
    on($('timerSkipBtn'), 'click', function() {
      stopRestTimer();
      var bar = $('restTimerBar');
      if (bar) bar.classList.remove('visible');
    });
    on($('timerCloseBtn'), 'click', function() {
      var bar = $('restTimerBar');
      if (bar) bar.classList.remove('visible');
    });

    // Header buttons
    on($('soundToggleBtn'), 'click', function() {
      appState.settings.soundEnabled = !appState.settings.soundEnabled;
      saveAppState();
      var btn = $('soundToggleBtn');
      btn.classList.toggle('active', appState.settings.soundEnabled);
      btn.textContent = appState.settings.soundEnabled ? '🔔' : '🔕';
      var check = $('settingSound');
      if (check) check.checked = appState.settings.soundEnabled;
    });
    on($('wakeLockBtn'), 'click', function() {
      toggleWakeLock(!appState.wakeLockSentinel);
    });
    on($('plateCalcQuickBtn'), 'click', function() { switchTab('tab-tools'); });

    // Modal cerrar
    on($('closeSummaryModalBtn'), 'click', function() {
      var modal = $('summaryModal');
      if (modal) modal.classList.remove('open');
      switchTab('tab-routine');
    });

    // Calculadoras
    on($('calcTargetWeight'), 'input', updatePlateCalculator);
    on($('calcBarWeight'), 'change', updatePlateCalculator);
    on($('topSetInput'), 'input', updateQuickBackOff);

    // Settings
    on($('settingSound'), 'change', function(e) {
      appState.settings.soundEnabled = e.target.checked;
      saveAppState();
      var btn = $('soundToggleBtn');
      if (btn) {
        btn.classList.toggle('active', appState.settings.soundEnabled);
        btn.textContent = appState.settings.soundEnabled ? '🔔' : '🔕';
      }
    });
    on($('settingVibrate'), 'change', function(e) {
      appState.settings.vibrateEnabled = e.target.checked;
      saveAppState();
    });
    on($('settingDefaultRest'), 'change', function(e) {
      appState.settings.defaultRestSeconds = parseInt(e.target.value, 10);
      saveAppState();
    });

    // Datos
    on($('exportDataBtn'), 'click', exportUserData);
    on($('importDataInput'), 'change', importUserData);
    on($('resetDataBtn'), 'click', resetAllData);
  }

  // ===========================================================================
  // DATOS EXPORT / IMPORT
  // ===========================================================================
  function exportUserData() {
    var data = {
      app: 'CGM Performance Workout',
      version: '1.0',
      exportDate: new Date().toISOString(),
      history: appState.history,
      prs: appState.prs,
      settings: appState.settings,
      currentWeek: appState.currentWeek
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cgm-workout-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importUserData(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(event) {
      try {
        var data = JSON.parse(event.target.result);
        if (data.history) appState.history = data.history;
        if (data.prs) appState.prs = data.prs;
        if (data.settings) appState.settings = assign({}, DEFAULT_SETTINGS, data.settings);
        if (data.currentWeek) appState.currentWeek = data.currentWeek;
        saveAppState();
        renderHistory();
        renderPRs();
        renderScheduleWeek(appState.currentWeek);
        alert('¡Datos importados con éxito!');
      } catch (err) {
        alert('Error al leer el archivo JSON de respaldo.');
      }
    };
    reader.readAsText(file);
  }

  function resetAllData() {
    if (confirm('ADVERTENCIA: ¿Seguro que deseas borrar todo el historial y récords? Esta acción no se puede deshacer.')) {
      localStorage.clear();
      location.reload();
    }
  }

  // ===========================================================================
  // PWA
  // ===========================================================================
  function setupPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then(function(reg) {
        console.log('SW registrado:', reg.scope);
      }).catch(function(err) {
        console.log('SW no disponible:', err);
      });
    }

    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      appState.deferredPwaPrompt = e;
      var banner = $('pwaBanner');
      if (banner) banner.classList.add('show');
    });

    on($('pwaInstallBtn'), 'click', function() {
      if (appState.deferredPwaPrompt) {
        appState.deferredPwaPrompt.prompt();
        appState.deferredPwaPrompt.userChoice.then(function() {
          appState.deferredPwaPrompt = null;
          var banner = $('pwaBanner');
          if (banner) banner.classList.remove('show');
        });
      } else {
        alert('Para instalar en iPhone: pulsa el botón Compartir de Safari y selecciona "Añadir a pantalla de inicio". En Android: pulsa los tres puntos y "Instalar aplicación".');
      }
    });
  }

})();
