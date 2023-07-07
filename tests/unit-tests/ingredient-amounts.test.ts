import { roundDecimal } from "../../src/core/ingredient-amounts";

describe("roundDecimal", () => {
  it("truncates long decimals", () => {
    expect(roundDecimal(1.11111111)).toBe("1.111");
  });

  it("doesn't turn integers into decimals", () => {
    expect(roundDecimal(1)).toBe("1");
  });

  it("doesn't extend numbers with 1-2 digits after the decimal", () => {
    expect(roundDecimal(1.1)).toBe("1.1");
    expect(roundDecimal(1.11)).toBe("1.11");
  });

  it("rounds decimals, instead of just truncating", () => {
    expect(roundDecimal(1.8889)).toBe("1.889");
    expect(roundDecimal(1.9999)).toBe("2");
  });
});
