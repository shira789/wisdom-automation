#!/usr/bin/env node
/**
 * UnitTCMS sync — scans test files for @unittcms:caseId annotations and
 * reports implementation status and tags back to UnitTCMS.
 *
 * Required env vars:
 *   UNITTCMS_URL        e.g. http://localhost:8000
 *   UNITTCMS_TOKEN      Bearer token for a UnitTCMS user
 *   UNITTCMS_PROJECT_ID numeric project ID
 *
 * Run: node scripts/unittcms-sync.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { execSync } from 'child_process';

const { UNITTCMS_URL, UNITTCMS_TOKEN, UNITTCMS_PROJECT_ID } = process.env;
if (!UNITTCMS_URL || !UNITTCMS_TOKEN || !UNITTCMS_PROJECT_ID) {
  console.error('Missing env vars: UNITTCMS_URL, UNITTCMS_TOKEN, UNITTCMS_PROJECT_ID');
  process.exit(1);
}

let commitSha = '';
try { commitSha = execSync('git rev-parse HEAD').toString().trim(); } catch (_) {}

function walk(dir, exts) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory() && entry !== 'node_modules') out.push(...walk(p, exts));
    else if (exts.some((e) => entry.endsWith(e))) out.push(p);
  }
  return out;
}

function isStub(lines, annotationIdx) {
  const meaningful = lines
    .slice(annotationIdx + 1)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('//') && l !== '});' && l !== '}');
  return meaningful.length === 0;
}

const cases = [];
const testDir = join(process.cwd(), 'tests');
for (const file of walk(testDir, ['.spec.ts', '.spec.js'])) {
  const lines = readFileSync(file, 'utf-8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\/\/ @unittcms:caseId:(\d+)/);
    if (m) {
      const tagsLine = lines[i + 1]?.match(/\/\/ @unittcms:tags:([\w,\s-]+)/);
      const tags = tagsLine ? tagsLine[1].split(',').map((t) => t.trim()).filter(Boolean) : [];
      cases.push({
        caseId: parseInt(m[1], 10),
        status: isStub(lines, i) ? 'stub' : 'implemented',
        filePath: relative(process.cwd(), file),
        tags,
      });
    }
  }
}

const res = await fetch(`${UNITTCMS_URL}/api/automation-configs/sync-status`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${UNITTCMS_TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ projectId: UNITTCMS_PROJECT_ID, commitSha, cases }),
});
if (!res.ok) { console.error('Sync failed:', await res.text()); process.exit(1); }
const data = await res.json();
console.log(`UnitTCMS sync: ${data.updated} cases updated (commit ${commitSha.slice(0, 7)})`);
