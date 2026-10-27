// CGM PERFORMANCE · APPLICATION CONTROLLER
// Rutina Frecuencia 1,5 · Carlos Graña

const { ROUTINE_INFO, SCHEDULE_WEEKS, WORKOUT_DAYS } = window.CGM_DATA || {};

// =============================================================================
// ESTADO GLOBAL & PERSISTENCIA (LOCALSTORAGE)
// =============================================================================
const STORAGE_KEYS = {
  ACTIVE_WORKOUT: 'cgm_active_workout',
  HISTORY: 'cgm_workout_history',
  PRS: 'cgm_personal_records',
  SETTINGS: 'cgm_user_settings',
  SELECTED_WEEK: 'cgm_selected_week'
};

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  vibrateEnabled: true,
  defaultRestSeconds: 90,
  wakeLockEnabled: true
};

let appState = {
  currentWeek: 1,
  activeWorkout: null,
  history: [],
  prs: {},
  settings: { ...DEFAULT_SETTINGS },
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

// =============================================================================
// WEB AUDIO API (SONIDOS OFFLINE SIN ARCHIVOS EXTERNOS)
// =============================================================================
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBeep(freq = 880, type = 'sine', duration = 0.15) {
    if (!appState.settings.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playSetComplete() {
    // Chime ascendente
    this.playBeep(523.25, 'triangle', 0.1); // C5
    setTimeout(() => this.playBeep(659.25, 'triangle', 0.15), 100); // E5
  }

  playTimerFinish() {
    // Triple pitido de aviso
    this.playBeep(880, 'sine', 0.15);
    setTimeout(() => this.playBeep(880, 'sine', 0.15), 180);
    setTimeout(() => this.playBeep(1174.66, 'sine', 0.35), 360);
  }
}

const sounds = new SoundManager();

// =============================================================================
// HAPTICS / VIBRACIÓN
// =============================================================================
function triggerHaptic(pattern = [60]) {
  if (appState.settings.vibrateEnabled && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignorar si el navegador bloquea vibración sin interacción
    }
  }
}

// =============================================================================
// WAKE LOCK (MANTENER PANTALLA ACTIVA EN EL GYM)
// =============================================================================
async function toggleWakeLock(enable) {
  if ('wakeLock' in navigator) {
    try {
      if (enable && !appState.wakeLockSentinel) {
        appState.wakeLockSentinel = await navigator.wakeLock.request('screen');
        const btn = document.getElementById('wakeLockBtn');
        if (btn) btn.classList.add('active');
        appState.wakeLockSentinel.addEventListener('release', () => {
          appState.wakeLockSentinel = null;
          if (btn) btn.classList.remove('active');
        });
      } else if (!enable && appState.wakeLockSentinel) {
        await appState.wakeLockSentinel.release();
        appState.wakeLockSentinel = null;
        const btn = document.getElementById('wakeLockBtn');
        if (btn) btn.classList.remove('active');
      }
    } catch (err) {
      console.log('WakeLock error:', err);
    }
  }
}

// =============================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  setupEventListeners();
  setupPWA();
  determineTodaySchedule();
  renderScheduleWeek(appState.currentWeek);
  renderHistory();
  renderPRs();
  updatePlateCalculator();

  // Restaurar entreno si ya estaba activo
  if (appState.activeWorkout) {
    resumeActiveWorkout();
  }
});

function loadStoredData() {
  try {
    const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (storedHistory) appState.history = JSON.parse(storedHistory);

    const storedPrs = localStorage.getItem(STORAGE_KEYS.PRS);
    if (storedPrs) appState.prs = JSON.parse(storedPrs);

    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };

    const storedActive = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    if (storedActive) appState.activeWorkout = JSON.parse(storedActive);

    const storedWeek = localStorage.getItem(STORAGE_KEYS.SELECTED_WEEK);
    if (storedWeek) appState.currentWeek = parseInt(storedWeek, 10);
  } catch (e) {
    console.error('Error al cargar datos locales:', e);
  }

  // Reflejar settings en UI
  const soundCheck = document.getElementById('settingSound');
  const vibrateCheck = document.getElementById('settingVibrate');
  const defaultRestSelect = document.getElementById('settingDefaultRest');
  const soundBtn = document.getElementById('soundToggleBtn');

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
    console.error('Error al guardar datos:', e);
  }
}

// =============================================================================
// NAVEGACIÓN ENTRE TABS
// =============================================================================
function switchTab(tabId) {
  document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

  const targetView = document.getElementById(tabId);
  if (targetView) targetView.classList.add('active');

  const navItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (navItem) navItem.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================================================
// CALENDARIO FRECUENCIA 1,5 & PLAN DE HOY
// =============================================================================
function determineTodaySchedule() {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0: Dom, 1: Lun, 2: Mar, 3: Mié, 4: Jue, 5: Vie, 6: Sáb

  // Opciones de formateo de fecha
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  const dateStr = date.toLocaleDateString('es-ES', options);
  
  const dateBadge = document.getElementById('currentDateBadge');
  if (dateBadge) {
    dateBadge.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  }

  // Buscar el día correspondiente en la semana actual seleccionada
  const currentWeekData = SCHEDULE_WEEKS.find(w => w.week === appState.currentWeek) || SCHEDULE_WEEKS[0];
  const daySchedule = currentWeekData.days.find(d => d.dayIndex === dayOfWeek);

  const titleEl = document.getElementById('todayWorkoutTitle');
  const descEl = document.getElementById('todayWorkoutDesc');
  const startBtn = document.getElementById('startTodayWorkoutBtn');

  if (daySchedule && !daySchedule.isRest && daySchedule.workoutId) {
    const workout = WORKOUT_DAYS[daySchedule.workoutId];
    if (titleEl) titleEl.textContent = `${daySchedule.workoutName} · ${workout ? workout.name : ''}`;
    if (descEl) descEl.textContent = workout ? workout.description : 'Sesión programada para hoy.';
    if (startBtn) {
      startBtn.dataset.workoutId = daySchedule.workoutId;
      startBtn.disabled = false;
      startBtn.innerHTML = `<span>▶</span> Empezar ${daySchedule.workoutId} (${workout ? workout.name : ''})`;
    }
  } else {
    if (titleEl) titleEl.textContent = "Día de Descanso Programado";
    if (descEl) descEl.textContent = "Recuperación muscular y recarga de glucógeno. También puedes adelantar o elegir otra sesión abajo.";
    if (startBtn) {
      startBtn.dataset.workoutId = "D1";
      startBtn.innerHTML = `<span>▶</span> Elegir un entrenamiento`;
    }
  }
}

function renderScheduleWeek(weekNumber) {
  appState.currentWeek = weekNumber;
  saveAppState();

  // Actualizar selector de semanas
  document.querySelectorAll('.week-pill').forEach(pill => {
    const w = parseInt(pill.dataset.week, 10);
    pill.classList.toggle('active', w === weekNumber);
  });

  const weekData = SCHEDULE_WEEKS.find(w => w.week === weekNumber);
  if (!weekData) return;

  const grid = document.getElementById('scheduleGrid');
  if (!grid) return;

  const todayIndex = new Date().getDay();

  grid.innerHTML = weekData.days.map(d => {
    const isToday = d.dayIndex === todayIndex;
    const isRest = d.isRest;
    const cardClass = `schedule-day-card ${isToday ? 'today' : ''} ${isRest ? 'rest' : ''}`;
    
    return `
      <div class="${cardClass}" data-workout-id="${d.workoutId || ''}" data-is-rest="${isRest}">
        <div class="schedule-day-left">
          <span class="day-tag">${d.day.substring(0, 3)}</span>
          <div class="day-routine-name">
            ${d.workoutName}
            ${d.isRepeated ? `<span class="repeat-badge">REPETICIÓN</span>` : ''}
          </div>
        </div>
        <div class="day-badge-action">
          ${isRest ? '<span>💤 Descanso</span>' : '<span>Entrenar ➔</span>'}
        </div>
      </div>
    `;
  }).join('');

  // Event listener en las tarjetas de día
  grid.querySelectorAll('.schedule-day-card').forEach(card => {
    card.addEventListener('click', () => {
      const workoutId = card.dataset.workoutId;
      const isRest = card.dataset.isRest === 'true';
      if (!isRest && workoutId) {
        startWorkout(workoutId);
      }
    });
  });

  determineTodaySchedule();
}

// =============================================================================
// MOTOR DE ENTRENO ACTIVO (GYM MODE)
// =============================================================================
function startWorkout(workoutId) {
  const template = WORKOUT_DAYS[workoutId];
  if (!template) return;

  // Confirmar si ya hay otro en curso
  if (appState.activeWorkout && appState.activeWorkout.workoutId !== workoutId) {
    const confirmSwap = confirm(`Tienes una sesión de ${appState.activeWorkout.title} en curso. ¿Deseas descartarla e iniciar ${template.title}?`);
    if (!confirmSwap) return;
  }

  // Buscar última sesión de este tipo en el historial para autocompletar pesos anteriores
  const previousSession = appState.history.find(h => h.workoutId === workoutId);

  // Inicializar estado del entreno activo
  appState.activeWorkout = {
    workoutId: template.id,
    title: `${template.title}: ${template.name}`,
    category: template.category,
    startTime: Date.now(),
    exercises: template.exercises.map(ex => {
      // Buscar datos previos del ejercicio
      const prevEx = previousSession ? previousSession.exercises.find(pe => pe.id === ex.id) : null;

      return {
        id: ex.id,
        name: ex.name,
        notes: ex.notes,
        hasBackOffCalculation: ex.hasBackOffCalculation || false,
        sets: ex.sets.map((s, sIdx) => {
          const prevSet = prevEx && prevEx.sets && prevEx.sets[sIdx] ? prevEx.sets[sIdx] : null;
          return {
            index: sIdx + 1,
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
          };
        })
      };
    })
  };

  saveAppState();
  resumeActiveWorkout();
  switchTab('tab-workout');
  toggleWakeLock(true);
}

function resumeActiveWorkout() {
  if (!appState.activeWorkout) return;

  document.getElementById('noActiveWorkoutView').style.display = 'none';
  document.getElementById('activeWorkoutContent').style.display = 'block';

  document.getElementById('activeWorkoutName').textContent = appState.activeWorkout.title;
  document.getElementById('activeWorkoutSubtitle').textContent = `${appState.activeWorkout.category} · CGM Performance`;

  renderActiveExercises();
  startWorkoutElapsedTimer();
  updateWorkoutProgress();
}

function startWorkoutElapsedTimer() {
  if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);

  const timerEl = document.getElementById('workoutElapsedTimer');
  
  function updateElapsed() {
    if (!appState.activeWorkout) return;
    const elapsedSeconds = Math.floor((Date.now() - appState.activeWorkout.startTime) / 1000);
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    if (timerEl) {
      timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  updateElapsed();
  appState.workoutTimerInterval = setInterval(updateElapsed, 1000);
}

function renderActiveExercises() {
  const container = document.getElementById('exercisesContainer');
  if (!container || !appState.activeWorkout) return;

  container.innerHTML = appState.activeWorkout.exercises.map((ex, exIdx) => {
    const allSetsDone = ex.sets.every(s => s.completed);

    // Calcular sugerencia de Back-off si el primer set (Top set) tiene peso
    let backoffSuggestedWeight = null;
    if (ex.hasBackOffCalculation && ex.sets[0] && ex.sets[0].weight) {
      const topWeight = parseFloat(ex.sets[0].weight);
      if (!isNaN(topWeight) && topWeight > 0) {
        // -20% redondeado a 1.25 o 2.5 kg más cercano
        const rawBackOff = topWeight * 0.8;
        backoffSuggestedWeight = (Math.round(rawBackOff / 2.5) * 2.5).toFixed(1).replace('.0', '');
      }
    }

    return `
      <div class="exercise-card ${allSetsDone ? 'completed' : ''}" data-ex-idx="${exIdx}">
        <div class="exercise-header">
          <div class="exercise-title-group">
            <span class="exercise-number">EJERCICIO ${exIdx + 1} DE ${appState.activeWorkout.exercises.length}</span>
            <h3 class="exercise-name">${ex.name}</h3>
          </div>
          <button class="icon-btn plate-modal-trigger" data-ex-idx="${exIdx}" title="Calcular discos">
            ⚖️
          </button>
        </div>

        ${ex.notes ? `
          <div class="exercise-notes-banner">
            <span>💡</span>
            <div>${ex.notes}</div>
          </div>
        ` : ''}

        ${backoffSuggestedWeight ? `
          <div class="backoff-helper-pill visible" data-ex-idx="${exIdx}" data-weight="${backoffSuggestedWeight}">
            <span>📉 Sugerencia Back-off (-20%): <strong>${backoffSuggestedWeight} kg</strong></span>
            <button class="apply-btn">Aplicar a Serie 2</button>
          </div>
        ` : ''}

        <div class="sets-table">
          <div class="set-row-header">
            <span>SET</span>
            <span style="text-align: left;">TIPO / ANTERIOR</span>
            <span>KG</span>
            <span>REPS</span>
            <span>LISTO</span>
          </div>

          ${ex.sets.map((set, setIdx) => {
            const prevText = (set.prevWeight !== null && set.prevReps !== null) 
              ? `${set.prevWeight}kg × ${set.prevReps}` 
              : '—';

            return `
              <div class="set-row ${set.completed ? 'done' : ''}" data-ex-idx="${exIdx}" data-set-idx="${setIdx}">
                <div class="set-index">${set.index}</div>
                
                <div class="set-badge-col">
                  <span class="set-tag ${set.type}">${set.badge}</span>
                  <span class="previous-hint" title="Sesión anterior">Ant: ${prevText}</span>
                </div>

                <div class="set-input-box">
                  <input type="number" 
                         step="0.5" 
                         class="set-input weight-input" 
                         placeholder="${set.prevWeight || '0'}" 
                         value="${set.weight}" 
                         data-ex-idx="${exIdx}" 
                         data-set-idx="${setIdx}">
                </div>

                <div class="set-input-box">
                  <input type="number" 
                         step="1" 
                         class="set-input reps-input" 
                         placeholder="${set.targetReps || '12'}" 
                         value="${set.reps}" 
                         data-ex-idx="${exIdx}" 
                         data-set-idx="${setIdx}">
                </div>

                <div style="display: flex; justify-content: center;">
                  <button class="check-btn toggle-set-btn" data-ex-idx="${exIdx}" data-set-idx="${setIdx}">
                    ${set.completed ? '✓' : '○'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="exercise-footer">
          <button class="btn-ghost-sm add-set-btn" data-ex-idx="${exIdx}">
            + Añadir Serie Extra
          </button>
        </div>
      </div>
    `;
  }).join('');

  attachExerciseEventHandlers();
}

function attachExerciseEventHandlers() {
  const container = document.getElementById('exercisesContainer');
  if (!container) return;

  // Inputs de peso
  container.querySelectorAll('.weight-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const exIdx = parseInt(e.target.dataset.exIdx, 10);
      const setIdx = parseInt(e.target.dataset.setIdx, 10);
      const val = e.target.value;
      appState.activeWorkout.exercises[exIdx].sets[setIdx].weight = val;
      saveAppState();

      // Si es el primer set de un ejercicio con back-off, volver a renderizar sugerencia
      if (setIdx === 0 && appState.activeWorkout.exercises[exIdx].hasBackOffCalculation) {
        renderActiveExercises();
      }
    });
  });

  // Inputs de repeticiones
  container.querySelectorAll('.reps-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const exIdx = parseInt(e.target.dataset.exIdx, 10);
      const setIdx = parseInt(e.target.dataset.setIdx, 10);
      const val = e.target.value;
      appState.activeWorkout.exercises[exIdx].sets[setIdx].reps = val;
      saveAppState();
    });
  });

  // Botón Checkmarck (Completar serie)
  container.querySelectorAll('.toggle-set-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const exIdx = parseInt(target.dataset.exIdx, 10);
      const setIdx = parseInt(target.dataset.setIdx, 10);
      toggleSetCompleted(exIdx, setIdx);
    });
  });

  // Botón Añadir serie extra
  container.querySelectorAll('.add-set-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const exIdx = parseInt(e.currentTarget.dataset.exIdx, 10);
      addExtraSet(exIdx);
    });
  });

  // Botón Aplicar sugerencia Back-off
  container.querySelectorAll('.backoff-helper-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const exIdx = parseInt(e.currentTarget.dataset.exIdx, 10);
      const weight = e.currentTarget.dataset.weight;
      if (appState.activeWorkout.exercises[exIdx].sets[1]) {
        appState.activeWorkout.exercises[exIdx].sets[1].weight = weight;
        saveAppState();
        renderActiveExercises();
        triggerHaptic([40]);
      }
    });
  });

  // Discos rápidos para este ejercicio
  container.querySelectorAll('.plate-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const exIdx = parseInt(e.currentTarget.dataset.exIdx, 10);
      const ex = appState.activeWorkout.exercises[exIdx];
      // Tomar el peso del primer set o del activo
      const activeWeight = ex.sets[0]?.weight || 60;
      document.getElementById('calcTargetWeight').value = activeWeight;
      updatePlateCalculator();
      switchTab('tab-tools');
    });
  });
}

function toggleSetCompleted(exIdx, setIdx) {
  const set = appState.activeWorkout.exercises[exIdx].sets[setIdx];
  const newState = !set.completed;
  set.completed = newState;

  // Si no tenía reps o peso puestos, intentar rellenar con target
  if (newState) {
    if (!set.reps && set.targetReps && typeof set.targetReps === 'number') {
      set.reps = set.targetReps;
    }
    // Sonido y haptic de éxito
    sounds.playSetComplete();
    triggerHaptic([60, 40, 80]);

    // Iniciar automáticamente temporizador de descanso
    startRestTimer(appState.settings.defaultRestSeconds);
  }

  saveAppState();
  renderActiveExercises();
  updateWorkoutProgress();
}

function addExtraSet(exIdx) {
  const ex = appState.activeWorkout.exercises[exIdx];
  const lastSet = ex.sets[ex.sets.length - 1];

  ex.sets.push({
    index: ex.sets.length + 1,
    type: 'normal',
    badge: 'EXTRA',
    label: `Serie ${ex.sets.length + 1}`,
    helper: '',
    targetReps: lastSet ? lastSet.targetReps : 12,
    weight: lastSet ? lastSet.weight : '',
    reps: lastSet ? lastSet.reps : '',
    completed: false,
    prevWeight: null,
    prevReps: null
  });

  saveAppState();
  renderActiveExercises();
}

function updateWorkoutProgress() {
  if (!appState.activeWorkout) return;

  let totalSets = 0;
  let doneSets = 0;

  appState.activeWorkout.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      totalSets++;
      if (s.completed) doneSets++;
    });
  });

  const percentage = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;
  const bar = document.getElementById('workoutProgressBar');
  if (bar) {
    bar.style.width = `${percentage}%`;
  }
}

// =============================================================================
// CRONÓMETRO DE DESCANSO FLOTANTE (REST TIMER)
// =============================================================================
function startRestTimer(seconds) {
  stopRestTimer();

  appState.restTimer.duration = seconds;
  appState.restTimer.remaining = seconds;
  appState.restTimer.isRunning = true;

  const bar = document.getElementById('restTimerBar');
  if (bar) bar.classList.add('visible');

  updateTimerDisplay();

  const startTime = Date.now();
  const targetDurationMs = seconds * 1000;

  appState.restTimer.intervalId = setInterval(() => {
    const elapsedMs = Date.now() - startTime;
    const remainingMs = targetDurationMs - elapsedMs;
    const remainingSecs = Math.ceil(remainingMs / 1000);

    if (remainingSecs <= 0) {
      stopRestTimer();
      onTimerFinished();
    } else {
      appState.restTimer.remaining = remainingSecs;
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
  const mins = Math.floor(appState.restTimer.remaining / 60);
  const secs = appState.restTimer.remaining % 60;
  const timeText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const numEl = document.getElementById('restTimerSeconds');
  if (numEl) numEl.textContent = timeText;

  // Actualizar círculo de progreso SVG
  const circle = document.getElementById('timerProgressCircle');
  if (circle) {
    const totalCircumference = 113.1;
    const fraction = appState.restTimer.remaining / appState.restTimer.duration;
    const offset = totalCircumference * (1 - fraction);
    circle.style.strokeDashoffset = offset;
  }
}

function onTimerFinished() {
  const numEl = document.getElementById('restTimerSeconds');
  if (numEl) numEl.textContent = "00:00";

  sounds.playTimerFinish();
  triggerHaptic([200, 100, 200, 100, 300]);

  // Cerrar tras 3 segundos
  setTimeout(() => {
    const bar = document.getElementById('restTimerBar');
    if (bar && !appState.restTimer.isRunning) {
      bar.classList.remove('visible');
    }
  }, 3500);
}

// =============================================================================
// FINALIZAR ENTRENAMIENTO & RESUMEN
// =============================================================================
function finishWorkout() {
  if (!appState.activeWorkout) return;

  const durationSeconds = Math.floor((Date.now() - appState.activeWorkout.startTime) / 1000);
  const durationMins = Math.max(1, Math.round(durationSeconds / 60));

  let totalVolume = 0;
  let completedSetsCount = 0;
  const newPrsList = [];

  // Calcular volumen y PRs
  appState.activeWorkout.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.completed && s.weight && s.reps) {
        const w = parseFloat(s.weight);
        const r = parseInt(s.reps, 10);
        if (!isNaN(w) && !isNaN(r)) {
          totalVolume += (w * r);
          completedSetsCount++;

          // Comprobar si bate récord personal en peso
          const currentPr = appState.prs[ex.id] || 0;
          if (w > currentPr) {
            appState.prs[ex.id] = w;
            newPrsList.push({ exercise: ex.name, weight: w, reps: r });
          }
        }
      }
    });
  });

  // Guardar en historial
  const completedWorkoutRecord = {
    id: 'wo_' + Date.now(),
    workoutId: appState.activeWorkout.workoutId,
    title: appState.activeWorkout.title,
    date: new Date().toISOString(),
    durationMinutes: durationMins,
    totalVolumeKg: Math.round(totalVolume),
    setsCompleted: completedSetsCount,
    exercises: appState.activeWorkout.exercises
  };

  appState.history.unshift(completedWorkoutRecord);

  // Limpiar entreno activo
  const finishedWorkoutTitle = appState.activeWorkout.title;
  appState.activeWorkout = null;
  saveAppState();

  // Detener timers
  if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);
  stopRestTimer();
  toggleWakeLock(false);

  // Disparar confeti
  triggerConfetti();

  // Mostrar modal de resumen
  showSummaryModal({
    title: finishedWorkoutTitle,
    duration: `${durationMins} min`,
    volume: `${Math.round(totalVolume).toLocaleString('es-ES')} kg`,
    sets: completedSetsCount,
    newPrs: newPrsList,
    record: completedWorkoutRecord
  });

  // Actualizar vistas
  renderHistory();
  renderPRs();
  document.getElementById('noActiveWorkoutView').style.display = 'block';
  document.getElementById('activeWorkoutContent').style.display = 'none';
}

function showSummaryModal(summary) {
  document.getElementById('summaryWorkoutName').textContent = summary.title;
  document.getElementById('summaryDuration').textContent = summary.duration;
  document.getElementById('summaryVolume').textContent = summary.volume;
  document.getElementById('summarySets').textContent = summary.sets;

  const prsSection = document.getElementById('summaryPrsSection');
  const prsList = document.getElementById('summaryPrsList');
  if (summary.newPrs && summary.newPrs.length > 0) {
    prsSection.style.display = 'block';
    prsList.innerHTML = summary.newPrs.map(pr => `
      <div style="font-size: 12px; color: #fff; margin-bottom: 2px;">
        ⭐ <strong>${pr.exercise}:</strong> ${pr.weight} kg × ${pr.reps} reps
      </div>
    `).join('');
  } else {
    prsSection.style.display = 'none';
  }

  // Configurar botón WhatsApp
  const shareBtn = document.getElementById('shareWhatsAppBtn');
  shareBtn.onclick = () => {
    const text = encodeURIComponent(
      `💪 *Entreno CGM Performance Completado*\n` +
      `📅 *Sesión:* ${summary.title}\n` +
      `⏱️ *Tiempo:* ${summary.duration}\n` +
      `🏋️ *Volumen total:* ${summary.volume}\n` +
      `✅ *Series realizadas:* ${summary.sets}\n` +
      (summary.newPrs.length > 0 ? `🔥 *Récords hoy:* ${summary.newPrs.map(p => `${p.exercise} (${p.weight}kg)`).join(', ')}\n` : '') +
      `\n_Plan personalizado Carlos Graña · Frecuencia 1,5_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  document.getElementById('summaryModal').classList.add('open');
}

// =============================================================================
// HISTORIAL & RECORDS PERSONALES (PRs)
// =============================================================================
function renderHistory() {
  const container = document.getElementById('historyList');
  const badge = document.getElementById('historyCountBadge');
  if (!container) return;

  if (badge) badge.textContent = `${appState.history.length} sesiones`;

  if (appState.history.length === 0) {
    container.innerHTML = `
      <div class="cgm-card text-center" style="padding: 28px 16px;">
        <p style="color: var(--text-dim); font-size: 13px;">No hay entrenamientos guardados todavía.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.history.map(item => {
    const dateObj = new Date(item.date);
    const dateFormatted = dateObj.toLocaleDateString('es-ES', { 
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
    });

    return `
      <div class="history-item">
        <div class="history-header">
          <div>
            <div class="history-title">${item.title}</div>
            <div class="history-date">${dateFormatted}</div>
          </div>
          <span class="badge-gold">${item.workoutId}</span>
        </div>
        <div class="history-stats-row">
          <div class="history-stat">⏱ <strong>${item.durationMinutes} min</strong></div>
          <div class="history-stat">⚖ <strong>${item.totalVolumeKg.toLocaleString('es-ES')} kg</strong></div>
          <div class="history-stat">✓ <strong>${item.setsCompleted} series</strong></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderPRs() {
  const grid = document.getElementById('prsGrid');
  if (!grid) return;

  const entries = Object.entries(appState.prs);
  if (entries.length === 0) {
    grid.innerHTML = `
      <div style="font-size: 12px; color: var(--text-dim); text-align: center; padding: 10px;">
        Se registrarán automáticamente al completar tus series pesadas.
      </div>
    `;
    return;
  }

  // Mapear ID de ejercicio a nombre
  const idToName = {};
  Object.values(WORKOUT_DAYS).forEach(w => {
    w.exercises.forEach(e => {
      idToName[e.id] = e.name;
    });
  });

  grid.innerHTML = entries.map(([id, weight]) => `
    <div class="pr-card">
      <span class="pr-name">${idToName[id] || id}</span>
      <span class="pr-val">${weight} kg</span>
    </div>
  `).join('');
}

// =============================================================================
// CALCULADORA DE DISCOS (PLATE CALCULATOR)
// =============================================================================
function updatePlateCalculator() {
  const targetWeightInput = document.getElementById('calcTargetWeight');
  const barWeightSelect = document.getElementById('calcBarWeight');
  const weightPerSideLabel = document.getElementById('weightPerSideLabel');
  const visualContainer = document.getElementById('platesVisual');
  const textList = document.getElementById('platesTextList');

  if (!targetWeightInput || !barWeightSelect) return;

  const target = parseFloat(targetWeightInput.value) || 0;
  const bar = parseFloat(barWeightSelect.value) || 0;

  if (target < bar) {
    if (weightPerSideLabel) weightPerSideLabel.textContent = '0 kg (el peso objetivo es menor a la barra)';
    if (visualContainer) visualContainer.innerHTML = '';
    if (textList) textList.textContent = '';
    return;
  }

  const weightNeeded = target - bar;
  const perSide = weightNeeded / 2;

  if (weightPerSideLabel) {
    weightPerSideLabel.textContent = `${perSide.toFixed(2).replace('.00', '')} kg por lado`;
  }

  // Discos estándar disponibles en la mayoría de gimnasios (kg)
  const plateTypes = [
    { weight: 25, css: 'plate-25', label: '25' },
    { weight: 20, css: 'plate-20', label: '20' },
    { weight: 15, css: 'plate-15', label: '15' },
    { weight: 10, css: 'plate-10', label: '10' },
    { weight: 5,  css: 'plate-5',  label: '5' },
    { weight: 2.5, css: 'plate-2_5', label: '2.5' },
    { weight: 1.25, css: 'plate-1_25', label: '1.25' }
  ];

  let remaining = perSide;
  const platesUsed = [];

  for (const plate of plateTypes) {
    const count = Math.floor(remaining / plate.weight);
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        platesUsed.push(plate);
      }
      remaining = (remaining % plate.weight).toFixed(2);
    }
  }

  // Render visual
  if (visualContainer) {
    visualContainer.innerHTML = platesUsed.map(p => `
      <div class="plate-disc ${p.css}" title="${p.weight} kg">${p.label}</div>
    `).join('');
  }

  // Resumen en texto
  if (textList) {
    if (platesUsed.length === 0) {
      textList.textContent = 'Solo la barra vacía.';
    } else {
      const counts = {};
      platesUsed.forEach(p => { counts[p.weight] = (counts[p.weight] || 0) + 1; });
      const breakdown = Object.entries(counts).map(([w, c]) => `${c}×${w}kg`).join(', ');
      textList.textContent = `Discos por lado: ${breakdown}`;
    }
  }
}

// =============================================================================
// CALCULADORA RÁPIDA DE BACK-OFF (-20%)
// =============================================================================
function updateQuickBackOff() {
  const topInput = document.getElementById('topSetInput');
  const resultDiv = document.getElementById('backOffResult');
  if (!topInput || !resultDiv) return;

  const topWeight = parseFloat(topInput.value) || 0;
  if (topWeight <= 0) {
    resultDiv.textContent = '0.0 kg';
    return;
  }

  const rawBackOff = topWeight * 0.8;
  const rounded = (Math.round(rawBackOff / 2.5) * 2.5).toFixed(1);
  resultDiv.textContent = `${rounded} kg (−20%)`;
}

// =============================================================================
// CONFETTI CELEBRACIÓN
// =============================================================================
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#D4AF37', '#FDE68A', '#997819', '#ffffff', '#10B981', '#38BDF8'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravedad
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}

// =============================================================================
// MANEJADORES DE EVENTOS GLOBALES
// =============================================================================
function setupEventListeners() {
  // Navegación Bottom Bar
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const tabId = e.currentTarget.dataset.tab;
      if (tabId) switchTab(tabId);
    });
  });

  // Selector de Semanas
  document.querySelectorAll('.week-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const week = parseInt(e.currentTarget.dataset.week, 10);
      renderScheduleWeek(week);
    });
  });

  // Botón empezar entreno de hoy
  const startTodayBtn = document.getElementById('startTodayWorkoutBtn');
  if (startTodayBtn) {
    startTodayBtn.addEventListener('click', () => {
      const wId = startTodayBtn.dataset.workoutId || 'D1';
      startWorkout(wId);
    });
  }

  // Selector directo de días (D1, D2, D3, D4)
  document.querySelectorAll('.direct-day-card').forEach(card => {
    card.addEventListener('click', () => {
      const dayId = card.dataset.day;
      if (dayId) startWorkout(dayId);
    });
  });

  // Ir a rutina desde vacío
  const goToRoutineBtn = document.getElementById('goToRoutineBtn');
  if (goToRoutineBtn) {
    goToRoutineBtn.addEventListener('click', () => switchTab('tab-routine'));
  }

  // Finalizar entreno
  const finishBtn = document.getElementById('finishWorkoutBtn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      const confirmFinish = confirm('¿Has completado tu entrenamiento y deseas guardar los resultados?');
      if (confirmFinish) finishWorkout();
    });
  }

  // Descartar entreno
  const discardBtn = document.getElementById('discardWorkoutBtn');
  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      const confirmDiscard = confirm('¿Estás seguro de descartar esta sesión? Los datos no guardados se perderán.');
      if (confirmDiscard) {
        appState.activeWorkout = null;
        saveAppState();
        if (appState.workoutTimerInterval) clearInterval(appState.workoutTimerInterval);
        stopRestTimer();
        toggleWakeLock(false);
        document.getElementById('noActiveWorkoutView').style.display = 'block';
        document.getElementById('activeWorkoutContent').style.display = 'none';
        switchTab('tab-routine');
      }
    });
  }

  // Controles Rest Timer
  document.getElementById('timerAdd15Btn')?.addEventListener('click', () => {
    appState.restTimer.remaining += 15;
    appState.restTimer.duration += 15;
    updateTimerDisplay();
  });

  document.getElementById('timerSub15Btn')?.addEventListener('click', () => {
    appState.restTimer.remaining = Math.max(0, appState.restTimer.remaining - 15);
    updateTimerDisplay();
    if (appState.restTimer.remaining === 0) onTimerFinished();
  });

  document.getElementById('timerSkipBtn')?.addEventListener('click', () => {
    stopRestTimer();
    document.getElementById('restTimerBar')?.classList.remove('visible');
  });

  document.getElementById('timerCloseBtn')?.addEventListener('click', () => {
    document.getElementById('restTimerBar')?.classList.remove('visible');
  });

  // Header quick buttons
  document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
    appState.settings.soundEnabled = !appState.settings.soundEnabled;
    saveAppState();
    const btn = document.getElementById('soundToggleBtn');
    btn.classList.toggle('active', appState.settings.soundEnabled);
    btn.textContent = appState.settings.soundEnabled ? '🔔' : '🔕';
    const check = document.getElementById('settingSound');
    if (check) check.checked = appState.settings.soundEnabled;
  });

  document.getElementById('wakeLockBtn')?.addEventListener('click', () => {
    const isCurrentlyActive = !!appState.wakeLockSentinel;
    toggleWakeLock(!isCurrentlyActive);
  });

  document.getElementById('plateCalcQuickBtn')?.addEventListener('click', () => {
    switchTab('tab-tools');
  });

  // Modal de resumen - cerrar
  document.getElementById('closeSummaryModalBtn')?.addEventListener('click', () => {
    document.getElementById('summaryModal')?.classList.remove('open');
    switchTab('tab-routine');
  });

  // Calculadora de Discos listeners
  document.getElementById('calcTargetWeight')?.addEventListener('input', updatePlateCalculator);
  document.getElementById('calcBarWeight')?.addEventListener('change', updatePlateCalculator);

  // Calculadora Back-Off rápida
  document.getElementById('topSetInput')?.addEventListener('input', updateQuickBackOff);
  updateQuickBackOff();

  // Settings listeners
  document.getElementById('settingSound')?.addEventListener('change', (e) => {
    appState.settings.soundEnabled = e.target.checked;
    saveAppState();
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.classList.toggle('active', appState.settings.soundEnabled);
      btn.textContent = appState.settings.soundEnabled ? '🔔' : '🔕';
    }
  });

  document.getElementById('settingVibrate')?.addEventListener('change', (e) => {
    appState.settings.vibrateEnabled = e.target.checked;
    saveAppState();
  });

  document.getElementById('settingDefaultRest')?.addEventListener('change', (e) => {
    appState.settings.defaultRestSeconds = parseInt(e.target.value, 10);
    saveAppState();
  });

  // Exportar / Importar Datos JSON
  document.getElementById('exportDataBtn')?.addEventListener('click', exportUserData);
  document.getElementById('importDataInput')?.addEventListener('change', importUserData);
  document.getElementById('resetDataBtn')?.addEventListener('click', resetAllData);
}

// =============================================================================
// GESTIÓN DE DATOS (EXPORTACIÓN & IMPORTACIÓN JSON)
// =============================================================================
function exportUserData() {
  const data = {
    app: 'CGM Performance Workout',
    version: '1.0',
    exportDate: new Date().toISOString(),
    history: appState.history,
    prs: appState.prs,
    settings: appState.settings,
    currentWeek: appState.currentWeek
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `cgm-workout-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importUserData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.history) appState.history = data.history;
      if (data.prs) appState.prs = data.prs;
      if (data.settings) appState.settings = { ...DEFAULT_SETTINGS, ...data.settings };
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
  const confirmReset = confirm('ADVERTENCIA: ¿Seguro que deseas borrar todo el historial y récords? Esta acción no se puede deshacer.');
  if (confirmReset) {
    localStorage.clear();
    appState.history = [];
    appState.prs = {};
    appState.activeWorkout = null;
    appState.settings = { ...DEFAULT_SETTINGS };
    location.reload();
  }
}

// =============================================================================
// CONFIGURACIÓN PWA & OFFLINE (SERVICE WORKER & INSTALL PROMPT)
// =============================================================================
function setupPWA() {
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('ServiceWorker CGM registrado correctamente:', reg.scope);
    }).catch((err) => {
      console.log('ServiceWorker no disponible en este entorno:', err);
    });
  }

  // Manejar banner de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    appState.deferredPwaPrompt = e;
    const banner = document.getElementById('pwaBanner');
    if (banner) banner.classList.add('show');
  });

  const installBtn = document.getElementById('pwaInstallBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (appState.deferredPwaPrompt) {
        appState.deferredPwaPrompt.prompt();
        const { outcome } = await appState.deferredPwaPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('PWA instalada');
        }
        appState.deferredPwaPrompt = null;
        document.getElementById('pwaBanner')?.classList.remove('show');
      } else {
        alert('Para instalar en iPhone: pulsa el botón Compartir de Safari y selecciona "Añadir a pantalla de inicio". En Android: pulsa los tres puntos y "Instalar aplicación".');
      }
    });
  }
}
