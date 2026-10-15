---
name: figma-connect
description: Use when connecting figma-ds-cli to Figma, choosing Yolo, Browser, or Safe mode, selecting among open files, or handling mode-specific setup constraints
---

# Figma Connect

## Overview

Connect first, then choose the execution mode that matches the environment.

## When to Use

- User says "connect to figma"
- User asks about Yolo, Browser, or Safe Mode
- Multiple Figma files are open and commands must target a specific file
- A workflow depends on plugin startup or Figma patching behavior

## Commands

```bash
figma-ds-cli connect
figma-ds-cli connect --browser
figma-ds-cli connect --safe
figma-ds-cli status
figma-ds-cli diagnose
```

## Guidance

- Prefer `connect` for Yolo Mode. It patches Figma once, then connects directly.
- Use `connect --browser` when the session should avoid modifying Figma Desktop while retaining the direct local workflow.
- Use `connect --safe` when the user wants the official development-plugin path.
- In Safe Mode, the user must start the FigCli plugin each session.
- On macOS 13+, Yolo patching needs System Settings -> Privacy & Security -> App Management for the terminal app. Full Disk Access alone is not enough.
- If App Management cannot be granted, choose Browser or Safe Mode based on whether a browser-driven session or plugin session is desired.

## File Targeting

When more than one Figma file is open, pin commands to the intended file instead of relying on whichever file is active:

```bash
FIGMA_FILE="Design System" figma-ds-cli canvas info
FIGMA_FILE="Design System" figma-ds-cli render '<Frame name="Card" />' --verify
```

Confirm the target with a read-only command before mutating the canvas.

## Safe Mode Constraints

- Safe Mode uses the daemon plus the FigCli plugin instead of patching Figma Desktop.
- The user must keep the FigCli plugin running for the session.
- `render` and `render-batch` support text in Safe Mode.
- If a complex `render-batch` times out, split it into smaller renders.
- Use native Figma API via `eval` only when JSX cannot express the needed operation.
