import { EOL, arch, cpus, homedir, userInfo } from "node:os";

import { errorMessage } from "../helpers/constants.js";

const info = {
  EOL: EOL,
  cpus: cpus().map((cpu) => ({
    model: cpu.model,
    speed: cpu.speed / 1000 + "GHz",
  })),
  homedir: homedir(),
  username: userInfo().username,
  architecture: arch(),
};

export function getOSInfo(keyWord) {
  if (!!info[keyWord.slice(2)]) {
    console.log(info[keyWord.slice(2)]);
  } else {
    console.error(errorMessage);
  }
}
