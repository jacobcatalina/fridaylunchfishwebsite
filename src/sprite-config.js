/**
 * Sprite configuration — maps fish species to their asset files.
 * 
 * Asset packs available:
 * - 66 Fishies (64x64 individual PNGs) - colorful pixel art fish
 * - Named fish sprites (16x16) - Bass, Catfish, Rainbow Trout, etc.
 * - pack1 (64x64 single sprite) - Atlantic Bass recoloured
 * - pack2 (512x64 sheet, 8 frames) - Fishing items/gear
 * - Blobfish Spritesheet (256x256, 4x4 = 16 frames) - animated blobfish
 * - Ocean Asset Pack (63 varied-size sprites) - environment decorations
 */

import { registerSprite, registerGridSheet } from './sprites.js';

/**
 * Initialize all sprites. Called at app start.
 */
export async function initSprites() {
  // === Named fish sprites (16x16, will be scaled up with pixelated rendering) ===
  registerSprite('bass', '/assets/fish/Bass.png');
  registerSprite('catfish', '/assets/fish/Catfish.png');
  registerSprite('rainbow-trout', '/assets/fish/Rainbow Trout.png');
  registerSprite('anchovy', '/assets/fish/Anchovy.png');
  registerSprite('clownfish', '/assets/fish/Clownfish.png');
  registerSprite('angelfish', '/assets/fish/Angelfish.png');
  registerSprite('goldfish', '/assets/fish/Goldfish.png');
  registerSprite('pufferfish', '/assets/fish/Pufferfish.png');
  registerSprite('surgeonfish', '/assets/fish/Surgeonfish.png');
  registerSprite('crab', '/assets/fish/Crab - Dungeness.png');
  registerSprite('worm', '/assets/fish/Worm.png');
  registerSprite('rusty-can', '/assets/fish/Rusty Can.png');

  // === 66 Fishies pack (64x64) — map to our game species ===
  // These are beautiful pixel art fish; assigning them to game species by visual fit
  const fishiesBase = '/assets/fish/66 v6.1 Fishies 64x64';

  // Surface fish (common)
  registerSprite('golden-shiner', `${fishiesBase}/fishv1 01.png`);
  registerSprite('pumpkinseed', `${fishiesBase}/fishv1 02.png`);
  registerSprite('yellow-perch', `${fishiesBase}/fishv1 03.png`);
  registerSprite('black-crappie', `${fishiesBase}/fishv1 04.png`);
  registerSprite('carp', `${fishiesBase}/fishv1 05.png`);

  // Mid-depth fish (common)
  registerSprite('white-catfish', `${fishiesBase}/fishv1 06.png`);
  registerSprite('largemouth-bass', `${fishiesBase}/fishv1 07.png`);

  // Uncommon — Surface
  registerSprite('alewife', `${fishiesBase}/fishv1 08.png`);
  registerSprite('blueback-herring', `${fishiesBase}/fishv1 09.png`);

  // Uncommon — Mid
  registerSprite('striped-bass', `${fishiesBase}/fishv1 10.png`);
  registerSprite('american-shad', `${fishiesBase}/fishv1 11.png`);
  registerSprite('bluefish', `${fishiesBase}/fishv1 12.png`);

  // Rare — Deep
  registerSprite('brook-trout', `${fishiesBase}/fishv1 13.png`);
  registerSprite('atlantic-cod', `${fishiesBase}/fishv1 14.png`);
  registerSprite('american-eel', `${fishiesBase}/fishv1 15.png`);

  // Legendary
  registerSprite('giant-bluefin-tuna', `${fishiesBase}/fishv1 16.png`);
  registerSprite('prehistoric-coelacanth', `${fishiesBase}/fishv1 17.png`);

  // === Blobfish spritesheet (256x256, 4x4 grid of 64x64 frames) - animated blobfish ===
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

  // === pack1 (single 64x64 sprite) ===
  registerSprite('atlantic-bass', '/assets/sheets/pack1_global_free_recoloured.png');

  // === pack2 Fishing Items sheet (512x64, 8 cols of 64x64) ===
  // These are fishing gear/items — used for shop UI
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

  console.log('[sprites] All sprites loaded');
}

/**
 * Environment decoration sprites for the aquarium backdrop.
 * Returns arrays of paths categorized by likely content type.
 */
export const ENVIRONMENT_SPRITES = {
  // Ocean Asset Pack — various corals, rocks, seaweed, shells
  // Organized by rough category based on sprite numbering
  corals: [
    '/assets/environment/pack3_OceanAssetPack/sprite_1.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_2.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_3.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_4.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_5.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_6.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_7.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_8.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_9.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_10.png',
  ],
  seaweed: [
    '/assets/environment/pack3_OceanAssetPack/sprite_11.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_12.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_13.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_14.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_15.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_16.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_17.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_18.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_19.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_20.png',
  ],
  rocks: [
    '/assets/environment/pack3_OceanAssetPack/sprite_21.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_22.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_23.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_24.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_25.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_26.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_27.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_28.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_29.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_30.png',
  ],
  shells: [
    '/assets/environment/pack3_OceanAssetPack/sprite_31.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_32.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_33.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_34.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_35.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_36.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_37.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_38.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_39.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_40.png',
  ],
  plants: [
    '/assets/environment/pack3_OceanAssetPack/sprite_41.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_42.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_43.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_44.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_45.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_46.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_47.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_48.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_49.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_50.png',
  ],
  misc: [
    '/assets/environment/pack3_OceanAssetPack/sprite_51.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_52.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_53.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_54.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_55.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_56.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_57.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_58.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_59.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_60.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_61.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_62.png',
    '/assets/environment/pack3_OceanAssetPack/sprite_63.png',
  ],
};
