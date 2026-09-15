import { lstat, readFile, readdir } from 'node:fs/promises';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const contractPath = join(projectRoot, 'validation', 'build-contract.json');
const outputRoot = resolve(projectRoot, process.argv[2] || 'dist');
const contract = JSON.parse(await readFile(contractPath, 'utf8'));
const errors = [];
const files = [];

function displayPath(path) {
  return relative(outputRoot, path).split(sep).join('/');
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) {
      errors.push(`Symbolic links are not publishable: ${displayPath(path)}`);
    } else if (stat.isDirectory()) {
      await walk(path);
    } else if (stat.isFile()) {
      files.push({ path, stat });
    } else {
      errors.push(`Unsupported filesystem entry: ${displayPath(path)}`);
    }
  }
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function attributeValues(html, attribute) {
  const values = [];
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'gi');
  for (const match of html.matchAll(pattern)) values.push(decodeHtmlAttribute(match[2]));
  return values;
}

function localTargetFor(url, sourceFile) {
  const withoutFragment = url.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment) return null;
  let relativeTarget;
  if (withoutFragment.startsWith('/')) {
    relativeTarget = withoutFragment.slice(1);
  } else {
    relativeTarget = normalize(join(dirname(sourceFile), withoutFragment));
  }
  if (!relativeTarget || relativeTarget.endsWith('/')) relativeTarget = join(relativeTarget, 'index.html');
  return relativeTarget;
}

try {
  const rootStat = await lstat(outputRoot);
  if (!rootStat.isDirectory()) errors.push(`Build output is not a directory: ${outputRoot}`);
} catch {
  errors.push(`Build output does not exist: ${outputRoot}`);
}

if (errors.length === 0) await walk(outputRoot);

const publishedPaths = new Set(files.map(({ path }) => displayPath(path)));

for (const requiredFile of contract.requiredFiles) {
  if (!publishedPaths.has(requiredFile)) {
    errors.push(`Required generated file is missing: ${requiredFile}`);
    continue;
  }
  const stat = files.find(({ path }) => displayPath(path) === requiredFile)?.stat;
  if (!stat || stat.size === 0) errors.push(`Required generated file is empty: ${requiredFile}`);
}

for (const forbiddenPath of contract.forbiddenPaths) {
  const normalizedForbidden = forbiddenPath.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/$/, '');
  for (const publishedPath of publishedPaths) {
    if (publishedPath === normalizedForbidden || publishedPath.startsWith(`${normalizedForbidden}/`)) {
      errors.push(`Forbidden path is present in the build: ${publishedPath}`);
    }
  }
}

for (const { path, stat } of files) {
  if (stat.size > contract.maximumFileSizeBytes) {
    errors.push(`File exceeds ${contract.maximumFileSizeBytes} bytes: ${displayPath(path)}`);
  }
}

const htmlFiles = new Map();
for (const { path } of files) {
  if (!path.endsWith('.html')) continue;
  const name = displayPath(path);
  const html = await readFile(path, 'utf8');
  htmlFiles.set(name, html);

  const hrefs = attributeValues(html, 'href');
  const sources = attributeValues(html, 'src');
  for (const url of [...hrefs, ...sources]) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) continue;
    const target = localTargetFor(url, name);
    if (target && !publishedPaths.has(target)) errors.push(`Broken local reference in ${name}: ${url} -> ${target}`);
  }

  const canonical = hrefs.find(url => url.startsWith(`${contract.requiredOrigin}/`) || url === contract.requiredOrigin);
  if (!canonical) errors.push(`Expected production-origin link is missing from ${name}: ${contract.requiredOrigin}`);
}

for (const group of ['requiredExternalLinks', 'requiredExternalResources']) {
  for (const requirement of contract[group]) {
    for (const page of requirement.requiredIn) {
      const html = htmlFiles.get(page);
      if (!html) {
        errors.push(`${requirement.name} cannot be checked because ${page} is missing`);
      } else if (!decodeHtmlAttribute(html).includes(requirement.url)) {
        errors.push(`${requirement.name} is missing from ${page}: ${requirement.url}`);
      }
    }
  }
}

for (const forbiddenLink of contract.forbiddenExternalLinks) {
  for (const [page, html] of htmlFiles) {
    const hrefs = attributeValues(html, 'href');
    if (hrefs.includes(forbiddenLink.url)) {
      errors.push(`${forbiddenLink.name} must not be linked from ${page}: ${forbiddenLink.url}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Build validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Build validation passed for ${files.length} public files, including index.html and intro/index.html.`);
}
