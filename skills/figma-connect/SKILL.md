---
name: figma-connect
description: Use when connecting fig/figma-ds-cli to Figma Desktop, choosing between Yolo and Safe mode, or handling mode-specific setup constraints
---

# Figma Connect

## Overview

Connect first, then choose the execution mode that matches the environment.

Start by connecting to Figma Desktop:

```bash
fig connect
```

Use `fig connect --safe` when the whole session should stay in Safe Mode.

Command alias:

```bash
alias fig='figma-ds-cli'
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
- On macOS 13+, Yolo patching needs System Settings -> Privacy & Security -> App Management for the terminal app. Full Disk Access alone is not enough.
- If App Management cannot be granted, use `connect --safe`.

## Safe Mode Constraints

- Safe Mode uses the daemon plus the FigCli plugin instead of patching Figma Desktop.
- The user must keep the FigCli plugin running for the session.
- `render` and `render-batch` support text in Safe Mode.
- If a complex `render-batch` times out, split it into smaller renders.
- Use native Figma API via `eval` only when JSX cannot express the needed operation.
