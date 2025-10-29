import appConfig from "../config/appConfig.json";

export type AppConfig = {
  id: string;
  name: string;
  clubName: string;
  primaryColor: string;
  primaryForeground: string;
  secondaryColor: string;
  secondaryForeground: string;
  bg: string;
  card: string;
  border: string;
  muted: string;
  success: string;
  warning: string;
  danger: string;
  logo: string;
};

export type AppConfigs = {
  apps: AppConfig[];
};

// For now, we'll use the first app configuration
// In a real app, this would be determined by subdomain, environment variable, or user selection
export const getCurrentAppConfig = (): AppConfig => {
  return appConfig.apps[0];
};

// Convert hex color to HSL for CSS variables
export const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
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

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// Apply theme colors to CSS variables
export const applyTheme = (config: AppConfig) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.style.setProperty("--color-primary", hexToHsl(config.primaryColor));
  root.style.setProperty(
    "--color-primary-foreground",
    hexToHsl(config.primaryForeground),
  );
  root.style.setProperty("--color-secondary", hexToHsl(config.secondaryColor));
  root.style.setProperty(
    "--color-secondary-foreground",
    hexToHsl(config.secondaryForeground),
  );
  root.style.setProperty("--color-bg", hexToHsl(config.bg));
  root.style.setProperty("--color-card", hexToHsl(config.card));
  root.style.setProperty("--color-border", hexToHsl(config.border));
  root.style.setProperty("--color-muted", hexToHsl(config.muted));
  root.style.setProperty("--color-success", hexToHsl(config.success));
  root.style.setProperty("--color-warning", hexToHsl(config.warning));
  root.style.setProperty("--color-danger", hexToHsl(config.danger));
};
