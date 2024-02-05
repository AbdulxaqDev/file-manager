import { join } from "node:path";

import { systemRootDir } from "../../helpers/dir.js";
import { duplexBrotli } from "./util/duplexBrotli.js";

export const decompress = async (srcPath, desPath) => {
  const srcFilePath = join(systemRootDir, ...srcPath.split("/"));
  const desFilePath = join(
    systemRootDir,
    desPath,
    `${srcPath.split("/").pop().slice(0, -3)}`
  );

  duplexBrotli(srcFilePath, desFilePath, srcPath, "decompress");
};
