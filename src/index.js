import { createInterface } from "node:readline";

import cat from "./utils/cat.js";
import user from "./helpers/user.js";
import { dirTable } from "./utils/dirTable.js";
import { up, cd, systemRootDir } from "./helpers/dir.js";
import { create, move, readWrite, remove, rename } from "./utils/fs_crud.js";
import { getOSInfo } from "./utils/os_indo.js";
import { compress } from "./utils/zip/compress.js";
import { decompress } from "./utils/zip/decompress.js";
import { calculateHash } from "./utils/hash.js";

export const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(user.welcomeMsg);
console.log(`\nYou are currently in ${systemRootDir}`);
cli.setPrompt(`➜  $ `);
cli.prompt(true);

cli.on("resume", () => {
  cli.prompt();
});

cli.on("line", async (input) => {
  const line = input.split(/\s+/);
  const cnd = line[0];
  //TODO: convert ot switch case and add defaul "Invalin input"

  switch (cnd) {
    case "ls":
      await dirTable(systemRootDir);
      break;
    case "up":
      up();
      break;
    case "cd":
      await cd(line[1]);
      break;
    case "add":
      await create(line[1]);
      break;
    case "rn":
      await rename(line[1], line[2]);
      break;
    case "cp":
      await readWrite(line[1], line[2]);
      break;
    case "rm":
      await remove(line[1]);
      break;
    case "mv":
      await move(line[1], line[2]);
      break;
    case "cat":
      await cat(line[1]);
      break;
    case "os":
      getOSInfo(line[1]);
      break;
    case "compress":
      await compress(line[1], line[2]);
      break;

    case "decompress":
      await decompress(line[1], line[2]);
      break;
    case "hash":
      await calculateHash(line[1]);
      break;
    case ".exit":
      cli.close();
      break;
    default:
      console.error("Invalid input");
      break;
  }

  console.log(`\nYou are currently in ${systemRootDir}`);
  cli.prompt();
});

cli.on("close", () => {
  console.log(user.byeMsg);
  process.exit(0);
});
