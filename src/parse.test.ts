import { describe, it, expect } from "@jest/globals";
import * as parse from "./parse";
import { DayOfMonth } from "./dates";

describe("dayOfMonth", () => {
  it("should only parse correctly if the day is between 1 and 31", () => {
    expect(parse.dayOfMonth("dsadh9")).toBeNull();
    expect(parse.dayOfMonth("0")).toBeNull();
    expect(parse.dayOfMonth("1")).toEqual(1 as DayOfMonth);
    expect(parse.dayOfMonth("01")).toEqual(1 as DayOfMonth);
    expect(parse.dayOfMonth("31")).toEqual(31 as DayOfMonth);
    expect(parse.dayOfMonth("32")).toBeNull();
  });
});

describe("nonNegative", () => {
  it("should only parse non-negative numbers successfully", () => {
    expect(parse.nonNegative("9ds 98 ")).toBeNull();
    expect(parse.nonNegative("-1")).toBeNull();
    expect(parse.nonNegative("0")).toEqual(0);
    expect(parse.nonNegative("2983")).toEqual(2983);
  })
})
