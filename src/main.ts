import { Command } from "commander";
import {
  displayBalance,
  displayBudget,
  getLatestBalance,
  setBalance,
  setDailyGoal,
} from "./budget";

const program = new Command();

program
  .command("balance <amount>")
  .description("Enter your current balance")
  .action((amount) => {
    setBalance(amount);
    const balance = getLatestBalance();
    if (!balance) return;
    displayBalance(balance);
  });

program
  .command("today")
  .description("See your budget for today")
  .action(() => {
    const balance = getLatestBalance();
    if (!balance) return;
    displayBalance(balance);
    displayBudget(balance);
  });

program
  .command("goal <amount>")
  .description("Set your daily goal budget")
  .action((amount) => {
    setDailyGoal(amount);
  });

program
  .command("date <n>")
  .description("Simulate using the program at the n'th of the month.")
  .action((n) => {});

program.parse();
