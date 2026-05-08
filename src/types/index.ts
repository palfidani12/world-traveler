import type { User } from "./user";
import type { Trip } from "@/features/trips/types";

// User Types
export type { User, UserRole, UserPlan, UserProfile, UserPreferences, UserSettings } from "./user";

// Trip & Travel Types
export type { 
  Trip, 
  TripStatus, 
  TripVisibility, 
  Destination, 
  TripDates, 
  ItineraryDay, 
  ItineraryActivity, 
  ItineraryActivityType, 
  TripSettings 
} from "@/features/trips/types";

// Booking Types
export type { 
  BookingStatus, 
  BookingType, 
  PaymentStatus,
  FlightBooking, 
  HotelBooking, 
  TrainBooking, 
  ActivityBooking, 
  Booking,
  BookingGroup,
  Address,
  Contact
} from "@/features/bookings/types";

// Budget & Finance Types
export type { 
  TransactionCategory, 
  TransactionType,
  Transaction, 
  BudgetCategory, 
  BudgetData,
  BudgetAlert,
  BudgetReport
} from "@/features/budget/types";

// Document Types
export type { Document, DocumentType, DocumentStatus, DocumentFolder } from "./document";

// Destination & Reviews Types
export type { Review, ReviewComment, Weather, Destination as DestinationType, DestinationInfo, Rating } from "./destination";

// Application & Collaboration Types
export type { 
  Notification,
  NotificationType,
  NotificationChannel,
  NotificationPriority,
  NotificationPreferences,
  Activity,
  Collaboration,
  Attachment,
  Message,
  Checklist,
  ChecklistItem,
  PackingListCategory,
  PackingListItem
} from "./app";

// Global Application Types
export type AppContextType = {
  currentUser?: User;
  currentTrip?: Trip;
  isLoading: boolean;
  error?: Error;
};

export type APIResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
};

export type PaginatedResponse<T> = APIResponse<T[]> & {
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type ListParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
  filters?: Record<string, unknown>;
};
