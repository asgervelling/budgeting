/**
 * @fileoverview
 * We use the file system as data storage.
 * All the functions here make the data directory
 * if it does not exist.
 */
import * as fs from "fs";
import * as E from "fp-ts/Either";

const DATA_DIR = "./data";

/**
 * Read file and create if not exists.
 */
export function readFile(filename: string): E.Either<string, string> {
  createIfNotExists(filename);
  return E.tryCatch(
    () => fs.readFileSync(path(filename), "utf-8"),
    (error) => `${error}`
  );
}

/**
 * Write `data` to the a file.
 */
export function writeFile(
  filename: string
): (data: string) => E.Either<string, void> {
  createIfNotExists(filename);
  return (data: string) => E.tryCatch(
    () => fs.writeFileSync(path(filename), data),
    (error) => `${error}`
  );
}

/**
 * Append `data` to the a file.
 */
export function appendToFile(
  filename: string
): (data: string) => E.Either<string, void> {
  createIfNotExists(filename);
  return (data: string) => E.tryCatch(
    () => fs.appendFileSync(path(filename), data),
    (error) => `${error}`
  );
}

function mkdirIfNotExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function createIfNotExists(filename: string): void {
  mkdirIfNotExists(DATA_DIR);
  const p = path(filename);
  if (fs.existsSync(p)) return;
  else fs.writeFileSync(p, "");
}

/**
 * `"balance" -> "./data/balance"`
 */
function path(filename: string): string {
  return `${DATA_DIR}/${filename}`;
}
