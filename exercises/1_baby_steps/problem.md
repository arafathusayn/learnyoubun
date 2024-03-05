Create a file named `baby-steps.js`.

Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console (stdout).

---

## HINTS

You can access command-line arguments via the global `Bun` object. The `Bun` object has an `argv` property which is an array containing the complete command-line. i.e. `Bun.argv`.

To get started, write a program that simply contains:

```js
console.log(Bun.argv);
```

Run it with `bun baby-steps.js` and some numbers as arguments. e.g:

```sh
$ bun baby-steps.js 1 2 3
```

In which case the output would be an array looking something like:

```js
["/path/to/bun", "/path/to/your/baby-steps.js", "1", "2", "3"];
```

You'll need to think about how to loop through the number arguments so you can output just their sum. The first element of the Bun.argv array is always 'bun', and the second element is always the path to your baby-steps.js file, so you need to start at the 3rd element (index 2), adding each item to the total until you reach the end of the array.

Also be aware that all elements of `Bun.argv` are strings and you may need to _coerce_ them into numbers. You can do this by prefixing the property with `+` or passing it to `Number()`. e.g. `+Bun.argv[2]` or `Number(Bun.argv[2])`.

Input Example:

```sh
$ bun baby-steps.js 1 2 3
```

Output Example:

```sh
6
```

Check to see if your program is correct by running this command:

```sh
$ learnyounode run baby-steps.js
$ learnyounode verify baby-steps.js
```

learnyounode will be supplying arguments to your program when you run `learnyounode verify baby-steps.js` so you don't need to supply them yourself. To test your program without verifying it, you can invoke it with `learnyounode run baby-steps.js`. When you use `run`, you are invoking the test environment that learnyounode sets up for each exercise.
