import { existsSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";

const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const extensionPreference = [".webp", ".avif", ".png", ".jpg", ".jpeg"];

export type ProjectPreview = {
  src: string;
  alt: string;
};

export function getProjectPreview(
  projectName: string,
  projectLabel: string,
): ProjectPreview | null {
  const imagesDirectory = join(process.cwd(), "public", "images");

  if (!existsSync(imagesDirectory)) {
    return null;
  }

  const projectSlug = slugify(projectName);
  const imageFile = readdirSync(imagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => {
      const parsed = parse(file);

      return imageExtensions.has(parsed.ext.toLowerCase()) && slugify(parsed.name) === projectSlug;
    })
    .sort(compareImageNames)[0];

  return imageFile
    ? {
        src: `/images/${imageFile}`,
        alt: `Preview image for ${projectName}, a ${projectLabel} project.`,
      }
    : null;
}

function compareImageNames(first: string, second: string) {
  return getExtensionRank(first) - getExtensionRank(second) || first.localeCompare(second);
}

function getExtensionRank(fileName: string) {
  const extension = parse(fileName).ext.toLowerCase();
  const rank = extensionPreference.indexOf(extension);

  return rank === -1 ? extensionPreference.length : rank;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
