---
name: figma-cli
description: Route broad Figma Desktop work to the focused figma-ds-cli skills for connection, rendering, nodes and variants, tokens, variables, slots, export, visual verification, or deterministic validation
---

# Figma CLI Suite

Use the installed `figma-ds-cli` executable directly. Do not depend on shell aliases.

Guidance matches figma-ds-cli 2.2.5.

This is the only top-level Figma CLI skill. Its focused guides live in `references/` as `GUIDE.md` files and are loaded only after routing.

## Route by Intent

- Connection modes, status, or selecting an open file: [figma-connect](references/figma-connect/GUIDE.md)
- Prebuilt dashboards and page blocks: [figma-blocks](references/figma-blocks/GUIDE.md)
- JSX or file-based render, page layouts, images, instances, or component sets: [figma-render](references/figma-render/GUIDE.md)
- Canvas inspection, reuse, conversion, or variant sets: [figma-node](references/figma-node/GUIDE.md)
- Token presets: [figma-tokens](references/figma-tokens/GUIDE.md)
- Variable binding and shared-library roundtrips: [figma-variables](references/figma-variables/GUIDE.md)
- Native component slots: [figma-slot](references/figma-slot/GUIDE.md)
- Assets, DESIGN.md, token files, JSX, or Storybook export: [figma-export](references/figma-export/GUIDE.md)
- Screenshot and measurement QA: [figma-verify](references/figma-verify/GUIDE.md)
- Design-system snapshots, component rules, drift, and roundtrip checks: [figma-validation](references/figma-validation/GUIDE.md)

Read only the focused skill needed for the request.

## Shared Invariants

- Never delete existing canvas nodes unless the user explicitly asks.
- Use `render` or `render-batch` for visual creation; reserve `eval` for native API operations the CLI cannot express.
- A request for N peer items means N independent top-level nodes.
- Verify visual creation with `figma-ds-cli verify "NODE_ID" --measure` or render with `--verify`.
- If a DESIGN.md contains the requested component, use `spec` and `instantiate` before rebuilding it.
- When local variables alias into a shared library, keep `--resolve-remote` consistent across extract, snapshot, rules, and check workflows.
- Inspect the structure summary and `note:` lines printed by render before deciding whether another inspection is needed. Visual verification still applies.
