import { render, screen, cleanup, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  afterAll(() => {
    cleanup();
  });

  describe("Initialization of component and html markup check", () => {
    test("App renders correctly", () => {
      render(<App />);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("form")).toBeInTheDocument();
      expect(screen.getByText(`0,0`)).toBeInTheDocument();
      expect(screen.getByText(`0,0`).parentElement).toHaveClass("active");
      expect(screen.getByPlaceholderText("Enter X")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter Y")).toBeInTheDocument();
      expect(screen.getByTitle("direction")).toBeInTheDocument();
      expect(screen.getByTitle("form-submit")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter your command!")
      ).toBeInTheDocument();
    });
  });

  describe("X, Y and DIR input and state changes", () => {
    beforeEach(() => {
      render(<App />);
    });

    test("X change", async () => {
      const xInput = screen.getByPlaceholderText("Enter X");
      await user.type(xInput, "1");
      expect(screen.getByText("1,0").parentElement).toHaveClass("active");
    });

    test("Y change", async () => {
      const yInput = screen.getByPlaceholderText("Enter Y");
      await user.type(yInput, "1");
      expect(screen.getByText("0,1").parentElement).toHaveClass("active");
    });

    test("DIR change", async () => {
      const dirInput = screen.getByTitle("direction");
      await user.selectOptions(dirInput, "S");
      expect(screen.getByTitle("direction_indicator")).toHaveTextContent("S");
    });
  });

  describe("Form submit and active movment", () => {
    beforeEach(() => {
      render(<App />);
    });

    test("1st test case, 1,2 N with HGHGGHGHG should result in 1,3 N", async () => {
      const xInput = screen.getByPlaceholderText("Enter X");
      const yInput = screen.getByPlaceholderText("Enter Y");
      const commandInput = screen.getByPlaceholderText("Enter your command!");
      const submitBtn = screen.getByTitle("form-submit");

      await user.type(xInput, "1");
      await user.type(yInput, "2");
      await user.type(commandInput, "HGHGGHGHG");
      await user.click(submitBtn);

      await waitFor(() => {
        const cell = screen.getByText("1,3").parentElement;
        expect(cell).toHaveClass("active");
        expect(cell.querySelector("h1")).toBeInTheDocument();
        expect(cell.querySelector("h1")).toHaveTextContent("N");
      });
    });

    test("2nd test case, 0,0 N with RRFLFFLRF should result in 3,1 E", async () => {
      const commandInput = screen.getByPlaceholderText("Enter your command!");
      const submitBtn = screen.getByTitle("form-submit");

      await user.type(commandInput, "RRFLFFLRF");
      await user.click(submitBtn);

      await waitFor(() => {
        const cell = screen.getByText("3,1").parentElement;
        expect(cell).toHaveClass("active");
        expect(cell.querySelector("h1")).toBeInTheDocument();
        expect(cell.querySelector("h1")).toHaveTextContent("E");
      });
    });

    test("3rd test case, 3,3 N with GAADADADAA should result in 2,4 S", async () => {
      const xInput = screen.getByPlaceholderText("Enter X");
      const yInput = screen.getByPlaceholderText("Enter Y");
      const commandInput = screen.getByPlaceholderText("Enter your command!");
      const submitBtn = screen.getByTitle("form-submit");

      await user.type(xInput, "3");
      await user.type(yInput, "3");
      await user.type(commandInput, "GAADADADAA");
      await user.click(submitBtn);

      await waitFor(() => {
        const cell = screen.getByText("2,4").parentElement;
        expect(cell).toHaveClass("active");
        expect(cell.querySelector("h1")).toBeInTheDocument();
        expect(cell.querySelector("h1")).toHaveTextContent("S");
      });
    });
  });
});
