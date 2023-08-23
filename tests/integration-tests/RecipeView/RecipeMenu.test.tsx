import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeMenu } from "../../../src/ui/RecipeView/RecipeMenu";
import { AppContext } from "../../../src";
import { type RecipeBook } from "../../../src/core/recipe-book";

describe("RecipeMenu", () => {
  const recipeBook: RecipeBook = {
    "Quinoa Broccoli Casserole": {
      yield: { amount: 4, units: "servings" },
      ingredients: [
        { name: "broccoli", amount: 16, units: "oz" },
        { name: "quinoa", amount: 1, units: "cups" },
      ],
      notes: "Mix broccoli and quinoa in a pan and bake.",
    },
    "Chocolate Chip Cookies": {
      yield: { amount: 12, units: "cookies" },
      ingredients: [
        { name: "flour", amount: 2, units: "cups" },
        { name: "sugar", amount: 16, units: "tbsp" },
        { name: "chocolate chips", amount: 8, units: "oz" },
        { name: "butter", amount: 100, units: "g" },
      ],
      notes: "Mix dry and wet ingredients. Roll into balls and bake.",
    },
  };

  const mockSaveRecipes = jest.fn();

  const mockContext = {
    recipes: recipeBook,
    saveRecipes: mockSaveRecipes,
    prefs: { fractionMode: false, darkMode: false },
    togglePreference: jest.fn(),
    alerts: [],
    setAlerts: jest.fn(),
  };

  const mockNavigationProp = {
    dispatch: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
    getParent: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
  };

  beforeEach(() => {
    render(
      <AppContext.Provider value={mockContext}>
        <PaperProvider>
          <RecipeMenu
            recipeName="Chocolate Chip Cookies"
            nav={mockNavigationProp}
          />
        </PaperProvider>
      </AppContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("is closed initially", () => {
    expect(screen.queryByText("Clone recipe")).toBeNull();
    expect(screen.queryByText("Delete recipe")).toBeNull();
  });

  // TODO: fix these failing tests
  /*
  it("opens when the vertical dots icon is pressed", () => {
    fireEvent.press(screen.getByAccessibilityHint("Open recipe menu"));
    expect(screen.getByText("Clone recipe")).toBeVisible();
    expect(screen.getByText("Delete recipe")).toBeVisible();
  });

  it("closes when the vertical dots icon is pressed again", () => {
    fireEvent.press(screen.getByAccessibilityHint("Open recipe menu"));
    expect(screen.getByText("Clone recipe")).toBeVisible();
    expect(screen.getByText("Delete recipe")).toBeVisible();

    fireEvent.press(screen.getByAccessibilityHint("Open recipe menu"));
    expect(screen.queryByText("Clone recipe")).not.toBeVisible();
    expect(screen.queryByText("Delete recipe")).not.toBeVisible();
  });
  */

  it("deletes the recipe when 'Delete recipe' is pressed and navigates back", () => {
    fireEvent.press(screen.getByAccessibilityHint("Open recipe menu"));
    fireEvent.press(screen.getByText("Delete recipe"));

    expect(mockSaveRecipes).toBeCalledTimes(1);
    expect(mockSaveRecipes).toBeCalledWith({
      // only one recipe should be left in the recipe book
      "Quinoa Broccoli Casserole": {
        ...recipeBook["Quinoa Broccoli Casserole"],
      },
    });

    expect(mockNavigationProp.goBack).toBeCalledTimes(1);
  });

  it("clones the recipe when 'Clone recipe' is pressed and navigates to the new recipe", () => {
    fireEvent.press(screen.getByAccessibilityHint("Open recipe menu"));
    fireEvent.press(screen.getByText("Clone recipe"));

    const clonedRecipeName = "Chocolate Chip Cookies (Copy)";
    expect(mockSaveRecipes).toBeCalledTimes(1);
    expect(mockSaveRecipes).toBeCalledWith({
      ...recipeBook,
      [clonedRecipeName]: {
        ...recipeBook["Chocolate Chip Cookies"],
      },
    });

    expect(mockNavigationProp.navigate).toBeCalledTimes(1);
    expect(mockNavigationProp.navigate).toBeCalledWith("Recipe", {
      recipeName: clonedRecipeName,
    });
  });
});
