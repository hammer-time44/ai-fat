// Sanity checks before you push: npm test
const fs = require("fs");
const path = require("path");
const pub = path.join(__dirname, "..", "public");
let failed = 0;
const fail = (m) => { console.error("FAIL " + m); failed++; };

for (const f of ["modules.json", "papers.json", "topics.json"]) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(pub, "data", f), "utf8"));
    if (!Array.isArray(d) || !d.length) fail(f + " must be a non-empty array");
    const ids = d.map((x) => x.id);
    if (new Set(ids).size !== ids.length) fail(f + " has duplicate ids");
  } catch (e) { fail(f + ": " + e.message); }
}
// every topic reference (e.g. "B1-Q1(a)") must point at a real paper, question and part
try {
  const rd = (f) => JSON.parse(fs.readFileSync(path.join(pub, "data", f), "utf8"));
  const papers = rd("papers.json"), topics = rd("topics.json");
  topics.forEach((m) => m.topics.forEach((t) => t.refs.forEach((r) => {
    const x = r.match(/^([A-Za-z]\d)-Q(\d+)(?:\(([a-z])\))?(?:\(([ivx]+)\))?$/i);
    const q = x && (papers.find((p) => p.id.toLowerCase() === x[1].toLowerCase()) || { questions: [] }).questions.find((k) => k.number === Number(x[2]));
    if (!q) return fail("topics.json " + m.id + " / " + t.topic + ": bad ref " + r);
    if (x[3] && !q.parts.some((p) => String(p.label).toLowerCase() === x[3].toLowerCase())) fail("topics.json " + r + ": no part " + x[3]);
  })));
  // every "link" on a home-page topic card must name a topic that exists in topics.json
  rd("modules.json").forEach((m) => m.priority1.concat(m.priority2).forEach((r) => {
    const t = topics.find((x) => x.id === m.id);
    if (r.link && !(t && t.topics.some((k) => k.topic === r.link))) fail("modules.json " + m.id + " / " + r.topic + ": link '" + r.link + "' not in topics.json");
  }));
} catch (e) { fail("topic refs: " + e.message); }
const html = fs.readFileSync(path.join(pub, "index.html"), "utf8");
for (const m of html.matchAll(/(?:href|src)="((?!https?:|#|data:)[^"]+)"/g)) {
  if (!fs.existsSync(path.join(pub, m[1].split("?")[0]))) fail("index.html references missing file: " + m[1]);
}
const sw = fs.readFileSync(path.join(pub, "sw.js"), "utf8");
for (const m of sw.matchAll(/"((?:[\w-]+\/)*[\w.-]+\.\w+)"/g)) {
  if (!fs.existsSync(path.join(pub, m[1]))) fail("sw.js precaches missing file: " + m[1]);
}
console.log(failed ? failed + " check(s) failed" : "All checks passed");
process.exit(failed ? 1 : 0);
