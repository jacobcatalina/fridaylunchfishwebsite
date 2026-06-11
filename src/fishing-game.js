/**
 * Fishing minigame — Stardew Valley-style catch mechanic.
 *
 * - A fish target drifts up and down in a vertical bar.
 * - Player holds (tap/click) to raise a "catch zone" bar.
 * - Overlap = progress fills. No overlap = progress drains.
 * - Fill to 100% = catch. Drain to 0% = escape.
 *
 * Now accepts modifiers from the upgrade system.
 */

import { rollFish, rollWeight, rollSize } from './fish-data.js';
import { getModifiers } from './shop.js';

let gameActive = false;
let animFrame = null;

// Game state
let fishY = 0.5;
let fishVelocity = 0;
let catchZoneY = 0.8;
let catchZoneVelocity = 0;
let progress = 0.4;
let isHolding = false;
let currentFish = null;
let currentWeight = 0;
let currentSize = 0;

// Tuning constants (base values, modified by upgrades)
const BASE_CATCH_ZONE_HEIGHT = 0.18;
const FISH_SIZE = 0.07;
const GRAVITY = 0.0015;
const LIFT = -0.004;
const MAX_VELOCITY = 0.02;
const PROGRESS_GAIN = 0.005;
const BASE_PROGRESS_DRAIN = 0.003;
const FISH_CHANGE_INTERVAL = 60;

let fishChangeTimer = 0;
let fishDirection = 1;
let modifiers = {};

// Callbacks
let onCatch = null;
let onEscape = null;

export function startFishingGame(callbacks) {
  onCatch = callbacks.onCatch;
  onEscape = callbacks.onEscape;

  // Get current modifiers from upgrades
  modifiers = getModifiers();

  // Roll a fish based on accessible depth + bait rarity boost
  currentFish = rollFish(modifiers.maxDepth, modifiers.rarityBoost);

  // Roll weight with charm bonus
  currentWeight = rollWeight(currentFish) * modifiers.weightBonus;
  currentWeight = Math.round(currentWeight * 100) / 100;

  // Roll size
  currentSize = rollSize(currentFish, currentWeight);

  // Reset state
  fishY = 0.3 + Math.random() * 0.4;
  fishVelocity = 0;
  catchZoneY = 0.8;
  catchZoneVelocity = 0;
  progress = modifiers.startingProgress; // net upgrade affects starting progress
  isHolding = false;
  fishChangeTimer = 0;
  fishDirection = Math.random() > 0.5 ? 1 : -1;

  // Show the game
  const gameEl = document.getElementById('fishing-game');
  gameEl.classList.remove('hidden');

  // Update instruction with fish depth hint
  const depthNames = { 1: 'Surface', 2: 'Mid-water', 3: 'Deep' };
  const instruction = document.getElementById('fishing-instruction');
  instruction.textContent = `Hold anywhere to raise the bar! [${depthNames[currentFish.depth] || 'Surface'}]`;

  gameActive = true;
  bindInput();
  tick();
}

export function stopFishingGame() {
  gameActive = false;
  if (animFrame) cancelAnimationFrame(animFrame);

  const gameEl = document.getElementById('fishing-game');
  gameEl.classList.add('hidden');

  unbindInput();
}

export function getCurrentCatch() {
  return {
    fish: currentFish,
    weight: currentWeight,
    size: currentSize,
  };
}

function tick() {
  if (!gameActive) return;

  updateFish();
  updateCatchZone();
  updateProgress();
  render();

  // Check win/lose
  if (progress >= 1) {
    stopFishingGame();
    if (onCatch) onCatch(currentFish, currentWeight, currentSize);
    return;
  }
  if (progress <= 0) {
    stopFishingGame();
    if (onEscape) onEscape(currentFish);
    return;
  }

  animFrame = requestAnimationFrame(tick);
}

function updateFish() {
  // Apply sonar speed reduction
  const speed = currentFish.speed * modifiers.fishSpeedReduction;

  fishChangeTimer++;
  const interval = FISH_CHANGE_INTERVAL / speed;

  if (fishChangeTimer > interval) {
    fishChangeTimer = 0;
    if (Math.random() < 0.3) {
      fishDirection *= -1;
    }
    fishVelocity += fishDirection * (0.005 + Math.random() * 0.01) * speed;
  }

  // Random jitter for rare/legendary fish
  if ((currentFish.rarity === 'rare' || currentFish.rarity === 'legendary') && Math.random() < 0.05) {
    fishVelocity += (Math.random() - 0.5) * 0.02;
  }

  // Extra erratic for legendary
  if (currentFish.rarity === 'legendary' && Math.random() < 0.03) {
    fishVelocity += (Math.random() - 0.5) * 0.04;
  }

  fishY += fishVelocity;
  fishVelocity *= 0.97;

  // Clamp to bar
  if (fishY < FISH_SIZE) {
    fishY = FISH_SIZE;
    fishVelocity = Math.abs(fishVelocity) * 0.5;
    fishDirection = 1;
  }
  if (fishY > 1 - FISH_SIZE) {
    fishY = 1 - FISH_SIZE;
    fishVelocity = -Math.abs(fishVelocity) * 0.5;
    fishDirection = -1;
  }
}

function updateCatchZone() {
  if (isHolding) {
    catchZoneVelocity += LIFT;
  } else {
    catchZoneVelocity += GRAVITY;
  }

  catchZoneVelocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, catchZoneVelocity));
  catchZoneY += catchZoneVelocity;

  const zoneHeight = BASE_CATCH_ZONE_HEIGHT * modifiers.catchZoneBonus;

  // Bounce off edges
  if (catchZoneY < 0) {
    catchZoneY = 0;
    catchZoneVelocity = Math.abs(catchZoneVelocity) * 0.3;
  }
  if (catchZoneY > 1 - zoneHeight) {
    catchZoneY = 1 - zoneHeight;
    catchZoneVelocity = -Math.abs(catchZoneVelocity) * 0.3;
  }
}

function updateProgress() {
  const zoneHeight = BASE_CATCH_ZONE_HEIGHT * modifiers.catchZoneBonus;
  const fishTop = fishY - FISH_SIZE / 2;
  const fishBottom = fishY + FISH_SIZE / 2;
  const zoneTop = catchZoneY;
  const zoneBottom = catchZoneY + zoneHeight;

  const overlapping = fishBottom > zoneTop && fishTop < zoneBottom;

  if (overlapping) {
    progress += PROGRESS_GAIN;
  } else {
    // Line upgrade reduces drain
    progress -= BASE_PROGRESS_DRAIN * modifiers.drainReduction;
  }

  progress = Math.max(0, Math.min(1, progress));
}

function render() {
  const barEl = document.getElementById('reel-bar');
  const barHeight = barEl.offsetHeight;
  const zoneHeight = BASE_CATCH_ZONE_HEIGHT * modifiers.catchZoneBonus;

  // Fish target position
  const fishEl = document.getElementById('fish-target');
  const fishTop = fishY * barHeight - 14;
  fishEl.style.top = `${fishTop}px`;

  // Catch zone position
  const zoneEl = document.getElementById('catch-zone');
  const zonePixelHeight = zoneHeight * barHeight;
  const zoneTop = catchZoneY * barHeight;
  zoneEl.style.height = `${zonePixelHeight}px`;
  zoneEl.style.top = `${zoneTop}px`;
  zoneEl.style.bottom = 'auto';

  // Progress bar
  const progressEl = document.getElementById('progress-bar');
  progressEl.style.height = `${progress * 100}%`;

  if (progress > 0.7) {
    progressEl.style.background = 'linear-gradient(180deg, #4ecdc4, #2ba89e)';
  } else if (progress > 0.3) {
    progressEl.style.background = 'linear-gradient(180deg, #f9ca24, #f0932b)';
  } else {
    progressEl.style.background = 'linear-gradient(180deg, #ff6b6b, #c0392b)';
  }
}

// === Input handling ===
function onDown(e) {
  e.preventDefault();
  isHolding = true;
}

function onUp(e) {
  e.preventDefault();
  isHolding = false;
}

function bindInput() {
  const gameEl = document.getElementById('fishing-game');
  gameEl.addEventListener('mousedown', onDown);
  gameEl.addEventListener('mouseup', onUp);
  gameEl.addEventListener('mouseleave', onUp);
  gameEl.addEventListener('touchstart', onDown, { passive: false });
  gameEl.addEventListener('touchend', onUp, { passive: false });
  gameEl.addEventListener('touchcancel', onUp, { passive: false });
}

function unbindInput() {
  const gameEl = document.getElementById('fishing-game');
  gameEl.removeEventListener('mousedown', onDown);
  gameEl.removeEventListener('mouseup', onUp);
  gameEl.removeEventListener('mouseleave', onUp);
  gameEl.removeEventListener('touchstart', onDown);
  gameEl.removeEventListener('touchend', onUp);
  gameEl.removeEventListener('touchcancel', onUp);
}
