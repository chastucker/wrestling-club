// Sync brand colors from @packages/config into apps/web/src/app/globals.css
// Converts hex values to HSL triplets and updates CSS variables in the :root block.

const fs = require("fs");
const path = require("path");

function hexToRgb(hex) {
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
  return { r, g, b };
}

function rgbToHsl({ r, g, b }) {
  // Convert RGB [0,255] to HSL values used in CSS variables: H (0-360) S% L%
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max - min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  const H = Math.round(h * 360);
  const S = Math.round(s * 100);
  const L = Math.round(l * 100);
  return `${H} ${S}% ${L}%`;
}

function hexToHslTriplet(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb) : null;
}

function updateCssVariables(css, updates) {
  let output = css;
  for (const [variable, value] of Object.entries(updates)) {
    if (!value) continue;
    const rx = new RegExp(`(--${variable}:)\\s*[^;]+(;?)`);
    output = output.replace(rx, (_m, p1, p2) => `${p1} ${value}${p2 || ";"}`);
  }
  return output;
}

function main() {
  const configPath = require.resolve("@packages/config/index.ts", {
    paths: [process.cwd()],
  });
  const src = fs.readFileSync(configPath, "utf8");
  const pick = (key) => {
    const rx = new RegExp(`${key}\\s*:\\s*"(#[0-9a-fA-F]{3,6})"`);
    const m = src.match(rx);
    return m ? m[1] : null;
  };

  const app = {
    primaryColor: pick("primaryColor"),
    primaryForeground: pick("primaryForeground"),
    secondaryColor: pick("secondaryColor"),
    secondaryForeground: pick("secondaryForeground"),
    bg: pick("bg"),
    card: pick("card"),
    border: pick("border"),
    muted: pick("muted"),
    success: pick("success"),
    warning: pick("warning"),
    danger: pick("danger"),
  };

  const updates = {
    // Base tokens used by Tailwind theme (expects hsl(var(--token)))
    background: hexToHslTriplet(app.bg),
    card: hexToHslTriplet(app.card),
    popover: hexToHslTriplet(app.card),
    primary: hexToHslTriplet(app.primaryColor),
    "primary-foreground": hexToHslTriplet(app.primaryForeground || "#ffffff"),
    secondary: hexToHslTriplet(app.secondaryColor),
    "secondary-foreground": hexToHslTriplet(
      app.secondaryForeground || "#0f172a",
    ),
    destructive: hexToHslTriplet(app.danger),
    "destructive-foreground": hexToHslTriplet("#ffffff"),
    border: hexToHslTriplet(app.border),
    input: hexToHslTriplet(app.border),
    ring: hexToHslTriplet(app.primaryColor),
    muted: hexToHslTriplet(app.muted),
    // Custom color tokens block
    "color-primary": hexToHslTriplet(app.primaryColor),
    "color-primary-foreground": hexToHslTriplet(
      app.primaryForeground || "#ffffff",
    ),
    "color-secondary": hexToHslTriplet(app.secondaryColor),
    "color-secondary-foreground": hexToHslTriplet(
      app.secondaryForeground || "#0f172a",
    ),
    "color-bg": hexToHslTriplet(app.bg),
    "color-card": hexToHslTriplet(app.card),
    "color-border": hexToHslTriplet(app.border),
    "color-muted": hexToHslTriplet(app.muted),
    "color-success": hexToHslTriplet(app.success),
    "color-warning": hexToHslTriplet(app.warning),
    "color-danger": hexToHslTriplet(app.danger),
  };

  const cssPath = path.join(__dirname, "..", "src", "app", "globals.css");
  const css = fs.readFileSync(cssPath, "utf8");
  const updated = updateCssVariables(css, updates);
  if (updated === css) {
    console.log("No changes to globals.css");
  } else {
    fs.writeFileSync(cssPath, updated);
    console.log("Updated web theme tokens from @packages/config");
  }
}

main();
