/**
 * @fileOverview
 * All the actions a user can take.
 * These actions use the file system, print something
 * and return nothing.
 */
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

import * as budget from "./budget";
import * as parse from "./parse";

/**
 * Set your current balance to a natural number,
 * and display it.
 */
export function setBalance(amount: string): void {  
  pipe(
    amount,
    parse.nonNegative,
    E.chain(budget.setBalance),
    E.fold(
      (error) => console.log(error),
      (goal) => console.log(`Daily goal budget: ${goal}`)
    )
  );
}

/**
 * See your budget for today.
 */
export function dailyBudget(): void {
  const today = new Date().getUTCDate();
  budgetFor(`${today}`);
}

/**
 * Prints the daily budget at the `dayOfMonth`.
 * @param dayOfMonth A number between 1 and 31.
 */
export function budgetFor(dayOfMonth: string): void {
  pipe(
    E.Do,
    E.apS("day", parse.dayOfMonth(dayOfMonth)),
    E.apS("balance", budget.getLatestBalance()),
    E.map(({ day, balance }) => {
      budget.displayDate(day);
      budget.displayBalance(balance);
      budget.displayBudget(balance, day);
    }),
    E.mapLeft(console.log)
  );
}

/**
 * Set your daily goal budget.
 * It is used when figuring out how much to save up.
 */
export function setDailyGoal(amount: string): void {
  pipe(
    amount,
    parse.nonNegative,
    E.chain(budget.setDailyGoal),
    E.fold(
      (error) => console.log(error),
      (goal) => console.log(`Daily goal budget: ${goal}`)
    )
  );
}
