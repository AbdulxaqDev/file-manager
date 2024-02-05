import { join } from "node:path";
import { stat } from "node:fs/promises";

import { __dirname } from "./dirname.js";
import { errorMessage } from "./constants.js";

export let systemRootDir = __dirname(import.meta.url, "..", "..");
export let fManagerRootDir = "/";

export async function isExist(dir) {
  try {
    await stat(join(systemRootDir, ...dir.split("/")));
    return true;
  } catch {
    console.error(errorMessage);
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
}

export async function cd(dir) {
  if (await isExist(dir, "dir")) {
    systemRootDir = join(systemRootDir, dir);
    fManagerRootDir =
      join(fManagerRootDir, dir) === "." ? "/" : join(fManagerRootDir, dir);
  }
}

export const getSystemRootDir = () => systemRootDir;
export const getFManagerRootDir = () => fManagerRootDir;
