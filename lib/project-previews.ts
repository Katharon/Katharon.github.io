import { existsSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";

const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

export type ProjectPreview = {
  src: string;
  alt: string;
};

export function getProjectPreview(projectName: string): ProjectPreview | null {
  const imagesDirectory = join(process.cwd(), "public", "images");

  if (!existsSync(imagesDirectory)) {
    return null;
  }

  const projectSlug = slugify(projectName);
  const imageFile = readdirSync(imagesDirectory).find((file) => {
    const parsed = parse(file);

    return imageExtensions.has(parsed.ext.toLowerCase()) && slugify(parsed.name) === projectSlug;
  });

  return imageFile
    ? {
        src: `/images/${imageFile}`,
        alt: `${projectName} project preview`,
      }
    : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
