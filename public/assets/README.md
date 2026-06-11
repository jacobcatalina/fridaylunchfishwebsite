# Assets

Drop asset files here. The game supports both individual sprites and sprite sheets.

## Folder structure

```
assets/
├── fish/          — Individual fish sprites (PNG, one fish per file)
├── sheets/        — Sprite sheets (PNG) + their JSON metadata
├── environment/   — Backgrounds, plants, rocks, bubbles, ground tiles
├── ui/            — Buttons, frames, icons, fonts
```

## Individual sprites

Just drop PNGs into `fish/`. Name them to match the species:
- `striped-bass.png`
- `brook-trout.png`
- etc.

Recommended: transparent background, side-profile facing right (the code flips horizontally for left-facing). Any size works — the game will scale them.

## Sprite sheets

Sprite sheets work great and are more efficient (fewer HTTP requests). Drop the sheet PNG into `sheets/` along with a JSON file that describes the frames.

### JSON format (standard TexturePacker / Aseprite export)

Name the JSON the same as the sheet image:
- `fish-sheet.png`
- `fish-sheet.json`

```json
{
  "frames": {
    "striped-bass": {
      "frame": { "x": 0, "y": 0, "w": 32, "h": 32 }
    },
    "brook-trout": {
      "frame": { "x": 32, "y": 0, "w": 32, "h": 32 }
    },
    "largemouth-bass": {
      "frame": { "x": 64, "y": 0, "w": 32, "h": 32 }
    }
  },
  "meta": {
    "image": "fish-sheet.png",
    "size": { "w": 256, "h": 256 },
    "scale": 1
  }
}
```

### Animated sprite sheets

For fish with swim animations, each frame gets a suffix:

```json
{
  "frames": {
    "striped-bass-0": { "frame": { "x": 0, "y": 0, "w": 32, "h": 32 } },
    "striped-bass-1": { "frame": { "x": 32, "y": 0, "w": 32, "h": 32 } },
    "striped-bass-2": { "frame": { "x": 64, "y": 0, "w": 32, "h": 32 } }
  }
}
```

### No JSON? Manual grid sheets work too

If you have a simple grid sheet (all frames same size, evenly spaced), just drop it in `sheets/` and we'll configure it in code by specifying:
- Frame width/height
- Number of columns/rows
- Which frame maps to which fish

## Supported formats
- **PNG** (preferred — supports transparency)
- **WebP** (smaller file size, good support)
- **SVG** (for UI elements)
