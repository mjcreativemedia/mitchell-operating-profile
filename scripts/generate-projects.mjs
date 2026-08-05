import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const siteRoot = path.resolve(import.meta.dirname, "..");
const home = os.homedir();
const roots = [
  path.join(home, "Documents"),
  path.join(home, "Desktop"),
  path.join(home, "Downloads"),
  path.join(home, "workspace"),
  path.join(home, "groupme-pod-tool"),
  path.join(home, "Library", "Mobile Documents", "com~apple~CloudDocs"),
].filter((entry) => fs.existsSync(entry));

const ignored = new Set([
  ".git", "node_modules", ".next", ".vinext", ".wrangler", "dist", "build",
  ".build", "out", "DerivedData", "Pods", "vendor", ".venv", "venv",
  "__pycache__", ".cache", "archive", "private",
]);
const markers = new Set(["package.json", "Package.swift", "pyproject.toml", "Cargo.toml", "go.mod", "requirements.txt"]);
const candidates = new Set();

function walk(dir, depth = 0) {
  if (depth > 8) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  const names = new Set(entries.map((entry) => entry.name));
  if (names.has(".git") || entries.some((entry) => markers.has(entry.name)) || entries.some((entry) => entry.name.endsWith(".xcodeproj"))) {
    candidates.add(dir);
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || ignored.has(entry.name) || entry.name.endsWith(".app")) continue;
    walk(path.join(dir, entry.name), depth + 1);
  }
}

roots.forEach((root) => walk(root));

const curated = {
  "bike delivery elite": {
    name: "Bike Delivery Elite",
    description: "A delivery intelligence system for recording shifts, replaying routes, and turning courier work into usable operational data.",
    image: "/projects/bde.png",
    tags: ["Delivery", "SwiftUI", "GPS", "Analytics"],
    featured: 1,
  },
  dashlog: {
    name: "Bike Delivery Elite",
    description: "A local-first iPhone shift recorder with route replay, event logs, notes, and derived delivery metrics.",
    image: "/projects/bde.png",
    tags: ["Delivery", "SwiftUI", "GPS", "Analytics"],
    featured: 1,
  },
  slowrec: {
    name: "SlowRec",
    description: "Native Mac recording software built for long sessions, simple capture, and practical media workflows.",
    image: "/projects/slowrec.png",
    tags: ["Swift", "macOS", "Recording", "Media"],
    featured: 2,
  },
  "kjv atlas": {
    name: "KJV Atlas",
    description: "A static-first Scripture atlas with 80 books, 36,702 verse records, search, topics, maps, and precept connections.",
    image: "/projects/kjv-atlas.png",
    tags: ["Bible", "JavaScript", "Python", "Search"],
    featured: 3,
    demo: "https://kjvatlas.org",
  },
  "own-your-proof": {
    name: "Own Your Proof",
    description: "A marketing and evidence system that turns a business's real work into structured, reviewable website content.",
    image: "/projects/own-your-proof.png",
    tags: ["Marketing", "Automation", "Astro", "Operations"],
    featured: 4,
    demo: "https://ownyourproof.com",
  },
  "bearrilla films": {
    name: "BearRilla Films",
    description: "A cinematic streaming-style home built around a creator's real productions, characters, scenes, and music.",
    image: "/projects/bearrilla.jpg",
    tags: ["Media", "Next.js", "React", "Cloudflare"],
    featured: 5,
    demo: "https://bearrillarecords.com",
  },
  "detail quote": {
    name: "Detail Quote",
    description: "A local-first iPhone quoting app for creating, saving, tracking, and sharing customer-ready detailing estimates.",
    image: "/projects/detail-quote.png",
    tags: ["SwiftUI", "iOS", "Sales", "Local-first"],
    featured: 6,
  },
  "cornerstone life group": { demo: "https://mycornerstoneplan.com" },
  "cornerstonelifegroup": { demo: "https://mycornerstoneplan.com" },
  "ej the shooter": { demo: "https://ej-the-shooter.pages.dev" },
  "ej-the-shooter": { demo: "https://ej-the-shooter.pages.dev" },
  "forever young tree services": { demo: "https://foreveryoungtreeservices.com" },
  "forever-young-tree-services": { demo: "https://foreveryoungtreeservices.com" },
  "happy nails hyde park": { demo: "https://happy-nails-hyde-park.pages.dev" },
  "happy-nails-hyde-park": { demo: "https://happy-nails-hyde-park.pages.dev" },
  "in ty i trust": { demo: "https://intyitrust.com" },
  "in-ty-i-trust": { demo: "https://intyitrust.com" },
  stranjae: { demo: "https://stranjae.com" },
};

const depTags = {
  react: "React", next: "Next.js", astro: "Astro", vite: "Vite",
  tailwindcss: "Tailwind CSS", "drizzle-orm": "Drizzle", express: "Express",
  wrangler: "Cloudflare", typescript: "TypeScript",
};

function read(file) {
  try { return fs.readFileSync(file, "utf8"); } catch { return ""; }
}

function titleCase(value) {
  return value.replace(/^@[^/]+\//, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function githubUrl(dir) {
  try {
    const raw = execFileSync("git", ["-C", dir, "remote", "get-url", "origin"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const match = raw.match(/github\.com[/:]([^/]+\/[^/.]+)(?:\.git)?$/i);
    return match ? `https://github.com/${match[1]}` : null;
  } catch { return null; }
}

function inspect(dir) {
  const pkgPath = path.join(dir, "package.json");
  let pkg = {};
  try { pkg = JSON.parse(read(pkgPath) || "{}"); } catch {}
  const readme = read(path.join(dir, "README.md"));
  const heading = readme.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const baseName = pkg.displayName || pkg.name || heading || path.basename(dir);
  const lookup = String(baseName).toLowerCase();
  const folderLookup = path.basename(dir).replace(/[-_]+/g, " ").toLowerCase();
  const override = curated[lookup] || curated[folderLookup] || (dir.includes("BikeDeliveryElite") ? curated.dashlog : null) || (dir.includes("DetailQuote") ? curated["detail quote"] : null);
  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const tags = new Set(Object.keys(allDeps).map((dep) => depTags[dep]).filter(Boolean));
  if (fs.existsSync(path.join(dir, "Package.swift")) || readme.includes("SwiftUI")) tags.add("Swift");
  if (/Cloudflare|wrangler/i.test(readme)) tags.add("Cloudflare");
  if (/Python|\.py\b/i.test(readme)) tags.add("Python");
  const normalizedPath = dir.toLowerCase();
  const category = normalizedPath.includes("client-work") || normalizedPath.includes(`${path.sep}sites${path.sep}`) ? "Client work"
    : normalizedPath.includes(`${path.sep}tools${path.sep}`) ? "Tools"
    : normalizedPath.includes(`${path.sep}systems${path.sep}`) ? "Systems"
    : normalizedPath.includes("experiment") || normalizedPath.includes(`${path.sep}codex${path.sep}`) ? "Experiments"
    : "Projects";
  const firstParagraph = readme.split(/\n\s*\n/).map((chunk) => chunk.replace(/^#+\s+.*$/gm, "").replace(/\[[^\]]+\]\([^\)]+\)/g, "").replace(/[*_`>#]/g, "").replace(/\s+/g, " ").trim()).find((chunk) => chunk.length > 35 && !chunk.startsWith("npm "));
  const generic = /clean full-stack starter|vinext-starter/i.test(firstParagraph || "");
  const description = override?.description || pkg.description || (!generic ? firstParagraph : null) || "A local software project in Mitchell's working archive.";
  let demo = typeof pkg.homepage === "string" ? pkg.homepage : null;
  if (!demo) demo = readme.match(/https:\/\/(?!github\.com|localhost|example\.com)(?:[\w-]+\.)+[\w-]+(?:\/[\w./-]*)?/i)?.[0] || null;
  const status = normalizedPath.includes("archive") ? "archived" : normalizedPath.includes("experiment") || /prototype/i.test(`${dir} ${readme.slice(0, 3000)}`) ? "prototype" : "active";
  return {
    name: override?.name || titleCase(String(baseName)),
    description,
    category,
    status,
    tags: override?.tags || [...tags].slice(0, 5),
    github: githubUrl(dir),
    demo: override?.demo || demo,
    image: override?.image || null,
    featured: override?.featured || null,
  };
}

const detailQuote = path.join(home, "Documents", "Codex", "2026-08-03", "wha", "outputs", "DetailQuote");
if (fs.existsSync(detailQuote)) candidates.add(detailQuote);

const rawProjects = [...candidates]
  .filter((dir) => !dir.startsWith(siteRoot) && !dir.includes(`${path.sep}Codex${path.sep}`) || dir === detailQuote)
  .map(inspect);

const byName = new Map();
for (const project of rawProjects) {
  const key = project.name.toLowerCase();
  const current = byName.get(key);
  if (!current || project.featured || (!current.github && project.github)) byName.set(key, project);
}

const projects = [...byName.values()].sort((a, b) => (a.featured || 999) - (b.featured || 999) || a.name.localeCompare(b.name));
const output = {
  generatedAt: new Date().toISOString(),
  projectCount: projects.length,
  rootsScanned: roots.length,
  projects,
};

fs.writeFileSync(path.join(siteRoot, "content", "projects.json"), JSON.stringify(output, null, 2) + "\n");
console.log(`Generated content/projects.json with ${projects.length} projects.`);
