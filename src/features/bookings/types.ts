export type BookingStatus = "CONFIRMED" | "PENDING" | "ACTIVE" | "CANCELLED" | "COMPLETED" | "FAILED";
export type BookingType = "FLIGHT" | "HOTEL" | "TRAIN" | "ACTIVITY";
export type PaymentStatus = "PAID" | "PENDING" | "REFUNDED" | "PARTIALLY_PAID";

export type Address = {
  street?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
};

export type Contact = {
  name: string;
  phone?: string;
  email?: string;
};

export type FlightBooking = {
  id: string;
  tripId: string;
  type: "FLIGHT";
  confirmationCode: string;
  airline: string;
  cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  departure: {
    code: string;
    city: string;
    country: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    code: string;
    city: string;
    country: string;
    time?: string;
    date?: string;
    terminal?: string;
  };
  duration?: string;
  passengers?: Contact[];
  seatNumbers?: string[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  price: number;
  currency: string;
  documentationUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type HotelBooking = {
  id: string;
  tripId: string;
  type: "HOTEL";
  name: string;
  image?: string;
  address: Address;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: Contact[];
  confirmationCode: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  price: number;
  pricePerNight: number;
  currency: string;
  amenities?: string[];
  specialRequests?: string;
  documentationUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type TrainBooking = {
  id: string;
  tripId: string;
  type: "TRAIN";
  confirmationCode: string;
  provider: string;
  departure: {
    city: string;
    station: string;
    code?: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    station: string;
    code?: string;
    time?: string;
    date?: string;
  };
  seatNumber?: string;
  compartment?: string;
  passengers: Contact[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  price: number;
  currency: string;
  classType?: "FIRST" | "SECOND" | "STANDARD";
  documentationUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityBooking = {
  id: string;
  tripId: string;
  type: "ACTIVITY";
  name: string;
  provider?: string;
  description?: string;
  location: Address;
  date: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  category?: "TOUR" | "DINING" | "SPORTS" | "CULTURE" | "RELAXATION" | "OTHER";
  participants: Contact[];
  participantCount: number;
  confirmationCode: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  price: number;
  currency: string;
  meetingPoint?: string;
  specialInstructions?: string;
  documentationUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Booking = FlightBooking | HotelBooking | TrainBooking | ActivityBooking;

export type BookingGroup = {
  tripId: string;
  flights: FlightBooking[];
  hotels: HotelBooking[];
  trains: TrainBooking[];
  activities: ActivityBooking[];
  totalCost: number;
  currency: string;
};
