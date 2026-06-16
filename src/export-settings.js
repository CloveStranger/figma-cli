export function parseFigmaNodeUrl(url) {
  const parsed = new URL(url);
  const segments = parsed.pathname.split('/').filter(Boolean);
  const fileKey = segments[1] || null;
  const pageName = segments[2] ? decodeURIComponent(segments[2]).replace(/-/g, ' ') : null;
  const rawNodeId = parsed.searchParams.get('node-id');

  return {
    fileKey,
    pageName,
    nodeId: rawNodeId ? rawNodeId.replace(/-/g, ':') : null
  };
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[:/\\]+/g, ' ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function scaleSuffix(constraint) {
  if (!constraint || constraint.type !== 'SCALE') return '';
  const value = Number(constraint.value);
  if (!Number.isFinite(value) || value <= 0) return '';
  return `@${Number.isInteger(value) ? value : String(value).replace('.', '_')}x`;
}

export function buildExportFilename({ nodeName, format, suffix = '', constraint = null }) {
  const base = slugify(nodeName) || 'node_export';
  const cleanSuffix = slugify(suffix).replace(/^_+/, '');
  const suffixPart = cleanSuffix ? `_${cleanSuffix}` : '';
  const extension = String(format || 'png').toLowerCase();
  return `${base}${suffixPart}${scaleSuffix(constraint)}.${extension}`;
}

export function ensureUniqueFilename(filename, usedNames) {
  if (!usedNames.has(filename)) {
    usedNames.add(filename);
    return filename;
  }

  const dotIndex = filename.lastIndexOf('.');
  const stem = dotIndex >= 0 ? filename.slice(0, dotIndex) : filename;
  const extension = dotIndex >= 0 ? filename.slice(dotIndex) : '';

  let counter = 2;
  let candidate = `${stem}_${counter}${extension}`;
  while (usedNames.has(candidate)) {
    counter += 1;
    candidate = `${stem}_${counter}${extension}`;
  }

  usedNames.add(candidate);
  return candidate;
}
