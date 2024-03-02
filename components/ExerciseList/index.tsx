import { Box } from "ink";
import SelectInput from "ink-select-input";
import { useAtomValue } from "jotai";

import { columnsAtom } from "../../store";
import { safeExit } from "../../utils/misc";

const exercises = [
  {
    label: "Hello World!",
    value: "hello_world",
  },
  {
    label: "Baby Steps",
    value: "baby_steps",
  },
  {
    label: "My First I/O",
    value: "my_first_io",
  },
] as const;

function ExerciseList() {
  const columns = useAtomValue(columnsAtom);

  function handleSelect(item: Item): void {
    safeExit();
  }

  return (
    <Box paddingLeft={columns / 5} flexDirection="column">
      <SelectInput
        items={exercises as unknown as Item[]}
        onSelect={handleSelect}
      />
    </Box>
  );
}

type Item = { value: string; label: string };

export default ExerciseList;
