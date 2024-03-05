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

import cliMd from "cli-markdown";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { useAtom } from "jotai";
import { resolve as resolvePath } from "node:path";

import { exercises } from "../../exercises";
import {
  currentExerciseAtom,
  instructionAtom,
  selectedExerciseAtom,
} from "../../store";
import { safeExit } from "../../utils/misc";
import { isNone, match } from "../../utils/option";

function ExerciseList() {
  const [currentExercise, setCurrentExercise] = useAtom(currentExerciseAtom);
  const [selectedExercise, setSelectedExercise] = useAtom(selectedExerciseAtom);
  const [instuction, setInstruction] = useAtom(instructionAtom);

  let i = 0;

  async function handleSelect(item: Item) {
    const exercise = exercises.find((e) => e.value === item.value);

    if (isNone(exercise)) {
      return;
    }

    setSelectedExercise(() => exercise.value);

    const found = exercises.find((e) => e.value === currentExercise)?.value;

    if (!found) {
      console.error(`Exercise not found: ${currentExercise}`);
      return;
    }

    const path = resolvePath(
      import.meta.dirname,
      "..",
      "..",
      "exercises",
      found,
      "problem.md",
    );

    const file = Bun.file(path);

    const content = await file.text();

    setInstruction(() => cliMd(content));

    const tid = setTimeout(() => {
      clearTimeout(tid);
      safeExit();
    }, 300);
  }

  return (
    <Box alignItems="flex-start" marginTop={2} flexDirection="column">
      {match(instuction, {
        onSome: (ins) => <Text>{ins}</Text>,
        onNone: () => (
          <Box
            justifyContent="space-between"
            flexDirection="row"
            alignItems="flex-start"
            marginX={1}
            width="99%"
            gap={2}
          >
            <Box flexDirection="column" gap={2} width="33%">
              <SelectInput
                itemComponent={({ isSelected, label }) => (
                  <Text
                    color={isSelected ? "greenBright" : undefined}
                    bold={isSelected}
                  >
                    {i++}. {label}
                  </Text>
                )}
                initialIndex={exercises.findIndex(
                  (e) => e.value === currentExercise,
                )}
                items={exercises as unknown as Item[]}
                onSelect={handleSelect}
                onHighlight={(item) => {
                  const exercise = exercises.find(
                    (e) => e.value === item.value,
                  );

                  if (isNone(exercise)) {
                    return;
                  }

                  setCurrentExercise(exercise.value);
                }}
              />

              <Text bold>Press Enter to start the exercise</Text>
            </Box>

            <Box width="66%">
              <Text dimColor>
                {
                  exercises.find((e) => e.value === currentExercise)
                    ?.description
                }
              </Text>
            </Box>
          </Box>
        ),
      })}
    </Box>
  );
}

type Item = { value: string; label: string };

export default ExerciseList;
