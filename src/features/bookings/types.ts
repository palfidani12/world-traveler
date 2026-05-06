export type BookingStatus = "CONF" | "PENDING" | "ACTIVE" | "CANCELLED";
export type BookingType = "FLIGHT" | "HOTEL" | "TRAIN" | "ACTIVITY";

export type FlightBooking = {
  id: string;
  type: "FLIGHT";
  confirmationCode: string;
  airline: string;
  cabin: string;
  departure: {
    code: string;
    city: string;
    country: string;
    time: string;
    date: string;
  };
  arrival: {
    code: string;
    city: string;
    country: string;
  };
  duration: string;
  status: BookingStatus;
};

export type HotelBooking = {
  id: string;
  type: "HOTEL";
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: BookingStatus;
  checkInDate: string;
  city: string;
};

export type TrainBooking = {
  id: string;
  type: "TRAIN";
  confirmationCode: string;
  name: string;
  departure: {
    city: string;
    code: string;
  };
  arrival: {
    city: string;
    code: string;
  };
  date: string;
  seat: string;
  status: BookingStatus;
};

export type Booking = FlightBooking | HotelBooking | TrainBooking;
