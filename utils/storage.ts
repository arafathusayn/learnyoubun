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

import type { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";
import { existsSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import type { Exercise } from "../exercises";
import { storageSchema, type StorageSchmeaType } from "../schema";
import { isNone, none, some } from "./option";

const storageDir = resolvePath(
  process.env.LYB_STORAGE_DIR || process.cwd(),
  ".learnyoubun",
);

const storageFilename = process.env.LYB_STORAGE_FILENAME || "data.json";

const storagePath = resolvePath(storageDir, storageFilename);

let storageFile = Bun.file(storagePath);

if (storageFile.size === 0 || !existsSync(storagePath)) {
  const data = {
    currentExercise: "0_hello",
    selectedExercise: "0_hello",
  } as const satisfies StorageSchmeaType;

  await Bun.write(storagePath, JSON.stringify(data));
}

storageFile = Bun.file(storagePath, { type: "application/json" });

let data = (await storageFile.json()) as StorageSchmeaType;

const result = storageSchema.safeParse(data);

if (!result.success) {
  data = {
    currentExercise: "0_hello",
    selectedExercise: "0_hello",
  } as const satisfies StorageSchmeaType;

  await Bun.write(storagePath, JSON.stringify(data));
}

export const storage = createAsyncStorage(data) as SyncStorage<any>;

export const doneExercises =
  (storage.getItem(
    "doneExercises" satisfies keyof StorageSchmeaType,
    [],
  ) as StorageSchmeaType["doneExercises"]) ?? [];

export function createAsyncStorage(data: Record<string, unknown>) {
  return {
    getItem: (key: string) => {
      const item = data[key];

      if (isNone(item)) {
        return none();
      }

      return some(item);
    },
    setItem: async (key: string, value: unknown) => {
      data[key] = value;
      await Bun.write(storagePath, JSON.stringify(data));
    },
    removeItem: async (key: string) => {
      data[key] = undefined;
      await Bun.write(storagePath, JSON.stringify(data));
    },
  };
}

export async function savePassedExercise(exerciseValue: Exercise) {
  const file = Bun.file(storagePath);

  if (!file.exists()) {
    return;
  }

  const prev = (await file.json()) as StorageSchmeaType;

  const data = {
    ...prev,
    doneExercises: [...(prev.doneExercises ?? []), exerciseValue],
  } satisfies StorageSchmeaType;

  await Bun.write(storagePath, JSON.stringify(data));
}
