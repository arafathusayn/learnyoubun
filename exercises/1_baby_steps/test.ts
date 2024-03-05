import { describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";

import { exercises } from "..";
import { savePassedExercise } from "../../utils/storage";
import { args } from "./common";

describe(`{{FILEPATH}}`, () => {
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

      savePassedExercise("1_baby_steps");
    },
    { timeout: 1000 },
  );
});
