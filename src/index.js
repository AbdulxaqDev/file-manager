import { createInterface } from "node:readline";

import { dirTable } from "./utils/dirTable.js";
import user from "./helpers/user.js";
import {
  up,
  cd,
  getCurDir,
  getSysRootDir,
  getWorkingDir,
} from "./helpers/dir.js";

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(user.welcomeMsg);
cli.setPrompt(`➜  ${getCurDir()} $ `);
console.log(`You are currently in ${getSysRootDir()}`);
cli.prompt(true);

cli.on("line", async (line) => {
  const command = line.split(/\s+/);

  switch (command[0]) {
    case "cd":
      await cd(command[1]);
      break;
    case "up":
      up();
      break;
    case "ls":
      await dirTable(getSysRootDir());
      break;
    case ".exit":
      cli.close();
      break;
    default:
      console.log("");
  }

  console.log(`You are currently in ${getSysRootDir()}`);
  cli.setPrompt(`➜  ${getCurDir()} $ `);
  cli.prompt(true);
});

cli.on("close", () => {
  console.log(user.byeMsg);
  process.exit(0);
});
