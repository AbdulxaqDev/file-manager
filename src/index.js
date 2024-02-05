import { createInterface } from "node:readline";

import { up, cd } from "./helpers/dir.js";
import user from "./helpers/user.js";
import cat from "./utils/cat.js";

export const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(user.welcomeMsg);
console.log(`\nYou are currently in ${"###"}`);
cli.setPrompt(`➜  $ `);
cli.prompt(true);

cli.on("resume", () => {
  cli.prompt();
});

cli.on("line", async (input) => {
  const line = input.split(/\s+/);
  const cnd = line[0];

  if (cnd == "up") {
    up();
  }

  if (cnd == "cd") {
    await cd(line[1]);
  }

  if (cnd == "cat") {
    await cat(line[1]);
    cli.pause();
    cli.resume();
  }

  cli.prompt();
});

cli.on("close", () => {
  console.log(user.byeMsg);
  process.exit(0);
});
