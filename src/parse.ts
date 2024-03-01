import * as E from "fp-ts/Either";

import * as D from "./dates";
import { pipe } from "fp-ts/function";

/**
 * Parse a day of month.
 */
export function dayOfMonth(s: string): E.Either<string, D.DayOfMonth> {
  const day = nonNegative(s);
  return pipe(
    s,
    nonNegative,
    E.chain(
      E.fromPredicate(
        (day) => day >= 1,
        () => "Day of month must be at least 1"
      )
    ),
    E.chain(
      E.fromPredicate(
        (day) => day <= D.daysInThisMonth(),
        () => `Day of month must be at most ${D.daysInThisMonth()}`
      )
    ),
    E.map((day) => day as D.DayOfMonth)
  );
}

/**
 * Parse a natural number.
 */
export function nonNegative(s: string): E.Either<string, number> {
  const n = Number(s);
  return pipe(
    n,
    E.fromPredicate(
      (n) => !isNaN(n),
      () => "Input must be a number"
    ),
    E.chain(
      E.fromPredicate(
        (n) => n >= 0,
        () => "Input must be non-negative"
      )
    )
  );
}
