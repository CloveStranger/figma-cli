---
name: figma-node
description: Use when inspecting the canvas, finding nodes, reading node details, converting nodes, reusing existing components, or working with variants and size helpers in fig/figma-ds-cli
---

# Figma Node

## Overview

This skill covers node discovery, structural operations on existing canvas content, and reuse of components described by an extracted DESIGN.md.

Interactive entrypoint:

```bash
fig connect
```

Command alias:

```bash
alias fig='figma-ds-cli'
```

## When to Use

- User asks what is on the canvas
- User wants to find a node by name or type
- User wants a node converted into a component
- User wants the tree, bindings, variants, or size variants for existing nodes
- User asks to use, add, drop in, or reuse a component that may already exist in a DESIGN.md
- User wants to rebuild a component from a DESIGN.md and check fidelity

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
fig spec "Button"
fig spec "Button" --check "1:234"
fig instantiate "Button"
fig instantiate "Button" --file path/to/DESIGN.md
fig combos
fig sizes --base small
```

## Reuse Before Rebuild

When a DESIGN.md was produced by `fig extract`, components may include a reuse handle.

- Run `fig spec "Name"` before rebuilding a named existing component.
- If the user asks to use, add, drop in, or reuse that component, run `fig instantiate "Name"` instead of rendering a copy.
- If you must rebuild from a spec, run `fig spec "Name" --check "NODE_ID"` after building. A non-zero result means the work is not complete.

## Rules

- Prefer `find`, `get`, and `canvas info` before making assumptions about current canvas state.
- After `fig node to-component`, run `fig verify`.
- Use tree and bindings inspection before modifying a complex existing node.
- Do not read huge DESIGN.md structure sections by hand when `fig spec` can return the compact authoritative component spec.
