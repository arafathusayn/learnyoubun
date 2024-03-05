import { $ } from "bun";
import { spawnSync } from "node:child_process";
import { resolve as resolvePath } from "node:path";

export default async function verify(code: string) {
  const filepath = resolvePath(process.cwd(), "solution.test.js");

  await Bun.write(filepath, code);

  const command = `bun test ${filepath}; rm ${filepath}`;

  try {
    spawnSync(command, { shell: true, stdio: "inherit" });
  } catch (_err1) {
    try {
      await $`${command}; rm ${filepath}`;
    } catch (err2) {
      console.error(err2);
    }
  }
}
