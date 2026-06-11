/**
 * Fishing minigame — Stardew Valley-style catch mechanic.
 *
 * - A fish target drifts up and down in a vertical bar.
 * - Player holds (tap/click) to raise a "catch zone" bar.
 * - Overlap = progress fills. No overlap = progress drains.
 * - Fill to 100% = catch. Drain to 0% = escape.
 */

import { rollFish } from './fish-data.js';

let gameActive = false;
let animFrame = null;

// Game state
let fishY = 0.5;        // 0-1, position of fish target (center)
let fishVelocity = 0;
let catchZoneY = 0.8;   // 0-1, position of catch zone (bottom edge)
let catchZoneVelocity = 0;
let progress = 0.4;     // 0-1, starts at 40%
let isHolding = false;
let currentFish = null;

// Tuning constants
const CATCH_ZONE_HEIGHT = 0.2;    // 20% of bar
const FISH_SIZE = 0.07;           // 7% of bar
const GRAVITY = 0.0015;           // catch zone fall speed
const LIFT = -0.004;              // catch zone rise on hold
const MAX_VELOCITY = 0.02;
const PROGRESS_GAIN = 0.005;
const PROGRESS_DRAIN = 0.003;
const FISH_CHANGE_INTERVAL = 60;  // frames between direction changes (base)

let fishChangeTimer = 0;
let fishDirection = 1;

// Callbacks
let onCatch = null;
let onEscape = null;

export function startFishingGame(callbacks) {
  onCatch = callbacks.onCatch;
  onEscape = callbacks.onEscape;

  // Roll a fish
  currentFish = rollFish();

  // Reset state
  fishY = 0.3 + Math.random() * 0.4;
  fishVelocity = 0;
  catchZoneY = 0.8;
  catchZoneVelocity = 0;
  progress = 0.4;
  isHolding = false;
  fishChangeTimer = 0;
  fishDirection = Math.random() > 0.5 ? 1 : -1;

  // Show the game
  const gameEl = document.getElementById('fishing-game');
  gameEl.classList.remove('hidden');

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

function tick() {
  if (!gameActive) return;

  updateFish();
  updateCatchZone();
  updateProgress();
  render();

  // Check win/lose
  if (progress >= 1) {
    stopFishingGame();
    if (onCatch) onCatch(currentFish);
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
  const speed = currentFish.speed;

  fishChangeTimer++;
  const interval = FISH_CHANGE_INTERVAL / speed;

  if (fishChangeTimer > interval) {
    fishChangeTimer = 0;
    // Change direction with some randomness
    if (Math.random() < 0.3) {
      fishDirection *= -1;
    }
    fishVelocity += fishDirection * (0.005 + Math.random() * 0.01) * speed;
  }

  // Random jitter for rare fish
  if (currentFish.rarity === 'rare' && Math.random() < 0.05) {
    fishVelocity += (Math.random() - 0.5) * 0.02;
  }

  fishY += fishVelocity;

  // Damping
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

  // Clamp velocity
  catchZoneVelocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, catchZoneVelocity));

  catchZoneY += catchZoneVelocity;

  // Bounce off edges
  if (catchZoneY < 0) {
    catchZoneY = 0;
    catchZoneVelocity = Math.abs(catchZoneVelocity) * 0.3;
  }
  if (catchZoneY > 1 - CATCH_ZONE_HEIGHT) {
    catchZoneY = 1 - CATCH_ZONE_HEIGHT;
    catchZoneVelocity = -Math.abs(catchZoneVelocity) * 0.3;
  }
}

function updateProgress() {
  // Check if fish overlaps with catch zone
  const fishTop = fishY - FISH_SIZE / 2;
  const fishBottom = fishY + FISH_SIZE / 2;
  const zoneTop = catchZoneY;
  const zoneBottom = catchZoneY + CATCH_ZONE_HEIGHT;

  const overlapping = fishBottom > zoneTop && fishTop < zoneBottom;

  if (overlapping) {
    progress += PROGRESS_GAIN;
  } else {
    progress -= PROGRESS_DRAIN;
  }

  progress = Math.max(0, Math.min(1, progress));
}

function render() {
  const barEl = document.getElementById('reel-bar');
  const barHeight = barEl.offsetHeight;

  // Fish target position
  const fishEl = document.getElementById('fish-target');
  const fishTop = fishY * barHeight - 14; // 14 = half of element height
  fishEl.style.top = `${fishTop}px`;

  // Catch zone position
  const zoneEl = document.getElementById('catch-zone');
  const zoneHeight = CATCH_ZONE_HEIGHT * barHeight;
  const zoneTop = catchZoneY * barHeight;
  zoneEl.style.height = `${zoneHeight}px`;
  zoneEl.style.top = `${zoneTop}px`;
  zoneEl.style.bottom = 'auto';

  // Progress bar
  const progressEl = document.getElementById('progress-bar');
  progressEl.style.height = `${progress * 100}%`;

  // Color progress bar based on state
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
