/**
 * Sprite configuration — maps every fish spriteKey to its actual image file.
 * Every fish in FISH_SPECIES has a sprite registered here. No emoji fallbacks.
 * 
 * 16x16 sprites are marked { small: true } — rendered smaller with pixelated scaling.
 * 64x64 sprites render at full size with smooth scaling.
 */

import { registerSprite, registerGridSheet } from './sprites.js';

/**
 * Initialize all sprites. Called at app start.
 */
export async function initSprites() {
  const f = '/assets/fish';

  // === 16x16 sprites (small, pixelated) ===
  registerSprite('anchovy', `${f}/Anchovy.png`, { small: true });
  registerSprite('angelfish', `${f}/Angelfish.png`, { small: true });
  registerSprite('bass', `${f}/Bass.png`, { small: true });
  registerSprite('catfish', `${f}/Catfish.png`, { small: true });
  registerSprite('clownfish', `${f}/Clownfish.png`, { small: true });
  registerSprite('crab', `${f}/Crab - Dungeness.png`, { small: true });
  registerSprite('goldfish', `${f}/Goldfish.png`, { small: true });
  registerSprite('pufferfish', `${f}/Pufferfish.png`, { small: true });
  registerSprite('rainbow-trout', `${f}/Rainbow Trout.png`, { small: true });
  registerSprite('rusty-can', `${f}/Rusty Can.png`, { small: true });
  registerSprite('surgeonfish', `${f}/Surgeonfish.png`, { small: true });
  registerSprite('worm', `${f}/Worm.png`, { small: true });

  // === 64x64 sprites (normal size) ===
  registerSprite('bluefin-tuna', `${f}/bluefin-tuna.png`);
  registerSprite('bluegill', `${f}/bluegill.png`);
  registerSprite('brown-trout', `${f}/brown-trout.png`);
  registerSprite('minnow', `${f}/minnow.png`);
  registerSprite('pumpkinseed', `${f}/pumpkinseed.png`);
  registerSprite('rainbow-shark', `${f}/rainbow-shark.png`);
  registerSprite('tiger-trout', `${f}/tiger-trout.png`);
  registerSprite('tuna', `${f}/Tuna.png`);

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

  console.log('[sprites] All sprites loaded');
}
