// state.js — fonte única de verdade do app
// Toda mudança de estado acontece aqui. Nenhum outro arquivo
// guarda dados sobre a sessão atual — eles sempre consultam este objeto.

export const PHASES = {
  WORK:        { label: 'Foco',        duration: 25 * 60, colorVar: '--color-work'  },
  SHORT_BREAK: { label: 'Pausa curta', duration:  5 * 60, colorVar: '--color-short' },
  LONG_BREAK:  { label: 'Pausa longa', duration: 15 * 60, colorVar: '--color-long'  },
};

// Estado inicial da aplicação
const initialState = {
  phase:          'WORK',   // chave de PHASES
  timeRemaining:  25 * 60,  // segundos
  isRunning:      false,
  cycleCount:     0,        // quantas sessões WORK foram concluídas
  // Durações customizáveis (podem ser alteradas nas configurações)
  durations: {
    WORK:        25 * 60,
    SHORT_BREAK:  5 * 60,
    LONG_BREAK:  15 * 60,
  },
};

// Clonamos para não mutar o objeto inicial (boa prática)
export let state = { ...initialState, durations: { ...initialState.durations } };

// --- Funções de transição de estado ---

export function startTimer() {
  state.isRunning = true;
}

export function pauseTimer() {
  state.isRunning = false;
}

export function resetTimer() {
  state.isRunning = false;
  state.timeRemaining = state.durations[state.phase];
}

export function tickTimer() {
  if (state.timeRemaining > 0) {
    state.timeRemaining -= 1;
  }
}

export function isSessionOver() {
  return state.timeRemaining === 0;
}

// Decide qual é a próxima fase e avança para ela
export function advancePhase() {
  if (state.phase === 'WORK') {
    state.cycleCount += 1;
    // A cada 4 sessões de foco, damos uma pausa longa
    state.phase = state.cycleCount % 4 === 0 ? 'LONG_BREAK' : 'SHORT_BREAK';
  } else {
    // Qualquer pausa volta para trabalho
    state.phase = 'WORK';
  }
  state.timeRemaining = state.durations[state.phase];
  state.isRunning = false;
}

export function updateDuration(phase, minutes) {
  const seconds = minutes * 60;
  state.durations[phase] = seconds;
  // Se mudarmos a fase atual, aplicamos imediatamente
  if (state.phase === phase && !state.isRunning) {
    state.timeRemaining = seconds;
  }
}
