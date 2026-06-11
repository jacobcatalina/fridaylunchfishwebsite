/**
 * Boston / Massachusetts fish species for the game.
 * Each fish has a spriteKey that maps to the sprite registry.
 * depth: 1 = surface, 2 = mid, 3 = deep (requires upgrades to access)
 */
export const FISH_SPECIES = [
  // Common — Surface (depth 1)
  { name: 'Golden Shiner', spriteKey: 'golden-shiner', emoji: '🐠', rarity: 'common', speed: 0.9, depth: 1, basePrice: 5, minWeight: 0.1, maxWeight: 0.5 },
  { name: 'Pumpkinseed', spriteKey: 'pumpkinseed', emoji: '🐠', rarity: 'common', speed: 1.0, depth: 1, basePrice: 8, minWeight: 0.2, maxWeight: 0.8 },
  { name: 'Yellow Perch', spriteKey: 'yellow-perch', emoji: '🐠', rarity: 'common', speed: 1.0, depth: 1, basePrice: 10, minWeight: 0.3, maxWeight: 1.5 },
  { name: 'Black Crappie', spriteKey: 'black-crappie', emoji: '🐟', rarity: 'common', speed: 1.0, depth: 1, basePrice: 12, minWeight: 0.5, maxWeight: 2.0 },
  { name: 'Carp', spriteKey: 'carp', emoji: '🐟', rarity: 'common', speed: 0.7, depth: 1, basePrice: 6, minWeight: 2.0, maxWeight: 15.0 },

  // Common — Mid (depth 2)
  { name: 'White Catfish', spriteKey: 'white-catfish', emoji: '🐟', rarity: 'common', speed: 0.8, depth: 2, basePrice: 15, minWeight: 1.0, maxWeight: 5.0 },
  { name: 'Largemouth Bass', spriteKey: 'largemouth-bass', emoji: '🐟', rarity: 'common', speed: 1.1, depth: 2, basePrice: 18, minWeight: 1.0, maxWeight: 8.0 },

  // Uncommon — Surface (depth 1)
  { name: 'Alewife', spriteKey: 'alewife', emoji: '🐠', rarity: 'uncommon', speed: 1.3, depth: 1, basePrice: 20, minWeight: 0.2, maxWeight: 0.6 },
  { name: 'Blueback Herring', spriteKey: 'blueback-herring', emoji: '🐠', rarity: 'uncommon', speed: 1.3, depth: 1, basePrice: 22, minWeight: 0.2, maxWeight: 0.5 },

  // Uncommon — Mid (depth 2)
  { name: 'Striped Bass', spriteKey: 'striped-bass', emoji: '🐡', rarity: 'uncommon', speed: 1.4, depth: 2, basePrice: 35, minWeight: 3.0, maxWeight: 30.0 },
  { name: 'American Shad', spriteKey: 'american-shad', emoji: '🐟', rarity: 'uncommon', speed: 1.4, depth: 2, basePrice: 28, minWeight: 1.0, maxWeight: 5.0 },
  { name: 'Bluefish', spriteKey: 'bluefish', emoji: '🐟', rarity: 'uncommon', speed: 1.5, depth: 2, basePrice: 32, minWeight: 2.0, maxWeight: 12.0 },

  // Rare — Deep (depth 3)
  { name: 'Brook Trout', spriteKey: 'brook-trout', emoji: '🐡', rarity: 'rare', speed: 1.8, depth: 3, basePrice: 50, minWeight: 0.5, maxWeight: 5.0 },
  { name: 'Atlantic Cod', spriteKey: 'atlantic-cod', emoji: '🐟', rarity: 'rare', speed: 1.7, depth: 3, basePrice: 60, minWeight: 5.0, maxWeight: 40.0 },
  { name: 'American Eel', spriteKey: 'american-eel', emoji: '🐍', rarity: 'rare', speed: 2.0, depth: 3, basePrice: 75, minWeight: 1.0, maxWeight: 8.0 },

  // Legendary — Deep (depth 3)
  { name: 'Giant Bluefin Tuna', spriteKey: 'giant-bluefin-tuna', emoji: '🐋', rarity: 'legendary', speed: 2.3, depth: 3, basePrice: 200, minWeight: 50.0, maxWeight: 500.0 },
  { name: 'Prehistoric Coelacanth', spriteKey: 'prehistoric-coelacanth', emoji: '🦴', rarity: 'legendary', speed: 2.5, depth: 3, basePrice: 500, minWeight: 30.0, maxWeight: 90.0 },
  { name: 'Blobfish', spriteKey: 'blobfish', emoji: '🫠', rarity: 'legendary', speed: 1.5, depth: 3, basePrice: 350, minWeight: 3.0, maxWeight: 12.0 },

  // Bonus / Junk (can appear at any depth)
  { name: 'Rusty Can', spriteKey: 'rusty-can', emoji: '🥫', rarity: 'common', speed: 0.3, depth: 1, basePrice: 1, minWeight: 0.5, maxWeight: 0.5 },
];

/**
 * Roll a random fish based on weighted rarity and max accessible depth.
 * With bait bonus factored in.
 * Common: 50%, Uncommon: 30%, Rare: 15%, Legendary: 5%
 */
export function rollFish(maxDepth = 1, rarityBoost = 0) {
  const roll = Math.random();

  // Shift thresholds by rarity boost (bait upgrade)
  const legendaryThreshold = 0.95 - rarityBoost;
  const rareThreshold = 0.80 - rarityBoost;
  const uncommonThreshold = 0.50 - rarityBoost * 0.5;

  let tier;
  if (roll >= legendaryThreshold) tier = 'legendary';
  else if (roll >= rareThreshold) tier = 'rare';
  else if (roll >= uncommonThreshold) tier = 'uncommon';
  else tier = 'common';

  let pool = FISH_SPECIES.filter(f => f.rarity === tier && f.depth <= maxDepth);

  // Fallback: if no fish available at this tier+depth, widen
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
  const ratio = (weight - fish.minWeight) / (fish.maxWeight - fish.minWeight || 1);
  const minSize = Math.max(3, fish.minWeight * 4 + 3);
  const maxSize = Math.min(120, fish.maxWeight * 1.5 + 5);
  const size = minSize + (maxSize - minSize) * ratio;
  return Math.round(size * 10) / 10;
}

/**
 * Calculate sell price based on base price, weight, rarity, and hook bonus.
 */
export function calculateSellPrice(fish, weight, hookBonus = 1.0) {
  const weightMultiplier = weight / (fish.minWeight || 1);
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
