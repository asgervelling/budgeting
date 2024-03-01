import * as F from "./fileio";
import * as D from "./dates";
import * as parse from "./parse";

/**
 * Files for storing user state on the file system.
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
  const line = `${D.today()}: ${balance}\n`;
  F.append(DataFile.BALANCE, line);
}

/**
 * Display a friendly message to the user \
 * showing their balance.
 */
export function displayBalance(balance: number) {
  console.log(`Balance:      ${balance}.`);
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
      `daily goal budget of ${goal})`
  );
}

/**
 * Set the daily goal budget.
 */
export function setDailyGoal(budget: number) {
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
  if (goal) return goal;
  else return 0;
}

/**
 * Get the latest balance as an option.
 */
export function getLatestBalance(): number | null {
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
