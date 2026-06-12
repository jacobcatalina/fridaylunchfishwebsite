/**
 * Friday Fishing — Main entry point.
 * Orchestrates: aquarium, fishing game, shop, player stats, multiplayer.
 */

import { startFishingGame } from './fishing-game.js';
import { getAquariumFish, addFishToAquarium, renderAquarium, renderNewFish } from './aquarium.js';
import { rarityColor, rarityLabel, calculateSellPrice } from './fish-data.js';
import { getPlayerData, savePlayerData, earnMoney, recordCatch, getModifiers, SHOP_ITEMS, getItemCost, buyUpgrade } from './shop.js';
import { initMultiplayer, addFishToSharedAquarium, updateLeaderboard, getLeaderboardRankings } from './multiplayer.js';
import { initSprites } from './sprite-config.js';
import { createSpriteElement } from './sprites.js';

// === Player identity ===
const PLAYER_KEY = 'fridayfish_player';

function getPlayerName() {
  return localStorage.getItem(PLAYER_KEY);
}

function setPlayerName(name) {
  localStorage.setItem(PLAYER_KEY, name);
}

// === Init ===
async function init() {
  // Load sprites before rendering
  await initSprites();

  createBubbles();
  renderAquarium();
  updateMoneyDisplay();

  const playerName = getPlayerName();
  if (!playerName) {
    showPlayerSetup();
  }

  // Initialize multiplayer
  await initMultiplayer({
    onStateChange: (type, data) => {
      if (type === 'aquarium') {
        renderAquarium(data.fish || []);
      }
      if (type === 'leaderboard') {
        renderLeaderboardUI();
      }
    },
  });

  // Bind events
  document.getElementById('cast-button').addEventListener('click', onCast);
  document.getElementById('shop-button').addEventListener('click', toggleShop);
  document.getElementById('player-name-confirm').addEventListener('click', onPlayerNameConfirm);
  document.getElementById('confirm-aquarium-button').addEventListener('click', onSendToAquarium);
  document.getElementById('confirm-sell-button').addEventListener('click', onSellFish);
  document.getElementById('close-shop').addEventListener('click', toggleShop);

  // Leaderboard sidebar — tap to expand on mobile
  document.getElementById('leaderboard-sidebar').querySelector('h2').addEventListener('click', () => {
    document.getElementById('leaderboard-sidebar').classList.toggle('expanded');
  });

  // Enter key on inputs
  document.getElementById('player-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onPlayerNameConfirm();
  });
  document.getElementById('fish-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onSendToAquarium();
  });

  renderLeaderboardUI();
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
let pendingWeight = 0;
let pendingSize = 0;

function onCast() {
  const playerName = getPlayerName();
  if (!playerName) {
    showPlayerSetup();
    return;
  }

  startFishingGame({
    onCatch: (fish, weight, size) => {
      pendingCatch = fish;
      pendingWeight = weight;
      pendingSize = size;
      showCatchPrompt(fish, weight, size);
    },
    onEscape: (fish) => {
      showToast(`The ${fish.name} got away! 💨`);
    },
  });
}

// === Catch prompt (sell or keep) ===
function showCatchPrompt(fish, weight, size) {
  const modifiers = getModifiers();
  const sellPrice = calculateSellPrice(fish, weight, modifiers.sellPriceBonus);

  document.getElementById('caught-species').textContent = fish.name;

  // Render sprite in preview
  const previewEl = document.getElementById('caught-fish-preview');
  previewEl.innerHTML = '';
  const spriteEl = createSpriteElement(fish.spriteKey, fish.emoji, 80);
  previewEl.appendChild(spriteEl);

  document.getElementById('caught-rarity').textContent = rarityLabel(fish.rarity);
  document.getElementById('caught-rarity').style.color = rarityColor(fish.rarity);
  document.getElementById('caught-weight').textContent = `${weight} lbs`;
  document.getElementById('caught-size').textContent = `${size} in`;
  document.getElementById('sell-price').textContent = `$${sellPrice}`;

  // Show fish info/fun fact
  const infoEl = document.getElementById('caught-info');
  if (infoEl) {
    infoEl.textContent = fish.info || '';
  }

  document.getElementById('fish-name-input').value = '';
  document.getElementById('catch-prompt').classList.remove('hidden');
  document.getElementById('fish-name-input').focus();
}

function onSendToAquarium() {
  const input = document.getElementById('fish-name-input');
  const customName = input.value.trim() || pendingCatch.name;
  const playerName = getPlayerName();

  const fishRecord = {
    species: pendingCatch.name,
    spriteKey: pendingCatch.spriteKey,
    emoji: pendingCatch.emoji,
    rarity: pendingCatch.rarity,
    customName: customName,
    caughtBy: playerName,
    weight: pendingWeight,
    size: pendingSize,
    timestamp: Date.now(),
  };

  // Local
  addFishToAquarium(fishRecord);
  renderNewFish(fishRecord);

  // Stats
  recordCatch(fishRecord.species, customName, pendingWeight);

  // Multiplayer
  addFishToSharedAquarium(fishRecord);
  updateLeaderboard(playerName, fishRecord);

  document.getElementById('catch-prompt').classList.add('hidden');
  pendingCatch = null;

  showToast(`${playerName} added "${customName}" to the aquarium! 🐠`);
  renderLeaderboardUI();
}

function onSellFish() {
  const modifiers = getModifiers();
  const sellPrice = calculateSellPrice(pendingCatch, pendingWeight, modifiers.sellPriceBonus);
  const playerName = getPlayerName();

  // Record the catch in stats even if selling
  recordCatch(pendingCatch.name, pendingCatch.name, pendingWeight);

  // Earn money
  earnMoney(sellPrice);
  updateMoneyDisplay();

  // Update multiplayer leaderboard
  const fishRecord = {
    species: pendingCatch.name,
    spriteKey: pendingCatch.spriteKey,
    emoji: pendingCatch.emoji,
    rarity: pendingCatch.rarity,
    customName: pendingCatch.name,
    caughtBy: playerName,
    weight: pendingWeight,
    size: pendingSize,
    timestamp: Date.now(),
  };
  updateLeaderboard(playerName, fishRecord);

  document.getElementById('catch-prompt').classList.add('hidden');
  pendingCatch = null;

  showToast(`Sold for $${sellPrice}! 💰`);
  renderLeaderboardUI();
}

// === Money display ===
function updateMoneyDisplay() {
  const data = getPlayerData();
  document.getElementById('money-display').textContent = `$${data.money}`;
}

// === Shop ===
function toggleShop() {
  const shopEl = document.getElementById('shop-panel');
  shopEl.classList.toggle('hidden');
  if (!shopEl.classList.contains('hidden')) {
    renderShop();
  }
}
function renderShop() {
  const container = document.getElementById('shop-items');
  container.innerHTML = '';
  const data = getPlayerData();

  // Map shop item IDs to sprite sheet item keys for visual flair
  const itemSpriteMap = {
    rod: 'item-rod',
    hook: 'item-hook',
    bait: 'item-bait',
    net: 'item-net',
    sinker: 'item-tackle',
    line: 'item-bobber',
    sonar: 'item-bucket',
    charm: 'item-fish-caught',
  };

  SHOP_ITEMS.forEach(item => {
    const level = data.upgrades[item.id] || 0;
    const maxed = level >= item.maxLevel;
    const cost = maxed ? '—' : `$${getItemCost(item, level)}`;
    const canAfford = !maxed && data.money >= getItemCost(item, level);

    const el = document.createElement('div');
    el.className = `shop-item ${maxed ? 'maxed' : ''} ${canAfford ? 'affordable' : ''}`;
    el.innerHTML = `
      <div class="shop-item-header">
        <span class="shop-item-emoji">${item.emoji}</span>
        <span class="shop-item-name">${item.name}</span>
      </div>
      <div class="shop-item-desc">${item.description}</div>
      <div class="shop-item-effect">${item.effect}</div>
      <div class="shop-item-footer">
        <span class="shop-item-level">Lv ${level}/${item.maxLevel}</span>
        <button class="shop-buy-btn" ${maxed || !canAfford ? 'disabled' : ''}>${maxed ? 'MAX' : cost}</button>
      </div>
    `;

    if (!maxed && canAfford) {
      el.querySelector('.shop-buy-btn').addEventListener('click', () => {
        if (buyUpgrade(item.id)) {
          updateMoneyDisplay();
          renderShop();
          showToast(`Upgraded ${item.name}! ${item.emoji}`);
        }
      });
    }

    container.appendChild(el);
  });
}

// === Leaderboard (always visible in sidebar) ===
function renderLeaderboardUI() {
  const container = document.getElementById('leaderboard-content');
  if (!container) return;

  const { mostCaught, biggestCatch } = getLeaderboardRankings();
  const data = getPlayerData();
  const playerName = getPlayerName() || 'You';

  let html = `
    <div class="lb-section">
      <h3>🎣 Most Caught</h3>
      ${mostCaught.length === 0 ? '<p class="lb-empty">No catches yet!</p>' : ''}
      ${mostCaught.slice(0, 5).map((p, i) => `
        <div class="lb-row">
          <span class="lb-rank">${i + 1}.</span>
          <span class="lb-name">${p.name}</span>
          <span class="lb-value">${p.totalCaught}</span>
        </div>
      `).join('')}
    </div>
    <div class="lb-section">
      <h3>🐋 Biggest Catch</h3>
      ${biggestCatch.length === 0 ? '<p class="lb-empty">No catches yet!</p>' : ''}
      ${biggestCatch.slice(0, 5).map((p, i) => `
        <div class="lb-row">
          <span class="lb-rank">${i + 1}.</span>
          <span class="lb-name">${p.name}</span>
          <span class="lb-value">${p.biggestWeight}lb</span>
        </div>
        ${p.biggestFish ? `<div class="lb-detail">${p.biggestFish}</div>` : ''}
      `).join('')}
    </div>
    <div class="lb-section">
      <h3>📊 You</h3>
      <div class="lb-row"><span>Caught:</span><span>${data.stats.totalCaught}</span></div>
      <div class="lb-row"><span>Sold:</span><span>${data.stats.totalSold}</span></div>
      <div class="lb-row"><span>Earned:</span><span>$${data.stats.totalEarned}</span></div>
      <div class="lb-row"><span>Biggest:</span><span>${data.stats.biggestWeight}lb</span></div>
      ${data.stats.biggestFishName ? `<div class="lb-detail">${data.stats.biggestFishName}</div>` : ''}
    </div>
  `;

  container.innerHTML = html;
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

// === Start ===
document.addEventListener('DOMContentLoaded', init);
