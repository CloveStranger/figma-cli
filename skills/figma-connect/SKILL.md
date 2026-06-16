---
name: figma-connect
description: Use when connecting figma-ds-cli to Figma Desktop, choosing between Yolo and Safe mode, or handling mode-specific setup constraints
---

# Figma Connect

## Overview

Connect first, then choose the execution mode that matches the environment.

Start from the launcher when working interactively:

```bash
fig-start
```

Use `fig-start --safe` when the whole session should stay in Safe Mode.

Command alias:

```bash
fig='figma-ds-cli'
```

## When to Use

- User says "connect to figma"
- User asks about Yolo Mode vs Safe Mode
- A workflow depends on plugin startup or Figma patching behavior

## Commands

```bash
fig connect
fig connect --safe
```

## Guidance

- Prefer `connect` for Yolo Mode. It patches Figma once, then connects directly.
- Use `connect --safe` when patching is not allowed or the user wants plugin-only access.
- In Safe Mode, the user must start the FigCli plugin each session.

## Safe Mode Constraints

- All commands still go through the daemon.
- `render-batch` does not render text correctly in Safe Mode.
- For text-heavy components in Safe Mode, use native Figma API via `eval`.
