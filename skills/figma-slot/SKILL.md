---
name: figma-slot
description: Use when creating, listing, converting, resetting, or populating Figma native slots in components or instances with fig/figma-ds-cli
---

# Figma Slot

## Overview

Slots create flexible content regions inside components. Use slot commands instead of trying to force slot behavior through plain `eval`.

Interactive entrypoint:

```bash
fig connect
```

Command alias:

```bash
alias fig='figma-ds-cli'
```

## When to Use

- User wants a slot in a component
- User wants to inspect or reset slots
- User wants preferred components for a slot
- User wants to add content into a slot in an instance

## Commands

```bash
fig slot create "Content" --flex col --gap 8 --padding 16
fig slot list
fig slot list "1:234"
fig slot preferred "Slot#1:2" "comp-id-1" "comp-id-2"
fig slot reset
fig slot reset "slot-node-id"
fig slot convert --name "Actions"
fig slot add "slot-id" --component "comp-id"
fig slot add "slot-id" --frame
fig slot add "slot-id" --text "Hello"
```

## JSX

```jsx
<Slot name="Content" flex="col" gap={8} w="fill" />
```

When the parent is a component, this creates a real slot. Otherwise it falls back to a frame.

## Critical Rule

Do not rely on `isSlot = true` in raw Figma API code. It does not create a real slot here. Use `fig slot convert` or the supported slot commands.
