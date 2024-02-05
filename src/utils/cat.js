import { createReadStream } from "node:fs";

import { isExist } from "../helpers/dir.js";
import { cli } from "../index.js";

export default async function cat(dir) {
  if (await isExist(dir, "file")) {
    const stream = createReadStream(dir);

    stream.on("data", (chunk) => {
      process.stdout.write("\n");
      process.stdout.write("\n");
      process.stdout.write(chunk);
      process.stdout.write("\n");
    });

    stream.on("end", () => {
      cli.prompt();
    });
  }
}
