import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('agent guidance assets', () => {
  it('ships the skill router and command-group skills in the npm package', () => {
    const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));

    assert.ok(packageJson.files.includes('AGENTS.md'));
    assert.ok(packageJson.files.includes('AGENT.md'));
    assert.ok(packageJson.files.includes('skills'));
  });

  it('keeps an AGENTS.md entrypoint for agent tools that auto-discover it', () => {
    assert.equal(existsSync(join(rootDir, 'AGENTS.md')), true);
  });
});
