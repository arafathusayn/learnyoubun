// generate a random positive integer <= 100
export function rndint() {
  return Math.ceil(Math.random() * 100);
}

// create a random batch of cmdline args
const arr = [rndint(), rndint()];

while (Math.random() > 0.3) {
  arr.push(rndint());
}

export const args = arr;
