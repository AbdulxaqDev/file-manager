import { join } from "node:path";

import { __dirname } from "./dirname.js";

export default class Dir {
  constructor() {
    this.root = __dirname(import.meta.url, "..", "..");
    this.wDir = ["/"];
    this.curDir = this.wDir[this.wDir.length];
  }

  getCurDir() {
    return this.curDir;
  }

  up() {
    if (this.wDir === "/") return;

    this.wDir = this.wDir.pop();
    this.curDir = this.wDir[this.wDir.length];
  }

  cd(dir) {
    this.wDir = this.wDir.push(dir);
    this.curDir = this.wDir[this.wDir.length];
  }
}

const test = new Dir();

console.log(test.curDir);
console.log(test.rootDir);
