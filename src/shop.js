/**
 * Shop & Upgrades system.
 * 8 purchasable items that affect gameplay.
 */

const PLAYER_DATA_KEY = 'fridayfish_playerdata';

/**
 * All shop items with their effects.
 * Each item has multiple levels; cost increases per level.
 */
export const SHOP_ITEMS = [
  {
    id: 'rod',
    name: 'Better Rod',
    emoji: '🎣',
    description: 'Bigger catch zone bar',
    effect: 'Catch zone +15% per level',
    baseCost: 30,
    costMultiplier: 2.0,
    maxLevel: 5,
  },
  {
    id: 'sinker',
    name: 'Heavy Sinker',
    emoji: '⚓',
    description: 'Better odds for rare fish',
    effect: 'Rare/legendary chance +5% per level',
    baseCost: 50,
    costMultiplier: 3.0,
    maxLevel: 2,
  },
  {
    id: 'hook',
    name: 'Golden Hook',
    emoji: '🪝',
    description: 'Fish sell for more',
    effect: 'Sell price +20% per level',
    baseCost: 40,
    costMultiplier: 2.0,
    maxLevel: 5,
  },
  {
    id: 'line',
    name: 'Strong Line',
    emoji: '🧵',
    description: 'Progress drains slower',
    effect: 'Drain rate -15% per level',
    baseCost: 25,
    costMultiplier: 1.8,
    maxLevel: 5,
  },
  {
    id: 'bait',
    name: 'Premium Bait',
    emoji: '🪱',
    description: 'Better fish appear more often',
    effect: 'Rare/legendary chance +3% per level',
    baseCost: 60,
    costMultiplier: 2.5,
    maxLevel: 4,
  },
  {
    id: 'net',
    name: 'Lucky Net',
    emoji: '🥅',
    description: 'Start with more progress',
    effect: 'Starting progress +8% per level',
    baseCost: 20,
    costMultiplier: 1.5,
    maxLevel: 5,
  },
  {
    id: 'sonar',
    name: 'Fish Sonar',
    emoji: '📡',
    description: 'Fish moves slower',
    effect: 'Fish speed -10% per level',
    baseCost: 45,
    costMultiplier: 2.2,
    maxLevel: 4,
  },
  {
    id: 'charm',
    name: 'Sea Charm',
    emoji: '🐚',
    description: 'Bigger fish appear',
    effect: 'Fish weight +20% per level',
    baseCost: 35,
    costMultiplier: 2.0,
    maxLevel: 5,
  },
];

/**
 * Get the cost for the next level of an item.
 */
export function getItemCost(item, currentLevel) {
  return Math.round(item.baseCost * Math.pow(item.costMultiplier, currentLevel));
}

/**
 * Player data: money, upgrades, stats.
 */
export function getPlayerData() {
  try {
    const data = localStorage.getItem(PLAYER_DATA_KEY);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }

  return createDefaultPlayerData();
}

export function savePlayerData(data) {
  localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(data));
}

function createDefaultPlayerData() {
  return {
    money: 0,
    upgrades: {
      rod: 0,
      sinker: 0,
      hook: 0,
      line: 0,
      bait: 0,
      net: 0,
      sonar: 0,
      charm: 0,
    },
    stats: {
      totalCaught: 0,
      totalSold: 0,
      totalEarned: 0,
      biggestWeight: 0,
      biggestFishName: '',
      biggestFishSpecies: '',
    },
  };
}

/**
 * Attempt to buy an upgrade. Returns true if successful.
 */
export function buyUpgrade(itemId) {
  const data = getPlayerData();
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return false;

  const currentLevel = data.upgrades[itemId] || 0;
  if (currentLevel >= item.maxLevel) return false;

  const cost = getItemCost(item, currentLevel);
  if (data.money < cost) return false;

  data.money -= cost;
  data.upgrades[itemId] = currentLevel + 1;
  savePlayerData(data);
  return true;
}

/**
 * Add money from selling a fish.
 */
export function earnMoney(amount) {
  const data = getPlayerData();
  data.money += amount;
  data.stats.totalEarned += amount;
  data.stats.totalSold += 1;
  savePlayerData(data);
  return data.money;
}

/**
 * Record a catch in stats.
 */
export function recordCatch(species, customName, weight) {
  const data = getPlayerData();
  data.stats.totalCaught += 1;

  if (weight > data.stats.biggestWeight) {
    data.stats.biggestWeight = weight;
    data.stats.biggestFishName = customName || species;
    data.stats.biggestFishSpecies = species;
  }

  savePlayerData(data);
  return data.stats;
}

/**
 * Get computed gameplay modifiers based on current upgrades.
 */
export function getModifiers() {
  const data = getPlayerData();
  const u = data.upgrades;

  return {
    catchZoneBonus: 1.0 + u.rod * 0.15,         // rod: +15% catch zone per level
    maxDepth: 1 + u.sinker,                       // sinker: +1 depth per level
    sellPriceBonus: 1.0 + u.hook * 0.20,         // hook: +20% sell price per level
    drainReduction: 1.0 - u.line * 0.15,         // line: -15% drain per level
    rarityBoost: u.bait * 0.03,                  // bait: +3% rare chance per level
    startingProgress: 0.4 + u.net * 0.08,        // net: +8% starting progress per level
    fishSpeedReduction: 1.0 - u.sonar * 0.10,   // sonar: -10% fish speed per level
    weightBonus: 1.0 + u.charm * 0.20,          // charm: +20% weight per level
  };
}
