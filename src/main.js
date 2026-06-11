/**
 * Friday Fishing — Main entry point.
 * Orchestrates the aquarium, fishing game, and player identity.
 */

import { startFishingGame } from './fishing-game.js';
import { getAquariumFish, addFishToAquarium, renderAquarium, renderNewFish } from './aquarium.js';
import { rarityColor } from './fish-data.js';

// === Player identity ===
const PLAYER_KEY = 'fridayfish_player';

function getPlayerName() {
  return localStorage.getItem(PLAYER_KEY);
}

function setPlayerName(name) {
  localStorage.setItem(PLAYER_KEY, name);
}

// === Init ===
function init() {
  createBubbles();
  renderAquarium();
  updateFishCount();

  const playerName = getPlayerName();
  if (!playerName) {
    showPlayerSetup();
  }

  // Bind cast button
  document.getElementById('cast-button').addEventListener('click', onCast);

  // Bind player name confirm
  document.getElementById('player-name-confirm').addEventListener('click', onPlayerNameConfirm);

  // Bind fish name confirm
  document.getElementById('confirm-name-button').addEventListener('click', onFishNameConfirm);

  // Allow enter key on inputs
  document.getElementById('player-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onPlayerNameConfirm();
  });
  document.getElementById('fish-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onFishNameConfirm();
  });

  // Simple presence counter (local only for now, will use playhtml later)
  updatePresence();
}

// === Bubbles ===
function createBubbles() {
  const container = document.getElementById('bubbles');
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 4 + Math.random() * 12;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${6 + Math.random() * 10}s`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(bubble);
  }
}

// === Player setup ===
function showPlayerSetup() {
  document.getElementById('player-setup').classList.remove('hidden');
}

function onPlayerNameConfirm() {
  const input = document.getElementById('player-name-input');
  const name = input.value.trim();
  if (!name) return;

  setPlayerName(name);
  document.getElementById('player-setup').classList.add('hidden');
  showToast(`Welcome, ${name}! 🎣`);
}

// === Fishing ===
let pendingCatch = null;

function onCast() {
  const playerName = getPlayerName();
  if (!playerName) {
    showPlayerSetup();
    return;
  }

  startFishingGame({
    onCatch: (fish) => {
      pendingCatch = fish;
      showNamePrompt(fish);
    },
    onEscape: (fish) => {
      showToast(`The ${fish.name} got away! 💨`);
    },
  });
}

// === Name prompt ===
function showNamePrompt(fish) {
  document.getElementById('caught-species').textContent = fish.name;
  document.getElementById('caught-fish-preview').textContent = fish.emoji;
  document.getElementById('fish-name-input').value = '';
  document.getElementById('name-prompt').classList.remove('hidden');
  document.getElementById('fish-name-input').focus();
}

function onFishNameConfirm() {
  const input = document.getElementById('fish-name-input');
  const customName = input.value.trim() || pendingCatch.name; // default to species name

  const fishRecord = {
    species: pendingCatch.name,
    emoji: pendingCatch.emoji,
    rarity: pendingCatch.rarity,
    customName: customName,
    caughtBy: getPlayerName(),
    timestamp: Date.now(),
  };

  addFishToAquarium(fishRecord);
  renderNewFish(fishRecord);
  updateFishCount();

  document.getElementById('name-prompt').classList.add('hidden');
  pendingCatch = null;

  showToast(`${getPlayerName()} caught & named: "${customName}" 🎣`);
}

// === Toasts ===
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// === Presence (placeholder — will be playhtml) ===
function updatePresence() {
  // For now just show 1 (you). With playhtml this becomes live.
  document.getElementById('player-count').textContent = '1';
}

// === Fish count ===
function updateFishCount() {
  const count = getAquariumFish().length;
  // Could display this somewhere if desired
}

// === Start ===
document.addEventListener('DOMContentLoaded', init);
