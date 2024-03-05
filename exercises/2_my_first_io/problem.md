Create a file named `my-first-io.js`.

Write a program that uses a single filesystem operation to read a file and print the number of newlines (`\n`) it contains to the console (stdout), similar to running the posix terminal command: `cat file | wc -l`.

The full path to the file to read will be provided as the first command-line argument (i.e. `Bun.argv[2]`). You do not need to make your own test file.

---

## HINTS

Create a `BunFile` instance with the `Bun.file(path)` function. A BunFile represents a lazily-loaded file; initializing it does not actually read the file from disk.

```js
const foo = Bun.file("foo.txt"); // relative to cwd
foo.size; // number of bytes
foo.type; // MIME type
```

The reference conforms to the `Blob` interface, so the contents can be read in various formats.

```js
const foo = Bun.file("foo.txt");

await foo.text(); // contents as a string
await foo.stream(); // contents as ReadableStream
await foo.arrayBuffer(); // contents as ArrayBuffer
```

Check out the documentation: [https://bun.sh/docs/api/file-io](https://bun.sh/docs/api/file-io)

If you're looking for an easy way to count the number of newlines in a string, recall that a JavaScript `string` can be `.split()` into an array of substrings and that `\n` can be used as a delimiter. Note that the test file does not have a newline character (`\n`) at the end of the last line, so using this method you'll end up with an array that has one more element than the number of newlines.

File with no newline example:

```txt
Hi Bun!
```

Run example:

```sh
$ learnyoubun run my-first-io.js
```

Output example:

```
0
```

Check to see if your program is correct by running this command:

```sh
$ learnyoubun verify my-first-io.js
```
