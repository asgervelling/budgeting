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

/**
 * The current date as string.
 */
export function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function daysInThisMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

/**
 * Get the number of days left in the month,
 * including today.
 */
export function daysLeftInMonth(dayInMonth: number) {
  return daysInThisMonth() - dayInMonth + 1;
}
