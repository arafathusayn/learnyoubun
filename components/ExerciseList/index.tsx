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

import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { useAtom } from "jotai";

import { exercises } from "../../exercises";
import { currentExerciseAtom } from "../../store";
import { safeExit } from "../../utils/misc";
import { isNone } from "../../utils/option";

function ExerciseList() {
  const [currentExercise, setCurrentExercise] = useAtom(currentExerciseAtom);

  let i = 0;

  function handleSelect(item: Item): void {
    safeExit();
  }

  return (
    <Box alignItems="flex-start" marginTop={2} flexDirection="column">
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
              const exercise = exercises.find((e) => e.value === item.value);

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
            {exercises.find((e) => e.value === currentExercise)?.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

type Item = { value: string; label: string };

export default ExerciseList;
