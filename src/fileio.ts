/**
 * @fileoverview
 * We use the file system as data storage.
 * All the functions here make the data directory
 * if it does not exist.
 */
import * as fs from "fs";

const DATA_DIR = "./data";

/**
 * Read file and create if not exists.
 */
export function read(filename: string): string {
  const p = path(filename);
  createIfNotExists(p);
  return fs.readFileSync(p, "utf-8");
}

/**
 * Write `data` to the a file.
 */
export function write(filename: string, data: string): void {
  const p = path(filename);
  createIfNotExists(p);
  fs.writeFileSync(p, data);
}

/**
 * Append `data` to the a file.
 */
export function append(filename: string, data: string): void {
  const p = path(filename);
  createIfNotExists(p);
  fs.appendFileSync(p, data);
}

function mkdirIfNotExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function createIfNotExists(filename: string): void {
  mkdirIfNotExists(DATA_DIR);
  const p = path(filename);
  console.log("p:", p)
  if (fs.existsSync(p)) return;
  else fs.writeFileSync(p, "");
}

/**
 * `"balance" -> "./data/balance"`
 */
function path(filename: string): string {
  console.log("Here:", `${DATA_DIR}/${filename}`)
  return `${DATA_DIR}/${filename}`;
}
