import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { ViewAccommodation } from "./accommodation";

xtest("Accommodation", async () => {
  render(<ViewAccommodation />);

  expect(await screen.findByText("Accommodation")).toBeInTheDocument();

  // screen.debug()

  const addAccomButton = screen.getByRole("button", { name: "add" });

  expect(addAccomButton).toBeInTheDocument();

  userEvent.click(addAccomButton);

  const accomNameInput = screen.getByRole("textbox", { name: "Venue name" });

  expect(accomNameInput).toBeInTheDocument();

  expect(
    screen.getByRole("spinbutton", { name: "Contact Number" })
  ).toBeInTheDocument();

  expect(screen.getByTestId("checkInDate")).toBeInTheDocument();

  expect(screen.getByTestId("checkOutDate")).toBeInTheDocument();

  expect(screen.getByTestId("checkInTime")).toBeInTheDocument();

  expect(screen.getByTestId("checkOutTime")).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Booking Reference" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Building Number" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Building Name" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Address Line 1" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Address Line 2" })
  ).toBeInTheDocument();

  expect(screen.getByRole("textbox", { name: "City" })).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "Postal/Zip Code" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: "State/Province" })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Country" })).toBeInTheDocument();

  const name = "P. Sherman";
  userEvent.change(screen.getByTestId("name"), {
    target: { value: name },
  });

  const contactNumber = 98764321265;
  userEvent.change(screen.getByTestId("contactNumber"), {
    target: { value: contactNumber },
  });

  const checkInDate = "01/01/2023";
  userEvent.change(screen.getByTestId("checkInDateInput"), {
    target: { value: checkInDate },
  });

  const checkOutDate = "02/01/2023";
  const checkOut = screen.getByTestId("checkOutDateInput");
  userEvent.change(checkOut, {
    target: { value: checkOutDate },
  });
  expect(checkOut.value).toBe(checkOutDate);

  const checkInTime = "17:00";
  userEvent.change(screen.getByTestId("checkOutDateInput"), {
    target: { value: checkInTime },
  });

  const checkOutTime = "11:00";
  userEvent.change(screen.getByTestId("checkOutDateInput"), {
    target: { value: checkOutTime },
  });

  const bookingReference = "Booking Reference";
  userEvent.change(screen.getByTestId("bookingReference"), {
    target: { value: bookingReference },
  });

  const buildingNumber = "42";
  userEvent.change(screen.getByTestId("buildingNumber"), {
    target: { value: buildingNumber },
  });

  const addressLine1 = "Wallaby Way";
  userEvent.change(screen.getByTestId("addressLine1"), {
    target: { value: addressLine1 },
  });

  const city = "Sydney";
  userEvent.change(screen.getByTestId("city"), {
    target: { value: city },
  });

  const postalCode = "2000";
  userEvent.change(screen.getByTestId("postalCode"), {
    target: { value: postalCode },
  });

  const stateCounty = "NSW";
  userEvent.change(screen.getByTestId("stateCounty"), {
    target: { value: stateCounty },
  });

  userEvent.click(screen.getByTestId("saveAccommodationDetails"));
  expect(
    screen.getByText("Address: 42, Wallaby Way, Sydney, NSW, 2000")
  ).toBeInTheDocument();
});
