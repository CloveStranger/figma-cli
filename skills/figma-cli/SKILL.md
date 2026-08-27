---
name: figma-cli
description: Route broad Figma Desktop work to the focused figma-ds-cli skills for connection, rendering, nodes and variants, tokens, variables, slots, export, visual verification, or deterministic validation
---

# Figma CLI Router

Use the installed `figma-ds-cli` executable directly. Do not depend on shell aliases.

## Route by Intent

- Connection modes, status, or selecting an open file: [figma-connect](../figma-connect/SKILL.md)
- Prebuilt dashboards and page blocks: [figma-blocks](../figma-blocks/SKILL.md)
- JSX, primitives, rich text, layout, or custom components: [figma-render](../figma-render/SKILL.md)
- Canvas inspection, reuse, conversion, or variant sets: [figma-node](../figma-node/SKILL.md)
- Token presets: [figma-tokens](../figma-tokens/SKILL.md)
- Variable binding and shared-library roundtrips: [figma-variables](../figma-variables/SKILL.md)
- Native component slots: [figma-slot](../figma-slot/SKILL.md)
- Assets, DESIGN.md, token files, JSX, or Storybook export: [figma-export](../figma-export/SKILL.md)
- Screenshot and measurement QA: [figma-verify](../figma-verify/SKILL.md)
- Design-system snapshots, component rules, drift, and roundtrip checks: [figma-validation](../figma-validation/SKILL.md)

Read only the focused skill needed for the request.

## Shared Invariants

- Never delete existing canvas nodes unless the user explicitly asks.
- Use `render` or `render-batch` for visual creation; reserve `eval` for native API operations the CLI cannot express.
- A request for N peer items means N independent top-level nodes.
- Verify visual creation with `figma-ds-cli verify "NODE_ID" --measure` or render with `--verify`.
- If a DESIGN.md contains the requested component, use `spec` and `instantiate` before rebuilding it.
- When local variables alias into a shared library, keep `--resolve-remote` consistent across extract, snapshot, rules, and check workflows.
