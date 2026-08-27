---
name: figma-validation
description: Use when creating or checking deterministic Figma design-system contracts with figma-ds-cli snapshot, rules, check, CI JSON output, or token roundtrip validation; not for screenshot-based visual QA
---

# Figma Validation

Use deterministic contracts when the user wants to lock a design system, detect drift, enforce component promises, or verify token roundtrips. Use `figma-verify` for screenshot and measurement QA instead.

## Commands

```bash
figma-ds-cli snapshot design.json
figma-ds-cli snapshot design.json --pages "Components"
figma-ds-cli snapshot design.json --selection
figma-ds-cli snapshot design.json --resolve-remote
figma-ds-cli rules gen rules/
figma-ds-cli rules gen rules/ --only "Button,Input"
figma-ds-cli rules list rules/
figma-ds-cli check design.json
figma-ds-cli check design.json --roundtrip
figma-ds-cli check design.json --json
figma-ds-cli check design.json --only rules
```

## Workflow

1. Confirm the intended Figma file and scope. Use the same `--pages` or `--selection` scope when creating and checking a contract.
2. If the system aliases into an enabled shared variable library, pass `--resolve-remote` to `snapshot`, `rules gen`, and `check`.
3. Create `design.json` for canonical structural drift and `rules/*.yaml` for component promises such as variant coverage, token binding, geometry, and state transitions.
4. Review the generated Git diff. Contract generation does not authorize committing it.
5. Run `check`; non-zero means validation is incomplete. `--roundtrip` additionally proves that the token layer survives extract and import.

## Interpretation and Safety

- A reported difference means the live file changed; it does not decide whether the change was intended.
- If an intentional change establishes a new baseline, regenerate the snapshot and use `rules gen --force` only when the user has authorized replacing existing rule contracts.
- Do not change scope merely to make a check pass. A scope mismatch can make unrelated pages appear deleted.
- Keep `--resolve-remote` consistent. An uncaptured library target cannot satisfy token-binding checks and may re-import without a value.
- Use `--json` for machine-readable CI output and preserve the command's exit status.
