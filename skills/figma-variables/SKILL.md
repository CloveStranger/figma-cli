---
name: figma-variables
description: Use when listing, visualizing, creating, binding, updating, extracting, or roundtripping variables with figma-ds-cli, including fast var syntax and shared-library alias capture
---

# Figma Variables

## Overview

This skill covers variable inspection, direct binding, fast inline `var:` usage, and real variable-collection roundtrips through DESIGN.md.

## When to Use

- User wants to list variables or filter by type
- User wants to show colors on canvas
- User wants fills, strokes, radius, gap, or padding bound to variables
- User wants to use `var:name` directly in create, render, or set commands
- User wants to export or import real Figma variable collections, modes, or aliases
- Local variables alias into an enabled shared library and the full chain must survive export/import

## Inspect and Manage

```bash
figma-ds-cli var list
figma-ds-cli var list -t COLOR
figma-ds-cli var visualize
figma-ds-cli var create "name" -c "ColId" -t COLOR -v "#3b82f6"
```

## Bind Commands

```bash
figma-ds-cli bind fill "primary/500"
figma-ds-cli bind stroke "border/default"
figma-ds-cli bind radius "radius/md"
figma-ds-cli bind gap "spacing/md"
figma-ds-cli bind padding "spacing/lg"
figma-ds-cli bind list
```

## Extract and Roundtrip

```bash
figma-ds-cli extract DESIGN.md --sections variables
figma-ds-cli extract DESIGN.md --sections variables --resolve-remote
figma-ds-cli extract DESIGN.md
figma-ds-cli import DESIGN.md
```

- `extract --sections variables` captures real Figma variable collections: names, modes, values, and alias chains.
- `figma-ds-cli import DESIGN.md` recreates those collections when the DESIGN.md includes real variables.
- Use `--resolve-remote` when local variables alias into an enabled library. Without it, the library targets are absent and the imported aliases may have no value.
- Keep `--resolve-remote` consistent across extraction and deterministic validation of the same system.
- Use this path for design-system transfer. Do not manually rewrite variable JSON unless the user explicitly asks for a custom transform.

## Fast `var:` Syntax

```bash
figma-ds-cli create rect "Card" --fill "var:card" --stroke "var:border"
figma-ds-cli create text "Hello" -c "var:foreground"
figma-ds-cli render '<Frame bg="var:card" stroke="var:border"><Text color="var:foreground">Title</Text></Frame>'
figma-ds-cli set fill "var:primary"
figma-ds-cli set stroke "var:border"
```

Use `--collection <name>` on `render` / `render-batch` when the user names a collection. Use per-attribute `var:collection:name` only when intentionally mixing collections.

## Common Variables

Use names like `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, and `-foreground` variants.
