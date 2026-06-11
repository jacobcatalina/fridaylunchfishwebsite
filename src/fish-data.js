/**
 * Boston / Massachusetts fish species for the game.
 * Rarity tiers affect fish-target speed in the minigame.
 * Tier: common (slow), uncommon (medium), rare (fast & erratic)
 */
export const FISH_SPECIES = [
  // Common (easy catch)
  { name: 'Largemouth Bass', emoji: '🐟', rarity: 'common', speed: 1.0 },
  { name: 'Yellow Perch', emoji: '🐠', rarity: 'common', speed: 1.0 },
  { name: 'Pumpkinseed', emoji: '🐠', rarity: 'common', speed: 1.1 },
  { name: 'Black Crappie', emoji: '🐟', rarity: 'common', speed: 1.0 },
  { name: 'Golden Shiner', emoji: '🐠', rarity: 'common', speed: 0.9 },
  { name: 'White Catfish', emoji: '🐟', rarity: 'common', speed: 0.8 },
  { name: 'Carp', emoji: '🐟', rarity: 'common', speed: 0.7 },

  // Uncommon (moderate challenge)
  { name: 'Striped Bass', emoji: '🐡', rarity: 'uncommon', speed: 1.4 },
  { name: 'Bluefish', emoji: '🐟', rarity: 'uncommon', speed: 1.5 },
  { name: 'Alewife', emoji: '🐠', rarity: 'uncommon', speed: 1.3 },
  { name: 'American Shad', emoji: '🐟', rarity: 'uncommon', speed: 1.4 },
  { name: 'Blueback Herring', emoji: '🐠', rarity: 'uncommon', speed: 1.3 },

  // Rare (fast & erratic)
  { name: 'Brook Trout', emoji: '🐡', rarity: 'rare', speed: 1.8 },
  { name: 'Atlantic Cod', emoji: '🐟', rarity: 'rare', speed: 1.7 },
  { name: 'American Eel', emoji: '🐍', rarity: 'rare', speed: 2.0 },
];

/**
 * Roll a random fish based on weighted rarity.
 * Common: 60%, Uncommon: 30%, Rare: 10%
 */
export function rollFish() {
  const roll = Math.random();
  let tier;
  if (roll < 0.6) tier = 'common';
  else if (roll < 0.9) tier = 'uncommon';
  else tier = 'rare';

  const pool = FISH_SPECIES.filter(f => f.rarity === tier);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Get a rarity color for display
 */
export function rarityColor(rarity) {
  switch (rarity) {
    case 'common': return '#8bc34a';
    case 'uncommon': return '#4ecdc4';
    case 'rare': return '#ff6b6b';
    default: return '#fff';
  }
}
