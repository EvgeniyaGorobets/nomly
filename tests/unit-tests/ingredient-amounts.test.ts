import {
  adjustIngredientAmounts,
  getClosestFraction,
  roundDecimal,
  convertToFraction,
  formatIngredientAmount,
} from "../../src/core/ingredient-amounts";
import { Ingredient } from "../../src/core/ingredient";

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

describe("adjustIngredientAmounts", () => {
  const testIngredients: Ingredient[] = [
    {
      name: "milk",
      amount: 20,
      units: "mL",
    },
    {
      name: "eggs",
      amount: 3,
      units: "N/A",
    },
    {
      name: "butter",
      amount: 0.5,
      units: "cups",
    },
  ];

  it("scales ingredient amounts up", () => {
    expect(adjustIngredientAmounts(testIngredients, 1, 2)).toStrictEqual([
      {
        name: "milk",
        amount: 40,
        units: "mL",
      },
      {
        name: "eggs",
        amount: 6,
        units: "N/A",
      },
      {
        name: "butter",
        amount: 1,
        units: "cups",
      },
    ]);
  });

  it("scales ingredient amounts down", () => {
    expect(adjustIngredientAmounts(testIngredients, 1, 0.5)).toStrictEqual([
      {
        name: "milk",
        amount: 10,
        units: "mL",
      },
      {
        name: "eggs",
        amount: 1.5,
        units: "N/A",
      },
      {
        name: "butter",
        amount: 0.25,
        units: "cups",
      },
    ]);
  });

  it("can handle a base yield that's not 1", () => {
    expect(adjustIngredientAmounts(testIngredients, 3, 9)).toStrictEqual([
      {
        name: "milk",
        amount: 60,
        units: "mL",
      },
      {
        name: "eggs",
        amount: 9,
        units: "N/A",
      },
      {
        name: "butter",
        amount: 1.5,
        units: "cups",
      },
    ]);
  });
});

describe("getClosestFraction", () => {
  it("returns the same number as a string when that number is an exact fraction", () => {
    expect(getClosestFraction(0.125)).toBe("0.125");
    expect(getClosestFraction(0.25)).toBe("0.250");
    expect(getClosestFraction(0.375)).toBe("0.375");
    expect(getClosestFraction(0.5)).toBe("0.500");
    expect(getClosestFraction(0.625)).toBe("0.625");
    expect(getClosestFraction(0.75)).toBe("0.750");
    expect(getClosestFraction(0.875)).toBe("0.875");
  });

  it("can handle thirds", () => {
    expect(getClosestFraction(0.331)).toBe("0.333");
    expect(getClosestFraction(0.333)).toBe("0.333");
    expect(getClosestFraction(0.334)).toBe("0.333");

    expect(getClosestFraction(0.666)).toBe("0.667");
    expect(getClosestFraction(0.667)).toBe("0.667");
    expect(getClosestFraction(0.669)).toBe("0.667");
  });

  it("returns 0 for numbers that are closer to 0 than 0.125", () => {
    expect(getClosestFraction(0)).toBe("0");
    expect(getClosestFraction(0.01)).toBe("0");
    expect(getClosestFraction(0.06)).toBe("0");

    // 0.0625 is the halfway point between 0 and 0.125
    expect(getClosestFraction(0.07)).toBe("0.125");
  });

  it("returns 1 for numbers that are closer to 1 than 0.875", () => {
    expect(getClosestFraction(1)).toBe("1");
    expect(getClosestFraction(0.98)).toBe("1");
    expect(getClosestFraction(0.94)).toBe("1");

    // 0.9375 is the halfway point between .875 and 1
    expect(getClosestFraction(0.93)).toBe("0.875");
  });

  it("returns the closest fraction for numbers that aren't exact fractions", () => {
    expect(getClosestFraction(0.11)).toBe("0.125");
    expect(getClosestFraction(0.135)).toBe("0.125");

    expect(getClosestFraction(0.233)).toBe("0.250");
    expect(getClosestFraction(0.2577)).toBe("0.250");

    expect(getClosestFraction(0.369)).toBe("0.375");
    expect(getClosestFraction(0.4)).toBe("0.375");

    expect(getClosestFraction(0.45)).toBe("0.500");
    expect(getClosestFraction(0.505)).toBe("0.500");

    expect(getClosestFraction(0.6)).toBe("0.625");
    expect(getClosestFraction(0.633)).toBe("0.625");

    expect(getClosestFraction(0.74)).toBe("0.750");
    expect(getClosestFraction(0.8)).toBe("0.750");

    expect(getClosestFraction(0.82)).toBe("0.875");
    expect(getClosestFraction(0.9)).toBe("0.875");
  });
});

describe("convertToFraction", () => {
  it("returns correct fraction for numbers that are exact fractions", () => {
    expect(convertToFraction(0.125)).toBe("⅛");
    expect(convertToFraction(0.25)).toBe("¼");
    expect(convertToFraction(0.333)).toBe("⅓");
    expect(convertToFraction(0.375)).toBe("⅜");
    expect(convertToFraction(0.5)).toBe("½");
    expect(convertToFraction(0.625)).toBe("⅝");
    expect(convertToFraction(0.667)).toBe("⅔");
    expect(convertToFraction(0.75)).toBe("¾");
    expect(convertToFraction(0.875)).toBe("⅞");
  });

  it("returns whole number only when the number is an integer", () => {
    expect(convertToFraction(0)).toBe("0");
    expect(convertToFraction(2)).toBe("2");
  });

  it("returns whole number only when the decimal is small or large enough", () => {
    expect(convertToFraction(0.001)).toBe("0");
    expect(convertToFraction(1.05)).toBe("1");
    expect(convertToFraction(2.98)).toBe("3");
  });

  it("returns both the whole number and the fraction for numbers > 1", () => {
    expect(convertToFraction(1.2)).toBe("1¼");
    expect(convertToFraction(2.3)).toBe("2⅓");
    expect(convertToFraction(3.87)).toBe("3⅞");
  });
});

describe("formatIngredientAmount", () => {
  it("does not include N/A in the returned string when N/A is the unit", () => {});

  it("does not do any fraction formatting for mL, g, oz, or N/A units", () => {
    expect(
      formatIngredientAmount(
        {
          name: "bananas",
          amount: 2,
          units: "N/A",
        },
        true
      )
    ).toBe("2");

    expect(
      formatIngredientAmount(
        {
          name: "milk",
          amount: 20.1,
          units: "mL",
        },
        true
      )
    ).toBe("20.1 mL");

    expect(
      formatIngredientAmount(
        {
          name: "flour",
          amount: 50.7,
          units: "g",
        },
        true
      )
    ).toBe("50.7 g");

    expect(
      formatIngredientAmount(
        {
          name: "onion",
          amount: 1.5,
          units: "N/A",
        },
        true
      )
    ).toBe("1.5");
  });

  it("does not do any fraction formatting when fractionMode is false", () => {
    expect(
      formatIngredientAmount(
        {
          name: "milk",
          amount: 2.5,
          units: "cups",
        },
        false
      )
    ).toBe("2.5 cups");

    expect(
      formatIngredientAmount(
        {
          name: "vanilla",
          amount: 1.25,
          units: "tsp",
        },
        false
      )
    ).toBe("1.25 tsp");
  });

  it("does fraction formatting for cups, tbsp, and tsp when fractionMode is true", () => {
    expect(
      formatIngredientAmount(
        {
          name: "milk",
          amount: 2.5,
          units: "cups",
        },
        true
      )
    ).toBe("2½ cups");

    expect(
      formatIngredientAmount(
        {
          name: "vanilla",
          amount: 1.33,
          units: "tsp",
        },
        true
      )
    ).toBe("1⅓ tsp");

    expect(
      formatIngredientAmount(
        {
          name: "vinegar",
          amount: 0.88,
          units: "tbsp",
        },
        true
      )
    ).toBe("⅞ tbsp");
  });
});
