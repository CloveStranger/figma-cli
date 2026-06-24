---
name: figma-blocks
description: Use when creating prebuilt layouts such as dashboards or page blocks with fig/figma-ds-cli instead of manually assembling them
---

# Figma Blocks

## Overview

Blocks are the default path for dashboards and prebuilt layouts. Do not rebuild those manually unless the user explicitly asks for custom construction.

Interactive entrypoint:

```bash
fig connect
```

Command alias:

```bash
alias fig='figma-ds-cli'
```

## When to Use

- User asks for a dashboard
- User asks for an existing block or page layout
- User wants to list available blocks

## Commands

```bash
fig blocks list
fig blocks create dashboard-01
```

## Rules

- Always use `blocks create` for dashboards and page layouts.
- Do not reimplement `dashboard-01` with `render` or `eval` if the existing block matches the request.
- After block creation, verify visually with `fig verify`.

## Included Example

`dashboard-01` includes a sidebar, stats cards, a chart, a table, and shadcn variable bindings with Light and Dark mode support.
