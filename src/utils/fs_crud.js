import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { errorMessage } from "../helpers/constants.js";
import { systemRootDir } from "../helpers/dir.js";

export const create = async (filePath) => {
  const fullFilePath = join(systemRootDir, filePath);
  try {
    await writeFile(fullFilePath, "", { flag: "wx" }).catch((error) => {
      if (error) {
        throw new Error();
      }
    });
  } catch {
    console.error(errorMessage);
  }
};
