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

import { atom, getDefaultStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { type Exercise } from "../exercises";
import { none, type Option } from "../utils/option";
import { storage } from "../utils/storage";

export const store = getDefaultStore();

export const columnsAtom = atom(process.stdout.columns);
export const rowsAtom = atom(process.stdout.rows);

export const instructionAtom = atom<Option<string>>(
  none() as unknown as Option<string>,
);

export const currentExerciseAtom = atomWithStorage<Option<Exercise>>(
  "currentExercise",
  "0_hello",
  storage,
  { getOnInit: true },
);

export const selectedExerciseAtom = atomWithStorage<Option<Exercise>>(
  "selectedExercise",
  "0_hello",
  storage,
);
