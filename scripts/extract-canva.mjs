import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const htmlPath = path.join(ROOT, "canva_level_designer.html");
const projectsPath = path.join(ROOT, "src", "content", "projects.json");

if (!fs.existsSync(htmlPath)) {
  console.error(`Missing ${htmlPath}. Download it first.`);
  process.exit(1);
}
if (!fs.existsSync(projectsPath)) {
  console.error(`Missing ${projectsPath}.`);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");
const m = html.match(/window\['bootstrap'\]\s*=\s*JSON\.parse\('([\s\S]*?)'\);/);
if (!m) {
  console.error("Could not find window['bootstrap'] JSON.parse payload.");
  process.exit(1);
}

const jsLiteralBody = m[1];
const jsLiteral = `'${jsLiteralBody.replace(/'/g, "\\'")}'`;

let decodedForJson;
try {
  decodedForJson = vm.runInNewContext(jsLiteral, {}, { timeout: 2000 });
} catch (e) {
  console.error("Failed to decode bootstrap JS literal.");
  console.error(e);
  process.exit(1);
}

let bootstrap;
try {
  bootstrap = JSON.parse(decodedForJson);
} catch (e) {
  console.error("Failed to JSON.parse decoded bootstrap string.");
  console.error(e);
  process.exit(1);
}

const texts = [];
const images = new Set();
const seen = new Set();

function pushText(s) {
  const t = String(s);
  const normalized = t.replace(/\s+/g, " ").trim();
  if (normalized.length < 30) return;
  if (!/[A-Za-z]/.test(normalized)) return;
  if (seen.has(t)) return;
  seen.add(t);
  texts.push(t);
}

function walk(v) {
  if (v == null) return;
  if (typeof v === "string") {
    pushText(v);
    const imgMatches = v.match(/_assets\/images\/[^\s"']+\.(png|jpg|jpeg|webp|svg)/gi);
    if (imgMatches) {
      for (const i of imgMatches) images.add(i);
    }
    return;
  }
  if (Array.isArray(v)) {
    for (const x of v) walk(x);
    return;
  }
  if (typeof v === "object") {
    for (const k of Object.keys(v)) walk(v[k]);
  }
}

walk(bootstrap);

const needles = [
  { id: "mechanics-in-motion-moving-platform", rx: /Mechanics\s+in\s+Motion/i },
  { id: "toon-tanks", rx: /Toon\s+Tanks/i },
  { id: "treasure-hunter", rx: /Treasure\s+Hunter/i },
  { id: "scifi-third-person-shooter", rx: /Sci\s*[- ]?Fi\s+Third\s*[- ]?Person\s+Shooter/i },
  { id: "udemy-urp-open-world", rx: /Udemy\s*\(URP\)|Open-World\s+3D\s+Environment/i },
  { id: "third-person-linear-semi-level", rx: /third\s+person\s+linear\s+semi\s+level|unreal\s+engine\s+5\.5/i },
  { id: "battle-royale-map", rx: /Battle\s+Royale\s+Map/i },
];

const extractedById = {};
for (const n of needles) {
  const best = texts
    .filter((t) => n.rx.test(t))
    .sort((a, b) => b.length - a.length)[0];
  if (best) extractedById[n.id] = best.trim();
}

if (!Object.keys(extractedById).length) {
  console.error("No project writeups matched the current extraction rules.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
const updated = projects.map((p) => {
  const writeup = extractedById[p.id];
  if (!writeup) return p;
  return {
    ...p,
    writeup,
    source: {
      label: "Original Canva page",
      url: "https://l1evel-designer.my.canva.site/level-designer",
    },
  };
});

fs.writeFileSync(projectsPath, JSON.stringify(updated, null, 2) + "\n", "utf8");

const report = {
  extractedProjectWriteups: Object.keys(extractedById).length,
  extractedImagePaths: Array.from(images).length,
};
console.log(JSON.stringify(report, null, 2));

