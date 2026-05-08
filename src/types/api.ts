// Database and API request/response types

import type { 
  User, 
  Trip, 
  Booking, 
  Transaction, 
  Document,
  Review,
  Notification,
  Collaboration,
  Checklist
} from "./index";

// Create Request Types (Input validation)
export type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt" | "emailVerified">;
export type UpdateUserRequest = Partial<Omit<User, "id" | "email" | "createdAt">>;

export type CreateTripRequest = Omit<Trip, "id" | "createdAt" | "updatedAt">;
export type UpdateTripRequest = Partial<Omit<Trip, "id" | "createdAt" | "createdBy">>;

export type CreateBookingRequest = Omit<Booking, "id" | "createdAt" | "updatedAt">;
export type UpdateBookingRequest = Partial<Omit<Booking, "id" | "createdAt">>;

export type CreateTransactionRequest = Omit<Transaction, "id" | "createdAt" | "updatedAt">;
export type UpdateTransactionRequest = Partial<Omit<Transaction, "id" | "createdAt">>;

export type CreateDocumentRequest = Omit<Document, "id" | "uploadedAt" | "createdAt" | "updatedAt">;
export type UpdateDocumentRequest = Partial<Omit<Document, "id" | "createdAt" | "uploadedAt" | "uploadedBy">>;

export type CreateReviewRequest = Omit<Review, "id" | "likes" | "createdAt" | "updatedAt">;
export type UpdateReviewRequest = Partial<Omit<Review, "id" | "authorId" | "createdAt">>;

export type CreateNotificationRequest = Omit<Notification, "id" | "read" | "archived" | "createdAt" | "readAt">;

export type CreateCollaborationRequest = Omit<Collaboration, "id" | "createdAt" | "updatedAt" | "acceptedAt">;
export type UpdateCollaborationRequest = Partial<Omit<Collaboration, "id" | "createdAt" | "tripId" | "userId">>;

export type CreateChecklistRequest = Omit<Checklist, "id" | "createdAt" | "updatedAt">;
export type UpdateChecklistRequest = Partial<Omit<Checklist, "id" | "createdBy" | "createdAt">>;

// Query/Filter Types
export type UserFilters = {
  role?: "user" | "admin" | "moderator";
  plan?: "free" | "pro" | "premium";
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
};

export type TripFilters = {
  status?: Trip["status"];
  createdBy?: string;
  destination?: string;
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
};

export type BookingFilters = {
  tripId?: string;
  type?: Booking["type"];
  status?: Booking["status"];
  createdAfter?: string;
  createdBefore?: string;
};

export type TransactionFilters = {
  tripId?: string;
  category?: Transaction["category"];
  type?: Transaction["type"];
  dateAfter?: string;
  dateBefore?: string;
  minAmount?: number;
  maxAmount?: number;
};

// Aggregation & Report Types
export type TripStatistics = {
  totalTrips: number;
  plannedTrips: number;
  inProgressTrips: number;
  completedTrips: number;
  totalBudgeted: number;
  totalSpent: number;
  averageTripDuration: number;
  favoriteDestination?: string;
};

export type UserStatistics = {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  averageTripsPerUser: number;
  retentionRate?: number;
};

export type BudgetStatistics = {
  totalBudgeted: number;
  totalSpent: number;
  percentageSpent: number;
  categoryBreakdown: Record<string, number>;
  highestSpendingCategory: string;
  lowestSpendingCategory: string;
  averageDailySpend: number;
};

// Cache Keys
export type CacheKey = 
  | `user:${string}`
  | `trip:${string}`
  | `trip:${string}:bookings`
  | `trip:${string}:budget`
  | `trip:${string}:itinerary`
  | `user:${string}:trips`
  | `search:${string}`;

// Error Types
export type ErrorResponse = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
};

export type ValidationError = {
  field: string;
  message: string;
  value?: unknown;
};

export type ValidationResult = {
  valid: boolean;
  errors?: ValidationError[];
};

// Batch Operation Types
export type BatchOperation<T> = {
  action: "CREATE" | "UPDATE" | "DELETE";
  data: T;
};

export type BatchOperationResult<T> = {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
};

export type BatchOperationsResponse<T> = {
  successful: T[];
  failed: BatchOperationResult<T>[];
  summary: {
    total: number;
    succeeded: number;
    failed: number;
  };
};
