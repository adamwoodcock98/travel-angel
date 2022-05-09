import "@testing-library/jest-dom";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Settings } from "./settings";

test("settings", () => {
  render(<Settings />);

  const settings = "Settings";
  const newValue = "New value";

  expect(screen.getByText(settings)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: settings }));

  expect(screen.getByRole("heading", { name: settings })).toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: settings })).toBeInTheDocument();

  const inputFirstName = screen.getByRole("textbox", {
    name: "First Name",
  });
  expect(inputFirstName).toBeInTheDocument();
  fireEvent.change(inputFirstName, { target: { value: newValue } });
  expect(inputFirstName.value).toBe(newValue);

  const inputLastName = screen.getByRole("textbox", {
    name: "Last Name",
  });
  expect(inputLastName).toBeInTheDocument();
  fireEvent.change(inputLastName, { target: { value: newValue } });
  expect(inputLastName.value).toBe(newValue);

  const inputEmail = screen.getByRole("textbox", {
    name: "E-mail",
  });
  expect(inputEmail).toBeInTheDocument();
  fireEvent.change(inputEmail, { target: { value: newValue } });
  expect(inputEmail.value).toBe(newValue);

  const inputProfilePicture = screen.getByRole("textbox", {
    name: "Profile Picture",
  });
  expect(inputProfilePicture).toBeInTheDocument();
  fireEvent.change(inputProfilePicture, { target: { value: newValue } });
  expect(inputProfilePicture.value).toBe(newValue);

  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
});
