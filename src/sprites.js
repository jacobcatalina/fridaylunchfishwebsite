/**
 * Sprite loading system.
 * Supports:
 * - Individual PNG sprites (one per fish)
 * - Sprite sheets with JSON metadata (TexturePacker/Aseprite format)
 * - Grid-based sheets (uniform frame size, no JSON needed)
 *
 * Sprites are rendered using CSS background-image + background-position
 * for sheets, or plain <img> for individuals. Both work in the DOM-based aquarium.
 */

// Registry of loaded sprites
const spriteRegistry = new Map();

// Cache for loaded sheet metadata
const sheetCache = new Map();

/**
 * Register an individual sprite for a fish species.
 * @param {string} speciesKey - e.g. "striped-bass"
 * @param {string} imagePath - e.g. "/assets/fish/striped-bass.png"
 */
export function registerSprite(speciesKey, imagePath) {
  spriteRegistry.set(speciesKey, {
    type: 'individual',
    src: imagePath,
  });
}

/**
 * Register a sprite sheet with JSON frame data.
 * @param {string} sheetPath - e.g. "/assets/sheets/fish-sheet.png"
 * @param {object} frameData - The parsed JSON frames object
 */
export function registerSheet(sheetPath, frameData) {
  const frames = frameData.frames || {};

  for (const [frameName, frameInfo] of Object.entries(frames)) {
    // Strip animation suffix to get base species key (e.g. "striped-bass-0" -> "striped-bass")
    const baseKey = frameName.replace(/-\d+$/, '');

    if (!spriteRegistry.has(baseKey)) {
      spriteRegistry.set(baseKey, {
        type: 'sheet',
        src: sheetPath,
        frames: [],
      });
    }

    const entry = spriteRegistry.get(baseKey);
    if (entry.type === 'sheet') {
      entry.frames.push({
        name: frameName,
        x: frameInfo.frame.x,
        y: frameInfo.frame.y,
        w: frameInfo.frame.w,
        h: frameInfo.frame.h,
      });
    }
  }
}

/**
 * Register a grid-based sprite sheet (uniform frame sizes, no JSON).
 * @param {string} sheetPath - image URL
 * @param {object} config - { frameWidth, frameHeight, columns, rows, mapping }
 *   mapping: array of species keys in left-to-right, top-to-bottom order
 *   e.g. ["striped-bass", "brook-trout", "largemouth-bass", ...]
 */
export function registerGridSheet(sheetPath, config) {
  const { frameWidth, frameHeight, columns, mapping } = config;

  mapping.forEach((speciesKey, index) => {
    if (!speciesKey) return; // skip empty slots

    const col = index % columns;
    const row = Math.floor(index / columns);

    spriteRegistry.set(speciesKey, {
      type: 'sheet',
      src: sheetPath,
      frames: [{
        name: speciesKey,
        x: col * frameWidth,
        y: row * frameHeight,
        w: frameWidth,
        h: frameHeight,
      }],
    });
  });
}

/**
 * Load a sprite sheet JSON file and register it.
 * @param {string} jsonPath - e.g. "/assets/sheets/fish-sheet.json"
 */
export async function loadSheetFromJSON(jsonPath) {
  if (sheetCache.has(jsonPath)) return;

  try {
    const response = await fetch(jsonPath);
    const data = await response.json();

    const sheetDir = jsonPath.substring(0, jsonPath.lastIndexOf('/') + 1);
    const sheetImage = sheetDir + (data.meta?.image || jsonPath.replace('.json', '.png'));

    registerSheet(sheetImage, data);
    sheetCache.set(jsonPath, data);
  } catch (err) {
    console.warn(`[sprites] Failed to load sheet: ${jsonPath}`, err);
  }
}

/**
 * Check if a species has a registered sprite.
 */
export function hasSprite(speciesKey) {
  return spriteRegistry.has(speciesKey);
}

/**
 * Create a DOM element for a fish sprite.
 * Returns an element ready to append (either an <img> or a <div> with background).
 * Falls back to emoji if no sprite registered.
 *
 * @param {string} speciesKey - e.g. "striped-bass"
 * @param {string} fallbackEmoji - emoji to use if no sprite found
 * @param {number} displaySize - pixel size to render at (default 48)
 * @returns {HTMLElement}
 */
export function createSpriteElement(speciesKey, fallbackEmoji = '🐟', displaySize = 48) {
  const entry = spriteRegistry.get(speciesKey);

  if (!entry) {
    // Fallback to emoji
    const span = document.createElement('span');
    span.className = 'fish-sprite fish-sprite-emoji';
    span.textContent = fallbackEmoji;
    span.style.fontSize = `${displaySize * 0.6}px`;
    return span;
  }

  if (entry.type === 'individual') {
    const img = document.createElement('img');
    img.className = 'fish-sprite fish-sprite-img';
    img.src = entry.src;
    img.alt = speciesKey;
    img.style.width = `${displaySize}px`;
    img.style.height = `${displaySize}px`;
    img.style.objectFit = 'contain';
    img.style.imageRendering = 'pixelated';
    return img;
  }

  if (entry.type === 'sheet' && entry.frames.length > 0) {
    const frame = entry.frames[0]; // first frame (or we can animate later)
    const div = document.createElement('div');
    div.className = 'fish-sprite fish-sprite-sheet';
    div.style.width = `${displaySize}px`;
    div.style.height = `${displaySize}px`;
    div.style.backgroundImage = `url(${entry.src})`;
    div.style.backgroundSize = `${(displaySize / frame.w) * getSheetWidth(entry)}px auto`;
    div.style.backgroundPosition = `-${(frame.x / frame.w) * displaySize}px -${(frame.y / frame.h) * displaySize}px`;
    div.style.backgroundRepeat = 'no-repeat';
    div.style.imageRendering = 'pixelated';

    // If animated (multiple frames), set up CSS animation
    if (entry.frames.length > 1) {
      div.dataset.animated = 'true';
      div.dataset.frames = JSON.stringify(entry.frames);
      div.dataset.frameSize = displaySize;
      startFrameAnimation(div, entry, displaySize);
    }

    return div;
  }

  // Shouldn't reach here, but fallback
  const span = document.createElement('span');
  span.className = 'fish-sprite fish-sprite-emoji';
  span.textContent = fallbackEmoji;
  return span;
}

/**
 * Animate a sprite sheet element through its frames.
 */
function startFrameAnimation(el, entry, displaySize) {
  let frameIndex = 0;
  const fps = 4; // 4 frames per second for pixel art

  setInterval(() => {
    frameIndex = (frameIndex + 1) % entry.frames.length;
    const frame = entry.frames[frameIndex];
    el.style.backgroundPosition = `-${(frame.x / frame.w) * displaySize}px -${(frame.y / frame.h) * displaySize}px`;
  }, 1000 / fps);
}

/**
 * Estimate sheet width from frame data. 
 * (Needed to calculate backgroundSize scaling.)
 */
function getSheetWidth(entry) {
  let maxRight = 0;
  for (const frame of entry.frames) {
    maxRight = Math.max(maxRight, frame.x + frame.w);
  }
  return maxRight || 256; // fallback
}

/**
 * Convert a fish species name to a key for sprite lookup.
 * "Striped Bass" -> "striped-bass"
 */
export function speciesToKey(speciesName) {
  return speciesName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get all registered sprite keys (for debugging/admin).
 */
export function listRegisteredSprites() {
  return Array.from(spriteRegistry.keys());
}
