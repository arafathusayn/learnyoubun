import { $ } from "bun";
import { describe, expect, test } from "bun:test";

import { exercises } from "..";
import { savePassedExercise } from "../../utils/storage";

describe(`{{FILEPATH}}`, () => {
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

      await savePassedExercise("0_hello");
    },
    { timeout: 1000 },
  );
});
