/**
 * Aquarium module — manages fish in the shared tank (visual rendering).
 * Uses localStorage as fallback; playhtml syncs across players.
 */

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

  const sprite = document.createElement('span');
  sprite.className = 'fish-sprite';
  sprite.textContent = fish.emoji;
  sprite.style.transform = direction === -1 ? 'scaleX(-1)' : '';

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
