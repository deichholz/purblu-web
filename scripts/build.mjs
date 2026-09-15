import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Eleventy from '@11ty/eleventy';
process.chdir(fileURLToPath(new URL('../', import.meta.url)));
rmSync('dist', { recursive: true, force: true });
await new Eleventy('.', 'dist').write();
