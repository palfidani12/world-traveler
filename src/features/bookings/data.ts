import { Booking, FlightBooking, HotelBooking, TrainBooking } from "./types";

const flights: FlightBooking[] = [
  {
    id: "flight-1",
    type: "FLIGHT",
    confirmationCode: "CONF #LH8RD2",
    airline: "Lufthansa",
    cabin: "Economy",
    departure: {
      code: "LHR",
      city: "London",
      country: "UK",
      time: "14:20",
      date: "Oct 24, 2024",
    },
    arrival: {
      code: "HND",
      city: "Tokyo",
      country: "JP",
    },
    duration: "11H 25M",
    status: "CONF",
  },
  {
    id: "flight-2",
    type: "FLIGHT",
    confirmationCode: "CONF #NRT892",
    airline: "All Nippon Airways",
    cabin: "Business",
    departure: {
      code: "HND",
      city: "Tokyo",
      country: "JP",
      time: "09:15",
      date: "Nov 02, 2024",
    },
    arrival: {
      code: "CTS",
      city: "Sapporo",
      country: "JP",
    },
    duration: "2H 45M",
    status: "CONF",
  },
];

const hotels: HotelBooking[] = [
  {
    id: "hotel-1",
    type: "HOTEL",
    name: "Aman Tokyo",
    image: "aman-tokyo",
    startDate: "Oct 25",
    endDate: "Oct 30",
    nights: 5,
    status: "ACTIVE",
    checkInDate: "Oct 25, 2024",
    city: "Tokyo",
  },
  {
    id: "hotel-2",
    type: "HOTEL",
    name: "Hoshinoya Kyoto",
    image: "hoshinoya-kyoto",
    startDate: "Nov 05",
    endDate: "Nov 08",
    nights: 3,
    status: "PENDING",
    checkInDate: "Nov 05, 2024",
    city: "Kyoto",
  },
];

const trains: TrainBooking[] = [
  {
    id: "train-1",
    type: "TRAIN",
    confirmationCode: "SHINKANSEN NOZOMI 23",
    name: "Shinkansen Nozomi 23",
    departure: {
      code: "Tokyo",
      city: "Tokyo",
    },
    arrival: {
      code: "Kyoto",
      city: "Kyoto",
    },
    date: "Oct 31, 2024",
    seat: "Seat 6A",
    status: "CONF",
  },
  {
    id: "train-2",
    type: "TRAIN",
    confirmationCode: "NARITA EXPRESS 12",
    name: "Narita Express 12",
    departure: {
      code: "NRT Airport",
      city: "Narita",
    },
    arrival: {
      code: "Tokyo",
      city: "Tokyo",
    },
    date: "Oct 24, 2024",
    seat: "Seat 15C",
    status: "CONF",
  },
];

export const allBookings: Booking[] = [...flights, ...hotels, ...trains];

export function getBookingsByType(type: string): Booking[] {
  if (type === "FLIGHTS") return flights;
  if (type === "HOTELS") return hotels;
  if (type === "TRAINS") return trains;
  return allBookings;
}

export function getFlightBookings(): FlightBooking[] {
  return flights;
}

export function getHotelBookings(): HotelBooking[] {
  return hotels;
}

export function getTrainBookings(): TrainBooking[] {
  return trains;
}
