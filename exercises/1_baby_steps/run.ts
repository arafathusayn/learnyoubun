import { $ } from "bun";
import { spawnSync } from "node:child_process";
import { resolve as resolvePath } from "node:path";

import { args } from "./common";

export default async function run(code: string) {
  const filepath = resolvePath(process.cwd(), "solution.js");

  await Bun.write(filepath, code);

  console.log("args:");
  console.log(args.join(" "));

  console.log("output:");

  const command = `bun run ${filepath} ${args.join(" ")}; rm ${filepath}`;

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
