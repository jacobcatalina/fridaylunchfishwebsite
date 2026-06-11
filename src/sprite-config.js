/**
 * Sprite configuration — maps fish species to their asset files.
 *
 * Edit this file as you add new assets to public/assets/.
 * The game will fall back to emoji for any species without a registered sprite.
 */

import { registerSprite, registerGridSheet, loadSheetFromJSON } from './sprites.js';

/**
 * Initialize all sprites. Call this at app start before rendering the aquarium.
 */
export async function initSprites() {
  // === Individual sprites ===
  // Uncomment and add paths as you drop files into public/assets/fish/
  //
  // registerSprite('striped-bass', '/assets/fish/striped-bass.png');
  // registerSprite('brook-trout', '/assets/fish/brook-trout.png');
  // registerSprite('largemouth-bass', '/assets/fish/largemouth-bass.png');
  // registerSprite('yellow-perch', '/assets/fish/yellow-perch.png');
  // registerSprite('atlantic-cod', '/assets/fish/atlantic-cod.png');
  // registerSprite('american-eel', '/assets/fish/american-eel.png');
  // registerSprite('golden-shiner', '/assets/fish/golden-shiner.png');
  // registerSprite('pumpkinseed', '/assets/fish/pumpkinseed.png');
  // registerSprite('black-crappie', '/assets/fish/black-crappie.png');
  // registerSprite('carp', '/assets/fish/carp.png');
  // registerSprite('white-catfish', '/assets/fish/white-catfish.png');
  // registerSprite('alewife', '/assets/fish/alewife.png');
  // registerSprite('blueback-herring', '/assets/fish/blueback-herring.png');
  // registerSprite('american-shad', '/assets/fish/american-shad.png');
  // registerSprite('bluefish', '/assets/fish/bluefish.png');
  // registerSprite('giant-bluefin-tuna', '/assets/fish/giant-bluefin-tuna.png');
  // registerSprite('prehistoric-coelacanth', '/assets/fish/prehistoric-coelacanth.png');

  // === Sprite sheets with JSON metadata ===
  // Drop a .png + .json pair into public/assets/sheets/, then uncomment:
  //
  // await loadSheetFromJSON('/assets/sheets/fish-sheet.json');

  // === Grid sheets (uniform frame size, no JSON needed) ===
  // If you have a sheet where all frames are the same size in a grid:
  //
  // registerGridSheet('/assets/sheets/fish-grid.png', {
  //   frameWidth: 32,
  //   frameHeight: 32,
  //   columns: 8,
  //   rows: 2,
  //   mapping: [
  //     'striped-bass', 'brook-trout', 'largemouth-bass', 'yellow-perch',
  //     'atlantic-cod', 'american-eel', 'golden-shiner', 'pumpkinseed',
  //     'black-crappie', 'carp', 'white-catfish', 'alewife',
  //     'blueback-herring', 'american-shad', 'bluefish', 'giant-bluefin-tuna',
  //   ],
  // });

  console.log('[sprites] Sprite config loaded');
}
