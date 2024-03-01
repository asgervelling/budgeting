/**
 * The current date as string.
 */
export function today(): string {
  return new Date().toISOString().split("T")[0];
}

function daysInThisMonth() {
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
