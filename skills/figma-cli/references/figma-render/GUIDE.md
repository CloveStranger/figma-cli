---
name: figma-render
description: Use when creating primitives, JSX layouts, webpages, rich text, or custom components with figma-ds-cli render, render-batch, create, set, and layout commands
---

# Figma Render

## Overview

This skill covers direct creation workflows: primitives, JSX render, batch render, layout updates, and custom component construction.

## When to Use

- User wants a frame, text, shape, icon, image, or auto-layout container
- User wants a JSX-rendered UI block
- User wants a webpage or composed layout
- User wants a custom component that is not already a block

## Core Commands

```bash
figma-ds-cli create rect "Card" -w 320 -h 200 --fill "#fff" --radius 12
figma-ds-cli create autolayout "Card" -d col -g 16 -p 24 --fill "#fff"
figma-ds-cli create icon lucide:star -s 24 -c "#f59e0b"
figma-ds-cli render '<Frame name="Card" w={320} h={180} bg="#fff" rounded={16}><Text>Title</Text></Frame>'
figma-ds-cli render '<Frame name="Card">...</Frame>' --as-component --verify
figma-ds-cli render '<Frame bg="var:card">...</Frame>' --collection figma --verify
figma-ds-cli render-batch '["<Frame ... />","<Frame ... />"]' -d row -g 40 --verify
figma-ds-cli render-batch '["<Frame ... />","<Frame ... />"]' --as-component --collection figma
figma-ds-cli render --file ui.jsx --page "Scratch" --verify
figma-ds-cli render-batch --file frames.json --page "Scratch" --variant-set Button --verify
figma-ds-cli render '<Instance component="Card" />' --verify
figma-ds-cli spec "Button"
figma-ds-cli instantiate "Button"
```

## Layout Updates

```bash
figma-ds-cli set fill "#3b82f6"
figma-ds-cli set radius 12
figma-ds-cli set size 320 200
figma-ds-cli set pos 100 100
figma-ds-cli set autolayout row -g 8 -p 16
figma-ds-cli sizing hug
figma-ds-cli sizing fill
figma-ds-cli padding 16
figma-ds-cli gap 16
figma-ds-cli unstack
figma-ds-cli arrange -g 100
```

## High-Value Options

- Use `--file <path>` for long or generated input. `render` reads JSX; `render-batch` reads a JSON array of JSX strings.
- Use `--page <name>` to select the destination page; it creates the page if missing.
- Use `--variant-set <name>` on `render-batch` to create one component set. Give every input frame a unique `axis=value, axis=value` name with the same axes.
- Read the printed structure summary and `note:` lines for missing fonts, styles, variants, or icons. Keep visual verification; avoid a separate full tree readback when the summary answers the question.
- Use `--verify` to replace a separate `figma-ds-cli verify` roundtrip.
- Use `--as-component` when the rendered frame should immediately become a component.
- Use `--collection <name>` when the user names a variable collection or brand system.
- Use `--keep-wrapper` only when the outer wrapper is intentional; otherwise the renderer may split layout-only wrappers into independent canvas items.

## Reuse Check

If a DESIGN.md exists and the user asks for a component that may already be in that system, do not default to rendering.

1. Run `figma-ds-cli spec "Name"` to find the authoritative spec and reuse handle.
2. If the user wants to use or add the existing component, run `figma-ds-cli instantiate "Name"`.
3. If the user explicitly wants a rebuilt version, render it and then run `figma-ds-cli spec "Name" --check "NODE_ID"`.

## Instances, Styles, and Images

```jsx
<Frame name="Card" flex="col" w={320} p={24} effectStyle="shadow/small">
  <Text textStyle="Body/Medium">Title</Text>
  <Instance component="Button" variant="size=large" text="Save" />
  <Instance component="Icon" tint="var:accent" />
  <Image src="https://example.com/photo.png" w={272} h={160} />
</Frame>
```

- `<Instance component="NameOrId">` finds components across pages; unspecified variant axes use the default variant. `text` relabels the first text layer, and `tint` recolors vectors inside the instance.
- A standalone `<Instance ... />` or `<Rectangle ... />` can be the render root; a wrapper frame is unnecessary.
- Named `textStyle` and `effectStyle` use local styles. Missing fonts fall back to Inter and are reported in `note:` lines.
- Use `image="https://..." imageScale="fill|fit"` on frames or rectangles, or `<Image src="https://..." />`. The CLI downloads images outside the plugin network context.
- For overlays, use `position="absolute" x={0} y={0}` on a child, including text or instances. Use `overflow="hidden"` on the frame when children should clip to its boundary.
- Icons are fetched per set and cached in `~/.figma-ds-cli/icons`. An icon load failure produces a `note:`; inspect the result before accepting it.

## Safe Mode Rule

`render` and `render-batch` work in Safe Mode, including text. If a complex batch times out, split it into smaller renders. Use `eval` only for native Figma API operations that JSX cannot express.

## Component Creation Rules

- Check current page positions before creating large new groups to avoid overlap.
- Never delete existing nodes unless the user asked for it.
- After creating anything visual, run `figma-ds-cli verify "NODE_ID" --measure` or pass `--verify` to render.
- Prefer `render` / `render-batch` for visual node creation. Use `eval` only for native Plugin API operations that JSX or CLI commands cannot express.
- When the user asks for N cards/buttons/items, create N independent top-level nodes with `render-batch`, not one wrapper frame containing N repeated children.
- Prefer `unstack` to fix accidental top-level overlaps. `arrange` is destructive and should be used only when the user intends to reorder every top-level frame.

## Text and Auto-Layout

- Use numeric width for deterministic wrapping, including inside row layouts: `<Text w={480}>...</Text>`.
- Use `w="fill"` when text should consume a constrained auto-layout parent; ensure the relevant parent and intermediate content frames also establish fill-compatible width.
- Inline runs support `<b>` / `<strong>`, `<em>` / `<i>`, `<u>`, and `<span weight= italic= color= size= letterSpacing=>`. Inline `color` accepts hex values.
- Numeric and common named HTML entities are decoded. Formatting whitespace inside `<Text>` collapses and outer whitespace is trimmed.
- If the runtime reports a fill child inside a parent that hugs the same axis with no sizing sibling, fix the circular layout instead of silencing the warning.
- Text supports `name="Layer name"` and `decoration="strikethrough|underline"`. In a column with `items="center"`, text aligns centrally unless `align` is explicit.
- Bare numeric attributes such as `x=48` are accepted; brace syntax remains suitable for generated JSX.
- Auto-layout frames keep strokes outside layout calculations, so fill children span the available inner width.
