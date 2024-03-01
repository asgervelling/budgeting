import * as D from "./dates";

/**
 * Parse a day of month.
 */
export function dayOfMonth(s: string): D.DayOfMonth | null {
  const day = naturalNumber(s);
  if (!day || day < 1 || day > D.daysInThisMonth()) {
    console.log("Please supply a number n, where 1 <= n <= 31");
    return null;
  } else {
    return day as D.DayOfMonth;
  }
}

/**
 * Parse a natural number.
 */
export function naturalNumber(s: string): number | null {
  const n = Number(s);
  if (isNaN(n) || n < 0) return null;
  else return n;
}
