const fs = require('fs');
const acorn = require('acorn');
const path = 'src/models/StressAnalysisModel.js';
const src = fs.readFileSync(path, 'utf8');
try {
  const ast = acorn.parse(src, { sourceType: 'module', ecmaVersion: 2024 });
  console.log('PARSE_OK');
} catch (e) {
  console.error('ERROR:', e.message);
  console.error('POS:', e.pos, 'LINE:', e.loc && e.loc.line, 'COL:', e.loc && e.loc.column);
  process.exit(1);
}
