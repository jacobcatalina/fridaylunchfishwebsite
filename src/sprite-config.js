/**
 * Sprite configuration — maps every fish spriteKey to its actual image file.
 * Every fish in FISH_SPECIES has a sprite registered here. No emoji fallbacks.
 */

import { registerSprite, registerGridSheet } from './sprites.js';

/**
 * Initialize all sprites. Called at app start.
 */
export async function initSprites() {
  const f = '/assets/fish';

  // === Common — Surface ===
  registerSprite('minnow', `${f}/minnow.png`);
  registerSprite('goldfish', `${f}/Goldfish.png`);
  registerSprite('anchovy', `${f}/Anchovy.png`);
  registerSprite('bluegill', `${f}/bluegill.png`);
  registerSprite('pumpkinseed', `${f}/pumpkinseed.png`);
  registerSprite('clownfish', `${f}/Clownfish.png`);

  // === Common — Mid ===
  registerSprite('catfish', `${f}/Catfish.png`);
  registerSprite('bass', `${f}/Bass.png`);
  registerSprite('atlantic-bass', '/assets/sheets/pack1_global_free_recoloured.png');

  // === Uncommon — Surface ===
  registerSprite('angelfish', `${f}/Angelfish.png`);
  registerSprite('surgeonfish', `${f}/Surgeonfish.png`);

  // === Uncommon — Mid ===
  registerSprite('rainbow-trout', `${f}/Rainbow Trout.png`);
  registerSprite('brown-trout', `${f}/brown-trout.png`);
  registerSprite('pufferfish', `${f}/Pufferfish.png`);

  // === Rare — Mid ===
  registerSprite('crab', `${f}/Crab - Dungeness.png`);

  // === Rare — Deep ===
  registerSprite('tiger-trout', `${f}/tiger-trout.png`);
  registerSprite('rainbow-shark', `${f}/rainbow-shark.png`);
  registerSprite('tuna', `${f}/Tuna.png`);

  // === Legendary — Deep ===
  registerSprite('bluefin-tuna', `${f}/bluefin-tuna.png`);
  registerSprite('blobfish', '/assets/sheets/Blobfish Spritesheet.png');

  // === Junk ===
  registerSprite('rusty-can', `${f}/Rusty Can.png`);
  registerSprite('worm', `${f}/Worm.png`);

  // === Fishing items sheet (for shop UI) ===
  registerGridSheet('/assets/sheets/pack2_ItemsFishingA.png', {
    frameWidth: 64,
    frameHeight: 64,
    columns: 8,
    rows: 1,
    mapping: [
      'item-rod', 'item-hook', 'item-bobber', 'item-bait',
      'item-bucket', 'item-net', 'item-tackle', 'item-fish-caught',
    ],
  });

  console.log('[sprites] All 22 sprites loaded');
}
