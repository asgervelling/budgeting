import { pipe } from "fp-ts/function";
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

/**
 * Get the user's daily goal budget from the file system.
 */
function getDailyGoal(): number {
  const text = F.read(DataFile.DAILY_GOAL).trim();
  const goal = parse.nonNegative(text);
  return pipe(
    E.tryCatch(
      () => F.read(DataFile.DAILY_GOAL).trim(),
      (error) => `Error reading daily goal: ${error}`
    ),
    E.chain(parse.nonNegative),
    E.getOrElse(() => 0)
  );
}

/**
 * Get the latest balance as an option.
 */
export function getLatestBalance(): E.Either {
  const text = F.read(DataFile.BALANCE);
  const lines = text.trim().split("\n");
  const lastLine = lines[lines.length - 1];
  if (!lastLine) {
    console.log("No known balance.");
    return null;
  }

  const amount = lastLine.split(":")[1];
  return parse.nonNegative(amount);
}
