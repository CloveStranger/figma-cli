import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildExportFilename, ensureUniqueFilename, parseFigmaNodeUrl } from '../src/export-settings.js';

describe('parseFigmaNodeUrl', () => {
  it('extracts file key and normalizes node ids from a figma design url', () => {
    const result = parseFigmaNodeUrl('https://www.figma.com/design/SqrDMO6bbeL9GnwI023hzF/Figma-Basics?node-id=1741-4188&t=g9IGLsxyPgnRsubE-4');

    assert.deepStrictEqual(result, {
      fileKey: 'SqrDMO6bbeL9GnwI023hzF',
      pageName: 'Figma Basics',
      nodeId: '1741:4188'
    });
  });
});

describe('buildExportFilename', () => {
  it('includes suffix, scale marker and file extension', () => {
    const filename = buildExportFilename({
      nodeName: 'Promo Banner / Hero',
      format: 'PNG',
      suffix: '_dark',
      constraint: { type: 'SCALE', value: 3 }
    });

    assert.strictEqual(filename, 'promo_banner_hero_dark@3x.png');
  });

  it('omits scale marker for non-scale exports', () => {
    const filename = buildExportFilename({
      nodeName: 'Vector Logo',
      format: 'SVG',
      suffix: '',
      constraint: { type: 'WIDTH', value: 512 }
    });

    assert.strictEqual(filename, 'vector_logo.svg');
  });
});

describe('ensureUniqueFilename', () => {
  it('appends a numeric suffix when the same filename is reused', () => {
    const used = new Set(['node_export@3x.png', 'node_export@3x_2.png']);

    const unique = ensureUniqueFilename('node_export@3x.png', used);

    assert.strictEqual(unique, 'node_export@3x_3.png');
  });
});
