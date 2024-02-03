import { readdir, stat } from "fs/promises";
import { join } from "path";
import { __dirname } from "../helpers/dirname.js";

export async function readDirectoryTree(dir) {
  const stats = await stat(dir);
  if (stats.isDirectory()) {
    const files = await readdir(dir);
    const tree = {};

    for await (const file of files) {
      const filePath = join(dir, file);
      tree[file] = await readDirectoryTree(filePath);
    }

    return tree;
  } else {
    return null;
  }
}
