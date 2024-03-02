export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * The current date.
 */
export function today(): Date {
  return new Date();
}

/**
 * Create a date object of this year,
 * this month and `dayOfMonth`.
 */
export function date(dayOfMonth: DayOfMonth) {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), dayOfMonth));
}

/**
 * Format as YYYY-MM-DD.
 */
export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function daysInThisMonth(): number {
  const now = new Date();
  return daysInMonth(now.getUTCFullYear(), (now.getUTCMonth() - 1) as Month);
}

export function daysInMonth(year: number, month: Month): number {
  const day = 1;
  return new Date(year, month, day).getUTCDate();
}

/**
 * Get the number of days left in the month,
 * including today.
 */
export function daysLeftInMonth(dayInMonth: number) {
  return daysInThisMonth() - dayInMonth + 1;
}
