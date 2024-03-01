import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const DIR = "./data";

/**
 * Read file and create if not exists.
 */
export function readFile(filename: string): string {
  mkdirIfNotExists(DIR);
  try {
    return readFileSync(path(filename), "utf-8");
  } catch (error) {
    writeFileSync(filename, "");
    return readFileSync(filename, "utf-8");
  }
}

/**
 * Write `data` to the a file.
 */
export function writeFile(filename: string, data: string): void {
  mkdirIfNotExists(DIR);
  try {
    writeFileSync(path(filename), data);
  } catch (error) {
    console.log(error);
  }
}

function mkdirIfNotExists(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

/**
 * `"balance" -> "./data/balance"`
 */
function path(filename: string): string {
  return `${DIR}/${filename}`;
}
