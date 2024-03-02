export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function safeExit() {
  process.stdin.removeAllListeners();
  process.stdin.setRawMode(false);
  process.exit(0);
}
