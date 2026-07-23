const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(process.cwd(), 'src');
const EXTS = ['', '.js', '.jsx', '.ts', '.tsx'];

function walk(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filelist);
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) filelist.push(full);
  }
  return filelist;
}

function resolveCaseSensitive(basePath) {
  for (const ext of EXTS) {
    const candidate = basePath + ext;
    const dir = path.dirname(candidate);
    const base = path.basename(candidate);
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir);
    if (entries.includes(base)) return { status: 'ok' };
    const ci = entries.find(e => e.toLowerCase() === base.toLowerCase());
    if (ci) return { status: 'case-mismatch', expected: base, actual: ci, dir };
  }
  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    const entries = fs.readdirSync(basePath);
    const idx = entries.find(e => /^index\.(js|jsx|ts|tsx)$/.test(e));
    if (idx) return { status: 'ok' };
  }
  return { status: 'missing' };
}

const files = walk(SRC_DIR);
const importRegex = /from\s+['"](\.[^'"]+)['"]/g;
let issues = 0;

console.log('🔍 Scanning imports in src/...\n');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = importRegex.exec(content))) {
    const importPath = match[1];
    const basePath = path.join(path.dirname(file), importPath);
    const result = resolveCaseSensitive(basePath);
    const rel = path.relative(process.cwd(), file);
    if (result.status === 'case-mismatch') {
      issues++;
      console.log(`⚠️  CASE MISMATCH  ${rel}`);
      console.log(`    imports "${importPath}" but actual file is "${result.actual}" in ${path.relative(process.cwd(), result.dir)}/`);
    } else if (result.status === 'missing') {
      issues++;
      console.log(`❌  MISSING  ${rel}`);
      console.log(`    imports "${importPath}" — no matching file found`);
    }
  }
}

if (issues === 0) {
  console.log('\n✅ No issues found! All imports are correct.');
} else {
  console.log(`\n📊 Total: ${issues} issue(s) found.`);
}
