# figma-cli Agent Guide

Use this file as a router, not as the full manual. Command usage has been split into command-group skills under `skills/`.

## Global Rules

- After any visual creation or component conversion, run `node src/index.js verify "NODE_ID" --measure`, or use `--verify` on `render` / `render-batch` for one roundtrip.
- `verify` saves PNG files by default. Use `--base64` only when inline image data is explicitly needed.
- Never export a candidate node blindly. Preview with `verify`, then export the correct asset boundary.
- Never delete existing canvas nodes unless the user explicitly asks for deletion.
- For dashboards and page layouts, use `node src/index.js blocks create ...` instead of rebuilding by hand.
- In Safe Mode, `render` and `render-batch` work through the daemon. If a complex batch times out, split it into smaller renders; use `eval` only for native API control that JSX cannot express.
- `var list` only shows existing variables. Use `tokens ...` commands to create token sets.
- If a DESIGN.md exists and the user asks to use an existing component, run `spec` / `instantiate` before rebuilding.
- `extract` captures real variable collections in `--sections variables`; re-import DESIGN.md with `import`, not a manual token rewrite.

## Skill Index

Use the skill whose trigger matches the user's request.

| Need | Skill |
|---|---|
| Connect to Figma, choose Yolo vs Safe mode | `skills/figma-connect/SKILL.md` |
| Create token sets like shadcn, tailwind, DS | `skills/figma-tokens/SKILL.md` |
| List, visualize, bind, update, extract, or roundtrip variables | `skills/figma-variables/SKILL.md` |
| Create dashboards or prebuilt layouts | `skills/figma-blocks/SKILL.md` |
| Create primitives, render JSX, build frames/components | `skills/figma-render/SKILL.md` |
| Inspect canvas, find nodes, convert nodes, inspect tree/bindings, reuse existing components | `skills/figma-node/SKILL.md` |
| Create and manage Figma slots | `skills/figma-slot/SKILL.md` |
| Validate visual output with screenshots and measurements | `skills/figma-verify/SKILL.md` |
| Export PNG/SVG/JPG/PDF assets, DESIGN.md, export settings subtrees, CSS, Tailwind, DTCG, JSX, Storybook | `skills/figma-export/SKILL.md` |

## Quick Routing

- "connect to figma" -> `node src/index.js connect`
- "connect in safe mode" -> `node src/index.js connect --safe`
- "add shadcn colors" -> `node src/index.js tokens preset shadcn`
- "add tailwind colors" -> `node src/index.js tokens tailwind`
- "show colors on canvas" -> `node src/index.js var visualize`
- "create dashboard" -> `node src/index.js blocks create dashboard-01`
- "create a rectangle/frame" -> `node src/index.js render '<Frame>...</Frame>' --verify`
- "create multiple independent cards/buttons" -> `node src/index.js render-batch '[...]' --direction row --verify`
- "convert to component" -> `node src/index.js node to-component "ID"`
- "use the existing X component" -> `node src/index.js instantiate "X"`
- "what component already exists for X" -> `node src/index.js spec "X"`
- "check rebuilt X against the design system" -> `node src/index.js spec "X" --check "NODE_ID"`
- "list variables" -> `node src/index.js var list`
- "find nodes named X" -> `node src/index.js find "X"`
- "what's on canvas" -> `node src/index.js canvas info`
- "verify creation/layout" -> `node src/index.js verify "ID" --measure`
- "export as PNG/SVG" -> `node src/index.js export node "ID" --format png --output asset.png`
- "export configured assets under this node or URL" -> `node src/index.js export subtree "ID_OR_FIGMA_URL" --output-dir exports/name`
- "export the design system as markdown" -> `node src/index.js extract DESIGN.md`
- "export only real variable collections" -> `node src/index.js extract DESIGN.md --sections variables`
- "import a DESIGN.md" -> `node src/index.js import DESIGN.md`
- "export tokens as DTCG/design tokens JSON" -> `node src/index.js export dtcg tokens.json`
- "export tokens as CSS/Tailwind" -> `node src/index.js export css` / `node src/index.js export tailwind`
- "show all variants" -> `node src/index.js combos`
- "create size variants" -> `node src/index.js sizes --base small`
- "create a slot" -> `node src/index.js slot create "Name"`
- "list slots" -> `node src/index.js slot list`
- "reset slot" -> `node src/index.js slot reset`

## Reference

- Full command reference: `REFERENCE.md`
- Skill details: `skills/*/SKILL.md`
