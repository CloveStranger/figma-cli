import { join } from 'path';
import { pathToFileURL } from 'url';

export function getFigmaClientModuleUrl(baseDir) {
  return pathToFileURL(join(baseDir, 'figma-client.js')).href;
}
