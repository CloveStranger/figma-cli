---
name: figma-verify
description: Use when visually validating newly created or modified Figma output with screenshots and measurements before accepting or exporting it with figma-ds-cli; use figma-validation for design-system drift and contracts
---

# Figma Verify

## Overview

Verification is required after visual creation. Use it to inspect the actual rendered result and measured layout, not just command success.

## When to Use

- After `render` or `render-batch`
- After `node to-component`
- After block creation
- After layout, text wrapping, sizing, or auto-layout changes
- Before exporting any candidate image or node

## Commands

```bash
figma-ds-cli verify
figma-ds-cli verify "123:456"
figma-ds-cli verify "123:456" --measure
figma-ds-cli verify "123:456" --measure --save /tmp/figma-verify.png
figma-ds-cli verify "123:456" --scale 1 --max 2000
figma-ds-cli verify "123:456" --scale 2 --measure
figma-ds-cli verify "123:456" --base64
```

## Rules

- Always verify after creating or converting visual nodes.
- Use `--measure` for layout-sensitive checks so width, height, layout mode, and child sizing are checked by numbers.
- `verify` saves a PNG to `/tmp/figma-verify-{id}.png` by default and returns metadata plus the saved path.
- The default scale is a small 0.5x preview. Use `--scale 2` when details need a sharper screenshot.
- Use `--save <path>` only to choose a custom path.
- Use `--base64` only when a script truly needs inline image data; it is token-heavy.
- Use verification previews to decide the correct export boundary.
- If the preview still includes text, badges, icons, buttons, or other UI chrome when the user asked for a pure image asset, keep drilling into child nodes.
- Reject empty, nearly empty, 1x1, or obviously transparent outputs and inspect a better node.
- Treat command success without a visual or measurement check as incomplete for user-facing visual work.
- This skill does not validate committed design-system contracts. Use `figma-validation` for `snapshot`, `rules`, and `check` workflows.
