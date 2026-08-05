import { copyFile, mkdir, readdir, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = new URL("../dist/", import.meta.url);

await mkdir(new URL("server/", dist), { recursive: true });
await mkdir(new URL(".openai/", dist), { recursive: true });
await mkdir(new URL("client/", dist), { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (["client", "server", ".openai"].includes(entry.name)) continue;
  await rename(new URL(entry.name, dist), new URL(`client/${entry.name}`, dist));
}

await writeFile(
  new URL("server/index.js", dist),
  `export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    const pathname = url.pathname;
    const candidates = pathname.endsWith("/")
      ? [pathname + "index.html"]
      : [pathname + ".html", pathname + "/index.html"];

    for (const candidate of candidates) {
      url.pathname = candidate;
      response = await env.ASSETS.fetch(new Request(url, request));
      if (response.status !== 404) return response;
    }

    return response;
  },
};
`,
);
await copyFile(`${root}.openai/hosting.json`, new URL(".openai/hosting.json", dist));
