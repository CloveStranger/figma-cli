---
name: figma-slot
description: Use when creating, listing, converting, resetting, or populating Figma native slots in components or instances with figma-ds-cli
---

# Figma Slot

## Overview

Slots create flexible content regions inside components. Use slot commands instead of trying to force slot behavior through plain `eval`.

## When to Use

- User wants a slot in a component
- User wants to inspect or reset slots
- User wants preferred components for a slot
- User wants to add content into a slot in an instance

## Commands

```bash
figma-ds-cli slot create "Content" --flex col --gap 8 --padding 16
figma-ds-cli slot list
figma-ds-cli slot list "1:234"
figma-ds-cli slot preferred "Slot#1:2" "comp-id-1" "comp-id-2"
figma-ds-cli slot reset
figma-ds-cli slot reset "slot-node-id"
figma-ds-cli slot convert --name "Actions"
figma-ds-cli slot add "slot-id" --component "comp-id"
figma-ds-cli slot add "slot-id" --frame
figma-ds-cli slot add "slot-id" --text "Hello"
```

## JSX

```jsx
<Slot name="Content" flex="col" gap={8} w="fill" />
```

When the parent is a component, this creates a real slot. Otherwise it falls back to a frame.

## Critical Rule

Do not rely on `isSlot = true` in raw Figma API code. It does not create a real slot here. Use `figma-ds-cli slot convert` or the supported slot commands.
