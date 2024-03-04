import { $ } from "bun";
import { spawnSync } from "node:child_process";
import { platform } from "node:os";
import { resolve as resolvePath } from "node:path";

const os = platform();

export default async function verify(code: string) {
  const filepath = resolvePath(__dirname, "solution.test.ts");

  await Bun.write(filepath, code);

  let command = `bun test ${filepath}`;

  if (os === "darwin") {
    const termProgram = (await $`echo $TERM_PROGRAM`.text()).trim();

    if (termProgram.includes("Terminal")) {
      command = `osascript -e 'tell application "Terminal"
                  activate
                  do script "${command}" in window 1 
                end tell'; sleep 3; rm ${filepath};`;
    } else if (termProgram.includes("iTerm")) {
      command = `osascript -e 'tell application "iTerm"
                    activate
                    set newWindow to (create window with default profile)
                    tell current session of newWindow
                        write text "${command}" 
                    end tell
                end tell'; sleep 3; rm ${filepath};`;
    }
  }

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
