import { $ } from "bun";
import { spawnSync } from "node:child_process";
import { resolve as resolvePath } from "node:path";

export default async function verify(code: string) {
  const filepath = resolvePath(__dirname, "solution.test.js");

  await Bun.write(filepath, code);

  const command = `bun test --bail ${filepath}; rm ${filepath}`;

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
