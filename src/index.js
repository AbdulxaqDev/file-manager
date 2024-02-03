import { createInterface } from "node:readline";
import user from "./helpers/user.js";
import { dirTable } from "./utils/dirTable.js";
import { join } from "node:path";

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(user.welcomeMsg);

cli.setPrompt("➜  ");
cli.prompt(true);

cli.on("line", async (line) => {
  const command = line.split(" ")[0];

  if (command === "cd") {
    
  }

  if (command === "ls") {
    await dirTable(user.rootDir);
  }

  if (command === "up") {
    await dirTable(user.rootDir);
  }

  if (command.includes(".exit")) {
    cli.close();
  } else {
    cli.prompt();
  }
});

cli.on("close", () => {
  console.log(user.byeMsg);
  process.exit(0);
});
