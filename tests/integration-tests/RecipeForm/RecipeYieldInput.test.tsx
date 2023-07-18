import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeYieldInput } from "../../../src/ui/RecipeForm/RecipeYieldInput";

describe("RecipeYieldInput", () => {
  beforeEach(() => {
    render(
      <PaperProvider>
        <RecipeYieldInput
          recipeYield={{ amount: 12, units: "cookies" }}
          parentAmountFunctions={{
            updateValue: jest.fn(),
            updateErrors: jest.fn(),
          }}
          parentUnitFunctions={{
            updateValue: jest.fn(),
            updateErrors: jest.fn(),
          }}
        />
      </PaperProvider>
    );
  });

  it("initially renders with the correct amount and units", () => {
    screen.getByDisplayValue("12");
    screen.getByDisplayValue("cookies");
  });

  it("is enabled and lets you change both the amount and the units", () => {
    const recipeAmountInput = screen.getByDisplayValue("12");
    expect(recipeAmountInput).toBeEnabled();

    fireEvent.changeText(recipeAmountInput, "15");
    expect(screen.queryByDisplayValue("12")).toBe(null);
    screen.getByDisplayValue("15");

    const recipeUnitsInput = screen.getByDisplayValue("cookies");
    expect(recipeUnitsInput).toBeEnabled();

    fireEvent.changeText(recipeUnitsInput, "small cookies");
    expect(screen.queryByDisplayValue("cookies")).toBe(null);
    screen.getByDisplayValue("small cookies");
  });

  it("shows an error message when the yield amount is invalid", () => {
    const recipeAmountInput = screen.getByDisplayValue("12");

    // empty string is invalid
    fireEvent.changeText(recipeAmountInput, "");
    expect(screen.getByText("Recipe yield is required")).toBeVisible();

    // zero is invalid
    fireEvent.changeText(recipeAmountInput, "0");
    expect(
      screen.getByText("Recipe yield must be greater than zero")
    ).toBeVisible();
    // old error message should be removed
    expect(screen.queryByText("Recipe yield is required")).toBeNull();

    // words are invalid
    fireEvent.changeText(recipeAmountInput, "three");
    expect(screen.getByText("Recipe yield must be a number")).toBeVisible();
    // old error message should be removed
    expect(
      screen.queryByText("Recipe yield must be greater than zero")
    ).toBeNull();

    // negative numbers are invalid
    fireEvent.changeText(recipeAmountInput, "-1.2");
    expect(
      screen.getByText("Recipe yield must be greater than zero")
    ).toBeVisible();
    // old error message should be removed
    expect(screen.queryByText("Recipe yield must be a number")).toBeNull();

    // only positive numbers are valid
    fireEvent.changeText(recipeAmountInput, "24");
    // error messages should be removed
    expect(
      screen.queryByText("Recipe yield must be greater than zero")
    ).toBeNull();
  });

  it("shows an error message when the yield units are invalid", () => {
    const recipeUnitsInput = screen.getByDisplayValue("cookies");

    // empty string is invalid
    fireEvent.changeText(recipeUnitsInput, "");
    expect(
      screen.getByText("Recipe yield units cannot be empty")
    ).toBeVisible();

    // strings longer than 25 chars are invalid
    fireEvent.changeText(recipeUnitsInput, "abcdefghijklmnopqrstuvwxyz");
    expect(
      screen.getByText("Recipe yield units cannot be longer than 25 characters")
    ).toBeVisible();
    // old error message should be removed
    expect(screen.queryByText("Recipe yield units cannot be empty")).toBeNull();

    // everything else is valid
    fireEvent.changeText(recipeUnitsInput, "SERVINGS");
    // error messages should be removed
    expect(
      screen.queryByText(
        "Recipe yield units cannot be longer than 25 characters"
      )
    ).toBeNull();
  });
});
