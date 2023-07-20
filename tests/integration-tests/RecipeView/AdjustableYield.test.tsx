// test that error messages show up when you enter incorrect yields

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { AdjustableYield } from "../../../src/ui/RecipeView/AdjustableYield";

describe("AdjustableYield", () => {
  const mockUpdateIngredients = jest.fn();

  beforeEach(() => {
    // needed for animations built into paper components
    jest.useFakeTimers();

    render(
      <PaperProvider>
        <AdjustableYield
          originalYield={{ amount: 12, units: "cookies" }}
          updateIngredients={mockUpdateIngredients}
        />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("changes the input value when you press x1, x2, or x4 and calls updateIngredients", () => {
    fireEvent.press(screen.getByText("x2"));
    expect(screen.queryByDisplayValue("12")).toBeNull();
    screen.getByDisplayValue("24");
    expect(mockUpdateIngredients).toBeCalledTimes(1);
    expect(mockUpdateIngredients).toHaveBeenLastCalledWith(24);

    fireEvent.press(screen.getByText("x4"));
    expect(screen.queryByDisplayValue("24")).toBeNull();
    screen.getByDisplayValue("48");
    expect(mockUpdateIngredients).toBeCalledTimes(2);
    expect(mockUpdateIngredients).toHaveBeenLastCalledWith(48);

    fireEvent.press(screen.getByText("x1"));
    expect(screen.queryByDisplayValue("48")).toBeNull();
    screen.getByDisplayValue("12");
    expect(mockUpdateIngredients).toBeCalledTimes(3);
    expect(mockUpdateIngredients).toHaveBeenLastCalledWith(12);
  });

  it("doesn't let you edit the yield manually when x1, x2, or x4 is selected", () => {
    // x1 is selected by default
    expect(screen.getByDisplayValue("12")).toBeDisabled();

    fireEvent.press(screen.getByText("x2"));
    expect(screen.getByDisplayValue("24")).toBeDisabled();

    fireEvent.press(screen.getByText("x4"));
    expect(screen.getByDisplayValue("48")).toBeDisabled();
  });

  it("lets you edit the yield manually when 'custom' is selected and calls updateIngredients", () => {
    fireEvent.press(screen.getByText("Custom"));
    expect(screen.getByDisplayValue("12")).toBeEnabled();

    fireEvent.changeText(screen.getByDisplayValue("12"), "36");
    expect(screen.queryByDisplayValue("12")).toBe(null);
    screen.getByDisplayValue("36");

    expect(mockUpdateIngredients).toBeCalledTimes(1);
    expect(mockUpdateIngredients).toHaveBeenLastCalledWith(36);
  });

  it("resets the yield when you switch from 'custom' to x1, x2, or x4", () => {
    // Manually change to 36
    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "36");
    screen.getByDisplayValue("36");

    // Now reset back to original yield
    fireEvent.press(screen.getByText("x1"));
    expect(screen.queryByDisplayValue("36")).toBe(null);
    screen.getByDisplayValue("12");

    // Manually change to 36
    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "36");
    screen.getByDisplayValue("36");

    // Now set it to x2
    fireEvent.press(screen.getByText("x2"));
    expect(screen.queryByDisplayValue("36")).toBe(null);
    screen.getByDisplayValue("24");

    // Manually change to 36
    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("24"), "36");
    screen.getByDisplayValue("36");

    // Now set it to x4
    fireEvent.press(screen.getByText("x4"));
    expect(screen.queryByDisplayValue("36")).toBe(null);
    screen.getByDisplayValue("48");
  });

  it("shows an error when the yield is not a number and doesn't call udpateIngredient", () => {
    expect(screen.queryByText("Recipe yield must be a number")).toBeNull();

    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "abc");

    expect(screen.getByText("Recipe yield must be a number")).toBeVisible();
    expect(mockUpdateIngredients).toBeCalledTimes(0);
  });

  it("shows an error when the yield is negative and doesn't call updateIngredient", () => {
    const expectedErrorMsg = "Recipe yield must be greater than zero";
    expect(screen.queryByText(expectedErrorMsg)).toBeNull();

    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "-2");

    expect(screen.getByText(expectedErrorMsg)).toBeVisible();
    expect(mockUpdateIngredients).toBeCalledTimes(0);
  });

  it("shows an error when the yield is zero and doesn't call updateIngredient", () => {
    const expectedErrorMsg = "Recipe yield must be greater than zero";
    expect(screen.queryByText(expectedErrorMsg)).toBeNull();

    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "0");

    expect(screen.getByText(expectedErrorMsg)).toBeVisible();
    expect(mockUpdateIngredients).toBeCalledTimes(0);
  });

  it("shows an error when the yield is en empty string and doesn't call updateIngredient", () => {
    const expectedErrorMsg = "Recipe yield is required";
    expect(screen.queryByText(expectedErrorMsg)).toBeNull();

    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "");

    expect(screen.getByText(expectedErrorMsg)).toBeVisible();
    expect(mockUpdateIngredients).toBeCalledTimes(0);
  });

  it("removes error messages when the yield is reset to one of the predefined amounts", () => {
    fireEvent.press(screen.getByText("Custom"));
    fireEvent.changeText(screen.getByDisplayValue("12"), "abc");
    expect(screen.getByText("Recipe yield must be a number")).toBeVisible();

    fireEvent.press(screen.getByText("x4"));
    expect(screen.queryByText("Recipe yield must be a number")).toBeNull();
  });
});
