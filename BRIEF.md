# Moose Antics — mooseantics.com

## Brand
- **Name:** Moose Antics (tagline: "Moose on the Loose")
- **Vibe:** Mysterious, minimal, elegant, cryptic
- **NO references to "QUOTANICAL"** — that's internal only

## Concept
A single-page experience site that changes every time you visit. Not a store. Not a landing page. An *experience*.

## Requirements

### Core Experience
1. **Cryptic quotes** — A collection of 30-50 philosophical, absurdist, or poetic quotes loosely tied to moose, nature, wildness, freedom, being untamed. They should feel like fortune cookies written by a philosopher who lives in the woods. Rotate randomly on each reload.

2. **Dynamic visual elements** that change per visit:
   - Random accent color from a curated dark palette
   - Subtle generative background — particles, noise, flowing lines, or something organic
   - Typography animation on load (text fading/sliding in)
   - Maybe the moose silhouette subtly shifts position or style

3. **Minimal branding:**
   - Clean geometric moose antler icon/silhouette (SVG, not the DALL-E one)
   - "MOOSE ANTICS" in clean typography
   - Subtle "moose on the loose" somewhere

4. **Easter eggs / surprises:**
   - Rare events (1 in 10 chance): inverted colors, glitch effect, a completely different layout
   - Mouse/touch interaction — maybe particles follow cursor
   - A hidden click target somewhere that triggers something unexpected

### Technical
- **Pure HTML/CSS/JS** — no frameworks, no build step. Single index.html or minimal files.
- **Fast.** No heavy libraries. Vanilla JS, maybe a tiny canvas/WebGL lib if needed for particles.
- **Responsive** — works beautifully on mobile and desktop
- **Dark theme** — deep blacks, subtle whites/grays, one accent color that shifts
- **Custom fonts** — use Google Fonts (something elegant: Space Grotesk, Inter, or similar)
- **Deployable anywhere** — static files only

### Aesthetic References
- Think: Kanye's early DONDA site aesthetics
- Think: Cryptic fashion brand teasers
- Think: Art gallery in a dark room
- Anti-corporate. Anti-template. Pro-mystery.

### Structure
```
index.html    — main experience
style.css     — styles
script.js     — all dynamic behavior
assets/       — SVG logo, any assets
```

## What NOT to do
- No cookie-cutter template feel
- No "Sign up for our newsletter" bullshit
- No stock photos
- No heavy frameworks (React, Vue, etc.)
- No QUOTANICAL anywhere
