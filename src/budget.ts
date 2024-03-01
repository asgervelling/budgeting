import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";

const DIR = "./data";
const BALANCE_PATH = `${DIR}/balance`;
const GOAL_PATH = `${DIR}/goal`;

/**
 * Save your current balance in the balance file. \
 * Create that file if it does not exist.
 * @param balance A natural number.
 */
export function setBalance(balance: number): void {
  const line = `${today()}: ${balance}\n`;
  mkdirIfNotExists(DIR);
  appendFileSync(BALANCE_PATH, line);
}

function mkdirIfNotExists(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

/**
 * Display a friendly message to the user \
 * showing their balance.
 */
export function displayBalance() {
  const balance = getLatestBalance();
  if (balance) {
    console.log(`Your balance is ${balance}.`);
  } else {
    console.log(`You have not entered a balance.`);
  }
}

export function displayBudget() {
  const budget = dailyBudget();
  const overGoal = budget - getDailyGoal();
  console.log(
    `Daily budget: ${budget.toFixed(0)} (${overGoal.toFixed(0)} over)`
  );
}

/**
 * Set the daily goal budget.
 */
export function setDailyGoal(budget: number) {
  mkdirIfNotExists(DIR);
  writeFileSync(GOAL_PATH, `${budget}`);
}

/**
 * Get the user's daily goal budget from the file system.
 */
export function getDailyGoal(): number {
  try {
    const text = readFile(GOAL_PATH).trim();
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
  const text = readFile(BALANCE_PATH);
  const lines = text.trim().split("\n");
  const lastLine = lines[lines.length - 1];
  if (!lastLine) return null;

  const balanceStr = lastLine.split(":")[1];
  const balance = parseFloat(balanceStr);
  if (isNaN(balance)) return null;
  else return balance;
}

/**
 * Read file and create if not exists.
 */
function readFile(path: string) {
  try {
    return readFileSync(path, "utf-8");
  } catch (error) {
    writeFileSync(path, "");
    return readFileSync(path, "utf-8");
  }
}

/**
 * The current date as string.
 */
export function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function dailyBudget(): number {
  const balance = getLatestBalance();
  if (!balance) return 0;
  else return balance / daysLeftInMonth();
}

function daysInThisMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

/**
 * Get the number of days left in the month,
 * including today.
 */
function daysLeftInMonth() {
  return daysInThisMonth() - new Date().getDate() + 1;
}
