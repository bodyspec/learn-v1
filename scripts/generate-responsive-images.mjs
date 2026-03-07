#!/usr/bin/env node
/**
 * Generate responsive image variants for DEXA education diagrams.
 *
 * Usage:
 *   node scripts/generate-responsive-images.mjs                # generate responsive variants
 *   node scripts/generate-responsive-images.mjs --fix-extensions  # one-time: rename mismatched .png→.jpg
 *
 * Requires: sharp (installed in frontend/)
 */

import { createRequire } from 'module';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync, renameSync } from 'fs';
import { resolve, dirname, basename, extname, join } from 'path';
import { fileURLToPath } from 'url';

// Use sharp from frontend/node_modules
const require = createRequire(resolve(dirname(fileURLToPath(import.meta.url)), '../frontend/package.json'));
const sharp = require('sharp');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIAGRAMS_DIR = resolve(ROOT, 'content/assets/diagrams');
const RESPONSIVE_DIR = resolve(DIAGRAMS_DIR, '_responsive');
const CACHE_FILE = resolve(RESPONSIVE_DIR, '.cache.json');
const MANIFEST_FILE = resolve(RESPONSIVE_DIR, 'manifest.json');
const CONTENT_DIR = resolve(ROOT, 'content');

// Size breakpoints (widths in px)
const BREAKPOINTS = [480, 768, 1024, 1536];
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 85;

// ── Fix Extensions Mode ─────────────────────────────────────────────────────

async function fixExtensions() {
  console.log('Detecting mismatched file extensions...\n');

  const files = readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  const renames = [];

  for (const file of files) {
    const filePath = resolve(DIAGRAMS_DIR, file);
    const stat = statSync(filePath);
    if (!stat.isFile()) continue;

    const metadata = await sharp(filePath).metadata();
    const actualFormat = metadata.format; // 'jpeg', 'png', 'webp', etc.

    if (actualFormat === 'jpeg') {
      const newName = file.replace(/\.png$/, '.jpg');
      renames.push({ oldName: file, newName, oldPath: filePath, newPath: resolve(DIAGRAMS_DIR, newName) });
    }
  }

  if (renames.length === 0) {
    console.log('No mismatched extensions found.');
    return;
  }

  console.log(`Found ${renames.length} files with mismatched extensions:\n`);

  // Rename files
  for (const { oldName, newName, oldPath, newPath } of renames) {
    renameSync(oldPath, newPath);
    console.log(`  ${oldName} → ${newName}`);
  }

  // Update markdown references
  console.log('\nUpdating markdown references...\n');
  const mdFiles = findMarkdownFiles(CONTENT_DIR);
  let totalUpdates = 0;

  for (const mdFile of mdFiles) {
    let content = readFileSync(mdFile, 'utf-8');
    let fileUpdates = 0;

    for (const { oldName, newName } of renames) {
      const pattern = new RegExp(oldName.replace('.', '\\.'), 'g');
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, newName);
        fileUpdates += matches.length;
      }
    }

    if (fileUpdates > 0) {
      writeFileSync(mdFile, content);
      const relPath = mdFile.replace(ROOT + '/', '');
      console.log(`  ${relPath} (${fileUpdates} reference${fileUpdates > 1 ? 's' : ''})`);
      totalUpdates += fileUpdates;
    }
  }

  console.log(`\nDone! Renamed ${renames.length} files, updated ${totalUpdates} markdown references.`);
}

function findMarkdownFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Responsive Image Generation ─────────────────────────────────────────────

async function generateResponsive() {
  mkdirSync(RESPONSIVE_DIR, { recursive: true });

  // Load cache
  let cache = {};
  if (existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
    } catch {
      cache = {};
    }
  }

  // Find source images (exclude _responsive/ and run_*/)
  const files = readdirSync(DIAGRAMS_DIR).filter(f => {
    if (f.startsWith('.')) return false;
    const ext = extname(f).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return false;
    const stat = statSync(resolve(DIAGRAMS_DIR, f));
    return stat.isFile();
  });

  const manifest = {};
  const newCache = {};
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = resolve(DIAGRAMS_DIR, file);
    const stat = statSync(filePath);
    const cacheKey = file;
    const cacheVal = `${stat.mtimeMs}:${stat.size}`;

    const metadata = await sharp(filePath).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;
    const actualFormat = metadata.format; // 'jpeg' or 'png'
    const stem = basename(file, extname(file));

    // Determine which breakpoints to generate (skip sizes >= original width)
    const sizes = BREAKPOINTS.filter(w => w < originalWidth);

    if (sizes.length === 0) {
      console.log(`  ${file}: skipped (${originalWidth}px wide, no smaller breakpoints)`);
      skipped++;
      continue;
    }

    // Check cache
    const cached = cache[cacheKey];
    if (cached === cacheVal && allVariantsExist(stem, sizes, actualFormat)) {
      // Add to manifest from existing files
      manifest[`/content/assets/diagrams/${file}`] = buildManifestEntry(stem, sizes, actualFormat, originalWidth, originalHeight);
      newCache[cacheKey] = cacheVal;
      skipped++;
      continue;
    }

    console.log(`  ${file} (${originalWidth}x${originalHeight}, ${actualFormat})`);

    // Generate variants
    for (const width of sizes) {
      const height = Math.round((width / originalWidth) * originalHeight);

      // WebP variant
      const webpName = `${stem}-${width}w.webp`;
      await sharp(filePath)
        .resize(width, height)
        .webp({ quality: WEBP_QUALITY })
        .toFile(resolve(RESPONSIVE_DIR, webpName));

      // Original format variant
      const fallbackExt = actualFormat === 'jpeg' ? 'jpg' : 'png';
      const fallbackName = `${stem}-${width}w.${fallbackExt}`;
      const pipeline = sharp(filePath).resize(width, height);
      if (actualFormat === 'jpeg') {
        await pipeline.jpeg({ quality: JPEG_QUALITY }).toFile(resolve(RESPONSIVE_DIR, fallbackName));
      } else {
        await pipeline.png().toFile(resolve(RESPONSIVE_DIR, fallbackName));
      }
    }

    manifest[`/content/assets/diagrams/${file}`] = buildManifestEntry(stem, sizes, actualFormat, originalWidth, originalHeight);
    newCache[cacheKey] = cacheVal;
    generated++;
  }

  // Write manifest and cache
  writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
  writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 2));

  console.log(`\nDone! Generated variants for ${generated} images, skipped ${skipped}.`);
  console.log(`Manifest: ${MANIFEST_FILE}`);
}

function allVariantsExist(stem, sizes, actualFormat) {
  const fallbackExt = actualFormat === 'jpeg' ? 'jpg' : 'png';
  for (const width of sizes) {
    if (!existsSync(resolve(RESPONSIVE_DIR, `${stem}-${width}w.webp`))) return false;
    if (!existsSync(resolve(RESPONSIVE_DIR, `${stem}-${width}w.${fallbackExt}`))) return false;
  }
  return true;
}

function buildManifestEntry(stem, sizes, actualFormat, originalWidth, originalHeight) {
  const fallbackExt = actualFormat === 'jpeg' ? 'jpg' : 'png';

  const srcset = sizes
    .map(w => `/content/assets/diagrams/_responsive/${stem}-${w}w.webp ${w}w`)
    .join(', ');

  const srcsetFallback = sizes
    .map(w => `/content/assets/diagrams/_responsive/${stem}-${w}w.${fallbackExt} ${w}w`)
    .join(', ');

  // sizes attribute: content area is max ~832px (max-w-4xl minus padding)
  const sizesAttr = '(max-width: 832px) 100vw, 832px';

  return {
    srcset,
    srcsetFallback,
    sizes: sizesAttr,
    originalWidth,
    originalHeight,
  };
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--fix-extensions')) {
    await fixExtensions();
  } else {
    console.log('Generating responsive image variants...\n');
    await generateResponsive();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
