import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import {
  getSystemRootDir,
  getFManagerRootDir,
  isExist,
} from "../helpers/dir.js";
import { cli } from "../index.js";

export default async function cat(dir) {
  if (await isExist(dir, "file")) {
    const stream = createReadStream(dir);

    stream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    stream.on("end", () => {
      cli.prompt();
    });
  }
}
