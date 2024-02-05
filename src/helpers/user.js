import os from "node:os";

import { __dirname } from "./dirname.js";

const argUsername = process.argv.find((arg) => arg.startsWith("--username"));
const username = argUsername ? argUsername.slice(11) : os.userInfo().username;

const welcomeMsg = `Welcome to the File Manager, ${username}!`;
const byeMsg = `\nThank you for using File Manager, ${username}, goodbye!`;
const rootDir = __dirname(import.meta.url, "..", "..");

export default { welcomeMsg, byeMsg, rootDir };
