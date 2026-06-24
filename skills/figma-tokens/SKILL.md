---
name: figma-tokens
description: Use when creating or resetting token collections such as shadcn, tailwind, spacing, or design-system presets in fig/figma-ds-cli
---

# Figma Tokens

## Overview

This skill covers token creation commands. Use it when the user wants a token set added to the file.

Interactive entrypoint:

```bash
fig connect
```

Command alias:

```bash
alias fig='figma-ds-cli'
```

## When to Use

- User asks for shadcn colors
- User asks for tailwind colors
- User asks for design-system tokens
- User wants variable collections deleted before recreating them

## Commands

```bash
fig tokens preset shadcn
fig tokens tailwind
fig tokens ds
fig tokens spacing
fig var delete-all
fig var delete-all -c "primitives"
fig import DESIGN.md
```

## Notes

- `tokens preset shadcn` creates primitive plus semantic tokens with Light and Dark modes.
- `tokens tailwind` creates the Tailwind palette only.
- `tokens ds` creates the IDS base system.
- `var list` does not create anything. It is inspection only.
- For an extracted DESIGN.md with real variable collections, prefer `fig import DESIGN.md` so modes and aliases roundtrip. Do not split it into manual `tokens import` runs unless intentionally transforming it.
