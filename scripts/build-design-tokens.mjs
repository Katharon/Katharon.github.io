import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(projectRoot, "public/design");
const color = (hex, description) => ({
  $type: "color",
  $value: {
    colorSpace: "srgb",
    components: hex
      .slice(1)
      .match(/../g)
      .map((value) => parseInt(value, 16) / 255),
    hex,
  },
  ...(description ? { $description: description } : {}),
});
const token = (type, value, description) => ({
  $type: type,
  $value: value,
  ...(description ? { $description: description } : {}),
});
const dimension = (value) => token("dimension", { value, unit: "rem" });
const alias = (path, description) => token("color", "{" + path + "}", description);
const translucent = (hex, alpha) => {
  const base = color(hex);
  return { ...base, $value: { ...base.$value, alpha } };
};
const tokens = {
  $description:
    "Blackline portfolio design system. Single source for the Next.js website and HTML styleguide.",
  palette: {
    color: {
      ink: color("#070b0e"),
      surface: color("#11181e"),
      raised: color("#182127"),
      heading: color("#f2f5f7"),
      text: color("#c1c9d0"),
      muted: color("#aab5be"),
      subtle: color("#90a0ac"),
      amber: color("#ffac60"),
      amberLight: color("#ffc58e"),
      border: color("#2c3842"),
      borderStrong: color("#61727f"),
      ice: color("#e7ebee"),
      contactInk: color("#11181e"),
      contactMuted: color("#46545f"),
      contactBorder: color("#9ba7b0"),
      copper: color("#8c420c"),
      paper: color("#f7f5f1"),
      white: color("#ffffff"),
      lightText: color("#364650"),
      lightMuted: color("#4c5e69"),
      lightSubtle: color("#526672"),
      lightBorder: color("#c9d2d8"),
      lightBorderStrong: color("#70838f"),
      lightRaised: color("#eeebe5"),
      lightAccent: color("#914608"),
      lightAccentHover: color("#6d3000"),
      shadow: {
        ...color("#000000"),
        $value: { colorSpace: "srgb", components: [0, 0, 0], alpha: 0.18, hex: "#000000" },
      },
    },
  },
  color: {
    bg: alias("palette.color.ink", "Page background"),
    surface: alias("palette.color.surface", "Quiet section/panel surface"),
    surfaceRaised: alias("palette.color.raised", "Raised panel and hover surface"),
    text: alias("palette.color.text", "Readable body text"),
    heading: alias("palette.color.heading", "Headings and primary labels"),
    muted: alias("palette.color.muted", "Secondary prose"),
    subtle: alias("palette.color.subtle", "Metadata and captions"),
    accent: alias("palette.color.amber", "Action links, active states and restrained accents"),
    accentHover: alias("palette.color.amberLight", "Hovered action text"),
    border: alias("palette.color.border", "Decorative separators; not a control outline"),
    borderStrong: alias("palette.color.borderStrong", "Control boundaries"),
    contactBg: alias("palette.color.ice"),
    contactText: alias("palette.color.contactInk"),
    contactMuted: alias("palette.color.contactMuted"),
    contactBorder: alias("palette.color.contactBorder"),
    contactAccent: alias("palette.color.copper"),
    focus: alias("palette.color.amberLight", "Visible keyboard focus"),
    actionText: alias("palette.color.ink", "Dark text on a filled amber button"),
    heroBase: alias("palette.color.ink", "Theme-specific image-backed hero foundation"),
    heroHeading: alias("palette.color.heading"),
    heroText: alias("palette.color.text"),
    heroAccent: alias("palette.color.amber"),
    heroFocus: alias("palette.color.amberLight"),
    heroBorder: alias("palette.color.border"),
    heroControlBorder: alias("palette.color.borderStrong"),
    heroRaised: alias("palette.color.raised"),
    heroOverlayStrong: {
      ...color("#070b0e"),
      $value: {
        colorSpace: "srgb",
        components: [7 / 255, 11 / 255, 14 / 255],
        alpha: 0.95,
        hex: "#070b0e",
      },
    },
    heroOverlayMedium: {
      ...color("#070b0e"),
      $value: {
        colorSpace: "srgb",
        components: [7 / 255, 11 / 255, 14 / 255],
        alpha: 0.62,
        hex: "#070b0e",
      },
    },
    heroOverlaySoft: {
      ...color("#070b0e"),
      $value: {
        colorSpace: "srgb",
        components: [7 / 255, 11 / 255, 14 / 255],
        alpha: 0.08,
        hex: "#070b0e",
      },
    },
    heroOverlayMobile: {
      ...color("#070b0e"),
      $value: {
        colorSpace: "srgb",
        components: [7 / 255, 11 / 255, 14 / 255],
        alpha: 0.72,
        hex: "#070b0e",
      },
    },
  },
  font: {
    family: {
      sans: token("fontFamily", ["Geist", "Arial", "sans-serif"]),
      mono: token("fontFamily", ["Geist Mono", "Consolas", "monospace"]),
    },
    size: {
      caption: dimension(0.75),
      small: dimension(0.875),
      body: dimension(1),
      lead: dimension(1.125),
      h3: dimension(1.5),
      h2: dimension(2.625),
      h1: dimension(5.5),
      h1Min: dimension(3),
      h2Min: dimension(1.75),
    },
    weight: {
      regular: token("fontWeight", 400),
      medium: token("fontWeight", 500),
      semibold: token("fontWeight", 600),
      bold: token("fontWeight", 700),
    },
  },
  line: {
    height: {
      body: token("number", 1.7),
      heading: token("number", 1.12),
      label: token("number", 1.4),
    },
  },
  space: Object.fromEntries(
    [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((step) => [step, dimension(step / 4)]),
  ),
  radius: { small: dimension(0.25), medium: dimension(0.5), large: dimension(0.75) },
  size: {
    touch: dimension(2.75),
    icon: dimension(1.125),
    contentMax: dimension(76),
    prose: dimension(42),
    header: dimension(4.75),
    border: token("dimension", { value: 1, unit: "px" }),
    focus: token("dimension", { value: 2, unit: "px" }),
  },
  motion: {
    fast: token("duration", { value: 150, unit: "ms" }),
    normal: token("duration", { value: 240, unit: "ms" }),
  },
  breakpoint: { compact: dimension(40), wide: dimension(64) },
  shadow: {
    card: token("shadow", {
      color: "{palette.color.shadow}",
      offsetX: { value: 0, unit: "rem" },
      offsetY: { value: 1, unit: "rem" },
      blur: { value: 2.5, unit: "rem" },
      spread: { value: -0.75, unit: "rem" },
    }),
  },
  themes: {
    light: {
      color: {
        bg: alias("palette.color.paper"),
        surface: alias("palette.color.white"),
        surfaceRaised: alias("palette.color.lightRaised"),
        text: alias("palette.color.lightText"),
        heading: alias("palette.color.ink"),
        muted: alias("palette.color.lightMuted"),
        subtle: alias("palette.color.lightSubtle"),
        accent: alias("palette.color.lightAccent"),
        accentHover: alias("palette.color.lightAccentHover"),
        focus: alias("palette.color.lightAccent"),
        border: alias("palette.color.lightBorder"),
        borderStrong: alias("palette.color.lightBorderStrong"),
        actionText: alias("palette.color.white"),
        heroBase: alias("palette.color.paper"),
        heroHeading: alias("palette.color.ink"),
        heroText: alias("palette.color.lightText"),
        heroAccent: alias("palette.color.lightAccent"),
        heroFocus: alias("palette.color.lightAccent"),
        heroBorder: alias("palette.color.lightBorder"),
        heroControlBorder: alias("palette.color.lightBorderStrong"),
        heroRaised: alias("palette.color.lightRaised"),
        heroOverlayStrong: translucent("#f7f5f1", 0.98),
        heroOverlayMedium: translucent("#f7f5f1", 0.94),
        heroOverlaySoft: translucent("#f7f5f1", 0.04),
        heroOverlayMobile: translucent("#f7f5f1", 0.94),
      },
    },
  },
};
const variableName = (path) =>
  "--" + path.join("-").replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
const find = (path) => path.split(".").reduce((value, key) => value?.[key], tokens);
function cssValue(type, value) {
  if (typeof value === "string" && /^\{[^{}]+\}$/.test(value))
    return "var(" + variableName(value.slice(1, -1).split(".")) + ")";
  if (type === "color")
    return value.alpha !== undefined
      ? "rgb(" +
          value.components.map((v) => Math.round(v * 255)).join(" ") +
          " / " +
          value.alpha +
          ")"
      : value.hex;
  if (type === "dimension" || type === "duration") return value.value + value.unit;
  if (type === "fontFamily")
    return value
      .map((family) => (family.includes(" ") ? JSON.stringify(family) : family))
      .join(", ");
  if (type === "shadow")
    return [
      cssValue("dimension", value.offsetX),
      cssValue("dimension", value.offsetY),
      cssValue("dimension", value.blur),
      cssValue("dimension", value.spread),
      cssValue("color", value.color),
    ].join(" ");
  return String(value);
}
function flatten(node, path = []) {
  return Object.entries(node).flatMap(([key, value]) => {
    if (key.startsWith("$") || key === "themes") return [];
    const next = [...path, key];
    if (value && typeof value === "object" && "$value" in value) {
      if (
        typeof value.$value === "string" &&
        value.$value.startsWith("{") &&
        !find(value.$value.slice(1, -1))
      )
        throw new Error("Unknown token alias: " + value.$value);
      return ["  " + variableName(next) + ": " + cssValue(value.$type, value.$value) + ";"];
    }
    return flatten(value, next);
  });
}
const themeBlock = (name, overrides = {}) => [
  '[data-theme="' + name + '"] {',
  "  color-scheme: " + (name === "light" ? "light" : "dark") + ";",
  ...flatten({ color: { ...tokens.color, ...overrides } }),
  "}",
];
const css = [
  "/* Generated by npm run design:tokens. Edit scripts/build-design-tokens.mjs, then regenerate. */",
  ":root {",
  "  color-scheme: dark;",
  ...flatten(tokens),
  "}",
  ...themeBlock("dark"),
  ...themeBlock("light", tokens.themes.light.color),
  "",
].join("\n");
mkdirSync(output, { recursive: true });
writeFileSync(resolve(output, "tokens.json"), JSON.stringify(tokens, null, 2) + "\n");
writeFileSync(resolve(output, "tokens.css"), css);
writeFileSync(
  resolve(output, "tokens.js"),
  "window.DESIGN_TOKENS = " + JSON.stringify(tokens, null, 2) + ";\n",
);
console.log("Generated shared CSS, JSON and browser design tokens.");
