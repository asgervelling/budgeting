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
export function read(filename: string): () => E.Either<string, string> {
  createIfNotExists(filename);
  return E.tryCatchK(
    () => fs.readFileSync(path(filename), "utf-8"),
    (error) => `${error}`
  );
}

/**
 * Write `data` to the a file.
 */
export function write(
  filename: string,
  data: string
): () => E.Either<string, void> {
  createIfNotExists(filename);
  return E.tryCatchK(
    () => fs.writeFileSync(path(filename), data),
    (error) => `${error}`
  );
}

/**
 * Append `data` to the a file.
 */
export function append(
  filename: string,
  data: string
): () => E.Either<string, void> {
  createIfNotExists(filename);
  return E.tryCatchK(
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
