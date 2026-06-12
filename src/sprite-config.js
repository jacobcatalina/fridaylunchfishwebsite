/**
 * Sprite configuration — maps fish species to real fish images.
 * 
 * Each species gets a real photograph/illustration saved as:
 *   public/assets/fish/{spriteKey}.png
 * 
 * See FISH_IMAGES_NEEDED.md for the download list.
 */

import { registerSprite, registerGridSheet } from './sprites.js';

/**
 * Initialize all sprites. Called at app start.
 */
export async function initSprites() {
  // === Real fish images (one per species) ===
  // These are actual photos/illustrations of each species
  const fishBase = '/assets/fish';

  // Common - Surface
  registerSprite('golden-shiner', `${fishBase}/golden-shiner.png`);
  registerSprite('pumpkinseed', `${fishBase}/pumpkinseed.png`);
  registerSprite('yellow-perch', `${fishBase}/yellow-perch.png`);
  registerSprite('black-crappie', `${fishBase}/black-crappie.png`);
  registerSprite('carp', `${fishBase}/carp.png`);

  // Common - Mid
  registerSprite('white-catfish', `${fishBase}/white-catfish.png`);
  registerSprite('largemouth-bass', `${fishBase}/largemouth-bass.png`);

  // Uncommon - Surface
  registerSprite('alewife', `${fishBase}/alewife.png`);
  registerSprite('blueback-herring', `${fishBase}/blueback-herring.png`);

  // Uncommon - Mid
  registerSprite('striped-bass', `${fishBase}/striped-bass.png`);
  registerSprite('american-shad', `${fishBase}/american-shad.png`);
  registerSprite('bluefish', `${fishBase}/bluefish.png`);

  // Rare - Deep
  registerSprite('brook-trout', `${fishBase}/brook-trout.png`);
  registerSprite('atlantic-cod', `${fishBase}/atlantic-cod.png`);
  registerSprite('american-eel', `${fishBase}/american-eel.png`);

  // Legendary - Deep
  registerSprite('giant-bluefin-tuna', `${fishBase}/giant-bluefin-tuna.png`);
  registerSprite('prehistoric-coelacanth', `${fishBase}/prehistoric-coelacanth.png`);
  registerSprite('blobfish', `${fishBase}/blobfish.png`);

  // Junk
  registerSprite('rusty-can', `${fishBase}/rusty-can.png`);

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

  console.log('[sprites] Sprites loaded');
}
