import * as B from "./budget";

export function setBalance(amount: string) {
  setBalance(amount);
  const balance = B.getLatestBalance();
  if (!balance) return;
  B.displayBalance(balance);
}

export function dailyBudget() {
  const balance = B.getLatestBalance();
  if (!balance) return;
  B.displayBalance(balance);
  B.displayBudget(balance);
}

export function setDailyGoal(amount: string) {
  const n = Number(amount);
  if (isNaN(n) || n < 0) return;
  B.setDailyGoal(Number(amount))
}
