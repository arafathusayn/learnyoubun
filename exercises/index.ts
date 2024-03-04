export const exercises = [
  {
    label: "Hello World!",
    description: `Write a program that prints the text "HI MOM" to the console.`,
    value: "0_hello",
  },
  {
    label: "Baby Steps",
    description: `Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console.`,
    value: "1_baby_steps",
  },
  {
    label: "My First I/O",
    description: `Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\\n) it contains to the console.`,
    value: "2_my_first_io",
  },
  {
    label: "Coming Soon...",
    description: `Check back later for more exercises!`,
    value: "coming_soon",
  },
] as const;

export type Exercise = (typeof exercises)[number]["value"];
