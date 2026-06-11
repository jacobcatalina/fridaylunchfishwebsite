/**
 * Aquarium module — manages fish in the shared tank (visual rendering).
 * Uses localStorage as fallback; playhtml syncs across players.
 */

import { createSpriteElement, speciesToKey, hasSprite } from './sprites.js';
import { ENVIRONMENT_SPRITES } from './sprite-config.js';

const STORAGE_KEY = 'fridayfish_aquarium';
const MAX_FISH = 100;

/**
 * Get all fish from local storage.
 */
export function getAquariumFish() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Add a fish to local aquarium storage.
 */
export function addFishToAquarium(fish) {
  const current = getAquariumFish();
  current.push(fish);
  const trimmed = current.slice(-MAX_FISH);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return trimmed;
}

/**
 * Render all fish into the aquarium container.
 */
export function renderAquarium(fishList) {
  const container = document.getElementById('fish-container');
  container.innerHTML = '';

  const fish = fishList || getAquariumFish();
  fish.forEach((f, i) => {
    const el = createFishElement(f, i);
    container.appendChild(el);
  });
}

/**
 * Add a single new fish to the rendered aquarium (no full re-render).
 */
export function renderNewFish(fish) {
  const container = document.getElementById('fish-container');
  const i = container.children.length;
  const el = createFishElement(fish, i);
  container.appendChild(el);
}

function createFishElement(fish, index) {
  const el = document.createElement('div');
  el.className = 'aquarium-fish';

  // Random position within the tank
  const top = 10 + Math.random() * 60;
  const left = Math.random() * 85;
  const duration = 4 + Math.random() * 6;
  const delay = Math.random() * -10;
  const direction = Math.random() > 0.5 ? 1 : -1;

  el.style.top = `${top}%`;
  el.style.left = `${left}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `${delay}s`;

  // Use sprite if available, otherwise emoji
  const speciesKey = fish.spriteKey || speciesToKey(fish.species);
  const sprite = createSpriteElement(speciesKey, fish.emoji, 48);
  if (direction === -1) {
    sprite.style.transform = (sprite.style.transform || '') + ' scaleX(-1)';
  }

  const label = document.createElement('span');
  label.className = 'fish-label';
  label.textContent = fish.customName || fish.species;

  el.appendChild(sprite);
  el.appendChild(label);

  // Tap to see details
  el.addEventListener('click', () => {
    const weight = fish.weight ? ` — ${fish.weight} lbs` : '';
    showFishToast(`"${fish.customName}" (${fish.species})${weight} — caught by ${fish.caughtBy}`);
  });

  return el;
}

function showFishToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/**
 * Render environment decorations (corals, seaweed, rocks, etc.) in the aquarium.
 * These are purely visual and placed along the bottom/sides.
 */
export function renderEnvironment() {
  const aquarium = document.getElementById('aquarium');

  // Remove any existing decorations
  aquarium.querySelectorAll('.env-decoration').forEach(el => el.remove());

  // Bottom decorations: corals, rocks, shells along the ground
  const bottomItems = [
    ...pickRandom(ENVIRONMENT_SPRITES.corals, 3),
    ...pickRandom(ENVIRONMENT_SPRITES.rocks, 2),
    ...pickRandom(ENVIRONMENT_SPRITES.shells, 2),
  ];

  bottomItems.forEach((src, i) => {
    const el = document.createElement('img');
    el.className = 'env-decoration env-bottom';
    el.src = src;
    el.alt = '';
    el.loading = 'lazy';
    // Spread across the bottom
    const left = (i / bottomItems.length) * 85 + Math.random() * 10;
    el.style.left = `${left}%`;
    el.style.bottom = `${10 + Math.random() * 20}px`;
    el.style.width = `${40 + Math.random() * 40}px`;
    el.style.opacity = `${0.7 + Math.random() * 0.3}`;
    if (Math.random() > 0.5) el.style.transform = 'scaleX(-1)';
    aquarium.appendChild(el);
  });

  // Tall plants/seaweed from the ground up
  const tallItems = pickRandom(ENVIRONMENT_SPRITES.seaweed, 4);
  tallItems.forEach((src, i) => {
    const el = document.createElement('img');
    el.className = 'env-decoration env-tall';
    el.src = src;
    el.alt = '';
    el.loading = 'lazy';
    const left = (i / tallItems.length) * 90 + Math.random() * 8;
    el.style.left = `${left}%`;
    el.style.bottom = '20px';
    el.style.height = `${80 + Math.random() * 60}px`;
    el.style.width = 'auto';
    el.style.opacity = `${0.5 + Math.random() * 0.3}`;
    if (Math.random() > 0.5) el.style.transform = 'scaleX(-1)';
    aquarium.appendChild(el);
  });

  // Background floating plants (smaller, more transparent, higher up)
  const bgItems = pickRandom(ENVIRONMENT_SPRITES.plants, 3);
  bgItems.forEach((src, i) => {
    const el = document.createElement('img');
    el.className = 'env-decoration env-bg';
    el.src = src;
    el.alt = '';
    el.loading = 'lazy';
    el.style.left = `${Math.random() * 80}%`;
    el.style.top = `${20 + Math.random() * 40}%`;
    el.style.width = `${30 + Math.random() * 30}px`;
    el.style.opacity = `${0.25 + Math.random() * 0.2}`;
    aquarium.appendChild(el);
  });
}

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
