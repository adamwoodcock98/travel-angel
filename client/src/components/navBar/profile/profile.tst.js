import "@testing-library/jest-dom";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Profile } from "./profile";

test("profile", () => {
  render(<Profile />);

  const account = "Account"
  const newValue = "New value";

  expect(screen.getByText(acu)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "add" }));

  expect(screen.getByRole("heading", { name: pass })).toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: pass })).toBeInTheDocument();

  const inputPassNumber = screen.getByRole("textbox", {
    name: "Passport Number",
  });
  expect(inputPassNumber).toBeInTheDocument();
  fireEvent.change(inputPassNumber, { target: { value: newValue } });
  expect(inputPassNumber.value).toBe(newValue);

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

  const inputNationality = screen.getByRole("textbox", {
    name: "Nationality",
  });
  expect(inputNationality).toBeInTheDocument();
  fireEvent.change(inputNationality, { target: { value: newValue } });
  expect(inputNationality.value).toBe(newValue);

  const inputCountry = screen.getByRole("textbox", {
    name: "Country",
  });
  expect(inputCountry).toBeInTheDocument();
  fireEvent.change(inputCountry, { target: { value: newValue } });
  expect(inputCountry.value).toBe(newValue);

  const inputDOB = screen.getByTestId("dob-input");
  expect(inputDOB).toBeInTheDocument();
  fireEvent.change(inputDOB, { target: { value: date } });
  expect(inputDOB.value).toBe(date);

  const inputGender = screen.getByTestId("gender-input");
  expect(inputGender).toBeInTheDocument();
  fireEvent.change(inputGender, { target: { value: "M" } });
  expect(inputGender.value).toBe("M");

  const inputPlaceOfBirth = screen.getByRole("textbox", {
    name: "Place of Birth",
  });
  expect(inputPlaceOfBirth).toBeInTheDocument();
  fireEvent.change(inputPlaceOfBirth, { target: { value: newValue } });
  expect(inputPlaceOfBirth.value).toBe(newValue);

  const inputDateOfIssue = screen.getByTestId("dof-input");
  expect(inputDateOfIssue).toBeInTheDocument();
  fireEvent.change(inputDateOfIssue, { target: { value: date } });
  expect(inputDateOfIssue.value).toBe(date);

  const inputDateOfExpiry = screen.getByTestId("doe-input");
  expect(inputDateOfExpiry).toBeInTheDocument();
  fireEvent.change(inputDateOfExpiry, { target: { value: date } });
  expect(inputDateOfExpiry.value).toBe(date);

  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Save" }));
});
