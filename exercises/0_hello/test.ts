import { $ } from "bun";
import { expect, test } from "bun:test";

import { exercises } from "..";

test(
  exercises[0].description,
  async () => {
    const output = (await $`bun run {{FILEPATH}}`).stdout
      .toString()
      .replace(/\n$/, "");

    //#region Your Code
    `{{CODE}}`;
    //#endregion Your Code
    const expected = "HELLO WORLD";
    expect(output).toBe(expected);
  },
  { timeout: 1000 },
);
