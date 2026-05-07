// ui.js — tudo que toca no DOM fica aqui
// Recebe dados do state e do timer, nunca faz lógica de negócio.

import { state, PHASES } from './state.js';
import { formatTime, getProgress } from './timer.js';

// --- Referências ao DOM (buscamos uma vez, reusamos sempre) ---
const timeDisplay   = document.getElementById('time-display');
const phaseLabel    = document.getElementById('phase-label');
const cycleCount    = document.getElementById('cycle-count');
const startBtn      = document.getElementById('btn-start');
const pauseBtn      = document.getElementById('btn-pause');
const resetBtn      = document.getElementById('btn-reset');
const ringProgress  = document.getElementById('ring-progress'); // <circle> do SVG
const body          = document.body;

// Circunferência do anel SVG (raio = 90 no index.html)
// Circunferência = 2 * π * r = 2 * 3.14159 * 90 ≈ 565.5
const RING_CIRCUMFERENCE = 2 * Math.PI * 90;

// Inicializa o anel SVG com o valor correto de stroke-dasharray
export function initRing() {
  ringProgress.style.strokeDasharray = RING_CIRCUMFERENCE;
}

// Chamada a cada segundo pelo timer (via onTick)
export function updateDisplay() {
  // Atualiza o texto do timer
  timeDisplay.textContent = formatTime(state.timeRemaining);

  // Atualiza o título da aba — muito útil quando o usuário muda de aba
  document.title = `${formatTime(state.timeRemaining)} — ${PHASES[state.phase].label}`;

  // Anima o anel: 1 = cheio (stroke-dashoffset = 0), 0 = vazio (= circunferência)
  const progress = getProgress();
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  ringProgress.style.strokeDashoffset = offset;

  // Atualiza label da fase e contador de ciclos
  phaseLabel.textContent = PHASES[state.phase].label;
  cycleCount.textContent = `Ciclo ${state.cycleCount + 1}`;
}

// Troca a cor de fundo conforme a fase — usa CSS custom property
export function updatePhaseColor() {
  const colorVar = PHASES[state.phase].colorVar;
  body.style.setProperty('--current-color', `var(${colorVar})`);
  // Também atualiza a cor do anel
  ringProgress.style.stroke = `var(${colorVar})`;
}

// Alterna botões start/pause conforme estado
export function updateButtons() {
  startBtn.style.display = state.isRunning ? 'none' : 'inline-flex';
  pauseBtn.style.display = state.isRunning ? 'inline-flex' : 'none';
}

// Toca um beep simples com Web Audio API ao fim da sessão
export function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.frequency.value = 880; // nota A5
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
  } catch (e) {
    // Web Audio API pode ser bloqueada sem interação do usuário — ignora silenciosamente
    console.warn('Web Audio API não disponível:', e);
  }
}

// Renderização completa — chame quando mudar de fase
export function renderAll() {
  updateDisplay();
  updatePhaseColor();
  updateButtons();
}
