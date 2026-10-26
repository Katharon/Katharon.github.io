import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const file = resolve(root, "." + pathname);
  const local = relative(root, file);
  if (
    local === ".." ||
    local.startsWith(".." + sep) ||
    isAbsolute(local) ||
    pathname.includes("\0")
  ) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const fileStat = await stat(file);
    const finalPath = fileStat.isDirectory() ? resolve(file, "index.html") : file;
    const data = await readFile(finalPath);
    const isPng =
      data.length >= 8 &&
      data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    response.writeHead(200, {
      "Content-Type":
        mimeTypes[extname(finalPath)] ?? (isPng ? "image/png" : "application/octet-stream"),
      "Cache-Control": "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => console.log("Local: http://127.0.0.1:" + port));
