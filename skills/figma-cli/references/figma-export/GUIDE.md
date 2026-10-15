---
name: figma-export
description: Use when exporting screenshots, nodes, code artifacts, app assets, DESIGN.md, or token files with figma-ds-cli and choosing the right export granularity
---

# Figma Export

## Overview

This skill covers export targets, export settings subtrees, design-system handoff, token output, and the decision process for choosing the right node to export.

## When to Use

- User wants PNG, SVG, JPG, or PDF assets
- User wants all configured export assets under a node or Figma URL
- User wants CSS, Tailwind, or DTCG/W3C design-token output
- User wants DESIGN.md extraction or variable-only extraction
- User wants to import a DESIGN.md back into Figma variables
- User wants JSX or Storybook exports
- User wants screenshots of the page or selection

## Commands

```bash
figma-ds-cli export css
figma-ds-cli export tailwind
figma-ds-cli export dtcg tokens.json
figma-ds-cli export screenshot -o out.png
figma-ds-cli export screenshot -s 2 -f png
figma-ds-cli export node "1:234" -o card.png
figma-ds-cli export node "1:234" -f svg -o card.svg
figma-ds-cli export subtree "1:234"
figma-ds-cli export subtree "https://www.figma.com/design/FILE/Page?node-id=1-234" -o exports/app-icons
figma-ds-cli extract DESIGN.md
figma-ds-cli extract DESIGN.md --sections variables
figma-ds-cli extract DESIGN.md --resolve-remote
figma-ds-cli import DESIGN.md
figma-ds-cli export-jsx "1:234" -o Card.jsx --pretty
figma-ds-cli export-storybook "1:234"
```

## Granularity Order

Pick export targets in this order:

1. Pure image or background layer
2. Reusable component-level asset
3. Module or section-level asset
4. Full screen or page

## Subtree Export

Use `figma-ds-cli export subtree <nodeOrUrl>` when the design already has Figma export settings on descendants.

- It accepts a node ID or Figma design URL with `node-id`.
- It normalizes URL node IDs from `1-234` to `1:234`.
- It writes files to `exports/<root-name>` unless `--output-dir` is provided.
- It writes `manifest.json` with source, root, node paths, formats, suffixes, and constraints.

Prefer `subtree` over manual child-by-child export when the user's intent is "export the assets from this frame/component".

## DESIGN.md Handoff

Use `figma-ds-cli extract` when the user asks to export or document a design system.

- Default extraction scans all pages and includes identity, structure, colors, variables, typography, spacing, depth, components, states, rules, extending, and machine-readable tokens.
- Use `--pages "Name"` or `--selection` to scope large files.
- Use `--sections variables` for real variable collections only. This captures true names, modes, and alias chains, not just sampled fills.
- If local semantic variables alias into an enabled shared library, use `--resolve-remote`; otherwise the exported DESIGN.md cannot carry the library primitives needed to rebuild the alias chain.
- Re-import extracted systems with `figma-ds-cli import DESIGN.md`; it recreates variable collections, modes, and aliases when the file includes real variables.
- After extraction, summarize captured pages, variable counts, skipped chunks, and output paths. Do not paste DESIGN.md contents into chat.

## Workflow

1. Preview candidate with `figma-ds-cli verify "NODE_ID" --measure --save /tmp/figma-export-preview.png`.
2. If preview is wrong, inspect children and preview a deeper node.
3. If descendants have export settings, use `figma-ds-cli export subtree`.
4. Inspect the export count and `manifest.json`; reject empty, transparent, or clearly wrong outputs.
5. Export only after preview confirms the correct boundary.

## Rules

- Do not dump whole screens by default when the user needs implementable assets.
- Prefer visible nodes with stable dimensions and actual rendered pixels.
- Avoid hidden nodes, duplicate variants, empty wrappers, and obviously wrong descendants.
- Use `--output-dir` for named export batches so generated assets do not mix with unrelated output.
- Summarize output counts and manifest path instead of dumping large manifests into chat.
- If a Figma URL is provided, ensure the open file matches that URL before treating the export as complete.
