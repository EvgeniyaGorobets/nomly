import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeForm } from "../../../src/ui/RecipeForm/RecipeForm";
import { AppContext } from "../../../src";
import type { RecipeBook } from "../../../src";
import { deepCopy } from "../../../src/core/utils";
import { Unit } from "../../../src/core/ingredient";

jest.mock("uuid", () => ({ v4: () => "7" }));

describe("RecipeForm", () => {
  const recipeBook: RecipeBook = {
    "Quinoa Broccoli Casserole": {
      yield: { amount: 4, units: "servings" },
      ingredients: [
        { id: "1", name: "broccoli", amount: 16, units: "oz" },
        { id: "2", name: "quinoa", amount: 1, units: "cups" },
      ],
      notes: "Mix broccoli and quinoa in a pan and bake.",
    },
    "Chocolate Chip Cookies": {
      yield: { amount: 12, units: "cookies" },
      ingredients: [
        { id: "3", name: "flour", amount: 2, units: "cups" },
        { id: "4", name: "sugar", amount: 16, units: "tbsp" },
        { id: "5", name: "chocolate chips", amount: 8, units: "oz" },
        { id: "6", name: "butter", amount: 100, units: "g" },
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
    // needed for animations built into paper components
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Edit an existing recipe", () => {
    const recipeName: string = "Quinoa Broccoli Casserole";

    beforeEach(() => {
      // render an existing recipe from the recipe book
      render(
        <AppContext.Provider value={mockContext}>
          <PaperProvider>
            <RecipeForm
              navigation={mockNavigationProp}
              route={{
                key: "form",
                name: "Form",
                path: "",
                params: { recipeName: recipeName },
              }}
            />
          </PaperProvider>
        </AppContext.Provider>
      );
    });

    describe("renders the recipe correctly initially", () => {
      it("shows the correct recipe name, yield, ingredients, and notes", () => {
        // name
        screen.getByDisplayValue("Quinoa Broccoli Casserole");

        // yield
        screen.getByDisplayValue("4");
        screen.getByDisplayValue("servings");

        // ingredients
        screen.getByDisplayValue("broccoli");
        screen.getByDisplayValue("16");
        screen.getByDisplayValue("oz");

        screen.getByDisplayValue("quinoa");
        screen.getByDisplayValue("1");
        screen.getByDisplayValue("cups");

        // notes
        screen.getByDisplayValue("Mix broccoli and quinoa in a pan and bake.");
      });

      it("has an enabled SAVE button when initially rendering an existing recipe", () => {
        expect(screen.getByText("SAVE")).toBeEnabled();
      });
    });

    describe("disables the SAVE button when the recipe has errors", () => {
      it("disables the SAVE button when there is an error in the recipe name", () => {
        fireEvent.changeText(
          screen.getByDisplayValue("Quinoa Broccoli Casserole"),
          "Chocolate Chip Cookies" // this recipe name already exists, so it is invalid
        );
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Check that the SAVE button is reenabled once the recipe name is fixed
        fireEvent.changeText(
          screen.getByDisplayValue("Chocolate Chip Cookies"),
          "Quinoa Broccoli Casserole"
        );
        expect(screen.getByText("SAVE")).toBeEnabled();
      });

      it("disables the SAVE button when there is an error in the recipe yield amount", () => {
        fireEvent.changeText(screen.getByDisplayValue("4"), "0");
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Check that the SAVE button is reenabled once the recipe yield amount is fixed
        fireEvent.changeText(screen.getByDisplayValue("0"), "4");
        expect(screen.getByText("SAVE")).toBeEnabled();
      });

      it("disables the SAVE button when there is an error in the recipe yield units", () => {
        fireEvent.changeText(screen.getByDisplayValue("servings"), "");
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Check that the SAVE button is reenabled once the recipe yield units are fixed
        fireEvent.changeText(screen.getByDisplayValue(""), "servings");
        expect(screen.getByText("SAVE")).toBeEnabled();
      });

      it("disables the SAVE button when there is an error in an ingredient name", () => {
        fireEvent.changeText(screen.getByDisplayValue("quinoa"), "");
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Check that the SAVE button is reenabled once the ingredient name is fixed
        fireEvent.changeText(screen.getByDisplayValue(""), "quinoa");
        expect(screen.getByText("SAVE")).toBeEnabled();
      });

      it("disables the SAVE button when there is an error in the ingredient amount", () => {
        fireEvent.changeText(screen.getByDisplayValue("16"), "sixteen");
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Check that the SAVE button is reenabled once the ingredient amount is fixed
        fireEvent.changeText(screen.getByDisplayValue("sixteen"), "16");
        expect(screen.getByText("SAVE")).toBeEnabled();
      });

      it("fixing one error in the recipe does not reenable the SAVE button if another error is still present", () => {
        // Create an error in the recipe name
        fireEvent.changeText(
          screen.getByDisplayValue("Quinoa Broccoli Casserole"),
          ""
        );

        // Create an error in an ingredient amount
        fireEvent.changeText(screen.getByDisplayValue("16"), "sixteen");

        // The SAVE button should be disabled, since there are two errors
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Fix the recipe name
        fireEvent.changeText(
          screen.getByDisplayValue(""),
          "Quinoa Broccoli Casserole"
        );

        // The SAVE button should still be disabled, since there is still an error in an ingredient
        expect(screen.getByText("SAVE")).toBeDisabled();

        // Create an error in the yield units
        fireEvent.changeText(screen.getByDisplayValue("servings"), "");

        // Fix the error in the ingredient
        fireEvent.changeText(screen.getByDisplayValue("sixteen"), "16");

        // Still, the SAVE button should be disabled, since now there is an error in the yield
        expect(screen.getByText("SAVE")).toBeDisabled();
      });
    });

    describe("saves changes to the recipe and navigates back to the previous screen", () => {
      it("saves changes to recipe name", () => {
        const newRecipeName: string = "Cheesy Quinoa Broccoli Casserole";

        fireEvent.changeText(
          screen.getByDisplayValue(recipeName),
          newRecipeName
        );
        fireEvent.press(screen.getByText("SAVE"));

        expect(mockSaveRecipes).toBeCalledTimes(1);

        const newRecipeBook = deepCopy(recipeBook);
        delete newRecipeBook[recipeName];
        newRecipeBook[newRecipeName] = recipeBook[recipeName];
        expect(mockSaveRecipes).toBeCalledWith(newRecipeBook);

        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });

      it("saves changes to recipe yield", () => {
        const oldYieldAmount: string = "4";
        const newYieldAmount: string = "6";
        const oldYieldUnits: string = "servings";
        const newYieldUnits: string = "portions";

        fireEvent.changeText(
          screen.getByDisplayValue(oldYieldAmount),
          newYieldAmount
        );
        fireEvent.changeText(
          screen.getByDisplayValue(oldYieldUnits),
          newYieldUnits
        );
        fireEvent.press(screen.getByText("SAVE"));

        expect(mockSaveRecipes).toBeCalledTimes(1);
        expect(mockSaveRecipes).toBeCalledWith({
          ...recipeBook,
          [recipeName]: {
            ...recipeBook[recipeName],
            yield: {
              amount: Number(newYieldAmount),
              units: newYieldUnits,
            },
          },
        });
        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });

      it("saves changes to existing recipe ingredients", () => {
        const oldIngredientName: string = "broccoli";
        const newIngredientName: string = "broccoli florets";
        fireEvent.changeText(
          screen.getByDisplayValue(oldIngredientName),
          newIngredientName
        );

        const oldIngredientAmount: string = "16";
        const newIngredientAmount: string = "12";
        fireEvent.changeText(
          screen.getByDisplayValue(oldIngredientAmount),
          newIngredientAmount
        );

        const oldIngredientUnits: Unit = "oz";
        const newIngredientUnits: Unit = "cups";
        fireEvent.press(screen.getByDisplayValue(oldIngredientUnits));
        fireEvent.press(screen.getByText(newIngredientUnits));

        fireEvent.press(screen.getByText("SAVE"));

        expect(mockSaveRecipes).toBeCalledTimes(1);
        expect(mockSaveRecipes).toBeCalledWith({
          ...recipeBook,
          [recipeName]: {
            ...recipeBook[recipeName],
            ingredients: [
              {
                // this ingredient should have all three fields updated
                id: "1",
                name: newIngredientName,
                amount: Number(newIngredientAmount),
                units: newIngredientUnits,
              },
              { id: "2", name: "quinoa", amount: 1, units: "cups" },
            ],
          },
        });
        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });

      it("saves deleted ingredients", () => {
        fireEvent.press(screen.getByA11yHint("Delete quinoa from ingredients"));
        fireEvent.press(screen.getByText("SAVE"));

        expect(mockSaveRecipes).toBeCalledTimes(1);
        expect(mockSaveRecipes).toBeCalledWith({
          ...recipeBook,
          [recipeName]: {
            ...recipeBook[recipeName],
            // there should only be one ingredient left
            ingredients: [
              { id: "1", name: "broccoli", amount: 16, units: "oz" },
            ],
          },
        });
        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });

      it("saves new ingredients", () => {
        fireEvent.press(screen.getByText("Add Ingredient"));
        fireEvent.changeText(screen.getByDisplayValue(""), "garlic cloves");
        fireEvent.changeText(screen.getByDisplayValue("0"), "3");
        fireEvent.press(screen.getByText("SAVE"));

        expect(mockSaveRecipes).toBeCalledTimes(1);
        expect(mockSaveRecipes).toBeCalledWith({
          ...recipeBook,
          [recipeName]: {
            ...recipeBook[recipeName],
            // the new ingredient should be saved
            ingredients: [
              ...recipeBook[recipeName].ingredients,
              { id: "7", name: "garlic cloves", amount: 3, units: "ea" },
            ],
          },
        });
        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });

      it("saves changes to the recipe notes", () => {
        const newNotes: string = "blah blah blah";
        fireEvent.changeText(
          screen.getByDisplayValue(
            "Mix broccoli and quinoa in a pan and bake."
          ),
          newNotes
        );

        fireEvent.press(screen.getByText("SAVE"));
        expect(mockSaveRecipes).toBeCalledTimes(1);
        expect(mockSaveRecipes).toBeCalledWith({
          ...recipeBook,
          "Quinoa Broccoli Casserole": {
            ...recipeBook["Quinoa Broccoli Casserole"],
            notes: newNotes, // the recipe book should have the new notes
          },
        });

        expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      });
    });

    it("doesn't save changes to the recipe if you go back without hitting SAVE", () => {
      fireEvent.changeText(
        screen.getByDisplayValue("Quinoa Broccoli Casserole"),
        "New recipe name"
      );
      fireEvent.press(screen.getByA11yHint("Go back to previous screen"));

      expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      expect(mockSaveRecipes).toBeCalledTimes(0);
    });
  });

  describe("Create a new recipe", () => {
    beforeEach(() => {
      // render a new, blank recipe
      render(
        <AppContext.Provider value={mockContext}>
          <PaperProvider>
            <RecipeForm
              navigation={mockNavigationProp}
              route={{
                key: "form",
                name: "Form",
                path: "",
              }}
            />
          </PaperProvider>
        </AppContext.Provider>
      );
    });

    it("renders a blank recipe name, yield, and notes", () => {
      // both name and notes should be blank
      expect(screen.getAllByDisplayValue("").length).toBe(2);

      // yield should be set to 1 servings
      screen.getByDisplayValue("1");
      screen.getByDisplayValue("servings");
    });

    it("has a disabled SAVE button when initially rendering an new recipe", () => {
      expect(screen.getByText("SAVE")).toBeDisabled();
    });

    it("enables the SAVE button once the recipe name is populated", () => {
      fireEvent.changeText(
        screen.getByAccessibilityHint("Recipe name input"),
        "Mac and Cheese"
      );

      expect(screen.getByText("SAVE")).toBeEnabled();
    });

    it("saves the new recipe when the SAVE button is pressed and goes back to the previous screen", () => {
      fireEvent.changeText(
        screen.getByAccessibilityHint("Recipe name input"),
        "Mac and Cheese"
      );
      fireEvent.changeText(
        screen.getByAccessibilityHint("Recipe yield amount input"),
        "3"
      );
      fireEvent.changeText(
        screen.getByAccessibilityHint("Recipe yield units input"),
        "portions"
      );
      fireEvent.press(screen.getByText("SAVE"));

      expect(mockSaveRecipes).toBeCalledTimes(1);
      expect(mockSaveRecipes).toBeCalledWith({
        ...recipeBook,
        "Mac and Cheese": {
          yield: {
            amount: 3,
            units: "portions",
          },
          ingredients: [],
          notes: "",
        },
      });

      expect(mockNavigationProp.goBack).toBeCalledTimes(1);
    });

    it("doesn't add the new recipe if you go back without hitting SAVE", () => {
      fireEvent.changeText(
        screen.getByAccessibilityHint("Recipe name input"),
        "Mac and Cheese"
      );
      fireEvent.press(screen.getByA11yHint("Go back to previous screen"));

      expect(mockNavigationProp.goBack).toBeCalledTimes(1);
      expect(mockSaveRecipes).toBeCalledTimes(0);
      expect(Object.keys(recipeBook).length).toBe(2);
    });
  });
});
