---
name: figma-blocks
description: Use when creating prebuilt layouts such as dashboards or page blocks with figma-ds-cli instead of manually assembling them
---

# Figma Blocks

## Overview

Blocks are the default path for dashboards and prebuilt layouts. Do not rebuild those manually unless the user explicitly asks for custom construction.

## When to Use

- User asks for a dashboard
- User asks for an existing block or page layout
- User wants to list available blocks

## Commands

```bash
figma-ds-cli blocks list
figma-ds-cli blocks create dashboard-01
```

## Rules

- Always use `blocks create` for dashboards and page layouts.
- Do not reimplement `dashboard-01` with `render` or `eval` if the existing block matches the request.
- After block creation, verify the returned node with `figma-ds-cli verify "NODE_ID" --measure`.

## Included Example

`dashboard-01` includes a sidebar, stats cards, a chart, a table, and shadcn variable bindings with Light and Dark mode support.
