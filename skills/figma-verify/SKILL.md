---
name: figma-verify
description: Use when validating newly created or modified Figma output with screenshots before accepting or exporting the result in figma-ds-cli
---

# Figma Verify

## Overview

Verification is required after visual creation. Use it to inspect the actual rendered result, not just command success.

Interactive entrypoint:

```bash
fig-start
```

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- After `render` or `render-batch`
- After `node to-component`
- After block creation
- Before exporting any candidate image or node

## Commands

```bash
fig verify
fig verify "123:456"
```

## Rules

- Always verify after creating or converting visual nodes.
- Use verification previews to decide the correct export boundary.
- If the preview still includes text, badges, icons, buttons, or other UI chrome when the user asked for a pure image asset, keep drilling into child nodes.
- Reject empty, nearly empty, 1x1, or obviously transparent outputs and inspect a better node.
