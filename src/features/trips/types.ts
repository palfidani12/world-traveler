import { BudgetData } from "@/features/budget/types";
import { FlightBooking, HotelBooking, TrainBooking, ActivityBooking } from "@/features/bookings/types";

export type TripStatus = "planned" | "in-progress" | "completed" | "archived";
export type TripVisibility = "private" | "shared" | "public";

export type Destination = {
  name: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone?: string;
};

export type TripDates = {
  startDate: string; // ISO 8601 format
  endDate: string;   // ISO 8601 format
};

export type Trip = {
  id: string;
  title: string;
  description?: string;
  destination: Destination | string; // Can be string for compatibility
  destinations?: Destination[]; // Multiple destinations
  dates: TripDates | string; // Can be string like "May 6 - May 20, 2026" for display
  status: TripStatus;
  visibility: TripVisibility;
  
  // Budget & Costs
  totalBudget: number; // In USD or primary currency
  budgetUsed?: number;
  currency?: string;
  
  // Media
  coverImage?: string;
  coverImageUrl?: string;
  
  // Participants
  createdBy: string; // User ID
  participants?: string[]; // User IDs of trip members
  
  // Travel Details
  season?: string; // e.g., "Spring 2026"
  tripType?: "leisure" | "business" | "adventure" | "workation" | "other";
  theme?: string; // e.g., "cultural", "beach", "mountain"
  
  // Metadata
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  
  // Associated Data (when populated)
  itinerary?: ItineraryDay[];
  bookings?: (FlightBooking | HotelBooking | TrainBooking | ActivityBooking)[];
  budget?: BudgetData;
};

export type ItineraryDay = {
  id: string;
  tripId: string;
  dayNumber: number;
  date: string; // ISO 8601
  title: string;
  destination?: Destination;
  activities: ItineraryActivity[];
};

export type ItineraryActivityType = "transport" | "accommodation" | "dining" | "activity" | "other";

export type ItineraryActivity = {
  id: string;
  dayId: string;
  type: ItineraryActivityType;
  title: string;
  description?: string;
  startTime?: string; // HH:MM
  endTime?: string;   // HH:MM
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  bookingId?: string; // Link to booking if applicable
  notes?: string;
  completed?: boolean;
};

export type TripSettings = {
  tripId: string;
  shareableLink?: string;
  allowInvites: boolean;
  allowCommenting: boolean;
  allowEditing: boolean;
  allowDownloads: boolean;
  reminderDays?: number[]; // Days before trip to send reminders
};

export const trips: Trip[] = [
  {
    id: "kyoto-spring",
    title: "Kyoto Spring",
    destination: "Kyoto, Japan",
    dates: "May 6 - May 20, 2026",
    season: "Spring 2026",
    status: "planned",
    visibility: "private",
    description: "A slow trip for temples, gardens, and early morning markets.",
    totalBudget: 5000,
    createdBy: "user-1",
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "lisbon-workation",
    title: "Lisbon Workation",
    destination: "Lisbon, Portugal",
    dates: "June 1 - July 15, 2026",
    season: "Summer 2026",
    status: "in-progress",
    visibility: "private",
    description: "Base for remote work, neighborhood walks, and day trips.",
    totalBudget: 8000,
    createdBy: "user-1",
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "patagonia-trek",
    title: "Patagonia Trek",
    destination: "Patagonia, Argentina",
    dates: "August 1 - August 30, 2026",
    season: "Winter 2027",
    status: "completed",
    visibility: "shared",
    description: "A long-form hiking route across dramatic southern landscapes.",
    totalBudget: 4500,
    createdBy: "user-1",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-05-01T10:00:00Z",
  },
];
