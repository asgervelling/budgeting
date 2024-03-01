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
import { id } from "fp-ts/lib/Refinement";

/**
 * Set your current balance to a natural number,
 * and display it.
 */
export function setBalance(amount: string): void {
  pipe(
    amount,
    parse.nonNegative,
    E.fold(
      (error) => console.log(error),
      (n) => {
        budget.setBalance(n);
        budget.displayBalance(n);
      }
    )
  );
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
  pipe(
    E.Do,
    E.apS("day", parse.dayOfMonth(dayOfMonth)),
    E.apS("balance", budget.getLatestBalance()),
    E.map(({ day, balance }) => {
      budget.displayDate(day);
      budget.displayBalance(balance);
      budget.displayBudget(balance, day);
    }),
    E.fold((error) => console.log(error), id)
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
    E.fold(
      (error) => console.log(error),
      (goal) => {
        budget.setDailyGoal(goal);
        console.log(`Set daily goal budget of ${goal}.`);
      }
    )
  );
}
