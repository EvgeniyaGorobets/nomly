import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { MainMenu } from "../../../src/ui/Home/MainMenu";

describe("MainMenu", () => {
  it("is closed by default", () => {
    const mockOpenModalFn = jest.fn();

    render(
      <PaperProvider>
        <MainMenu openDeleteRecipesModal={mockOpenModalFn} />
      </PaperProvider>
    );

    expect(screen.queryByText("Download recipes")).toBe(null);
    expect(screen.queryByText("Import recipes")).toBe(null);
    expect(screen.queryByText("Delete all recipes")).toBe(null);
  });

  it("opens when the vertical dot icon is pressed", () => {
    const mockOpenModalFn = jest.fn();

    render(
      <PaperProvider>
        <MainMenu openDeleteRecipesModal={mockOpenModalFn} />
      </PaperProvider>
    );

    fireEvent.press(screen.getByA11yHint("Toggle main menu"));

    expect(screen.getAllByText("Download recipes").length).toBe(1);
    expect(screen.getAllByText("Import recipes").length).toBe(1);
    expect(screen.getAllByText("Delete all recipes").length).toBe(1);
  });

  it("opens the DeleteRecipesModal when 'Delete all recipes' is pressed", () => {
    const mockOpenModalFn = jest.fn();

    render(
      <PaperProvider>
        <MainMenu openDeleteRecipesModal={mockOpenModalFn} />
      </PaperProvider>
    );

    // First, open the main menu
    fireEvent.press(screen.getByA11yHint("Toggle main menu"));

    fireEvent.press(screen.getByText("Delete all recipes"));
    expect(mockOpenModalFn).toHaveBeenCalledTimes(1);
  });
});
