import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

import { isExist, systemRootDir } from "../helpers/dir.js";
import { cli } from "../index.js";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");

  if (!(await isExist(filePath))) {
    return;
  }
  const fullFilePath = join(systemRootDir, filePath);

  const streamToHash = createReadStream(fullFilePath);

  streamToHash.on("data", (data) => {
    hash.update(data);
  });

  streamToHash.on("end", () => {
    const hashedStream = hash.digest("hex");
    console.log(hashedStream);
    cli.prompt()
  });
};
