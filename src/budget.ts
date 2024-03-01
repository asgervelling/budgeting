import { readFile, writeFile } from "./fileio";
import * as D from "./dates";

enum DataFile {
  GOAL = "goal",
  BALANCE = "balance",
}

/**
 * Save your current balance in the balance file. \
 * Create that file if it does not exist.
 * @param balance A natural number.
 */
export function setBalance(balance: number): void {
  const line = `${D.today()}: ${balance}\n`;
  writeFile(DataFile.BALANCE, line);
}

/**
 * Display a friendly message to the user \
 * showing their balance.
 */
export function displayBalance(balance: number) {
  if (balance) {
    console.log(`Your balance is ${balance}.`);
  } else {
    console.log(`You have not entered a balance.`);
  }
}

export function displayBudget(balance: number, dayOfMonth: number) {
  const budget = dailyBudget(balance, dayOfMonth);
  const overGoal = budget - getDailyGoal();
  console.log(
    `Daily budget: ${budget.toFixed(0)} (${overGoal.toFixed(0)} over)`
  );
}

/**
 * Simulate using the program at the n'th of the month.
 */
// export function simulateDate(n: number) {
//   const budget
// }

/**
 * Set the daily goal budget.
 */
export function setDailyGoal(budget: number) {
  writeFile(DataFile.GOAL, `${budget}`);
}

/**
 * Get the daily budget.
 */
function dailyBudget(balance: number, dayOfMonth: number): number {
  return balance / D.daysLeftInMonth(dayOfMonth);
}
/**
 * Get the user's daily goal budget from the file system.
 */
function getDailyGoal(): number {
  try {
    const text = readFile(DataFile.GOAL).trim();
    return Number(text);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

/**
 * Get the latest balance as an option.
 */
export function getLatestBalance(): number | null {
  const text = readFile(DataFile.BALANCE);
  const lines = text.trim().split("\n");
  const lastLine = lines[lines.length - 1];
  if (!lastLine) return null;

  const balanceStr = lastLine.split(":")[1];
  const balance = parseFloat(balanceStr);
  if (isNaN(balance)) return null;
  else return balance;
}
