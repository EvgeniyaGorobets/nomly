import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeNotesInput } from "../../../src/ui/RecipeForm/RecipeNotesInput";
import type { Recipe } from "../../../src/core/recipe";

describe("RecipeNameInput", () => {
  const initialRecipeNotes =
    "Put the cherries in the pie crust and place in the oven.";
  const mockRecipe: Recipe = {
    yield: {
      amount: 1,
      units: "pie",
    },
    ingredients: [
      {
        name: "cherries",
        amount: 12,
        units: "oz",
      },
      {
        name: "pie crust",
        amount: 1,
        units: "N/A",
      },
    ],
    notes: initialRecipeNotes,
  };

  const mockSetRecipe = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <RecipeNotesInput recipe={mockRecipe} setRecipe={mockSetRecipe} />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially renders with recipe notes in the input", () => {
    screen.getByDisplayValue(initialRecipeNotes);
  });

  it("has an enabled text input that calls its callback", () => {
    const recipeNotesInput = screen.getByDisplayValue(initialRecipeNotes);
    expect(recipeNotesInput).toBeEnabled();

    const newNotes =
      "Mix the cherries with sugar. Then, put the cherries in the pie crust and place the pie crust in the oven for 30min";
    fireEvent.changeText(recipeNotesInput, newNotes);

    expect(mockSetRecipe).toBeCalledTimes(1);
    expect(mockSetRecipe).toBeCalledWith({ ...mockRecipe, notes: newNotes });
  });
});
