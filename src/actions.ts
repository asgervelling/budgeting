/**
 * @fileOverview
 * All the actions a user can take.
 * These actions use the file system, print something
 * and return nothing.
 */
import * as B from "./budget";

/**
 * Set your current balance.
 */
export function setBalance(amount: string): void {
  setBalance(amount);
  const balance = B.getLatestBalance();
  if (!balance) return;
  B.displayBalance(balance);
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
  const n = Number(dayOfMonth);
  if (isNaN(n) || n < 1 || n > 31) {
    console.log("Please supply a number n, where 1 <= n <= 31");
    return;
  }
  const balance = B.getLatestBalance();
  if (!balance) return;
  B.displayBalance(balance);
  B.displayBudget(balance, n);
}

/**
 * Set your daily goal budget.
 * It is used when figuring out how much to save up.
 */
export function setDailyGoal(amount: string): void {
  const n = Number(amount);
  if (isNaN(n) || n < 0) return;
  B.setDailyGoal(Number(amount));
}
