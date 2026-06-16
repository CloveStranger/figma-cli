import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

import { getFigmaClientModuleUrl } from '../src/cli-paths.js';

describe('getFigmaClientModuleUrl', () => {
  it('resolves figma-client.js relative to the CLI source directory, not process cwd', () => {
    const fakeBaseDir = '/tmp/somewhere/src';
    const url = getFigmaClientModuleUrl(fakeBaseDir);

    assert.equal(fileURLToPath(url), '/tmp/somewhere/src/figma-client.js');
  });
});
