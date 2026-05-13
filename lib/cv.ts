import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export function getCvHref() {
  const cvDirectory = join(process.cwd(), "public", "cv");

  if (!existsSync(cvDirectory)) {
    return null;
  }

  const cvFile = readdirSync(cvDirectory).find(
    (file) => !file.startsWith(".") && file.toLowerCase().endsWith(".pdf"),
  );

  return cvFile ? `/cv/${cvFile}` : null;
}
