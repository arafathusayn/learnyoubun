export async function correctSolution(argtext: string) {
  return `${argtext.split(" ").reduce((acc, cur) => acc + +cur, 0)}`;
}
