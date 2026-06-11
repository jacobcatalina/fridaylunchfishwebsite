# Website Build Plan: fridaylunchfish

A written spec for the Friday Lunch fish website. **This project only documents the
plan** — the site itself will be built later in a separate Kiro instance. Treat this
as the brief to hand to that build.

## Overview

- **What:** a single-page, mobile-first **multiplayer fishing game**. That's the
  whole site — no tabs, no other sections.
- **Where:** custom cheap domain (e.g. `fridaylunchfish.com`) deployed on **Vercel**.
- **Why:** Part 2 of my Friday Lunch — the team plays it together on their phones
  during the session.
- **Primary device:** mobile. Design touch-first; desktop is secondary.

> Other interesting fish websites (e.g. Neal Agarwal's "The Deep Sea") will just be
> **shown on the presentation slides**, not embedded or rebuilt here. Keeps this
> project focused on the one thing that matters: the game.

## Hosting & Domain

- Buy a cheap domain (e.g. `fridaylunchfish.com`) — any registrar.
- Deploy on **Vercel** (free tier is plenty for a static/SPA site).
- Point the domain at Vercel via DNS (add domain in Vercel project → set nameservers
  or A/CNAME records at the registrar).
- Share with the team via the URL + a **QR code** on the presentation slide.

## Tech Stack (proposed)

- Static site or lightweight SPA. Plain **HTML/CSS/JS** or a small framework
  (Vite + vanilla, or React if we want playhtml's React bindings).
- **playhtml** for real-time multiplayer (see Multiplayer section).
- No backend needed if we lean on playhtml for shared state + Vercel for static
  hosting.

### Rendering approach for the game / aquarium

How much library we need depends on the visual bar we set. Options, lightest first:

- **Plain DOM + CSS animations** — fish are `<img>`/`<div>` elements moved with CSS
  transforms/keyframes. Zero deps, easiest to wire to playhtml (each fish is just an
  element), great for a small tank. Likely **enough for the shared aquarium**.
  Reference demos: [CSS Animated Fish Tank](https://codepen.io/jgil473/pen/axRNbB),
  [CoderAvi/fish-aquarium](https://github.com/CoderAvi/fish-aquarium),
  [unicorn-in-training/virtual-aquarium](https://github.com/unicorn-in-training/virtual-aquarium).
- **HTML5 Canvas (vanilla)** — one `<canvas>`, draw fish each frame. Good middle
  ground for the fishing minigame if we want custom motion/particles without a
  framework.
- **[PixiJS](https://pixijs.com/)** — fast WebGL 2D renderer (no game logic). Best
  if we want lots of fish + effects running smoothly; ~450KB. Overkill unless the
  tank gets busy.
- **[Phaser](https://phaser.io/)** — full 2D game framework (physics, input, scenes).
  More than we need for this, but the most batteries-included if the game grows.

> **Recommendation:** start with **DOM/CSS** for both the aquarium and the minigame.
> It's the least code, plays nicely with playhtml's element-based model, and is
> plenty for a Friday Lunch crowd. Escalate to Canvas/PixiJS only if performance or
> visual ambition demands it. Benchmark reference:
> [js-game-rendering-benchmark](https://github.com/Shirajuki/js-game-rendering-benchmark).

### Reusable code references (check licenses)

- Fishing mechanic: [afaur/fishing-sim](https://github.com/afaur/fishing-sim) (JS).
- Aquarium motion: the CSS/JS aquarium repos listed above — good starting points to
  adapt for our swimming-fish animation.
- ⚠️ Verify each repo's license before reusing; keep license files + attribution.

---

## The Game

The entire page is one game: a **Stardew Valley-style fishing minigame** feeding a
**shared, persistent aquarium**, made multiplayer with **playhtml**. Don't copy
Stardew assets — replicate the mechanic and use our own fish/art.

### The Stardew mechanic (what to replicate)

- A vertical bar; a **fish icon** drifts up and down sporadically.
- Player controls a **green "catch" bar** that rises while the button/screen is
  held and falls when released, with momentum and bounce.
- Overlap the green bar with the fish → a **progress meter fills**; lose contact →
  it drains. Fill it = catch; empty it = the fish escapes.
- Mobile control = **tap-and-hold** on screen (naturally touch-friendly).

Source for the mechanic: [Stardew Valley Wiki – Fishing](https://www.stardewvalleywiki.com/Fishing)

### Open-source references (check licenses before reusing code)

- [afaur/fishing-sim](https://github.com/afaur/fishing-sim) — JS recreation of the
  Stardew minigame; closest to a web-friendly version.
- [evskii/UnityFishingMinigame](https://github.com/evskii/UnityFishingMinigame) —
  Unity; good for studying the logic.
- [erdavids/Stardew-Valley-Fishing-Trainer](https://github.com/erdavids/Stardew-Valley-Fishing-Trainer) — Godot trainer; mechanic reference.

> ⚠️ For any repo we pull from: confirm the license permits reuse, keep the license
> file, and attribute the author. Replicate mechanics, not copyrighted assets.

### Page layout (single screen)

Since it's just the game, the one page holds everything:

- **The shared aquarium** as the main backdrop — fish swimming, fills up over the
  session.
- **A "Cast / Fish" button** that launches the catch minigame as an overlay.
- **Presence indicator** ("3 fishing now") and **catch toasts** layered on top.
- All touch-first, sized for a phone screen.

### Gameplay loop (LOCKED): "Catch & Name → Shared Aquarium" + live presence

The loop combines a **persistent collaborative aquarium** with **live presence**.
Each player fishes, names their catch, and sends it into one shared tank that
everyone sees fill up in real time.

#### The loop, step by step

1. **Cast & catch.** Player plays the Stardew-style fishing minigame on their phone
   (tap-and-hold the catch bar). Filling the meter = a successful catch.
2. **Reveal.** The caught fish is revealed — species (a Boston/MA fish), plus maybe
   a size/rarity roll for flavor.
3. **Name it.** A prompt lets the player **name their fish** (e.g. "Sir Bass-a-lot")
   and it's tagged with their player name. Keep a character limit + light profanity
   filter since it's a work setting.
4. **Send to the aquarium.** Confirming adds the named fish to the **shared
   aquarium** — the persistent tank that is the page.
5. **Watch it live.** The fish appears in everyone's aquarium in real time, swimming
   around with its name label. The tank fills up over the session as the team fishes.

#### Live presence layer

- Show **who else is here right now** (avatar/initials, or shared cursors via
  playhtml presence).
- When someone catches a fish, a small **event toast** pops for everyone:
  "Maya caught & named a striped bass: 'Finn Diesel' 🎣".
- This makes the activity feel shared and alive even though people are on their own
  phones.

#### The shared aquarium

- One persistent tank (playhtml-backed shared state) that **survives refreshes and
  sessions** — it's still there for the next visitor.
- Each fish = an object: `{ species, name, caughtBy, timestamp, size/rarity }`.
- Fish swim around with simple looping animation; tapping a fish shows its name +
  who caught it.
- Over Friday Lunch the tank becomes a **collective team artifact** — the fun
  payoff and a keepsake afterward.

#### Why this works for Friday Lunch

- Instant "we're all in here together" moment (presence + shared tank).
- **Naming** makes it personal and funny — the part people will remember.
- Persistence means the filled tank is a nice memento after the session.

### Multiplayer with playhtml

**playhtml** (https://playhtml.fun/, https://github.com/spencerc99/playhtml) is an
open-source library for real-time, collaborative HTML elements. You enhance an
element with a data attribute and it syncs state live across everyone on the page
and persists it between sessions. Library-agnostic with a React package available.

Built-in capabilities to draw on: `can-play` (custom), `can-move`, `can-toggle`,
`can-duplicate`, `can-spin`, `can-grow`. It also supports **live presence** (see who
else is here, shared cursors).

How it maps to this game:

- **Shared aquarium state** → a playhtml element holding the list of fish, synced +
  persisted across everyone (custom `can-play` capability with `defaultData` = the
  fish array; `setData` appends a new fish on catch).
- **Live presence** → playhtml's presence / shared-cursor feature for "who's here"
  and catch-event toasts.
- No custom backend needed — playhtml handles real-time sync + persistence, and
  Vercel hosts the static site.

#### Open design questions for this loop

- [ ] **Tank capacity:** cap the number of fish (e.g. last 50–100) so it stays
      performant on phones, or let it grow unbounded for the event?
- [ ] **Moderation:** character limit + profanity filter on names (work setting).
- [ ] **Identity:** how does a player set their name? (one-time prompt, stored
      locally.) No login.
- [ ] **Reset:** do we wipe the tank before the event so it starts empty for the
      team, or pre-seed it with a couple of my fish as examples?
- [ ] **Persistence backend:** confirm playhtml's hosted sync is enough, or whether
      we self-host its sync server for reliability during the live session.

### Fish to include

- Tie to the talk: include **Boston/Massachusetts species** (striped bass, brook
  trout, alewife, largemouth bass, etc.) so the game reinforces section 5.
- Rarity tiers → different fish-icon speed/erraticness (harder = rarer).

---

## Visual Design & Look-and-Feel

The page should feel like one cohesive underwater world. Two style directions to
choose from in the build — pick one and apply it consistently.

### Direction A: Cozy pixel art (recommended)

- Retro 16/32px pixel aesthetic — warm, playful, "cozy game" energy (think Stardew).
- Reads great on mobile, tiny file sizes, and tons of free CC0/cheap asset packs
  exist (see Assets below), so we likely don't have to hand-draw much.
- Fits the Stardew-mechanic fishing game naturally.

### Direction B: Clean flat / SVG

- Simple flat shapes, emoji or SVG fish, gradient water.
- Fastest to build with zero/near-zero art; scales crisply; very lightweight.
- Less "charming," but a safe fallback if asset sourcing stalls.

### Screen visual notes

- **Aquarium (backdrop):** a tank framed like a real aquarium (glass edges, gravel,
  plants, bubbler). Caught fish swim in looping bezier/sine paths at varying depths
  and speeds, each with a small floating **name label**. Tap a fish → card with its
  name + who caught it.
- **Fishing minigame (overlay):** a vertical "reel" bar over a pond/dock vignette.
  Big touch target for tap-and-hold. Satisfying catch animation + splash.
- **Global:** consistent palette, one pixel font (e.g. a free Google "Press Start
  2P"-style font), animated water caustics or bubbles in the background, game-style
  UI for the cast button, presence indicator, and toasts.

### Mood / inspiration references (look only — don't copy assets)

- Stardew Valley fishing UI — the reel-bar minigame look.
- itch.io "underwater pixel art" packs for environment/UI mood:
  https://itch.io/game-assets/tag-pixel-art/tag-underwater
- CSS aquarium demos for swimming-fish motion ideas:
  [CodePen: CSS Animated Fish Tank](https://codepen.io/jgil473/pen/axRNbB)

---

## Assets (art & sound)

Priority order: **use free CC0 packs first**, hand-drawn PNGs as the reliable
fallback. All approaches below can mix.

### Option 1 (recommended): Kenney CC0 packs

- **[Kenney – Fish Pack](https://www.kenney.nl/assets/fish-pack)** and the
  [underwater-tagged assets](https://kenney.nl/assets/tag:underwater).
- **License: CC0 1.0 (public domain)** — usable in any project, commercial included,
  **no attribution required** (per [Kenney support](https://kenney.nl/support)).
  This is the safest possible license for a work demo — zero strings attached.
- Coherent art style across packs (fish, UI, backgrounds), so the whole page can
  look unified with no drawing.

### Option 2: itch.io fish/underwater packs

Many free or pay-what-you-want pixel packs. **Check each pack's license individually**
— terms vary (some royalty-free-no-attribution, some require credit, some forbid
redistribution). Examples found:

- [Free Fishing Pixel Art Pack](https://free-game-assets.itch.io/free-fishing-pixel-art-pack)
- [Pixel Art Fish Pack 1 (32×32, 16 variants)](https://iiarielsl.itch.io/pixel-art-fish-pack-1) — royalty-free, no attribution, but no resale/redistribution
- [Underwater Depths Pixel Art Environment Pack](https://gamecrafterik.itch.io/underwater-depths-pixel-art-environment-pack)
- [Free Underwater World Pixel Backgrounds](https://free-game-assets.itch.io/free-underwater-world-pixel-art-backgrounds)

### Option 3: SVG icons / emoji (if going flat)

- **[OpenMoji](https://blog.emojipedia.org/openmoji-a-free-and-open-source-emoji-set/)** —
  free emoji set, CC BY-SA 4.0 (attribution + share-alike).
- **Twemoji** — Twitter's emoji, code MIT / art CC-BY 4.0; easy drop-in fish glyphs.
- **The Noun Project** fish icons — many CC0 ones on
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Fish_icon_(The_Noun_Project_27052).svg);
  on Noun Project directly, free use generally needs attribution.

### Option 4 (fallback): hand-drawn PNGs

- You draw fish + props as PNGs (transparent background). Totally viable and adds
  personal charm — fits the homemade Friday Lunch vibe.
- Suggested specs: square canvas (e.g. 64×64 or 128×128), transparent PNG, side
  profile facing one direction (flip horizontally in CSS for the other way), simple
  2–3 frame swim animation optional.
- Could even **mix**: hand-draw your real tank residents (the Corydoras, the tetra)
  as special "starter" fish, use CC0 packs for the rest.

### Sound (optional, nice-to-have)

- Subtle water ambience + a catch "plop". Kenney also has **CC0 audio packs**.
- Keep muted by default (work setting) with a tap-to-unmute toggle.

### Asset licensing checklist

- [ ] Prefer **CC0** (Kenney) → no attribution, no risk
- [ ] For any itch.io/Noun Project asset, **read and save the specific license**;
      add attribution where required
- [ ] Keep a `CREDITS.md` in the site listing every asset + its license/author
- [ ] Hand-drawn assets are ours → no licensing concerns

---

## Build Order (for the future Kiro build)

1. Project scaffold (Vite or static), single-page mobile-first layout.
2. **Fishing minigame** single-player (bobber bar + tap-and-hold touch controls).
3. **Aquarium** rendering — caught fish swim with name labels (DOM/CSS first).
4. Add **playhtml** → shared persistent aquarium + live presence + catch toasts.
5. Polish: art/assets, sound, catch animation, name prompt + moderation.
6. Deploy to Vercel, connect domain, generate QR code.
7. **Test on a real phone** (ideally several at once) before Friday.

## Open Decisions

- [ ] Final domain name
- [ ] Stack: vanilla JS vs React (React if we want `@playhtml/react`)
- [x] Scope: **single page, game only** (other fish sites go on the slides) (locked)
- [x] Multiplayer loop: **"Catch & Name → Shared Aquarium" + live presence** (locked)
- [ ] Art approach: **Kenney CC0 packs** (recommended) / itch.io packs / emoji+SVG /
      hand-drawn PNGs (fallback) — see Assets section
- [ ] Aquarium loop details: tank capacity, name moderation, identity, reset/seed,
      persistence backend (see Open design questions)

## Licensing / Credit Checklist

- [ ] Verify license on any fishing-game repo before reusing code; keep license +
      attribution
- [ ] Confirm playhtml license (MIT expected) and follow it
- [ ] Use only our own or properly licensed art/assets
