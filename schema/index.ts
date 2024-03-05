import { z } from "zod";
import { exercises, type Exercise } from "../exercises";
import type { TuplifyUnion } from "../utils/types";

const exerciseValues = exercises.map(
  (exercise) => exercise.value,
) as TuplifyUnion<Exercise>;

export const storageSchema = z.object({
  currentExercise: z.enum(exerciseValues),
  selectedExercise: z.enum(exerciseValues),
  doneExercises: z.array(z.enum(exerciseValues)).optional(),
});

export type StorageSchmeaType = z.infer<typeof storageSchema>;
