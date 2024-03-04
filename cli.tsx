#!/usr/bin/env bun

/*

Copyright (C) 2024  Arafat Husayn <hello@arafat.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import { render } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import { resolve as resolvePath } from "path";

import Divider from "./components/Divider";
import ExerciseList from "./components/ExerciseList";
import { columnsAtom, rowsAtom, selectedExerciseAtom, store } from "./store";
import { safeExit } from "./utils/misc";
import parseKeypress from "./utils/parse-keypress";

async function main(argc: number, argv: string[]) {
  if (argc > 2) {
    const command = argv[2];

    if (command === "version" || command === "-v" || command === "--version") {
      console.log(`\nversion: ${require("./package.json").version}\n`);
      process.exit(0);
    }

    if (command === "verify" || command === "check" || command === "test") {
      const last = argv[argv.length - 1];

      if (!last || argc < 4) {
        console.error(`\nNo file provided to verify.\n`);
        process.exit(1);
      }

      const code = await Bun.file(last).text();

      const selectedExercise = store.get(selectedExerciseAtom);

      const testFilePath = resolvePath(
        __dirname,
        "exercises",
        selectedExercise,
        "test.ts",
      );

      const testCodeTemplate = await Bun.file(testFilePath).text();

      const testCode = testCodeTemplate.replace(
        "{{FILEPATH}}",
        resolvePath(__dirname, last),
      );

      const verify = require(resolvePath(
        __dirname,
        "exercises",
        selectedExercise,
        "verify.ts",
      ));

      await verify.default(testCode);

      process.exit(0);
    }

    console.error(`\nUnknown command: ${command}\n`);

    process.exit(0);
  }

  console.clear();

  process.stdin.setRawMode(true);

  process.stdin.addListener("data", handleKeypress);

  process.stdout.addListener("resize", handleResize);

  const { waitUntilExit } = render(<App />, {
    exitOnCtrlC: true,
  });

  await waitUntilExit().catch((err) => {
    console.error(err);
    process.stdin.setRawMode(false);
    process.exit(1);
  });
}

main(process.argv.length, process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});

function App() {
  return (
    <>
      <Gradient name="pastel">
        <BigText text="Learn You Bun" align="center" font="tiny" />
      </Gradient>

      <Divider />

      <ExerciseList />
    </>
  );
}

function handleKeypress(data: Buffer) {
  const key = parseKeypress(data);

  if (key.ctrl && (key.name === "c" || key.name === "d")) {
    safeExit();
  }
}

function handleResize() {
  store.set(columnsAtom, process.stdout.columns);
  store.set(rowsAtom, process.stdout.rows);
}
