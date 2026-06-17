---
name: figma-export
description: Use when exporting screenshots, nodes, code artifacts, or app assets from figma-ds-cli and choosing the right export granularity
---

# Figma Export

## Overview

This skill covers export targets, export settings subtrees, token output, and the decision process for choosing the right node to export.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User wants PNG, SVG, JPG, or PDF assets
- User wants all configured export assets under a node or Figma URL
- User wants CSS, Tailwind, or DTCG/W3C design-token output
- User wants JSX or Storybook exports
- User wants screenshots of the page or selection

## Commands

```bash
fig export css
fig export tailwind
fig export dtcg tokens.json
fig export screenshot -o out.png
fig export screenshot -s 2 -f png
fig export node "1:234" -o card.png
fig export node "1:234" -f svg -o card.svg
fig export subtree "1:234"
fig export subtree "https://www.figma.com/design/FILE/Page?node-id=1-234" -o exports/app-icons
fig export-jsx "1:234" -o Card.jsx --pretty
fig export-storybook "1:234"
```

## Granularity Order

Pick export targets in this order:

1. Pure image or background layer
2. Reusable component-level asset
3. Module or section-level asset
4. Full screen or page

## Subtree Export

Use `fig export subtree <nodeOrUrl>` when the design already has Figma export settings on descendants.

- It accepts a node ID or Figma design URL with `node-id`.
- It normalizes URL node IDs from `1-234` to `1:234`.
- It writes files to `exports/<root-name>` unless `--output-dir` is provided.
- It writes `manifest.json` with source, root, node paths, formats, suffixes, and constraints.

Prefer `subtree` over manual child-by-child export when the user's intent is "export the assets from this frame/component".

## Workflow

1. Preview candidate with `fig verify "NODE_ID" --measure --save /tmp/figma-export-preview.png`.
2. If preview is wrong, inspect children and preview a deeper node.
3. If descendants have export settings, use `fig export subtree`.
4. Inspect the export count and `manifest.json`; reject empty, transparent, or clearly wrong outputs.
5. Export only after preview confirms the correct boundary.

## Rules

- Do not dump whole screens by default when the user needs implementable assets.
- Prefer visible nodes with stable dimensions and actual rendered pixels.
- Avoid hidden nodes, duplicate variants, empty wrappers, and obviously wrong descendants.
- Use `--output-dir` for named export batches so generated assets do not mix with unrelated output.
- Summarize output counts and manifest path instead of dumping large manifests into chat.
- If a Figma URL is provided, ensure the open file matches that URL before treating the export as complete.
