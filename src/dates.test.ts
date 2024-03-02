import { describe, it, expect } from "@jest/globals";

import { DayOfMonth, date, daysInMonth } from "./dates";

describe("daysInMonth", () => {
  it("Should give the right number of days for every month", () => {
    expect(daysInMonth(2024, 1)).toEqual(31);
    expect(daysInMonth(2023, 2)).toEqual(28);
    expect(daysInMonth(2024, 2)).toEqual(29);
    expect(daysInMonth(2024, 3)).toEqual(31);
    expect(daysInMonth(2024, 4)).toEqual(30);
    expect(daysInMonth(2024, 5)).toEqual(31);
    expect(daysInMonth(2024, 6)).toEqual(30);
    expect(daysInMonth(2024, 7)).toEqual(31);
    expect(daysInMonth(2024, 8)).toEqual(31);
    expect(daysInMonth(2024, 9)).toEqual(30);
    expect(daysInMonth(2024, 10)).toEqual(31);
    expect(daysInMonth(2024, 11)).toEqual(30);
    expect(daysInMonth(2024, 12)).toEqual(31);
  })
})

describe("date", () => {
  function isCorrectDate(dayOfMonth: DayOfMonth) {
    const d = date(dayOfMonth);
    const dateString = d.toISOString();
    const dateRegex = /-(\d{2})T/; // Match day
    const match = dateString.match(dateRegex);
    if (!match || !match[1]) {
      return false;
    }
    const day = parseInt(match[1], 10);
    return dayOfMonth === day;
  }
  it("should create a date from the dayOfMonth", () => {
    expect(isCorrectDate(1)).toBe(true);
    expect(isCorrectDate(31)).toBe(true);
  });
});
