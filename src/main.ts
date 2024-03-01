import { Command } from "commander";

import * as A from "./actions";

/**
 * A command line program from a package called commander.
 */
const program = new Command();

program
  .command("balance <amount>")
  .description("Enter your current balance")
  .action(A.setBalance);

program
  .command("budget")
  .description("See your budget for today")
  .option("-d, --date <date>", "See the budget for the n'th day of the month.")
  .action((options) => {
    if (options.date) A.budgetFor(options.date);
    else A.dailyBudget();
  });

program
  .command("goal <amount>")
  .description("Set your daily goal budget")
  .action(A.setDailyGoal);

program.parse();
