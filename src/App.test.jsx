import App from "./App";
import { render, screen, cleanup } from "@testing-library/react";

describe(() => {
  afterAll(() => cleanup());

  describe("Initialization of component and values", () => {
    test("App renders correctly", () => {
      render(<App />);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("form")).toBeInTheDocument();
    });
  });
});
