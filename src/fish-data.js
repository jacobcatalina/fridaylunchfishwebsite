/**
 * Boston / Massachusetts fish species for the game.
 * Rarity tiers affect fish-target speed in the minigame.
 * depth: 1 = surface, 2 = mid, 3 = deep (requires upgrades to access)
 */
export const FISH_SPECIES = [
  // Common — Surface (depth 1)
  { name: 'Golden Shiner', emoji: '🐠', rarity: 'common', speed: 0.9, depth: 1, basePrice: 5, minWeight: 0.1, maxWeight: 0.5 },
  { name: 'Pumpkinseed', emoji: '🐠', rarity: 'common', speed: 1.0, depth: 1, basePrice: 8, minWeight: 0.2, maxWeight: 0.8 },
  { name: 'Yellow Perch', emoji: '🐠', rarity: 'common', speed: 1.0, depth: 1, basePrice: 10, minWeight: 0.3, maxWeight: 1.5 },
  { name: 'Black Crappie', emoji: '🐟', rarity: 'common', speed: 1.0, depth: 1, basePrice: 12, minWeight: 0.5, maxWeight: 2.0 },
  { name: 'Carp', emoji: '🐟', rarity: 'common', speed: 0.7, depth: 1, basePrice: 6, minWeight: 2.0, maxWeight: 15.0 },

  // Common — Mid (depth 2)
  { name: 'White Catfish', emoji: '🐟', rarity: 'common', speed: 0.8, depth: 2, basePrice: 15, minWeight: 1.0, maxWeight: 5.0 },
  { name: 'Largemouth Bass', emoji: '🐟', rarity: 'common', speed: 1.1, depth: 2, basePrice: 18, minWeight: 1.0, maxWeight: 8.0 },

  // Uncommon — Surface (depth 1)
  { name: 'Alewife', emoji: '🐠', rarity: 'uncommon', speed: 1.3, depth: 1, basePrice: 20, minWeight: 0.2, maxWeight: 0.6 },
  { name: 'Blueback Herring', emoji: '🐠', rarity: 'uncommon', speed: 1.3, depth: 1, basePrice: 22, minWeight: 0.2, maxWeight: 0.5 },

  // Uncommon — Mid (depth 2)
  { name: 'Striped Bass', emoji: '🐡', rarity: 'uncommon', speed: 1.4, depth: 2, basePrice: 35, minWeight: 3.0, maxWeight: 30.0 },
  { name: 'American Shad', emoji: '🐟', rarity: 'uncommon', speed: 1.4, depth: 2, basePrice: 28, minWeight: 1.0, maxWeight: 5.0 },
  { name: 'Bluefish', emoji: '🐟', rarity: 'uncommon', speed: 1.5, depth: 2, basePrice: 32, minWeight: 2.0, maxWeight: 12.0 },

  // Rare — Deep (depth 3)
  { name: 'Brook Trout', emoji: '🐡', rarity: 'rare', speed: 1.8, depth: 3, basePrice: 50, minWeight: 0.5, maxWeight: 5.0 },
  { name: 'Atlantic Cod', emoji: '🐟', rarity: 'rare', speed: 1.7, depth: 3, basePrice: 60, minWeight: 5.0, maxWeight: 40.0 },
  { name: 'American Eel', emoji: '🐍', rarity: 'rare', speed: 2.0, depth: 3, basePrice: 75, minWeight: 1.0, maxWeight: 8.0 },

  // Legendary — Deep (depth 3)
  { name: 'Giant Bluefin Tuna', emoji: '🐋', rarity: 'legendary', speed: 2.3, depth: 3, basePrice: 200, minWeight: 50.0, maxWeight: 500.0 },
  { name: 'Prehistoric Coelacanth', emoji: '🦴', rarity: 'legendary', speed: 2.5, depth: 3, basePrice: 500, minWeight: 30.0, maxWeight: 90.0 },
];

/**
 * Roll a random fish based on weighted rarity and max accessible depth.
 * Common: 50%, Uncommon: 30%, Rare: 15%, Legendary: 5%
 */
export function rollFish(maxDepth = 1) {
  const roll = Math.random();
  let tier;
  if (roll < 0.50) tier = 'common';
  else if (roll < 0.80) tier = 'uncommon';
  else if (roll < 0.95) tier = 'rare';
  else tier = 'legendary';

  let pool = FISH_SPECIES.filter(f => f.rarity === tier && f.depth <= maxDepth);

  // Fallback: if no fish available at this tier+depth, widen the search
  if (pool.length === 0) {
    pool = FISH_SPECIES.filter(f => f.depth <= maxDepth);
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Generate a random weight for a caught fish (in lbs).
 */
export function rollWeight(fish) {
  const range = fish.maxWeight - fish.minWeight;
  // Weighted toward smaller fish (use sqrt for distribution)
  const weight = fish.minWeight + range * Math.pow(Math.random(), 1.5);
  return Math.round(weight * 100) / 100;
}

/**
 * Generate a size in inches (loosely correlated with weight).
 */
export function rollSize(fish, weight) {
  // Rough formula: size scales with weight relative to max
  const ratio = (weight - fish.minWeight) / (fish.maxWeight - fish.minWeight);
  const minSize = fish.minWeight * 4 + 3;
  const maxSize = fish.maxWeight * 1.5 + 5;
  const size = minSize + (maxSize - minSize) * ratio;
  return Math.round(size * 10) / 10;
}

/**
 * Calculate sell price based on base price, weight, rarity, and hook bonus.
 */
export function calculateSellPrice(fish, weight, hookBonus = 1.0) {
  const weightMultiplier = weight / fish.minWeight;
  const rarityBonus = { common: 1, uncommon: 1.5, rare: 2.5, legendary: 5 }[fish.rarity] || 1;
  const price = Math.round(fish.basePrice * Math.sqrt(weightMultiplier) * rarityBonus * hookBonus);
  return Math.max(1, price);
}

/**
 * Get a rarity color for display
 */
export function rarityColor(rarity) {
  switch (rarity) {
    case 'common': return '#8bc34a';
    case 'uncommon': return '#4ecdc4';
    case 'rare': return '#ff6b6b';
    case 'legendary': return '#ffd700';
    default: return '#fff';
  }
}

/**
 * Get rarity label
 */
export function rarityLabel(rarity) {
  switch (rarity) {
    case 'common': return '⚪ Common';
    case 'uncommon': return '🔵 Uncommon';
    case 'rare': return '🟣 Rare';
    case 'legendary': return '⭐ Legendary';
    default: return rarity;
  }
}
