import { expect, test } from "bun:test";

import { exercises } from "..";

test(exercises[0].description, async () => {
  `{{CODE}}`;
  const received = `{{0}}`;
  const expected = "HI MOM";
  expect(received).toBe(expected);
});
