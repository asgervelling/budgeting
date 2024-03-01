import { describe, it, expect } from "@jest/globals";

import { DayOfMonth, date } from "./dates";

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
