import boganipsum from "boganipsum";
import { describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { resolve as resolvePath } from "node:path";

import { exercises } from "..";
import { savePassedExercise } from "../../utils/storage";
import { correctSolution } from "./sol";

describe(`{{FILEPATH}}`, () => {
  test(
    exercises[2].description,
    async () => {
      const testFilepath = resolvePath(__dirname, process.pid + ".txt");

      const lines = Math.ceil(Math.random() * 50);
      const txt = boganipsum({ paragraphs: lines });

      await Bun.write(testFilepath, txt);

      const command = `bun run {{FILEPATH}} ${testFilepath}`;

      const result = spawnSync(command, { shell: true });

      const output = result.stdout.toString().replace(/\n$/, "");

      //#region Your Code
      `{{CODE}}`;
      //#endregion Your Code
      const expected = await correctSolution(testFilepath);
      expect(output).toBe(expected);

      savePassedExercise("2_my_first_io");
    },
    { timeout: 1000 },
  );
});
