import { Command } from "commander";
import {
  dailyBudget,
  displayBalance,
  displayBudget,
  getDailyGoal,
  getLatestBalance,
  setBalance,
  setDailyGoal,
  today,
} from "./budget";

const program = new Command();

program
  .command("balance <amount>")
  .description("Enter your current balance")
  .action((amount) => {
    setBalance(amount);
    displayBalance();
  });

program
  .command("today")
  .description("See your budget for today")
  .action(() => {
    displayBalance();
    displayBudget();
  });

program
  .command("goal <amount>")
  .description("Set your daily goal budget")
  .action((amount) => {
    setDailyGoal(amount);
  });

program.parse();
