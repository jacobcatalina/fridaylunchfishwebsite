/**
 * Sprite configuration — maps fish species to their asset files.
 * 
 * Only using named, identifiable fish sprites. The "66 Fishies" pack 
 * contains generic pixel art that can't be matched to real species,
 * so we skip it. Species without a sprite fall back to emoji.
 */

import { registerSprite, registerGridSheet } from './sprites.js';

/**
 * Initialize all sprites. Called at app start.
 */
export async function initSprites() {
  // === Named fish sprites (16x16, scaled up with pixelated rendering) ===
  // These are clearly identifiable real fish
  registerSprite('largemouth-bass', '/assets/fish/Bass.png');
  registerSprite('white-catfish', '/assets/fish/Catfish.png');
  registerSprite('brook-trout', '/assets/fish/Rainbow Trout.png');
  registerSprite('anchovy', '/assets/fish/Anchovy.png');
  registerSprite('clownfish', '/assets/fish/Clownfish.png');
  registerSprite('angelfish', '/assets/fish/Angelfish.png');
  registerSprite('goldfish', '/assets/fish/Goldfish.png');
  registerSprite('pufferfish', '/assets/fish/Pufferfish.png');
  registerSprite('surgeonfish', '/assets/fish/Surgeonfish.png');

  // Bonus items
  registerSprite('rusty-can', '/assets/fish/Rusty Can.png');
  registerSprite('worm', '/assets/fish/Worm.png');

  // === Blobfish spritesheet (256x256, 4x4 grid of 64x64 frames) ===
  registerGridSheet('/assets/sheets/Blobfish Spritesheet.png', {
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
    mapping: [
      'blobfish', 'blobfish', 'blobfish', 'blobfish',
      'blobfish', 'blobfish', 'blobfish', 'blobfish',
      'blobfish', 'blobfish', 'blobfish', 'blobfish',
      'blobfish', 'blobfish', 'blobfish', 'blobfish',
    ],
  });

  // === pack1 (single 64x64 sprite) — recoloured bass ===
  registerSprite('atlantic-bass', '/assets/sheets/pack1_global_free_recoloured.png');

  // === pack2 Fishing Items sheet (512x64, 8 cols of 64x64) — for shop UI ===
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

  console.log('[sprites] Sprites loaded');
}
