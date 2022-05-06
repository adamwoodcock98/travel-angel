import "@testing-library/jest-dom";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ViewAccommodation } from "./accommodation";

test("Accommodation", () => {
  render(<ViewAccommodation />);

  expect(screen.getByText("Accommodation")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "add" }));

  expect(
    screen.getByRole("textbox", { name: "Accommodation Name" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: "Accommodation Contact Number" })
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
  fireEvent.change(screen.getByTestId("name"), {
    target: { value: name },
  });

  const contactNumber = 98764321265;
  fireEvent.change(screen.getByTestId("contactNumber"), {
    target: { value: contactNumber },
  });

  const checkInDate = "01/01/2023";
  fireEvent.change(screen.getByTestId("checkInDateInput"), {
    target: { value: checkInDate },
  });

  const checkOutDate = "02/01/2023";
  fireEvent.change(screen.getByTestId("checkOutDateInput"), {
    target: { value: checkOutDate },
  });

  const checkInTime = "17:00";
  fireEvent.change(screen.getByTestId("checkOutDateInput"), {
    target: { value: checkInTime },
  });

  const checkOutTime = "11:00";
  fireEvent.change(screen.getByTestId("checkOutDateInput"), {
    target: { value: checkOutTime },
  });

  const bookingReference = "Booking Reference";
  fireEvent.change(screen.getByTestId("bookingReference"), {
    target: { value: bookingReference },
  });

  const buildingNumber = "42";
  fireEvent.change(screen.getByTestId("buildingNumber"), {
    target: { value: buildingNumber },
  });

  const addressLine1 = "Wallaby Way";
  fireEvent.change(screen.getByTestId("addressLine1"), {
    target: { value: addressLine1 },
  });

  const city = "Sydney";
  fireEvent.change(screen.getByTestId("city"), {
    target: { value: city },
  });

  const postalCode = "2000";
  fireEvent.change(screen.getByTestId("postalCode"), {
    target: { value: postalCode },
  });

  const stateCounty = "NSW";
  fireEvent.change(screen.getByTestId("stateCounty"), {
    target: { value: stateCounty },
  });

  fireEvent.click(screen.getByTestId("saveAccommodationDetails"));

  // expect(
  //   screen.getByText("Address: 42, Wallaby Way, Sydney, NSW, 2000")
  // ).toBeInTheDocument();
});
