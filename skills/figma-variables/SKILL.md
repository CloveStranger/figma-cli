---
name: figma-variables
description: Use when listing, visualizing, creating, binding, or updating variables in figma-ds-cli, including fast var syntax during creation
---

# Figma Variables

## Overview

This skill covers variable inspection, direct binding, and fast inline `var:` usage.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User wants to list variables or filter by type
- User wants to show colors on canvas
- User wants fills, strokes, radius, gap, or padding bound to variables
- User wants to use `var:name` directly in create, render, or set commands

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

## Fast `var:` Syntax

```bash
fig create rect "Card" --fill "var:card" --stroke "var:border"
fig create text "Hello" -c "var:foreground"
fig render '<Frame bg="var:card" stroke="var:border"><Text color="var:foreground">Title</Text></Frame>'
fig set fill "var:primary"
fig set stroke "var:border"
```

## Common Variables

Use names like `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, and `-foreground` variants.
