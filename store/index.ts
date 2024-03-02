import { atom, getDefaultStore } from "jotai";

export const store = getDefaultStore();

export const columnsAtom = atom(process.stdout.columns);
export const rowsAtom = atom(process.stdout.rows);
