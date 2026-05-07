// storage.js — persistência com localStorage
import { state, updateDuration } from './state.js';

const STORAGE_KEY = 'pomodoro-config';

export function saveConfig() {
  const config = {
    WORK:        state.durations.WORK / 60,
    SHORT_BREAK: state.durations.SHORT_BREAK / 60,
    LONG_BREAK:  state.durations.LONG_BREAK / 60,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const config = JSON.parse(saved);
    if (config.WORK)        updateDuration('WORK',        config.WORK);
    if (config.SHORT_BREAK) updateDuration('SHORT_BREAK', config.SHORT_BREAK);
    if (config.LONG_BREAK)  updateDuration('LONG_BREAK',  config.LONG_BREAK);
  } catch (e) {
    // Se o JSON estiver corrompido, ignora e usa defaults
    console.warn('Erro ao carregar config:', e);
  }
}
