import { Booking, FlightBooking, HotelBooking, TrainBooking, ActivityBooking } from "./types";

const flights: FlightBooking[] = [
  {
    id: "flight-1",
    type: "FLIGHT",
    tripId: "trip-kyoto-spring",
    confirmationCode: "CONF #LH8RD2",
    airline: "Lufthansa",
    cabin: "ECONOMY",
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
      time: "09:30",
      date: "Oct 25, 2024",
    },
    duration: "11H 25M",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    price: 1200,
    currency: "USD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "flight-2",
    type: "FLIGHT",
    tripId: "trip-kyoto-spring",
    confirmationCode: "CONF #NRT892",
    airline: "All Nippon Airways",
    cabin: "BUSINESS",
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
      time: "11:00",
      date: "Nov 02, 2024",
    },
    duration: "2H 45M",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    price: 350,
    currency: "USD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const hotels: HotelBooking[] = [
  {
    id: "hotel-1",
    type: "HOTEL",
    tripId: "trip-kyoto-spring",
    name: "Aman Tokyo",
    address: {
      street: "1-5-6 Otemachi",
      city: "Tokyo",
      state: "Tokyo",
      postalCode: "100-0004",
      country: "JP",
    },
    roomType: "Deluxe Suite",
    checkInDate: "Oct 25, 2024",
    checkOutDate: "Oct 30, 2024",
    nights: 5,
    guests: [{ name: "John Doe", phone: "+1-555-0100", email: "john@example.com" }],
    confirmationCode: "AMN-TOK-12345",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    pricePerNight: 450,
    price: 2250,
    currency: "USD",
    amenities: ["WiFi", "Spa", "Restaurant", "Gym"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "hotel-2",
    type: "HOTEL",
    tripId: "trip-kyoto-spring",
    name: "Hoshinoya Kyoto",
    address: {
      street: "Sagatenryuji Susukinobabacho",
      city: "Kyoto",
      state: "Kyoto",
      postalCode: "616-8385",
      country: "JP",
    },
    roomType: "Riverside Pavilion",
    checkInDate: "Nov 05, 2024",
    checkOutDate: "Nov 08, 2024",
    nights: 3,
    guests: [{ name: "John Doe", phone: "+1-555-0100", email: "john@example.com" }],
    confirmationCode: "HSH-KYO-67890",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    pricePerNight: 600,
    price: 1800,
    currency: "USD",
    amenities: ["Kaiseki Dining", "Onsen", "River View", "Traditional Tea"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const trains: TrainBooking[] = [
  {
    id: "train-1",
    type: "TRAIN",
    tripId: "trip-kyoto-spring",
    confirmationCode: "SHINKANSEN NOZOMI 23",
    provider: "Japan Railways (JR)",
    departure: {
      station: "Tokyo Station",
      city: "Tokyo",
      code: "TYO",
      time: "14:00",
      date: "Oct 31, 2024",
    },
    arrival: {
      station: "Kyoto Station",
      city: "Kyoto",
      code: "KYO",
      time: "16:15",
      date: "Oct 31, 2024",
    },
    seatNumber: "6A",
    compartment: "Car 7",
    passengers: [{ name: "John Doe", phone: "+1-555-0100", email: "john@example.com" }],
    status: "CONFIRMED",
    paymentStatus: "PAID",
    price: 120,
    currency: "USD",
    classType: "FIRST",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "train-2",
    type: "TRAIN",
    tripId: "trip-kyoto-spring",
    confirmationCode: "NARITA EXPRESS 12",
    provider: "Narita Express (N'EX)",
    departure: {
      station: "Narita International Airport Terminal 1",
      city: "Narita",
      code: "NRT",
      time: "08:15",
      date: "Oct 24, 2024",
    },
    arrival: {
      station: "Tokyo Station",
      city: "Tokyo",
      code: "TYO",
      time: "09:45",
      date: "Oct 24, 2024",
    },
    seatNumber: "15C",
    compartment: "Car 4",
    passengers: [{ name: "John Doe", phone: "+1-555-0100", email: "john@example.com" }],
    status: "CONFIRMED",
    paymentStatus: "PAID",
    price: 60,
    currency: "USD",
    classType: "STANDARD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const activities: ActivityBooking[] = [
  {
    id: "activity-1",
    type: "ACTIVITY",
    tripId: "trip-kyoto-spring",
    name: "Traditional Kimono Tea Ceremony",
    provider: "Kyoto Cultural Center",
    description: "Experience authentic Japanese tea ceremony in traditional kimono",
    location: {
      street: "1 Chome Kamogawakaburenjocho",
      city: "Kyoto",
      state: "Kyoto",
      postalCode: "605-0073",
      country: "JP",
    },
    date: "Nov 06, 2024",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    category: "CULTURE",
    participants: [{ name: "John Doe", phone: "+1-555-0100", email: "john@example.com" }],
    participantCount: 1,
    confirmationCode: "TEA-KYO-001",
    meetingPoint: "Main entrance of Kyoto Cultural Center",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    price: 85,
    currency: "USD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const allBookings: Booking[] = [...flights, ...hotels, ...trains, ...activities];

export function getBookingsByType(type: string): Booking[] {
  if (type === "FLIGHTS") return flights;
  if (type === "HOTELS") return hotels;
  if (type === "TRAINS") return trains;
  if (type === "ACTIVITIES") return activities;
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
