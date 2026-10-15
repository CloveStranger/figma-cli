---
name: figma-tokens
description: Use when creating or resetting token collections such as shadcn, tailwind, spacing, or design-system presets with figma-ds-cli
---

# Figma Tokens

## Overview

This skill covers token creation commands. Use it when the user wants a token set added to the file.

## When to Use

- User asks for shadcn colors
- User asks for tailwind colors
- User asks for design-system tokens
- User wants variable collections deleted before recreating them

## Commands

```bash
figma-ds-cli tokens preset shadcn
figma-ds-cli tokens tailwind
figma-ds-cli tokens ds
figma-ds-cli tokens spacing
figma-ds-cli var delete-all
figma-ds-cli var delete-all -c "primitives"
figma-ds-cli import DESIGN.md
```

## Notes

- `tokens preset shadcn` creates primitive plus semantic tokens with Light and Dark modes.
- `tokens tailwind` creates the Tailwind palette only.
- `tokens ds` creates the IDS base system.
- `var list` does not create anything. It is inspection only.
- For an extracted DESIGN.md with real variable collections, prefer `figma-ds-cli import DESIGN.md` so modes and aliases roundtrip. Do not split it into manual `tokens import` runs unless intentionally transforming it.
