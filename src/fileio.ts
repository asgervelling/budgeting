import * as fs from "fs";

const DIR = "./data";

/**
 * Read file and create if not exists.
 */
export function read(filename: string): string {
  mkdirIfNotExists(DIR);
  try {
    return fs.readFileSync(path(filename), "utf-8");
  } catch (error) {
    fs.writeFileSync(filename, "");
    return fs.readFileSync(filename, "utf-8");
  }
}

/**
 * Write `data` to the a file.
 */
export function write(filename: string, data: string): void {
  mkdirIfNotExists(DIR);
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
  mkdirIfNotExists(DIR);
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
  return `${DIR}/${filename}`;
}
