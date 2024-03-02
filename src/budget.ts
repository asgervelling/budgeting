import { flow, pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

import * as F from "./fileio";
import * as D from "./dates";
import * as parse from "./parse";
import { validateNonEmpty, validateNonNegative } from "./validation";

/**
 * Filenames of the files where we store user state.
 */
enum DataFile {
  DAILY_GOAL = "goal",
  BALANCE = "balance",
}

/**
 * Save your current balance in the balance file. \
 * Create that file if it does not exist.
 * @param balance A natural number.
 */
export function setBalance(balance: number): E.Either<string, void> {
  const createBalanceString = (balance: number) =>
    `${D.formatDate(D.today())}: ${balance}\n`;

  return pipe(
    balance,
    validateNonNegative,
    E.map(createBalanceString),
    E.chain(F.appendToFile(DataFile.BALANCE))
  );
}

/**
 * Display a friendly message to the user \
 * showing their balance.
 */
export function displayBalance(balance: number) {
  console.log(`Balance: ${balance}.`);
}

/**
 * Display how much you can spend and save,
 * given your current `balance` and the day of the month.
 */
export function displayBudget(balance: number, dayOfMonth: D.DayOfMonth) {
  const budget = dailyBudget(balance, dayOfMonth);
  const goal = getDailyGoal();
  const overGoal = budget - goal;
  console.log(
    `Daily budget: ${budget.toFixed(0)} ` +
      `(${overGoal.toFixed(0)} more than ` +
      `daily goal budget of ${goal}).`
  );
}

export function displayDate(dayOfMonth: D.DayOfMonth): void {
  console.log(D.formatDate(D.date(dayOfMonth)));
}

/**
 * Set the daily goal budget.
 */
export function setDailyGoal(budget: number): E.Either<string, void> {
  return pipe(`${budget}`, F.writeFile(DataFile.DAILY_GOAL));
}

/**
 * Get the daily budget.
 */
function dailyBudget(balance: number, dayOfMonth: D.DayOfMonth): number {
  return balance / D.daysLeftInMonth(dayOfMonth);
}

/**
 * Get the user's daily goal budget from the file system.
 */
function getDailyGoal(): number {
  return pipe(
    DataFile.DAILY_GOAL,
    F.readFile,
    E.chain(validateNonEmpty),
    E.chain(parse.nonNegative),
    E.getOrElse(() => 0)
  );
}

/**
 * Get the latest balance as an option.
 */
export function getLatestBalance(): E.Either<string, number> {
  const splitLines = (text: string) => text.trim().split("\n");
  const getLastLine = (lines: string[]) => lines[lines.length - 1];
  const splitLine = (line: string) => line.split(":");
  const getSecondPart = (parts: string[]) => parts[1];

  const validateFormat = E.fromPredicate(
    isValidFormat,
    () => "Malformed balance. Should be `YYYY-MM-DD: <float>`"
  );

  return pipe(
    DataFile.BALANCE,
    F.readFile,
    E.chain(validateNonEmpty),
    E.map(splitLines),
    E.map(getLastLine),
    E.chain(validateFormat),
    E.map(splitLine),
    E.map(getSecondPart),
    E.chain(parse.nonNegative)
  );
}

/**
 * Check if `balanceLine` matches the format: `YYYY-MM-DD: <float>`
 */
function isValidFormat(balanceLine: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}: (\d+(?:\.\d+)?)$/;
  return regex.test(balanceLine);
}
