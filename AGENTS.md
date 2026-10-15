# figma-ds-cli Agent Guide

Use this file as a router, not as the full manual. The single top-level `figma-cli` skill routes to command-group guides under `skills/figma-cli/references/`.

## Global Rules

- Use the installed `figma-ds-cli` executable directly; do not rely on shell aliases.
- After any visual creation or component conversion, run `figma-ds-cli verify "NODE_ID" --measure`, or use `--verify` on `render` / `render-batch` for one roundtrip.
- `verify` saves PNG files by default. Use `--base64` only when inline image data is explicitly needed.
- Never export a candidate node blindly. Preview with `verify`, then export the correct asset boundary.
- Never delete existing canvas nodes unless the user explicitly asks for deletion.
- For dashboards and page layouts, use `node src/index.js blocks create ...` instead of rebuilding by hand.
- In Safe Mode, `render` and `render-batch` work through the daemon. If a complex batch times out, split it into smaller renders; use `eval` only for native API control that JSX cannot express.
- `var list` only shows existing variables. Use `tokens ...` commands to create token sets.
- If a DESIGN.md exists and the user asks to use an existing component, run `spec` / `instantiate` before rebuilding.
- `extract` captures real variable collections in `--sections variables`; re-import DESIGN.md with `import`, not a manual token rewrite.
- When local variables alias into a shared library, keep `--resolve-remote` consistent across `extract`, `snapshot`, `rules gen`, and `check`.
- When multiple Figma files are open, use `FIGMA_FILE="Name"` and confirm the target before mutating it.

## Skill Index

Read `skills/figma-cli/SKILL.md` first, then load only the matching `GUIDE.md` file.

| Need | Skill |
|---|---|
| Connect to Figma, choose Yolo/Browser/Safe mode, or target an open file | `skills/figma-cli/references/figma-connect/GUIDE.md` |
| Create token sets like shadcn, tailwind, DS | `skills/figma-cli/references/figma-tokens/GUIDE.md` |
| List, visualize, bind, update, extract, or roundtrip variables | `skills/figma-cli/references/figma-variables/GUIDE.md` |
| Create dashboards or prebuilt layouts | `skills/figma-cli/references/figma-blocks/GUIDE.md` |
| Create primitives, render JSX, build frames/components | `skills/figma-cli/references/figma-render/GUIDE.md` |
| Inspect canvas, find nodes, convert nodes, inspect tree/bindings, reuse existing components | `skills/figma-cli/references/figma-node/GUIDE.md` |
| Create and manage Figma slots | `skills/figma-cli/references/figma-slot/GUIDE.md` |
| Validate visual output with screenshots and measurements | `skills/figma-cli/references/figma-verify/GUIDE.md` |
| Create/check design-system snapshots, rules, drift, or roundtrip contracts | `skills/figma-cli/references/figma-validation/GUIDE.md` |
| Export PNG/SVG/JPG/PDF assets, DESIGN.md, export settings subtrees, CSS, Tailwind, DTCG, JSX, Storybook | `skills/figma-cli/references/figma-export/GUIDE.md` |

## Quick Routing

- "connect to figma" -> `figma-ds-cli connect`
- "connect in browser mode" -> `figma-ds-cli connect --browser`
- "connect in safe mode" -> `figma-ds-cli connect --safe`
- "add shadcn colors" -> `figma-ds-cli tokens preset shadcn`
- "add tailwind colors" -> `figma-ds-cli tokens tailwind`
- "show colors on canvas" -> `figma-ds-cli var visualize`
- "create dashboard" -> `figma-ds-cli blocks create dashboard-01`
- "create a rectangle/frame" -> `figma-ds-cli render '<Frame>...</Frame>' --verify`
- "create multiple independent cards/buttons" -> `figma-ds-cli render-batch '[...]' --direction row --verify`
- "convert to component" -> `figma-ds-cli node to-component "ID"`
- "combine multi-axis variants" -> `figma-ds-cli variants from auto --multi --name "Component"`
- "use the existing X component" -> `figma-ds-cli instantiate "X"`
- "what component already exists for X" -> `figma-ds-cli spec "X"`
- "check rebuilt X against the design system" -> `figma-ds-cli spec "X" --check "NODE_ID"`
- "list variables" -> `figma-ds-cli var list`
- "find nodes named X" -> `figma-ds-cli find "X"`
- "what's on canvas" -> `figma-ds-cli canvas info`
- "verify creation/layout" -> `figma-ds-cli verify "ID" --measure`
- "lock the design system" -> `figma-ds-cli snapshot design.json` and `figma-ds-cli rules gen rules/`
- "check design drift/CI" -> `figma-ds-cli check design.json --json`
- "prove token roundtrip" -> `figma-ds-cli check design.json --roundtrip`
- "export as PNG/SVG" -> `figma-ds-cli export node "ID" --format png --output asset.png`
- "export configured assets under this node or URL" -> `figma-ds-cli export subtree "ID_OR_FIGMA_URL" --output-dir exports/name`
- "export the design system as markdown" -> `figma-ds-cli extract DESIGN.md`
- "export shared-library variables" -> `figma-ds-cli extract DESIGN.md --sections variables --resolve-remote`
- "import a DESIGN.md" -> `figma-ds-cli import DESIGN.md`
- "export tokens as DTCG/design tokens JSON" -> `figma-ds-cli export dtcg tokens.json`
- "export tokens as CSS/Tailwind" -> `figma-ds-cli export css` / `figma-ds-cli export tailwind`
- "show all variants" -> `figma-ds-cli combos`
- "create size variants" -> `figma-ds-cli sizes --base small`
- "create a slot" -> `figma-ds-cli slot create "Name"`
- "list slots" -> `figma-ds-cli slot list`
- "reset slot" -> `figma-ds-cli slot reset`

## Reference

- Full command reference: `REFERENCE.md`
- Skill details: `skills/figma-cli/references/*/GUIDE.md`
