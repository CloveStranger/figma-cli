# figma-ds-cli Agent Guide

Use this file as a router, not as the full manual. Command usage has been split into command-group skills under `skills/`.

## Global Rules

- After any visual creation or component conversion, run `node src/index.js verify`.
- Never export a candidate node blindly. Preview with `verify`, then export the correct asset boundary.
- Never delete existing canvas nodes unless the user explicitly asks for deletion.
- For dashboards and page layouts, use `node src/index.js blocks create ...` instead of rebuilding by hand.
- In Safe Mode, do not use `render-batch` for components with text. Use `eval` with native Figma API.
- `var list` only shows existing variables. Use `tokens ...` commands to create token sets.

## Skill Index

Use the skill whose trigger matches the user's request.

| Need | Skill |
|---|---|
| Connect to Figma, choose Yolo vs Safe mode | `skills/figma-connect/SKILL.md` |
| Create token sets like shadcn, tailwind, DS | `skills/figma-tokens/SKILL.md` |
| List, visualize, bind, or update variables | `skills/figma-variables/SKILL.md` |
| Create dashboards or prebuilt layouts | `skills/figma-blocks/SKILL.md` |
| Create primitives, render JSX, build frames/components | `skills/figma-render/SKILL.md` |
| Inspect canvas, find nodes, convert nodes, inspect tree/bindings | `skills/figma-node/SKILL.md` |
| Create and manage Figma slots | `skills/figma-slot/SKILL.md` |
| Validate visual output with screenshots | `skills/figma-verify/SKILL.md` |
| Export PNG, SVG, CSS, Tailwind, JSX, Storybook | `skills/figma-export/SKILL.md` |

## Quick Routing

- "connect to figma" -> `node src/index.js connect`
- "add shadcn colors" -> `node src/index.js tokens preset shadcn`
- "add tailwind colors" -> `node src/index.js tokens tailwind`
- "show colors on canvas" -> `node src/index.js var visualize`
- "create dashboard" -> `node src/index.js blocks create dashboard-01`
- "create a rectangle/frame" -> `node src/index.js render '<Frame>...</Frame>'`
- "convert to component" -> `node src/index.js node to-component "ID"`
- "list variables" -> `node src/index.js var list`
- "find nodes named X" -> `node src/index.js find "X"`
- "what's on canvas" -> `node src/index.js canvas info`
- "export as PNG/SVG" -> `node src/index.js export node "ID" --format png`
- "show all variants" -> `node src/index.js combos`
- "create size variants" -> `node src/index.js sizes --base small`
- "create a slot" -> `node src/index.js slot create "Name"`
- "list slots" -> `node src/index.js slot list`
- "reset slot" -> `node src/index.js slot reset`

## Reference

- Full command reference: `REFERENCE.md`
- Skill details: `skills/*/SKILL.md`
