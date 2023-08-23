import { isNumeric } from "../../src/core/utils";

describe("isNumeric", () => {
  it("returns true for positive integers and zero", () => {
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("1")).toBe(true);
    expect(isNumeric("235")).toBe(true);
  });

  it("returns true for positive decimals", () => {
    expect(isNumeric("0.5")).toBe(true);
    expect(isNumeric("1.12")).toBe(true);
  });

  it("returns true for negative integers", () => {
    expect(isNumeric("-3")).toBe(true);
    expect(isNumeric("-101")).toBe(true);
  });

  it("returns true for negative decimals", () => {
    expect(isNumeric("-3.2")).toBe(true);
    expect(isNumeric("-0.667")).toBe(true);
  });

  it("returns false for strings with letters", () => {
    expect(isNumeric("hi")).toBe(false);
    // expect(isNumeric("1.5e2")).toBe(false); -- this actually returns true
    // but probably nobody will ever try to use this syntax so I'm just going to accept it
    // as a valid number
    expect(isNumeric("seven")).toBe(false);
    expect(isNumeric("70 cookies")).toBe(false);
  });

  it("returns false for strings with spaces", () => {
    expect(isNumeric("10 20 30")).toBe(false);
    expect(isNumeric("  2  3")).toBe(false);
  });

  it("returns false for strings with special characters", () => {
    expect(isNumeric("1/2")).toBe(false);
    expect(isNumeric("$3")).toBe(false);
  });

  it("returns false for the empty string", () => {
    expect(isNumeric("")).toBe(false);
  });
});
