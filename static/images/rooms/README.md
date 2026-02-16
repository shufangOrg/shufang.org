# Room Theme Images

This directory contains the background illustrations for reader study room themes.

## Available Themes

Each room theme should have:
- A background image in SVG format (e.g., `modern.svg`, `classic.svg`)
- SVG format is preferred for scalability and small file size
- Recommended to design for widescreen aspect ratio (16:9 or similar)

## Current Themes

1. **modern** - Modern minimalist study room
2. **classic** - Classic/traditional study room with bookshelves
3. **cozy** - Warm and cozy reading nook
4. **minimalist** - Clean, simple space with few decorations
5. **nature** - Study room with natural elements, plants
6. **vintage** - Vintage/retro style study room

## Current Implementation

The current room themes are implemented as SVG illustrations. These can be replaced with:
- AI-generated illustrations (as mentioned in GitHub Discussion #120)
- Hand-drawn artwork
- Animated SVG or converted to animated formats using AI tools (Pika, Sora)
- Higher fidelity raster images (JPG/PNG) if needed, though SVG is recommended

## Adding New Themes

1. Add the background image to this directory
2. Name it according to the theme (e.g., `theme-name.svg`)
3. Update the reader's front matter with `room_theme: theme-name`
