import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = new URL("../dist/", import.meta.url);

await mkdir(new URL("server/", dist), { recursive: true });
await mkdir(new URL(".openai/", dist), { recursive: true });
await writeFile(new URL("server/index.js", dist), "export default { fetch(request, env) { return env.ASSETS.fetch(request); } };\n");
await copyFile(`${root}.openai/hosting.json`, new URL(".openai/hosting.json", dist));
