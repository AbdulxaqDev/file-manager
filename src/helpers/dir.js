import { join } from "node:path";
import { stat } from "node:fs/promises";

import { __dirname } from "./dirname.js";

let sysRootDir = __dirname(import.meta.url, "..", "..");
let workingDir = ["/"];
let curDir = workingDir[workingDir.length - 1];

function getCurDir() {
  return curDir;
}

function getWorkingDir() {
  return join(...workingDir);
}

function getSysRootDir() {
  return sysRootDir;
}

function up() {
  if (curDir === "/") return;
  // Real root directory
  let newSysRoot = sysRootDir.split("/").slice(0, -1);
  sysRootDir = join(...newSysRoot);

  // Real root directory
  workingDir.pop();
  curDir = workingDir[workingDir.length - 1];

  return join(...workingDir);
}

async function cd(dir) {
  // Check the path existence
  if (!(await isExist(dir.split("/")))) {
    console.log(`\nthe "${dir}" path does not exist!\n`);
    return;
  }

  // Real root directory
  sysRootDir = join(sysRootDir, dir);

  // File manager directories
  workingDir.push(...dir.split("/"));
  curDir = workingDir[workingDir.length - 1];

  return join(...workingDir);
}

async function isExist(dir) {
  try {
    const stats = await stat(join(sysRootDir, ...dir));
    if (stats.isDirectory() || stats.isFile()) return true;
  } catch {
    return false;
  }
}

export { getCurDir, getWorkingDir, getSysRootDir, up, cd, isExist };
