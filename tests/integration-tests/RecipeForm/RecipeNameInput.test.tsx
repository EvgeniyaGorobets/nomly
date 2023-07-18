import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeNameInput } from "../../../src/ui/RecipeForm/RecipeNameInput";
import { AppContext } from "../../../src";
import type { RecipeBook } from "../../../src";

describe("RecipeNameInput", () => {
  beforeEach(() => {
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": {
        yield: { amount: 10, units: "servings" },
        ingredients: [],
        notes: "",
      },
      "Chocolate chip cookies": {
        yield: { amount: 12, units: "cookies" },
        ingredients: [],
        notes: "",
      },
    };

    const mockContext = {
      recipes: recipeBook,
      saveRecipes: jest.fn(),
      prefs: { fractionMode: false, darkMode: false },
      togglePreference: jest.fn(),
      alerts: [],
      setAlerts: jest.fn(),
    };

    render(
      <AppContext.Provider value={mockContext}>
        <PaperProvider>
          <RecipeNameInput
            initialName="Quinoa Broccoli Casserole"
            parentFunctions={{
              updateValue: jest.fn(),
              updateErrors: jest.fn(),
            }}
          />
        </PaperProvider>
      </AppContext.Provider>
    );
  });

  it("initially renders with initialName in the input", () => {
    screen.getByDisplayValue("Quinoa Broccoli Casserole");
  });

  it("is enabled and lets you change the recipe name", () => {
    const recipeNameInput = screen.getByDisplayValue(
      "Quinoa Broccoli Casserole"
    );
    expect(recipeNameInput).toBeEnabled();

    fireEvent.changeText(recipeNameInput, "Cheesy Quinoa Broccoli Casserole");
    expect(screen.queryByDisplayValue("Quinoa Broccoli Casserole")).toBe(null);
    screen.getByDisplayValue("Cheesy Quinoa Broccoli Casserole");
  });

  it("shows an error message when the recipe name is changed to an empty string", () => {
    const recipeNameInput = screen.getByDisplayValue(
      "Quinoa Broccoli Casserole"
    );

    fireEvent.changeText(recipeNameInput, "");
    expect(screen.getByText("Recipe name cannot be empty")).toBeVisible();

    // Check that the error message is removed once the recipe name is no longer an empty string
    fireEvent.changeText(recipeNameInput, "Quinoa");
    expect(screen.queryByText("Recipe name cannot be empty")).toBe(null);
  });

  it("shows an error message when the recipe name is too long", () => {
    const recipeNameInput = screen.getByDisplayValue(
      "Quinoa Broccoli Casserole"
    );

    fireEvent.changeText(
      recipeNameInput,
      "This is a super long recipe name that is one hundred and one characters long; this is not readable!!!"
    );
    expect(
      screen.getByText("Recipe name cannot be longer than 100 characters")
    ).toBeVisible();

    // Check that the error message is removed once the recipe name is shortened to be <100 chars
    fireEvent.changeText(
      recipeNameInput,
      "This is a super long recipe name but it's not TOO long"
    );
    expect(
      screen.queryByText("Recipe name cannot be longer than 100 characters")
    ).toBe(null);
  });

  it("shows an error message when the recipe name is a duplicate of an existing recipe", () => {
    const recipeNameInput = screen.getByDisplayValue(
      "Quinoa Broccoli Casserole"
    );

    fireEvent.changeText(recipeNameInput, "Chocolate chip cookies");
    expect(
      screen.getByText("A recipe with this name already exists")
    ).toBeVisible();

    // Check that the error message is removed once the recipe name is no longer a duplicate
    fireEvent.changeText(recipeNameInput, "Quinoa Broccoli Casserole");
    expect(screen.queryByText("A recipe with this name already exists")).toBe(
      null
    );
  });
});
