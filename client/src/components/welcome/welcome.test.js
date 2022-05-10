import "@testing-library/jest-dom";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Welcome } from "./welcome";

test("welcome", () => {
  render(<Welcome />);

  expect(screen.getByText("Get Started")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Get Started"));
  expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
});
