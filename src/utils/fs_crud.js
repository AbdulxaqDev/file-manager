import { writeFile, rename as fsRename, unlink } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { join } from "node:path";

import { errorMessage } from "../helpers/constants.js";
import { isExist, systemRootDir } from "../helpers/dir.js";
import { cli } from "../index.js";

export const create = async (filePath) => {
  const fullFilePath = join(systemRootDir, filePath);
  try {
    await writeFile(fullFilePath, "", { flag: "wx" }).catch((error) => {
      if (error) throw new Error();
    });
  } catch {
    console.error(errorMessage);
  }
};

export const rename = async (oldPath, newPath) => {
  const fullOldFilePath = join(systemRootDir, oldPath);
  const fullNewFilePath = join(systemRootDir, newPath);

  try {
    await fsRename(fullOldFilePath, fullNewFilePath);
  } catch {
    console.error(errorMessage);
  }
};

export const readWrite = async (srcPath, newPath) => {
  const srcFilePath = join(systemRootDir, ...srcPath.split("/"));
  const newFilePath = join(systemRootDir, newPath, srcPath.split("/").pop());

  if (!(await isExist(srcPath))) return;

  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(newFilePath);

  readStream.on("error", () => {
    cli.prompt();
  });

  writeStream.on("error", () => {
    console.error(errorMessage);
    cli.prompt();
  });

  readStream.pipe(writeStream);
};

export const remove = async (filePath) => {
  const fileToRemove = join(systemRootDir, filePath);
  try {
    await unlink(fileToRemove);
  } catch {
    console.error(errorMessage);
  }
};

export const move = async (srcPath, newPath) => {
  if (!(await isExist(srcPath))) return;
  await readWrite(srcPath, newPath).then(async () => {
    await remove(srcPath);
  });
};
