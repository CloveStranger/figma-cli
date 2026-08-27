---
name: figma-node
description: Use when inspecting the canvas, finding nodes, reading node details, converting or reusing components, or building single-axis and multi-axis variants with figma-ds-cli
---

# Figma Node

## Overview

This skill covers node discovery, structural operations on existing canvas content, and reuse of components described by an extracted DESIGN.md.

## When to Use

- User asks what is on the canvas
- User wants to find a node by name or type
- User wants a node converted into a component
- User wants the tree, bindings, variants, or size variants for existing nodes
- User wants frames or components combined into a single-axis or multi-axis Component Set
- User asks to use, add, drop in, or reuse a component that may already exist in a DESIGN.md
- User wants to rebuild a component from a DESIGN.md and check fidelity

## Commands

```bash
figma-ds-cli find "Button"
figma-ds-cli find "Card" -t FRAME
figma-ds-cli canvas info
figma-ds-cli canvas next
figma-ds-cli get
figma-ds-cli get "1:234"
figma-ds-cli node tree
figma-ds-cli node tree "1:234" -d 5
figma-ds-cli node bindings
figma-ds-cli node to-component "1:234"
figma-ds-cli spec "Button"
figma-ds-cli spec "Button" --check "1:234"
figma-ds-cli instantiate "Button"
figma-ds-cli instantiate "Button" --file path/to/DESIGN.md
figma-ds-cli combos
figma-ds-cli sizes --base small
figma-ds-cli variants from 1:2,1:3,1:4 --property Size --values Small,Medium,Large --name Button
figma-ds-cli variants from selection --multi --name Button
figma-ds-cli variants from auto --multi --name Button
```

## Reuse Before Rebuild

When a DESIGN.md was produced by `figma-ds-cli extract`, components may include a reuse handle.

- Run `figma-ds-cli spec "Name"` before rebuilding a named existing component.
- If the user asks to use, add, drop in, or reuse that component, run `figma-ds-cli instantiate "Name"` instead of rendering a copy.
- If you must rebuild from a spec, run `figma-ds-cli spec "Name" --check "NODE_ID"` after building. A non-zero result means the work is not complete.

## Variant Sets

- For one axis, pass the property and one value per node with `--property` and `--values`.
- For multiple axes, name each top-level component `prop=value, prop2=value2`, then use `variants from selection --multi` or `variants from auto --multi`.
- `auto` selects page-level nodes already named as variant combinations. Use it only when that scope is intentional.
- The command validates axis names and duplicate combinations before mutating the file. Treat validation failure as incomplete; do not invent replacement axes.

## Rules

- Prefer `find`, `get`, and `canvas info` before making assumptions about current canvas state.
- After `figma-ds-cli node to-component`, run `figma-ds-cli verify "NODE_ID" --measure`.
- Use tree and bindings inspection before modifying a complex existing node.
- Do not read huge DESIGN.md structure sections by hand when `figma-ds-cli spec` can return the compact authoritative component spec.
