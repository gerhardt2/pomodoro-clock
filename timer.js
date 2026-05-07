// timer.js — engine do countdown
// Este módulo só sabe contar. Não toca no DOM.
// Ele chama callbacks que o app.js fornece — isso mantém os módulos desacoplados.

import { state, startTimer, pauseTimer, tickTimer, isSessionOver, advancePhase } from './state.js';

let intervalId = null; // referência ao setInterval — precisamos para limpar depois

// Formata segundos para "MM:SS" — ex: 1500 → "25:00"
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // padStart garante dois dígitos: 5 → "05"
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Calcula o progresso de 0 a 1 (1 = cheio, 0 = vazio)
// Usado pelo ui.js para animar o anel SVG
export function getProgress() {
  const total = state.durations[state.phase];
  return total > 0 ? state.timeRemaining / total : 0;
}

// Inicia o countdown. onTick e onSessionEnd são callbacks do app.js
export function start(onTick, onSessionEnd) {
  if (intervalId !== null) return; // evita criar dois intervalos em paralelo

  startTimer();

  intervalId = setInterval(() => {
    tickTimer();        // decrementa state.timeRemaining
    onTick();          // app.js atualiza a UI

    if (isSessionOver()) {
      stop();          // para o interval
      onSessionEnd();  // app.js decide o que fazer (tocar som, avançar fase)
    }
  }, 1000);
}

// Para o countdown sem resetar o tempo
export function pause() {
  stop();
  pauseTimer();
}

// Limpa o interval — função interna
function stop() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Para e reseta para o início da fase atual
export function reset(onReset) {
  stop();
  // advancePhase não é chamada aqui — apenas volta ao início da fase atual
  import('./state.js').then(({ resetTimer }) => {
    resetTimer();
    onReset();
  });
}
