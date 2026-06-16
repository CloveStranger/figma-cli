---
name: figma-export
description: Use when exporting screenshots, nodes, code artifacts, or app assets from figma-ds-cli and choosing the right export granularity
---

# Figma Export

## Overview

This skill covers export targets and the decision process for choosing the right node to export.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User wants PNG or SVG assets
- User wants CSS or Tailwind output
- User wants JSX or Storybook exports
- User wants screenshots of the page or selection

## Commands

```bash
fig export css
fig export tailwind
fig export screenshot -o out.png
fig export screenshot -s 2 -f png
fig export node "1:234" -o card.png
fig export node "1:234" -f svg -o card.svg
fig export-jsx "1:234" -o Card.jsx --pretty
fig export-storybook "1:234"
```

## Granularity Order

Pick export targets in this order:

1. Pure image or background layer
2. Reusable component-level asset
3. Module or section-level asset
4. Full screen or page

## Workflow

1. Preview candidate with `fig verify "NODE_ID"`.
2. If preview is wrong, inspect children and preview a deeper node.
3. Export only after preview confirms the correct boundary.

## Rules

- Do not dump whole screens by default when the user needs implementable assets.
- Prefer visible nodes with stable dimensions and actual rendered pixels.
- Avoid hidden nodes, duplicate variants, empty wrappers, and obviously wrong descendants.
