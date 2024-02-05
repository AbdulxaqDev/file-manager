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
  if (cnd == "ls") {
    await dirTable(systemRootDir);
  }

  if (cnd == "up") {
    up();
  }

  if (cnd == "cd") {
    await cd(line[1]);
  }

  if (cnd == "add") {
    await create(line[1]);
  }

  if (cnd == "rn") {
    await rename(line[1], line[2]);
  }

  if (cnd == "cp") {
    await readWrite(line[1], line[2]);
  }

  if (cnd == "rm") {
    await remove(line[1]);
  }

  if (cnd == "mv") {
    await move(line[1], line[2]);
  }

  if (cnd == "cat") {
    await cat(line[1]);
  }

  if (cnd == "os") {
    getOSInfo(line[1]);
  }

  if (cnd == "compress") {
    await compress(line[1], line[2]);
  }

  if (cnd == "decompress") {
    await decompress(line[1], line[2]);
  }

  if (cnd == "mv") {
    await move(line[1], line[2]);
  }

  if (cnd == "hash") {
    await calculateHash(line[1]);
  }

  console.log(`\nYou are currently in ${systemRootDir}`);
  cli.prompt();
});

cli.on("close", () => {
  console.log(user.byeMsg);
  process.exit(0);
});
