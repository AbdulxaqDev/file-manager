import { join } from "node:path";
import { stat } from "node:fs/promises";

import { __dirname } from "./dirname.js";

let systemRootDir = __dirname(import.meta.url, "..", "..");
let fManagerRootDir = "/";

export async function isExist(dir, flag) {
  try {
    const stats = await stat(join(systemRootDir, ...dir.split("/")));
    if (flag === "dir") {
      if (stats.isDirectory()) {
        return true;
      }
      if (stats.isFile()) {
        throw new Error(` the "${dir}" is NOT directory!\n`);
      }
      throw new Error(` the "${dir}" PATH does not exist!\n`);
    }
    if (flag === "file") {
      if (stats.isFile()) {
        return true;
      }
      if (stats.isDirectory()) {
        throw new Error(` the "${dir}" is NOT a file!\n`);
      }
      throw new Error(` the "${dir}" FILE does not exist!\n`);
    }
  } catch (error) {
    // if (error.code !== "ENOENT")
    console.error(error);
    return false;
  }
}

export function up() {
  if (fManagerRootDir === "/") return;
  systemRootDir = join(...systemRootDir.split("/").slice(0, -1));
  fManagerRootDir =
    join(...fManagerRootDir.split("/").slice(0, -1)) === "."
      ? "/"
      : join(...fManagerRootDir.split("/").slice(0, -1));
  console.log("system root: ", systemRootDir);
  console.log("fm root: ", fManagerRootDir);
}

export async function cd(dir) {
  if (await isExist(dir, "dir")) {
    systemRootDir = join(systemRootDir, dir);
    fManagerRootDir =
      join(fManagerRootDir, dir) === "." ? "/" : join(fManagerRootDir, dir);
    console.log("system root: ", systemRootDir);
    console.log("fm root: ", fManagerRootDir);
  }
}

export const getSystemRootDir = () => systemRootDir;
export const getFManagerRootDir = () => fManagerRootDir;
