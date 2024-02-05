import { join } from "node:path";

import { systemRootDir } from "../../helpers/dir.js";
import { duplexBrotli } from "./util/duplexBrotli.js";
import { errorMessage } from "../../helpers/constants.js";

export const compress = async (srcPath, desPath) => {
  try {
    const srcFilePath = join(systemRootDir, ...srcPath.split("/"));
    const desFilePath = join(
      systemRootDir,
      desPath,
      `${srcPath.split("/").pop()}.br`
    );

    duplexBrotli(srcFilePath, desFilePath, srcPath, "compress");
  } catch {
    console.error(errorMessage);
  }
};
