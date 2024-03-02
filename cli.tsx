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

import Divider from "./components/Divider";
import ExerciseList from "./components/ExerciseList";
import { columnsAtom, rowsAtom, store } from "./store";
import { safeExit } from "./utils/misc";
import parseKeypress from "./utils/parse-keypress";

async function main() {
  process.stdin.setRawMode(true);

  process.stdin.addListener("data", handleKeypress);

  process.stdout.addListener("resize", handleResize);

  console.clear();

  const { waitUntilExit } = render(<App />, {
    exitOnCtrlC: true,
  });

  await waitUntilExit().catch((err) => {
    console.error(err);
    process.stdin.setRawMode(false);
    process.exit(1);
  });
}

main();

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
