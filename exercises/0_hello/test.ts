import { $ } from "bun";
import { expect, test } from "bun:test";

import { exercises } from "..";

test(
  exercises[0].description,
  async () => {
    const output = (await $`bun run {{FILEPATH}}`).stdout
      .toString()
      .replace(/\n$/, "");

    const receivedFromYou = output;
    const expected = "HI MOM";

    expect(receivedFromYou).toBe(expected);
  },
  { timeout: 1000 },
);
