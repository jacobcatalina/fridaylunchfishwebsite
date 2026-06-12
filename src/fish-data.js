/**
 * Fish species — ONLY species that have real sprite images.
 * No emoji fallbacks. Every fish in this list has a matching image file.
 * 
 * depth: 1 = surface, 2 = mid, 3 = deep (requires sinker upgrades)
 * 20 catchable fish + 2 junk items = plenty of variety
 */
export const FISH_SPECIES = [
  // =============================================
  // COMMON — Surface (depth 1) — 6 fish
  // =============================================
  {
    name: 'Minnow',
    spriteKey: 'minnow',
    rarity: 'common',
    speed: 0.8,
    depth: 1,
    basePrice: 3,
    minWeight: 0.05,
    maxWeight: 0.2,
    info: 'Tiny but abundant. Schools of minnows are the foundation of freshwater food chains — everything eats them.',
  },
  {
    name: 'Goldfish',
    spriteKey: 'goldfish',
    rarity: 'common',
    speed: 0.7,
    depth: 1,
    basePrice: 5,
    minWeight: 0.1,
    maxWeight: 0.5,
    info: 'Originally from East Asia. A released pet goldfish can grow over a foot long and live 25+ years in the wild.',
  },
  {
    name: 'Anchovy',
    spriteKey: 'anchovy',
    rarity: 'common',
    speed: 1.0,
    depth: 1,
    basePrice: 4,
    minWeight: 0.05,
    maxWeight: 0.15,
    info: 'These tiny silver fish swim in massive schools. Their name comes from Spanish "anchova." Great on pizza (fight me).',
  },
  {
    name: 'Bluegill',
    spriteKey: 'bluegill',
    rarity: 'common',
    speed: 0.9,
    depth: 1,
    basePrice: 8,
    minWeight: 0.2,
    maxWeight: 1.0,
    info: 'Named for the blue coloring on their gill covers. One of the most commonly caught freshwater fish in North America.',
  },
  {
    name: 'Pumpkinseed',
    spriteKey: 'pumpkinseed',
    rarity: 'common',
    speed: 1.0,
    depth: 1,
    basePrice: 10,
    minWeight: 0.2,
    maxWeight: 0.8,
    info: 'One of the most colorful freshwater fish in North America. Named for its round, flat body shaped like a pumpkin seed.',
  },
  {
    name: 'Clownfish',
    spriteKey: 'clownfish',
    rarity: 'common',
    speed: 0.9,
    depth: 1,
    basePrice: 12,
    minWeight: 0.05,
    maxWeight: 0.25,
    info: 'Made famous by Finding Nemo. All clownfish are born male — the dominant fish in a group becomes female.',
  },

  // =============================================
  // COMMON — Mid (depth 2) — 3 fish
  // =============================================
  {
    name: 'Catfish',
    spriteKey: 'catfish',
    rarity: 'common',
    speed: 0.8,
    depth: 2,
    basePrice: 15,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'Has 8 whisker-like barbels for sensing food in murky water. Some species can "walk" between ponds using their fins.',
  },
  {
    name: 'Bass',
    spriteKey: 'bass',
    rarity: 'common',
    speed: 1.1,
    depth: 2,
    basePrice: 18,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'The king of freshwater sport fishing. Its mouth can open wide enough to swallow prey half its own size.',
  },
  {
    name: 'Atlantic Bass',
    spriteKey: 'atlantic-bass',
    rarity: 'common',
    speed: 1.0,
    depth: 2,
    basePrice: 20,
    minWeight: 1.5,
    maxWeight: 6.0,
    info: 'A schooling predator found along the Atlantic coast. They hunt in packs, cornering smaller fish against the surface.',
  },

  // =============================================
  // UNCOMMON — Surface (depth 1) — 2 fish
  // =============================================
  {
    name: 'Angelfish',
    spriteKey: 'angelfish',
    rarity: 'uncommon',
    speed: 1.2,
    depth: 1,
    basePrice: 25,
    minWeight: 0.1,
    maxWeight: 0.5,
    info: 'Their flat, disc-shaped bodies let them slip between coral branches. Some mate for life and guard their eggs fiercely.',
  },
  {
    name: 'Surgeonfish',
    spriteKey: 'surgeonfish',
    rarity: 'uncommon',
    speed: 1.3,
    depth: 1,
    basePrice: 28,
    minWeight: 0.3,
    maxWeight: 1.0,
    info: 'Named for the razor-sharp spines near their tails (like a surgeon\'s scalpel). Dory from Finding Nemo is a surgeonfish.',
  },

  // =============================================
  // UNCOMMON — Mid (depth 2) — 3 fish
  // =============================================
  {
    name: 'Rainbow Trout',
    spriteKey: 'rainbow-trout',
    rarity: 'uncommon',
    speed: 1.4,
    depth: 2,
    basePrice: 30,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'Named for the pink-red stripe along their sides. When they migrate to the ocean they\'re called "steelhead."',
  },
  {
    name: 'Brown Trout',
    spriteKey: 'brown-trout',
    rarity: 'uncommon',
    speed: 1.5,
    depth: 2,
    basePrice: 35,
    minWeight: 1.5,
    maxWeight: 10.0,
    info: 'Originally from Europe, now found worldwide. They\'re notoriously smart and wary — a true test of angling skill.',
  },
  {
    name: 'Pufferfish',
    spriteKey: 'pufferfish',
    rarity: 'uncommon',
    speed: 1.1,
    depth: 2,
    basePrice: 40,
    minWeight: 0.5,
    maxWeight: 3.0,
    info: 'Can inflate to twice its size by gulping water. Contains tetrodotoxin — 1,200 times more poisonous than cyanide.',
  },

  // =============================================
  // RARE — Mid (depth 2) — 1 fish
  // =============================================
  {
    name: 'Dungeness Crab',
    spriteKey: 'crab',
    rarity: 'rare',
    speed: 1.6,
    depth: 2,
    basePrice: 55,
    minWeight: 1.0,
    maxWeight: 4.0,
    info: 'Named after a small fishing village in Washington state. They can regenerate lost claws over several molting cycles.',
  },

  // =============================================
  // RARE — Deep (depth 3) — 3 fish
  // =============================================
  {
    name: 'Tiger Trout',
    spriteKey: 'tiger-trout',
    rarity: 'rare',
    speed: 1.8,
    depth: 3,
    basePrice: 60,
    minWeight: 1.0,
    maxWeight: 8.0,
    info: 'A hybrid of brook trout and brown trout — sterile and rare in the wild. Named for their striking tiger-like markings.',
  },
  {
    name: 'Rainbow Shark',
    spriteKey: 'rainbow-shark',
    rarity: 'rare',
    speed: 2.0,
    depth: 3,
    basePrice: 70,
    minWeight: 0.2,
    maxWeight: 1.0,
    info: 'Not actually a shark — it\'s a freshwater fish from Southeast Asia. Fiercely territorial despite its small size.',
  },
  {
    name: 'Tuna',
    spriteKey: 'tuna',
    rarity: 'rare',
    speed: 1.9,
    depth: 3,
    basePrice: 80,
    minWeight: 10.0,
    maxWeight: 60.0,
    info: 'Built for speed — can swim up to 45 mph. Their body temperature is warmer than the surrounding water, unusual for fish.',
  },

  // =============================================
  // LEGENDARY — Deep (depth 3) — 2 fish
  // =============================================
  {
    name: 'Bluefin Tuna',
    spriteKey: 'bluefin-tuna',
    rarity: 'legendary',
    speed: 2.3,
    depth: 3,
    basePrice: 250,
    minWeight: 50.0,
    maxWeight: 500.0,
    info: 'Can weigh over 1,000 lbs and swim 45 mph. A single fish sold at auction in Japan for $3.1 million in 2019.',
  },
  {
    name: 'Blobfish',
    spriteKey: 'blobfish',
    rarity: 'legendary',
    speed: 1.4,
    depth: 3,
    basePrice: 400,
    minWeight: 3.0,
    maxWeight: 12.0,
    info: 'Only looks blobby at the surface — at its normal depth (3,000+ ft), water pressure keeps it looking like a normal fish.',
  },

  // =============================================
  // JUNK — Any depth — 2 items
  // =============================================
  {
    name: 'Rusty Can',
    spriteKey: 'rusty-can',
    rarity: 'junk',
    speed: 0.3,
    depth: 1,
    basePrice: 1,
    minWeight: 0.3,
    maxWeight: 0.3,
    info: 'Not a fish. Someone littered. At least you\'re cleaning up the ocean!',
  },
  {
    name: 'Worm',
    spriteKey: 'worm',
    rarity: 'junk',
    speed: 0.2,
    depth: 1,
    basePrice: 2,
    minWeight: 0.01,
    maxWeight: 0.05,
    info: 'Wait... you caught your own bait? That\'s some kind of fishing paradox.',
  },
];

/**
 * Roll a random fish based on weighted rarity and max accessible depth.
 * Common: 40%, Uncommon: 30%, Rare: 18%, Legendary: 7%, Junk: 5%
 */
export function rollFish(maxDepth = 1, rarityBoost = 0) {
  const roll = Math.random();

  const junkThreshold = 0.05;
  const legendaryThreshold = 0.95 - rarityBoost;
  const rareThreshold = 0.77 - rarityBoost;
  const uncommonThreshold = 0.40 - rarityBoost * 0.5;

  let tier;
  if (roll < junkThreshold) tier = 'junk';
  else if (roll >= legendaryThreshold) tier = 'legendary';
  else if (roll >= rareThreshold) tier = 'rare';
  else if (roll >= uncommonThreshold) tier = 'uncommon';
  else tier = 'common';

  let pool = FISH_SPECIES.filter(f => f.rarity === tier && f.depth <= maxDepth);

  // Fallback: if no fish available at this tier+depth, pick from all available
  if (pool.length === 0) {
    pool = FISH_SPECIES.filter(f => f.depth <= maxDepth && f.rarity !== 'junk');
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
  const minSize = Math.max(1, fish.minWeight * 4 + 2);
  const maxSize = Math.min(120, fish.maxWeight * 1.5 + 5);
  const size = minSize + (maxSize - minSize) * ratio;
  return Math.round(size * 10) / 10;
}

/**
 * Calculate sell price based on base price, weight, rarity, and hook bonus.
 */
export function calculateSellPrice(fish, weight, hookBonus = 1.0) {
  const weightMultiplier = weight / (fish.minWeight || 0.01);
  const rarityBonus = { junk: 0.5, common: 1, uncommon: 1.5, rare: 2.5, legendary: 5 }[fish.rarity] || 1;
  const price = Math.round(fish.basePrice * Math.sqrt(weightMultiplier) * rarityBonus * hookBonus);
  return Math.max(1, price);
}

/**
 * Get a rarity color for display
 */
export function rarityColor(rarity) {
  switch (rarity) {
    case 'junk': return '#888888';
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
    case 'junk': return '🗑️ Junk';
    case 'common': return '⚪ Common';
    case 'uncommon': return '🔵 Uncommon';
    case 'rare': return '🟣 Rare';
    case 'legendary': return '⭐ Legendary';
    default: return rarity;
  }
}
