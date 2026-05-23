#!/usr/bin/env node
/**
 * ReinstatePro — revvel-standards baseline validation
 * Checks all required files are present and package.json is complete.
 */

import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const pass = (msg) => console.log(`  ✅  ${msg}`);
const fail = (msg) => {
  console.error(`  ❌  ${msg}`);
  process.exitCode = 1;
};

console.log("\n🔍 ReinstatePro — revvel-standards validation\n");

const REQUIRED_DOCS = [
  "README.md",
  "CHANGELOG.md",
  "DEPLOYMENT_GUIDE.md",
  "GO_TO_MARKET.md",
  "BRAND_GUIDELINES.md",
  "SECURITY.md",
  "RESEARCH_ENGINE.md",
  ".env.example",
];

console.log("📄 Documentation:");
for (const doc of REQUIRED_DOCS) {
  if (existsSync(resolve(ROOT, doc))) {
    pass(doc);
  } else {
    fail(`${doc} — MISSING`);
  }
}

const REQUIRED_SRC = [
  "src/pages/Index.tsx",
  "src/pages/Login.tsx",
  "src/pages/Signup.tsx",
  "src/pages/Dashboard.tsx",
  "src/pages/Admin.tsx",
  "src/pages/Checkout.tsx",
  "src/lib/stripe.ts",
];

console.log("\n📦 Source files:");
for (const src of REQUIRED_SRC) {
  if (existsSync(resolve(ROOT, src))) {
    pass(src);
  } else {
    fail(`${src} — MISSING`);
  }
}

console.log("\n⚙️  package.json:");
const pkg = JSON.parse(await readFile(resolve(ROOT, "package.json"), "utf8"));
if (pkg.scripts?.test) pass("scripts.test defined"); else fail("scripts.test MISSING");
if (pkg.scripts?.build) pass("scripts.build defined"); else fail("scripts.build MISSING");
if (pkg.dependencies?.["@stripe/stripe-js"]) pass("@stripe/stripe-js dependency"); else fail("@stripe/stripe-js MISSING");

console.log("\n" + (process.exitCode ? "❌ Validation FAILED" : "✅ All checks passed") + "\n");
