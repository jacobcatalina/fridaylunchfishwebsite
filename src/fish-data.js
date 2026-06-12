/**
 * Boston / Massachusetts fish species for the game.
 * Each fish has a spriteKey, fun facts, and gameplay stats.
 * depth: 1 = surface, 2 = mid, 3 = deep (requires sinker upgrades)
 */
export const FISH_SPECIES = [
  // === Common — Surface (depth 1) ===
  {
    name: 'Golden Shiner',
    spriteKey: 'golden-shiner',
    emoji: '🐠',
    rarity: 'common',
    speed: 0.9,
    depth: 1,
    basePrice: 5,
    minWeight: 0.1,
    maxWeight: 0.5,
    info: 'The most widely pond-cultured fish in the US. Popular as bait, they travel in large shimmering schools.',
  },
  {
    name: 'Pumpkinseed',
    spriteKey: 'pumpkinseed',
    emoji: '🐠',
    rarity: 'common',
    speed: 1.0,
    depth: 1,
    basePrice: 8,
    minWeight: 0.2,
    maxWeight: 0.8,
    info: 'One of the most colorful freshwater fish in North America. Named for its round, flat body shape like a pumpkin seed.',
  },
  {
    name: 'Yellow Perch',
    spriteKey: 'yellow-perch',
    emoji: '🐠',
    rarity: 'common',
    speed: 1.0,
    depth: 1,
    basePrice: 10,
    minWeight: 0.3,
    maxWeight: 1.5,
    info: 'Easily recognized by dark vertical bars on a golden-yellow body. A favorite target for ice fishing in New England.',
  },
  {
    name: 'Black Crappie',
    spriteKey: 'black-crappie',
    emoji: '🐟',
    rarity: 'common',
    speed: 1.0,
    depth: 1,
    basePrice: 12,
    minWeight: 0.5,
    maxWeight: 2.0,
    info: 'Covered in irregular dark spots. They feed most actively at dawn and dusk, making them a classic evening catch.',
  },
  {
    name: 'Carp',
    spriteKey: 'carp',
    emoji: '🐟',
    rarity: 'common',
    speed: 0.7,
    depth: 1,
    basePrice: 6,
    minWeight: 2.0,
    maxWeight: 15.0,
    info: 'Introduced from Europe in the 1800s. Can live 20+ years and grow enormous. Considered a sport fish in many countries.',
  },

  // === Common — Mid (depth 2) ===
  {
    name: 'White Catfish',
    spriteKey: 'white-catfish',
    emoji: '🐟',
    rarity: 'common',
    speed: 0.8,
    depth: 2,
    basePrice: 15,
    minWeight: 1.0,
    maxWeight: 5.0,
    info: 'Has 8 whisker-like barbels for sensing food in murky water. Nocturnal feeders — most active after dark.',
  },
  {
    name: 'Largemouth Bass',
    spriteKey: 'largemouth-bass',
    emoji: '🐟',
    rarity: 'common',
    speed: 1.1,
    depth: 2,
    basePrice: 18,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'The king of freshwater sport fishing. Its mouth can open wide enough to swallow prey half its own size.',
  },

  // === Uncommon — Surface (depth 1) ===
  {
    name: 'Alewife',
    spriteKey: 'alewife',
    emoji: '🐠',
    rarity: 'uncommon',
    speed: 1.3,
    depth: 1,
    basePrice: 20,
    minWeight: 0.2,
    maxWeight: 0.6,
    info: 'A migratory fish that swims from the ocean up rivers to spawn. Critical food source for larger predators in the Charles River.',
  },
  {
    name: 'Blueback Herring',
    spriteKey: 'blueback-herring',
    emoji: '🐠',
    rarity: 'uncommon',
    speed: 1.3,
    depth: 1,
    basePrice: 22,
    minWeight: 0.2,
    maxWeight: 0.5,
    info: 'Named for its distinctive blue-green back. Once so abundant in New England rivers they were used as fertilizer.',
  },

  // === Uncommon — Mid (depth 2) ===
  {
    name: 'Striped Bass',
    spriteKey: 'striped-bass',
    emoji: '🐡',
    rarity: 'uncommon',
    speed: 1.4,
    depth: 2,
    basePrice: 35,
    minWeight: 3.0,
    maxWeight: 30.0,
    info: 'The iconic fish of Boston Harbor. Their spring migration up the coast draws anglers from everywhere. Can live 30+ years.',
  },
  {
    name: 'American Shad',
    spriteKey: 'american-shad',
    emoji: '🐟',
    rarity: 'uncommon',
    speed: 1.4,
    depth: 2,
    basePrice: 28,
    minWeight: 1.0,
    maxWeight: 5.0,
    info: 'The largest member of the herring family in North America. George Washington fished for shad on the Potomac.',
  },
  {
    name: 'Bluefish',
    spriteKey: 'bluefish',
    emoji: '🐟',
    rarity: 'uncommon',
    speed: 1.5,
    depth: 2,
    basePrice: 32,
    minWeight: 2.0,
    maxWeight: 12.0,
    info: 'Aggressive predators with razor-sharp teeth. Known to continue feeding even after they are full — pure chaos energy.',
  },

  // === Rare — Deep (depth 3) ===
  {
    name: 'Brook Trout',
    spriteKey: 'brook-trout',
    emoji: '🐡',
    rarity: 'rare',
    speed: 1.8,
    depth: 3,
    basePrice: 50,
    minWeight: 0.5,
    maxWeight: 5.0,
    info: 'Massachusetts\' native trout — actually a char, not a true trout. Covered in beautiful red spots with blue halos.',
  },
  {
    name: 'Atlantic Cod',
    spriteKey: 'atlantic-cod',
    emoji: '🐟',
    rarity: 'rare',
    speed: 1.7,
    depth: 3,
    basePrice: 60,
    minWeight: 5.0,
    maxWeight: 40.0,
    info: 'Once so plentiful off Cape Cod it gave the cape its name. Overfishing collapsed stocks in the 1990s; still recovering.',
  },
  {
    name: 'American Eel',
    spriteKey: 'american-eel',
    emoji: '🐍',
    rarity: 'rare',
    speed: 2.0,
    depth: 3,
    basePrice: 75,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'Born in the Sargasso Sea, they migrate thousands of miles to freshwater. Can absorb oxygen through their skin.',
  },

  // === Legendary — Deep (depth 3) ===
  {
    name: 'Giant Bluefin Tuna',
    spriteKey: 'giant-bluefin-tuna',
    emoji: '🐋',
    rarity: 'legendary',
    speed: 2.3,
    depth: 3,
    basePrice: 200,
    minWeight: 50.0,
    maxWeight: 500.0,
    info: 'Can weigh over 1,000 lbs and swim 45 mph. A single fish sold at auction in Japan for $3.1 million in 2019.',
  },
  {
    name: 'Prehistoric Coelacanth',
    spriteKey: 'prehistoric-coelacanth',
    emoji: '🦴',
    rarity: 'legendary',
    speed: 2.5,
    depth: 3,
    basePrice: 500,
    minWeight: 30.0,
    maxWeight: 90.0,
    info: 'A "living fossil" — thought extinct for 65 million years until one was caught in 1938. Has lobed fins that move like legs.',
  },
  {
    name: 'Blobfish',
    spriteKey: 'blobfish',
    emoji: '🫠',
    rarity: 'legendary',
    speed: 1.5,
    depth: 3,
    basePrice: 350,
    minWeight: 3.0,
    maxWeight: 12.0,
    info: 'Only looks blobby at the surface — at its normal depth (3,000+ ft), water pressure keeps it looking like a normal fish.',
  },

  // === Junk ===
  {
    name: 'Rusty Can',
    spriteKey: 'rusty-can',
    emoji: '🥫',
    rarity: 'common',
    speed: 0.3,
    depth: 1,
    basePrice: 1,
    minWeight: 0.5,
    maxWeight: 0.5,
    info: 'Not a fish. Someone littered. At least you\'re cleaning up the ocean!',
  },
];

/**
 * Roll a random fish based on weighted rarity and max accessible depth.
 * With bait bonus factored in.
 */
export function rollFish(maxDepth = 1, rarityBoost = 0) {
  const roll = Math.random();

  const legendaryThreshold = 0.95 - rarityBoost;
  const rareThreshold = 0.80 - rarityBoost;
  const uncommonThreshold = 0.50 - rarityBoost * 0.5;

  let tier;
  if (roll >= legendaryThreshold) tier = 'legendary';
  else if (roll >= rareThreshold) tier = 'rare';
  else if (roll >= uncommonThreshold) tier = 'uncommon';
  else tier = 'common';

  let pool = FISH_SPECIES.filter(f => f.rarity === tier && f.depth <= maxDepth);

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
