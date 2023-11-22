import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { IngredientInput } from "../../../src/ui/RecipeForm/IngredientInput";
import { type Ingredient } from "../../../src/core/ingredient";
import { IngredientErrors } from "../../../src/core/recipe-errors";

describe("IngredientInput", () => {
  const ingredient: Ingredient = {
    name: "milk",
    amount: 1.5,
    units: "oz",
  };
  const mockDeleteIngredient = jest.fn();
  const mockSetIngredient = jest.fn();
  const mockSetIngredientError = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <IngredientInput
          ingredient={ingredient}
          deleteIngredient={mockDeleteIngredient}
          setIngredient={mockSetIngredient}
          setIngredientError={mockSetIngredientError}
        />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("lets you update the ingredient properties", () => {
    it("lets you change the ingredient name", () => {
      const ingredientNameInput = screen.getByDisplayValue(ingredient.name);
      expect(ingredientNameInput).toBeEnabled();

      fireEvent.changeText(ingredientNameInput, "MILK");
      expect(screen.queryByDisplayValue(ingredient.name)).toBeNull();
      expect(screen.getByDisplayValue("MILK")).toBeVisible();

      expect(mockSetIngredient).toBeCalledTimes(1);
      const callback = mockSetIngredient.mock.calls[0][0];
      expect(callback(ingredient)).toStrictEqual({
        ...ingredient,
        name: "MILK",
      });
    });

    it("lets you change the ingredient amount", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      expect(ingredientAmountInput).toBeEnabled();

      fireEvent.changeText(ingredientAmountInput, "3");
      expect(screen.queryByDisplayValue(String(ingredient.amount))).toBeNull();
      expect(screen.getByDisplayValue("3")).toBeVisible();

      expect(mockSetIngredient).toBeCalledTimes(1);
      const callback = mockSetIngredient.mock.calls[0][0];
      expect(callback(ingredient)).toStrictEqual({
        ...ingredient,
        amount: 3,
      });
    });

    it("lets you change the ingredient units", () => {
      const ingredientUnitsDropdown = screen.getByDisplayValue(
        ingredient.units
      );
      expect(ingredientUnitsDropdown).toBeEnabled();

      // Initially, the dropdown menu shouldn't be visible
      expect(screen.queryByText("cups")).toBeNull();
      expect(screen.queryByText("mL")).toBeNull();

      // once you press on the dropdown, the menu should become visible
      fireEvent.press(ingredientUnitsDropdown);
      screen.getByText("cups");
      screen.getByText("tbsp");

      // after you select an option, the menu should become invisible again
      fireEvent.press(screen.getByText("mL"));
      // NOTE -- for ingredient amount and ingredient name, the state of the input text is managed
      // locally within the component, and changes are only propagated up to the parent if the entered value is valid
      // However, for the dropdown, since all selected values are guaranteed to be valid, the state
      // of the dropdown input is managed by the parent
      // Therefore, we can't do this: expect(screen.getByDisplayValue("mL")).toBeVisible();
      // because the display value won't change until the parent's state is updated
      // We can only test whether the callbacks are called
      expect(mockSetIngredient).toBeCalledTimes(1);
      const callback = mockSetIngredient.mock.calls[0][0];
      expect(callback(ingredient)).toStrictEqual({
        ...ingredient,
        units: "mL",
      });
    });
  });

  describe("shows errors in the ingredient name", () => {
    const originalErrors: IngredientErrors = { name: false, amount: false };
    const expectedErrors: IngredientErrors = { name: true, amount: false };

    it("shows an error message when the ingredient name is an empty string and updates the ingredient errors", () => {
      const ingredientNameInput = screen.getByDisplayValue(ingredient.name);
      fireEvent.changeText(ingredientNameInput, "");

      const expectedErrorMessage = "Ingredient name cannot be empty";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });

    it("shows an error message when the ingredient name is too long and updates the ingredient errors", () => {
      const ingredientNameInput = screen.getByDisplayValue(ingredient.name);
      fireEvent.changeText(
        ingredientNameInput,
        "super long ingredient name that is longer than 50 characters"
      );

      const expectedErrorMessage =
        "Ingredient name cannot be longer than 50 characters";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });
  });

  describe("shows errors in the ingredient amount", () => {
    const originalErrors: IngredientErrors = { name: false, amount: false };
    const expectedErrors: IngredientErrors = { name: false, amount: true };

    it("shows an error message when the ingredient amount is an empty string and updates the ingredient errors", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      fireEvent.changeText(ingredientAmountInput, "");

      const expectedErrorMessage = "Ingredient amount is required";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });

    it("shows an error message when the ingredient amount has words and updates the ingredient errors", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      fireEvent.changeText(ingredientAmountInput, "three");

      const expectedErrorMessage = "Ingredient amount must be a number";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });

    it("shows an error message when the ingredient amount is zero and updates the ingredient errors", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      fireEvent.changeText(ingredientAmountInput, "0");

      const expectedErrorMessage =
        "Ingredient amount must be greater than zero";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });

    it("shows an error message when the ingredient amount is negative and updates the ingredient errors", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      fireEvent.changeText(ingredientAmountInput, "-1.2");

      const expectedErrorMessage =
        "Ingredient amount must be greater than zero";
      expect(screen.getByText(expectedErrorMessage)).toBeVisible();
      expect(mockSetIngredientError).toBeCalledTimes(1);
      expect(mockSetIngredient).toBeCalledTimes(0);

      const callback = mockSetIngredientError.mock.calls[0][0];
      expect(callback(originalErrors)).toStrictEqual(expectedErrors);
    });
  });

  describe("removes old error messages", () => {
    it("removes name errors once the name is fixed", () => {
      const ingredientNameInput = screen.getByDisplayValue(ingredient.name);
      fireEvent.changeText(ingredientNameInput, "");
      fireEvent.changeText(ingredientNameInput, "milk");

      const errorMessage = "Ingredient name is required";
      expect(screen.queryByText(errorMessage)).toBeNull();

      expect(mockSetIngredientError).toBeCalledTimes(2);
      const firstCallback = mockSetIngredientError.mock.calls[0][0];
      const secondCallback = mockSetIngredientError.mock.calls[1][0];

      const originalErrors: IngredientErrors = { name: false, amount: true };
      const intermediateErrors: IngredientErrors = { name: true, amount: true };
      expect(firstCallback(originalErrors)).toStrictEqual(intermediateErrors);
      expect(secondCallback(intermediateErrors)).toStrictEqual(originalErrors);

      expect(mockSetIngredient).toBeCalledTimes(1);
    });

    it("removes amount errors once the amount is fixed", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );
      fireEvent.changeText(ingredientAmountInput, "");
      fireEvent.changeText(ingredientAmountInput, "2");

      const errorMessage = "Ingredient amount is required";
      expect(screen.queryByText(errorMessage)).toBeNull();

      expect(mockSetIngredientError).toBeCalledTimes(2);
      const firstCallback = mockSetIngredientError.mock.calls[0][0];
      const secondCallback = mockSetIngredientError.mock.calls[1][0];

      const originalErrors: IngredientErrors = { name: true, amount: false };
      const intermediateErrors: IngredientErrors = { name: true, amount: true };
      expect(firstCallback(originalErrors)).toStrictEqual(intermediateErrors);
      expect(secondCallback(intermediateErrors)).toStrictEqual(originalErrors);

      expect(mockSetIngredient).toBeCalledTimes(1);
    });

    it("removes old error messages if a new error occurs in the name", () => {
      const ingredientNameInput = screen.getByDisplayValue(ingredient.name);

      fireEvent.changeText(ingredientNameInput, "");
      const firstError = "Ingredient name is required";

      fireEvent.changeText(
        ingredientNameInput,
        "super super super long ingredient name that is clearly invalid"
      );
      const secondError = "Ingredient name cannot be longer than 50 characters";

      expect(screen.queryByText(firstError)).toBeNull();
      expect(screen.getByText(secondError)).toBeVisible();

      expect(mockSetIngredientError).toBeCalledTimes(2);
      const firstCallback = mockSetIngredientError.mock.calls[0][0];
      const secondCallback = mockSetIngredientError.mock.calls[1][0];

      const originalErrors: IngredientErrors = { name: false, amount: true };
      const expectedErrors: IngredientErrors = { name: true, amount: true };
      expect(firstCallback(originalErrors)).toStrictEqual(expectedErrors);
      // name errors should still be true after the second callback
      expect(secondCallback(expectedErrors)).toStrictEqual(expectedErrors);

      expect(mockSetIngredient).toBeCalledTimes(0);
    });

    it("removes old error messages if a new error occurs in the amount", () => {
      const ingredientAmountInput = screen.getByDisplayValue(
        String(ingredient.amount)
      );

      fireEvent.changeText(ingredientAmountInput, "");
      const firstError = "Ingredient amount is required";

      fireEvent.changeText(ingredientAmountInput, "0");
      const secondError = "Ingredient amount must be greater than zero";

      expect(screen.queryByText(firstError)).toBeNull();
      expect(screen.getByText(secondError)).toBeVisible();

      expect(mockSetIngredientError).toBeCalledTimes(2);
      const firstCallback = mockSetIngredientError.mock.calls[0][0];
      const secondCallback = mockSetIngredientError.mock.calls[1][0];

      const originalErrors: IngredientErrors = { name: true, amount: false };
      const expectedErrors: IngredientErrors = { name: true, amount: true };
      expect(firstCallback(originalErrors)).toStrictEqual(expectedErrors);
      // amount errors should still be true after the second callback
      expect(secondCallback(expectedErrors)).toStrictEqual(expectedErrors);

      expect(mockSetIngredient).toBeCalledTimes(0);
    });
  });

  describe("deletes ingredients", () => {
    it("fires the deleteIngredient callback when the X is pressed", () => {
      fireEvent.press(
        screen.getByAccessibilityHint("Delete milk from ingredients")
      );
      expect(mockDeleteIngredient).toBeCalledTimes(1);
    });
  });
});
