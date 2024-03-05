import { $ } from "bun";

export async function correctSolution(filepath: string) {
  const solution = `${
    (await Bun.file(filepath).text()).split("\n").length - 1
  }`;

  await $`rm ${filepath}`;

  return solution;
}
