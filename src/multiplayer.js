/**
 * Multiplayer module using playhtml for shared state.
 * Manages: shared aquarium, leaderboard, presence, and catch events.
 *
 * playhtml uses HTML elements with data-can-play attributes as synced state containers.
 * The data is persisted and synced across all connected clients via PartyKit.
 */

import { playhtml } from 'playhtml';

let initialized = false;
let onStateChangeCallback = null;

// Element IDs for our shared state containers
const AQUARIUM_EL_ID = 'shared-aquarium-data';
const LEADERBOARD_EL_ID = 'shared-leaderboard-data';

/**
 * Initialize playhtml and set up shared state elements.
 */
export async function initMultiplayer(callbacks) {
  onStateChangeCallback = callbacks.onStateChange || (() => {});

  try {
    await playhtml.init({
      room: 'friday-fishing-main',
    });

    // Wait for playhtml to be ready
    await playhtml.ready;

    // Set up shared data elements
    setupSharedElements();
    initialized = true;
    console.log('[playhtml] Multiplayer initialized');
  } catch (err) {
    console.warn('[playhtml] Init failed, running in local-only mode:', err.message || err);
    initialized = false;
  }
}

function setupSharedElements() {
  // Create hidden elements that hold shared state
  createSharedElement(AQUARIUM_EL_ID, { fish: [], events: [] });
  createSharedElement(LEADERBOARD_EL_ID, { players: {} });
}

function createSharedElement(id, defaultData) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.display = 'none';
    el.setAttribute('data-can-play', '');
    el.setAttribute('data-default-data', JSON.stringify(defaultData));
    document.body.appendChild(el);
  }

  playhtml.setupPlayElement(el);
}

/**
 * Get the element handler for a shared element.
 */
function getHandler(elementId) {
  if (!initialized) return null;

  // playhtml stores handlers in a Map<tag, Map<elementId, handler>>
  const canPlayHandlers = playhtml.elementHandlers.get('can-play');
  if (!canPlayHandlers) return null;
  return canPlayHandlers.get(elementId) || null;
}

// === Shared Aquarium ===

/**
 * Add a fish to the shared aquarium (visible to all players).
 */
export function addFishToSharedAquarium(fishRecord) {
  const handler = getHandler(AQUARIUM_EL_ID);
  if (!handler) return false;

  try {
    handler.setData((draft) => {
      if (!draft.fish) draft.fish = [];
      draft.fish.push(fishRecord);
      // Keep last 100 fish
      if (draft.fish.length > 100) {
        // Remove oldest entries
        draft.fish.splice(0, draft.fish.length - 100);
      }

      if (!draft.events) draft.events = [];
      draft.events.push({
        type: 'catch',
        player: fishRecord.caughtBy,
        species: fishRecord.species,
        name: fishRecord.customName,
        weight: fishRecord.weight,
        timestamp: Date.now(),
      });
      // Keep last 20 events
      if (draft.events.length > 20) {
        draft.events.splice(0, draft.events.length - 20);
      }
    });

    if (onStateChangeCallback) {
      onStateChangeCallback('aquarium', getSharedAquariumData());
    }
    return true;
  } catch (err) {
    console.warn('[playhtml] Failed to add fish:', err);
    return false;
  }
}

/**
 * Get all fish from shared aquarium.
 */
export function getSharedFish() {
  const data = getSharedAquariumData();
  return data.fish || [];
}

function getSharedAquariumData() {
  const handler = getHandler(AQUARIUM_EL_ID);
  if (!handler) return { fish: [], events: [] };
  try {
    return handler.data || { fish: [], events: [] };
  } catch {
    return { fish: [], events: [] };
  }
}

// === Leaderboard ===

/**
 * Update player's leaderboard entry after a catch.
 */
export function updateLeaderboard(playerName, fishRecord) {
  const handler = getHandler(LEADERBOARD_EL_ID);
  if (!handler) return;

  try {
    handler.setData((draft) => {
      if (!draft.players) draft.players = {};

      if (!draft.players[playerName]) {
        draft.players[playerName] = {
          totalCaught: 0,
          biggestWeight: 0,
          biggestFish: '',
          lastActive: Date.now(),
        };
      }

      const player = draft.players[playerName];
      player.totalCaught += 1;
      player.lastActive = Date.now();

      if (fishRecord.weight > player.biggestWeight) {
        player.biggestWeight = fishRecord.weight;
        player.biggestFish = `${fishRecord.customName} (${fishRecord.species})`;
      }
    });

    if (onStateChangeCallback) {
      onStateChangeCallback('leaderboard', getLeaderboard());
    }
  } catch (err) {
    console.warn('[playhtml] Failed to update leaderboard:', err);
  }
}

/**
 * Get leaderboard data.
 */
export function getLeaderboard() {
  const handler = getHandler(LEADERBOARD_EL_ID);
  if (!handler) return { players: {} };
  try {
    return handler.data || { players: {} };
  } catch {
    return { players: {} };
  }
}

/**
 * Get sorted leaderboard entries.
 */
export function getLeaderboardRankings() {
  const { players } = getLeaderboard();
  const entries = Object.entries(players || {}).map(([name, stats]) => ({ name, ...stats }));

  return {
    mostCaught: [...entries].sort((a, b) => b.totalCaught - a.totalCaught),
    biggestCatch: [...entries].sort((a, b) => b.biggestWeight - a.biggestWeight),
  };
}
