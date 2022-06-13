import Visas from "./visas";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

test("Visas", async () => {
  render(<Visas />);

  const header = await screen.findByText("Visas");

  expect(header).toBeInTheDocument();

  const addVisaButton = screen.getByRole("button", { name: "add" });

  expect(addVisaButton).toBeInTheDocument();

  userEvent.click(addVisaButton);

  const visaNumberInput = screen.getByRole("textbox", { name: "Visa Number" });

  expect(visaNumberInput).toBeInTheDocument();

  const visaNumber = "aVisaNumber";

  userEvent.type(visaNumberInput, visaNumber);

  expect(screen.getByDisplayValue(visaNumber)).toBeInTheDocument();

  const issuingCountryInput = screen.getByRole("textbox", {
    name: "Issuing Country",
  });

  expect(issuingCountryInput).toBeInTheDocument();

  const issuingCountry = "United Kingdom";

  userEvent.type(issuingCountryInput, issuingCountry);

  expect(screen.getByDisplayValue(issuingCountry)).toBeInTheDocument();

  // const startDateInput = screen.getByTestId("dd/mm/yyyy");
});
