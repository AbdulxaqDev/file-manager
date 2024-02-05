import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";

errorMessage;
import { cli } from "../../../index.js";
import { isExist } from "../../../helpers/dir.js";
import { errorMessage } from "../../../helpers/constants.js";

export const duplexBrotli = async (
  srcFilePath,
  desFilePath,
  rawSrcPath,
  flag
) => {
  if (!(await isExist(rawSrcPath))) {
    cli.prompt();
    return;
  }

  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(desFilePath);
  let createDuplexBrotli;

  if (flag === "compress") {
    createDuplexBrotli = createBrotliCompress();
  }
  if (flag === "decompress") {
    createDuplexBrotli = createBrotliDecompress();
  }

  readStream.on("error", () => {
    cli.prompt();
  });

  writeStream.on("error", () => {
    console.error(errorMessage);
    cli.prompt();
  });

  readStream.pipe(createDuplexBrotli).pipe(writeStream);
};
