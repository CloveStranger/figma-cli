---
name: figma-variables
description: Use when listing, visualizing, creating, binding, updating, extracting, or roundtripping variables in fig/figma-ds-cli, including fast var syntax during creation
---

# Figma Variables

## Overview

This skill covers variable inspection, direct binding, fast inline `var:` usage, and real variable-collection roundtrips through DESIGN.md.

Interactive entrypoint:

```bash
fig connect
```

Command alias:

```bash
alias fig='figma-ds-cli'
```

## When to Use

- User wants to list variables or filter by type
- User wants to show colors on canvas
- User wants fills, strokes, radius, gap, or padding bound to variables
- User wants to use `var:name` directly in create, render, or set commands
- User wants to export or import real Figma variable collections, modes, or aliases

## Inspect and Manage

```bash
fig var list
fig var list -t COLOR
fig var visualize
fig var create "name" -c "ColId" -t COLOR -v "#3b82f6"
```

## Bind Commands

```bash
fig bind fill "primary/500"
fig bind stroke "border/default"
fig bind radius "radius/md"
fig bind gap "spacing/md"
fig bind padding "spacing/lg"
fig bind list
```

## Extract and Roundtrip

```bash
fig extract DESIGN.md --sections variables
fig extract DESIGN.md
fig import DESIGN.md
```

- `extract --sections variables` captures real Figma variable collections: names, modes, values, and alias chains.
- `fig import DESIGN.md` recreates those collections when the DESIGN.md includes real variables.
- Use this path for design-system transfer. Do not manually rewrite variable JSON unless the user explicitly asks for a custom transform.

## Fast `var:` Syntax

```bash
fig create rect "Card" --fill "var:card" --stroke "var:border"
fig create text "Hello" -c "var:foreground"
fig render '<Frame bg="var:card" stroke="var:border"><Text color="var:foreground">Title</Text></Frame>'
fig set fill "var:primary"
fig set stroke "var:border"
```

Use `--collection <name>` on `render` / `render-batch` when the user names a collection. Use per-attribute `var:collection:name` only when intentionally mixing collections.

## Common Variables

Use names like `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, and `-foreground` variants.
