import boganipsum from "boganipsum";
import { $ } from "bun";
import { spawnSync } from "node:child_process";
import { resolve as resolvePath } from "node:path";

export default async function run(code: string) {
  const testFilepath = resolvePath(__dirname, process.pid + ".txt");
  const filepath = resolvePath(__dirname, "solution.js");

  const lines = Math.ceil(Math.random() * 50);
  const txt = boganipsum({ paragraphs: lines });

  await Bun.write(filepath, code);
  await Bun.write(testFilepath, txt);

  const command = `bun run ${filepath} ${testFilepath}; rm ${filepath} ${testFilepath}`;

  try {
    spawnSync(command, { shell: true, stdio: "inherit" });
  } catch (_err1) {
    try {
      const out = await $`${command}; rm ${filepath}`.text();
      console.log(out);
    } catch (err2) {
      console.error(err2);
    }
  }
}
