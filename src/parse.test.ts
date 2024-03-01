import { describe, it, expect } from "@jest/globals";
import * as E from "fp-ts/Either";

import * as parse from "./parse";
import { DayOfMonth } from "./dates";

const nanError = E.left("Input must be a number");
const negativeError = E.left("Input must be non-negative");
const tooLowError = E.left("Day of month must be at least 1");
const tooHighError = E.left("Day of month must be at most 31");

describe("dayOfMonth", () => {
  it("should only parse correctly if the day is between 1 and 31", () => {
    expect(parse.dayOfMonth("dsadh9")).toEqual(nanError);
    expect(parse.dayOfMonth("0")).toEqual(tooLowError);
    expect(parse.dayOfMonth("1")).toEqual(E.right(1));
    expect(parse.dayOfMonth("01")).toEqual(E.right(1));
    expect(parse.dayOfMonth("31")).toEqual(E.right(31));
    expect(parse.dayOfMonth("32")).toEqual(tooHighError);
  });
});

describe("nonNegative", () => {
  it("should only parse non-negative numbers successfully", () => {
    expect(parse.nonNegative("9ds 98 ")).toEqual(nanError);
    expect(parse.nonNegative("-1")).toEqual(negativeError);
    expect(parse.nonNegative("0")).toEqual(E.right(0));
    expect(parse.nonNegative("2983")).toEqual(E.right(2983));
  });
});
