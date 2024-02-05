import { join } from "node:path";
import { stat } from "node:fs/promises";

import { __dirname } from "./dirname.js";

export let systemRootDir = __dirname(import.meta.url, "..", "..");
export let fManagerRootDir = "/";

export async function isExist(dir, flag) {
  try {
    const stats = await stat(join(systemRootDir, ...dir.split("/")));
    return true;
  } catch {
    console.error("\nOperation failed");
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
