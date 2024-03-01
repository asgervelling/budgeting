import { Command } from "commander";
import {
  displayBalance,
  displayBudget,
  getLatestBalance,
  setDailyGoal,
} from "./budget";
import * as A from "./actions";

const program = new Command();

program
  .command("balance <amount>")
  .description("Enter your current balance")
  .action(A.setBalance);

program
  .command("today")
  .description("See your budget for today")
  .action(A.dailyBudget);

program
  .command("goal <amount>")
  .description("Set your daily goal budget")
  .action(A.setDailyGoal);

program
  .command("date <n>")
  .description("Simulate using the program at the n'th of the month.")
  .action((n) => {});

program.parse();
