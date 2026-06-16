---
name: figma-node
description: Use when inspecting the canvas, finding nodes, reading node details, converting nodes, or working with variants and size helpers in figma-ds-cli
---

# Figma Node

## Overview

This skill covers node discovery and structural operations on existing canvas content.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User asks what is on the canvas
- User wants to find a node by name or type
- User wants a node converted into a component
- User wants the tree, bindings, variants, or size variants for existing nodes

## Commands

```bash
fig find "Button"
fig find "Card" -t FRAME
fig canvas info
fig canvas next
fig get
fig get "1:234"
fig node tree
fig node tree "1:234" -d 5
fig node bindings
fig node to-component "1:234"
fig combos
fig sizes --base small
```

## Rules

- Prefer `find`, `get`, and `canvas info` before making assumptions about current canvas state.
- After `fig node to-component`, run `fig verify`.
- Use tree and bindings inspection before modifying a complex existing node.
