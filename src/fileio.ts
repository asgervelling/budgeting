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
  mkdirIfNotExists(DATA_DIR);
  try {
    return fs.readFileSync(path(filename), "utf-8");
  } catch (error) {
    fs.writeFileSync(filename, "");
    return fs.readFileSync(path(filename), "utf-8");
  }
}

/**
 * Write `data` to the a file.
 */
export function write(filename: string, data: string): void {
  mkdirIfNotExists(DATA_DIR);
  try {
    fs.writeFileSync(path(filename), data);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Append `data` to the a file.
 */
export function append(filename: string, data: string): void {
  mkdirIfNotExists(DATA_DIR);
  try {
    fs.appendFileSync(path(filename), data);
  } catch (error) {
    console.log(error);
  }
}

function mkdirIfNotExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

/**
 * `"balance" -> "./data/balance"`
 */
function path(filename: string): string {
  return `${DATA_DIR}/${filename}`;
}
