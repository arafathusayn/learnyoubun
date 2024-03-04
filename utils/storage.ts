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

import { resolve as resolvePath } from "node:path";
import type { Exercise } from "../exercises";
import { isNone, none, some, type Option } from "./option";

const storageDir = resolvePath(
  process.env.LYB_STORAGE_DIR || process.cwd(),
  ".learnyoubun",
);

const storageFilename = process.env.LYB_STORAGE_FILENAME || "data.json";

const storagePath = resolvePath(storageDir, storageFilename);

let storageFile = Bun.file(storagePath);

if (storageFile.size === 0) {
  Bun.write(storagePath, "{}");
}

storageFile = Bun.file(storagePath, { type: "application/json" });

// remove type-faith later in the future
const data = (await storageFile.json()) as Storage<Exercise>;

export const storage = createAsyncStorage(data);

export type Storage<T> = {
  currentExercise: T;
} & {
  [key: string]: T;
};

export function createAsyncStorage<T>(data: Storage<T>) {
  return {
    getItem: (key: string): Option<T> => {
      const item = data[key];

      if (isNone(item)) {
        return none() as Option<T>;
      }

      return some(item) as Option<T>;
    },
    setItem: async (key: string, value: T) => {
      data[key] = value;
      await Bun.write(storagePath, JSON.stringify(data));
    },
    removeItem: async (key: string) => {
      data[key] = undefined as T;
      await Bun.write(storagePath, JSON.stringify(data));
    },
  };
}
