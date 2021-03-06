const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Flight = require("../../models/flight.js");
require("../mongodb_helper");

describe("Flight model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.flights.drop(() => {
      Flight.syncIndexes(() => {
        done();
      });
    });
  });

  const mockUserID = mongoose.Types.ObjectId();

  it("stores the flight number", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      flightNumber: "BA1609",
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.flightNumber).toEqual("BA1609");
  });

  it("stores the departure time", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureTime).toEqual("12:25");
  });

  it("stores the departure time as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the departure date", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureDate).toEqual(mockdepartureDate);
  });

  it("stores the departure date as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the airline", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      airline: "British Airways",
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.airline).toEqual("British Airways");
  });

  it("stores the airport of departure", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureAirport).toEqual("London Heathrow");
  });

  it("stores the airport of departure as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the city of departure", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureCity).toEqual("London");
  });

  it("stores the city of departure as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the departure terminal", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      departureTerminal: "Terminal 5",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureTerminal).toEqual("Terminal 5");
  });

  it("stores the departure gate", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      departureGate: "56",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.departureGate).toEqual("56");
  });

  it("stores the airport of arrival", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.arrivalAirport).toEqual("Los Angeles International Airport");
  });

  it("stores the airport of arrival as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the city of arrival", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.arrivalCity).toEqual("Los Angeles");
  });

  it("stores the city of arrival as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      isOutbound: true,
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the arrival terminal", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      arrivalTerminal: "TBIT",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.arrivalTerminal).toEqual("TBIT");
  });

  it("stores the arrival gate", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      arrivalGate: "33",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.arrivalGate).toEqual("33");
  });

  it("stores the booking reference", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      bookingReference: "AJX0138123",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.bookingReference).toEqual("AJX0138123");
  });

  it("stores whether the journey is outbound", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.isOutbound).toEqual(true);
  });

  it("stores whether the journey is outbound as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the user ID", () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      arrivalCity: "Los Angeles",
      bookingReference: "AJX0138123",
      isOutbound: true,
      user: mockUserID,
    });
    expect(flight.user).toEqual(mockUserID);
  });

  it("stores the user as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      isOutbound: true,
      arrivalCity: "Los Angeles",
    });
    await expect(flight.save()).rejects.toThrow();
  });

  it("stores the trip as a required value", async () => {
    advanceTo();
    const mockdepartureDate = new Date();
    const flight = new Flight({
      departureTime: "12:25",
      departureDate: mockdepartureDate,
      departureAirport: "London Heathrow",
      departureCity: "London",
      arrivalAirport: "Los Angeles International Airport",
      isOutbound: true,
      arrivalCity: "Los Angeles",
      user: mockUserID,
    });
    await expect(flight.save()).rejects.toThrow();
  });
});
