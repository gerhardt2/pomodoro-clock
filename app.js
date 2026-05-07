// app.js — orquestrador
// Este arquivo conecta todos os módulos e registra os event listeners.
// Ele não tem lógica de timer nem de DOM — apenas delega.

import { state, advancePhase, updateDuration } from './state.js';
import { start, pause, reset } from './timer.js';
import { renderAll, playBell, initRing } from './ui.js';
import { loadConfig, saveConfig } from './storage.js';

// --- Inicialização ---
function init() {
  loadConfig(); // carrega durações salvas no localStorage (se existirem)
  initRing();   // configura stroke-dasharray do anel SVG
  renderAll();  // renderiza estado inicial na tela
  bindEvents(); // registra todos os event listeners
}

// --- Event listeners ---
function bindEvents() {
  document.getElementById('btn-start').addEventListener('click', handleStart);
  document.getElementById('btn-pause').addEventListener('click', handlePause);
  document.getElementById('btn-reset').addEventListener('click', handleReset);
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('btn-settings-save').addEventListener('click', saveSettings);
  document.getElementById('btn-settings-close').addEventListener('click', closeSettings);
}

// --- Handlers ---
function handleStart() {
  start(
    () => renderAll(),           // onTick: atualiza UI a cada segundo
    () => handleSessionEnd()     // onSessionEnd: fim de sessão
  );
  renderAll();
}

function handlePause() {
  pause();
  renderAll();
}

function handleReset() {
  reset(() => renderAll());
}

function handleSessionEnd() {
  playBell();
  advancePhase(); // state.js decide qual é a próxima fase
  renderAll();    // atualiza UI com nova fase
  // Auto-inicia a próxima sessão após 1.5s (opcional — pode remover se preferir)
  // setTimeout(handleStart, 1500);
}

// --- Configurações ---
function openSettings() {
  document.getElementById('modal-settings').style.display = 'flex';
  // Preenche os inputs com os valores atuais
  document.getElementById('input-work').value        = state.durations.WORK / 60;
  document.getElementById('input-short').value       = state.durations.SHORT_BREAK / 60;
  document.getElementById('input-long').value        = state.durations.LONG_BREAK / 60;
}

function closeSettings() {
  document.getElementById('modal-settings').style.display = 'none';
}

function saveSettings() {
  const work  = parseInt(document.getElementById('input-work').value, 10);
  const short = parseInt(document.getElementById('input-short').value, 10);
  const long  = parseInt(document.getElementById('input-long').value, 10);

  // Validação básica: valores entre 1 e 60 minutos
  if ([work, short, long].some(v => isNaN(v) || v < 1 || v > 60)) {
    alert('Por favor insira valores entre 1 e 60 minutos.');
    return;
  }

  updateDuration('WORK', work);
  updateDuration('SHORT_BREAK', short);
  updateDuration('LONG_BREAK', long);
  saveConfig();
  closeSettings();
  renderAll();
}

// Inicia tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
