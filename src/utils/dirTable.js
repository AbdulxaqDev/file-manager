import { readDirectoryTree } from "./dirTree.js";

export async function dirTable(dir) {
  const tree = await readDirectoryTree(dir);
  const keys = Object.keys(tree);
  const table = [];
  for (const key of keys) {
    if (tree[key] === null) {
      table.push({ Name: key, Type: "file" });
    } else {
      table.push({ Name: key, Type: "directory" });
    }
  }
  console.table(table);
}
