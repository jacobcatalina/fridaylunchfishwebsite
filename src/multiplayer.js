/**
 * Multiplayer module using playhtml for shared state.
 * 
 * Uses playhtml's synced store directly for reliable cross-client sync.
 * The synced store is backed by Yjs + PartyKit, giving us:
 * - Real-time sync across all connected clients
 * - Persistence (data survives page refreshes)
 * - CRDT-based conflict resolution
 */

import { playhtml } from 'playhtml';

let initialized = false;
let onStateChangeCallback = null;
let pollInterval = null;

/**
 * Initialize playhtml and set up shared state.
 */
export async function initMultiplayer(callbacks) {
  onStateChangeCallback = callbacks.onStateChange || (() => {});

  try {
    await playhtml.init({
      room: 'friday-fishing-main',
    });

    await playhtml.ready;
    initialized = true;
    console.log('[playhtml] Multiplayer initialized, room:', playhtml.roomId);

    // Initialize shared data structures in the synced store
    const store = playhtml.syncedStore;
    if (store) {
      // Ensure our data keys exist
      if (!store['aquarium']) {
        store['aquarium'] = { fish: [], events: [] };
      }
      if (!store['leaderboard']) {
        store['leaderboard'] = { players: {} };
      }
    }

    // Poll for changes from other clients (Yjs updates are automatic,
    // but we need to re-render when they happen)
    startPolling();

  } catch (err) {
    console.warn('[playhtml] Init failed, running in local-only mode:', err.message || err);
    initialized = false;
  }
}

/**
 * Poll the synced store for changes and trigger re-renders.
 * playhtml syncs automatically via Yjs, but we need to detect
 * when data changes to update our UI.
 */
let lastFishCount = 0;
let lastLeaderboardHash = '';

function startPolling() {
  pollInterval = setInterval(() => {
    if (!initialized) return;

    const fishData = getSharedAquariumData();
    const currentCount = fishData.fish ? fishData.fish.length : 0;

    if (currentCount !== lastFishCount) {
      lastFishCount = currentCount;
      if (onStateChangeCallback) {
        onStateChangeCallback('aquarium', fishData);
      }
    }

    const lb = getLeaderboard();
    const hash = JSON.stringify(lb);
    if (hash !== lastLeaderboardHash) {
      lastLeaderboardHash = hash;
      if (onStateChangeCallback) {
        onStateChangeCallback('leaderboard', lb);
      }
    }
  }, 2000); // Check every 2 seconds
}

// === Shared Aquarium ===

/**
 * Add a fish to the shared aquarium (visible to all players).
 */
export function addFishToSharedAquarium(fishRecord) {
  if (!initialized) return false;

  try {
    const store = playhtml.syncedStore;
    if (!store) return false;

    if (!store['aquarium']) {
      store['aquarium'] = { fish: [], events: [] };
    }

    const data = store['aquarium'];

    if (!data.fish) data.fish = [];
    data.fish.push(fishRecord);

    // Keep last 100 fish
    if (data.fish.length > 100) {
      data.fish.splice(0, data.fish.length - 100);
    }

    if (!data.events) data.events = [];
    data.events.push({
      type: 'catch',
      player: fishRecord.caughtBy,
      species: fishRecord.species,
      name: fishRecord.customName,
      weight: fishRecord.weight,
      timestamp: Date.now(),
    });

    if (data.events.length > 20) {
      data.events.splice(0, data.events.length - 20);
    }

    // Update our local tracking
    lastFishCount = data.fish.length;

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
  if (!initialized) return { fish: [], events: [] };
  try {
    const store = playhtml.syncedStore;
    if (!store || !store['aquarium']) return { fish: [], events: [] };
    return store['aquarium'];
  } catch {
    return { fish: [], events: [] };
  }
}

/**
 * Clear the entire shared aquarium (admin function).
 */
export function clearSharedAquarium() {
  if (!initialized) return false;
  try {
    const store = playhtml.syncedStore;
    if (!store) return false;
    store['aquarium'] = { fish: [], events: [] };
    lastFishCount = 0;
    return true;
  } catch (err) {
    console.warn('[playhtml] Failed to clear aquarium:', err);
    return false;
  }
}

/**
 * Clear the leaderboard (admin function).
 */
export function clearLeaderboard() {
  if (!initialized) return false;
  try {
    const store = playhtml.syncedStore;
    if (!store) return false;
    store['leaderboard'] = { players: {} };
    lastLeaderboardHash = '';
    return true;
  } catch (err) {
    console.warn('[playhtml] Failed to clear leaderboard:', err);
    return false;
  }
}

// === Leaderboard ===

/**
 * Update player's leaderboard entry after a catch.
 */
export function updateLeaderboard(playerName, fishRecord) {
  if (!initialized) return;

  try {
    const store = playhtml.syncedStore;
    if (!store) return;

    if (!store['leaderboard']) {
      store['leaderboard'] = { players: {} };
    }

    const data = store['leaderboard'];
    if (!data.players) data.players = {};

    if (!data.players[playerName]) {
      data.players[playerName] = {
        totalCaught: 0,
        biggestWeight: 0,
        biggestFish: '',
        lastActive: Date.now(),
      };
    }

    const player = data.players[playerName];
    player.totalCaught += 1;
    player.lastActive = Date.now();

    if (fishRecord.weight > player.biggestWeight) {
      player.biggestWeight = fishRecord.weight;
      player.biggestFish = `${fishRecord.customName} (${fishRecord.species})`;
    }
  } catch (err) {
    console.warn('[playhtml] Failed to update leaderboard:', err);
  }
}

/**
 * Get leaderboard data.
 */
export function getLeaderboard() {
  if (!initialized) return { players: {} };
  try {
    const store = playhtml.syncedStore;
    if (!store || !store['leaderboard']) return { players: {} };
    return store['leaderboard'];
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
