import { flow, pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

import * as F from "./fileio";
import * as D from "./dates";
import * as parse from "./parse";

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
export function setBalance(balance: number): void {
  if (balance < 0) return;
  const line = `${D.formatDate(D.today())}: ${balance}\n`;
  F.append(DataFile.BALANCE, line);
}

/**
 * Display a friendly message to the user \
 * showing their balance.
 */
export function displayBalance(balance: number) {
  console.log(`  Set current balance to ${balance}.`);
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
    `  Daily budget: ${budget.toFixed(0)} ` +
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
export function setDailyGoal(budget: number): void {
  F.write(DataFile.DAILY_GOAL, `${budget}`);
}

/**
 * Get the daily budget.
 */
function dailyBudget(balance: number, dayOfMonth: D.DayOfMonth): number {
  return balance / D.daysLeftInMonth(dayOfMonth);
}

const notEmpty = flow(
  E.fromPredicate(
    (s: string) => s !== "",
    () => "String is empty"
  )
);

/**
 * Get the user's daily goal budget from the file system.
 */
function getDailyGoal(): number {
  return pipe(
    E.tryCatch(
      () => F.read(DataFile.DAILY_GOAL).trim(),
      (error) => `Error reading daily goal: ${error}`
    ),
    E.chain(notEmpty),
    E.chain(parse.nonNegative),
    E.getOrElse(() => 0)
  );
}

/**
 * Get the latest balance as an option.
 */
export function getLatestBalance(): E.Either<string, number> {
  return pipe(
    E.tryCatch(
      () => F.read(DataFile.BALANCE),
      (error) => `Error reading balance: ${error}`
    ),
    E.chain(notEmpty),
    E.map((text) => text.trim().split("\n")),
    E.chain(
      E.fromPredicate(
        (lines) => lines.length > 0,
        () => `Balance not set. Set it with \`./run.sh balance <amount>\``
      )
    ),
    E.map((lines) => {
      console.log(lines);
      return lines;
    }),
    E.map((lines) => lines[lines.length - 1]),
    E.map((lastLine) => lastLine.split(":")),
    E.chain(
      E.fromPredicate(
        (parts) => parts.length > 0,
        () => "Malformed balance. Should be `YYYY-MM-DD: <float>`"
      )
    ),
    E.map((parts) => parts[1]),
    E.chain(parse.nonNegative)
  );
}
