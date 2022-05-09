import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Profile } from "./profile";

test("profile", () => {
  render(<Profile />);

  expect(screen.getByText("E-mail")).toBeInTheDocument();
  expect(screen.getByText("Settings")).toBeInTheDocument();
});
