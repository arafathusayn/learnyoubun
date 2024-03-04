import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";

import { exercises } from "..";
import { args } from "./common";

test(
  exercises[1].description,
  async () => {
    const argtext = args.join(" ");

    const command = `bun run {{FILEPATH}} ${argtext}`;

    const result = spawnSync(command, { shell: true });

    const output = result.stdout.toString().replace(/\n$/, "");

    //#region Your Code
    `{{CODE}}`;
    //#endregion Your Code
    const expected = args.reduce((a, b) => a + b, 0).toString(); // sum
    expect(output).toBe(expected);
  },
  { timeout: 1000 },
);
