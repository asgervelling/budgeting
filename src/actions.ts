/**
 * @fileOverview
 * All the actions a user can take.
 * These actions use the file system, print something
 * and return nothing.
 */
import * as B from "./budget";
import * as parse from "./parse";

/**
 * Set your current balance to a natural number,
 * and display it.
 */
export function setBalance(amount: string): void {
  const n = parse.nonNegative(amount);
  if (!n) return;
  B.setBalance(n);
  B.displayBalance(n);
}

/**
 * See your budget for today.
 */
export function dailyBudget(): void {
  const today = new Date().getDate();
  budgetFor(`${today}`);
}

/**
 * Prints the daily budget at the `dayOfMonth`.
 * @param dayOfMonth A number between 1 and 31.
 */
export function budgetFor(dayOfMonth: string): void {
  const day = parse.dayOfMonth(dayOfMonth);
  const balance = B.getLatestBalance();
  if (!day || !balance) return;
  B.displayBalance(balance);
  B.displayBudget(balance, day);
}

/**
 * Set your daily goal budget.
 * It is used when figuring out how much to save up.
 */
export function setDailyGoal(amount: string): void {
  const n = parse.nonNegative(amount);
  if (!n || n < 0) return;
  B.setDailyGoal(Number(amount));
}
