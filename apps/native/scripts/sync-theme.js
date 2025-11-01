// Sync brand colors from @packages/config into apps/native/global.css
// Converts hex values to RGB triplets and updates CSS variables in the :root block.

const fs = require("fs");
const path = require("path");

function hexToRgbTriplet(hex) {
  if (!hex) return null;
  const normalized = hex.trim().replace(/^#/, "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const int = parseInt(value, 16);
  if (Number.isNaN(int)) return null;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r} ${g} ${b}`;
}

function updateCssVariables(css, updates) {
  // Replace each variable in the :root block using a regex per variable
  let output = css;
  for (const [variable, triplet] of Object.entries(updates)) {
    if (!triplet) continue;
    const rx = new RegExp(`(--${variable}:)\\s*[^;]+(;?)`);
    output = output.replace(rx, (_m, p1, p2) => `${p1} ${triplet}${p2 || ";"}`);
  }
  return output;
}

function main() {
  // Load app config from workspace package
  // This script runs in Node (not bundled), so we can require TS via transpiled output path-free
  // since @packages/config exports a plain TS file that Node can import with ts-node style resolution
  // However, since exports points to index.ts, Node cannot require TS directly.
  // We will import by reading the file contents and eval minimal JSON.

  // Safer: use dynamic import via require('esbuild-register') if available. For simplicity,
  // we will parse the small object from the source file.
  // Resolve the package root first, then find index.ts
  let configPath;
  try {
    // Try resolving the subpath first
    configPath = require.resolve("@packages/config/index.ts", {
      paths: [process.cwd()],
    });
  } catch (_e) {
    // Fallback: resolve the package root and append index.ts
    try {
      const pkgRoot = require.resolve("@packages/config", {
        paths: [process.cwd()],
      });
      // Find the package directory (go up from the resolved file)
      const pkgDir = path.dirname(pkgRoot);
      configPath = path.join(pkgDir, "index.ts");
    } catch (_e2) {
      // Final fallback: find from workspace root
      // Go up from scripts to native app root, then to monorepo root, then to packages/config
      const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
      configPath = path.join(workspaceRoot, "packages", "config", "index.ts");
      if (!fs.existsSync(configPath)) {
        throw new Error(`Could not find config file at ${configPath}`);
      }
    }
  }
  const src = fs.readFileSync(configPath, "utf8");
  // Find which config is exported: export const app = appConfigs[X];
  const exportMatch = src.match(
    /export\s+const\s+app\s*=\s*appConfigs\[(\d+)\]/,
  );
  const configIndex = exportMatch ? parseInt(exportMatch[1], 10) : 1; // Default to index 1

  // Find all config objects and extract from the exported one
  // Split by config objects (each starts with { and has primaryColor)
  const configMatches = src.matchAll(
    /appConfigs\[\d+\]\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g,
  );
  const configArray = Array.from(configMatches);

  // Extract from the correct config object
  function extract(key, fromConfigIndex = configIndex) {
    // If we have config objects parsed, use the one at the specified index
    if (configArray.length > fromConfigIndex) {
      const configContent = configArray[fromConfigIndex][1];
      const rx = new RegExp(`${key}\\s*:\\s*"(#[0-9a-fA-F]{3,6})"`);
      const m = configContent.match(rx);
      return m ? m[1] : null;
    }
    // Fallback: find all matches and use the one at the specified index
    const rx = new RegExp(`${key}\\s*:\\s*"(#[0-9a-fA-F]{3,6})"`, "g");
    const matches = Array.from(src.matchAll(rx));
    return matches.length > fromConfigIndex
      ? matches[fromConfigIndex][1]
      : null;
  }
  const app = {
    primaryColor: extract("primaryColor"),
    primaryForeground: extract("primaryForeground"),
    secondaryColor: extract("secondaryColor"),
    secondaryForeground: extract("secondaryForeground"),
    bg: extract("bg"),
    card: extract("card"),
    border: extract("border"),
    muted: extract("muted"),
    success: extract("success"),
    warning: extract("warning"),
    danger: extract("danger"),
  };

  const updates = {
    background: hexToRgbTriplet(app.bg),
    foreground: null, // keep as defined in CSS
    card: hexToRgbTriplet(app.card),
    "card-foreground": null,
    popover: hexToRgbTriplet(app.card), // align popover with card
    "popover-foreground": null,
    primary: hexToRgbTriplet(app.primaryColor),
    "primary-foreground": hexToRgbTriplet(app.primaryForeground),
    secondary: hexToRgbTriplet(app.secondaryColor),
    "secondary-foreground": hexToRgbTriplet(app.secondaryForeground),
    muted: hexToRgbTriplet(app.muted),
    "muted-foreground": null,
    destructive: hexToRgbTriplet(app.danger),
    "destructive-foreground": hexToRgbTriplet("#ffffff"),
    success: hexToRgbTriplet(app.success),
    "success-foreground": hexToRgbTriplet("#ffffff"),
    warning: hexToRgbTriplet(app.warning),
    "warning-foreground": hexToRgbTriplet("#ffffff"),
    border: hexToRgbTriplet(app.border),
    input: hexToRgbTriplet(app.border),
    ring: hexToRgbTriplet(app.primaryColor),
  };

  const cssPath = path.join(__dirname, "..", "global.css");
  const css = fs.readFileSync(cssPath, "utf8");
  const updated = updateCssVariables(css, updates);
  if (updated === css) {
    console.log("No changes to global.css");
  } else {
    fs.writeFileSync(cssPath, updated);
    console.log("Updated theme tokens in global.css from @packages/config");
  }
}

main();
