---
name: figma-render
description: Use when creating primitives, JSX layouts, webpages, or custom components with figma-ds-cli render, create, set, sizing, padding, gap, arrange, or eval workflows
---

# Figma Render

## Overview

This skill covers direct creation workflows: primitives, JSX render, batch render, layout updates, and custom component construction.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User wants a frame, text, shape, icon, image, or auto-layout container
- User wants a JSX-rendered UI block
- User wants a webpage or composed layout
- User wants a custom component that is not already a block

## Core Commands

```bash
fig create rect "Card" -w 320 -h 200 --fill "#fff" --radius 12
fig create autolayout "Card" -d col -g 16 -p 24 --fill "#fff"
fig create icon lucide:star -s 24 -c "#f59e0b"
fig render '<Frame name="Card" w={320} h={180} bg="#fff" rounded={16}><Text>Title</Text></Frame>'
fig render '<Frame name="Card">...</Frame>' --as-component --verify
fig render '<Frame bg="var:card">...</Frame>' --collection figma --verify
fig render-batch '["<Frame ... />","<Frame ... />"]' -d row -g 40 --verify
fig render-batch '["<Frame ... />","<Frame ... />"]' --as-component --collection figma
```

## Layout Updates

```bash
fig set fill "#3b82f6"
fig set radius 12
fig set size 320 200
fig set pos 100 100
fig set autolayout row -g 8 -p 16
fig sizing hug
fig sizing fill
fig padding 16
fig gap 16
fig arrange -g 100
```

## High-Value Options

- Use `--verify` to replace a separate `fig verify` roundtrip.
- Use `--as-component` when the rendered frame should immediately become a component.
- Use `--collection <name>` when the user names a variable collection or brand system.
- Use `--keep-wrapper` only when the outer wrapper is intentional; otherwise the renderer may split layout-only wrappers into independent canvas items.

## Safe Mode Rule

`render` and `render-batch` work in Safe Mode, including text. If a complex batch times out, split it into smaller renders. Use `eval` only for native Figma API operations that JSX cannot express.

## Component Creation Rules

- Check current page positions before creating large new groups to avoid overlap.
- Never delete existing nodes unless the user asked for it.
- After creating anything visual, run `fig verify --measure` or pass `--verify` to render.
- For complex multi-element components, prefer a single `eval` so the whole structure is built in one API call.
- When the user asks for N cards/buttons/items, create N independent top-level nodes with `render-batch`, not one wrapper frame containing N repeated children.

## Auto-Layout Rules For Text Components

1. Parent frame should use a fixed width with auto height.
2. Child content frames should use `layoutSizingHorizontal = 'FILL'` after `appendChild`.
3. Text nodes should also use `layoutSizingHorizontal = 'FILL'` after `appendChild`.
4. In Safe Mode, load fonts first in `eval`.
5. In JSX, give the parent and every wrapping text node `w="fill"` when text must wrap.
