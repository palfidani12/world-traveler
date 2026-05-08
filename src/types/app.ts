export type NotificationType = 
  | "TRIP_REMINDER"
  | "BOOKING_CONFIRMATION"
  | "BOOKING_REMINDER"
  | "BUDGET_ALERT"
  | "TRAVEL_UPDATE"
  | "WEATHER_ALERT"
  | "COMMENT"
  | "SHARE"
  | "INVITE"
  | "SYSTEM";

export type NotificationChannel = "EMAIL" | "PUSH" | "IN_APP" | "SMS";

export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  channel: NotificationChannel;
  priority: NotificationPriority;
  
  // Links
  tripId?: string;
  bookingId?: string;
  relatedId?: string;
  actionUrl?: string;
  
  // Status
  read: boolean;
  archived: boolean;
  
  // Metadata
  createdAt: string;
  readAt?: string;
  expiresAt?: string; // ISO 8601 - when notification expires
};

export type NotificationPreferences = {
  userId: string;
  
  // Channel preferences
  channels: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    sms: boolean;
  };
  
  // Type preferences
  notifications: {
    tripReminders: boolean;
    bookingUpdates: boolean;
    budgetAlerts: boolean;
    travelUpdates: boolean;
    weatherAlerts: boolean;
    social: boolean;
    systemUpdates: boolean;
  };
  
  // Timing
  quietHours?: {
    enabled: boolean;
    startTime: string; // HH:MM
    endTime: string;   // HH:MM
  };
  
  // Email digest
  emailDigest: "IMMEDIATE" | "DAILY" | "WEEKLY" | "NONE";
  
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  userId: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "COMMENTED" | "SHARED" | "VIEWED";
  entityType: "TRIP" | "BOOKING" | "EXPENSE" | "DOCUMENT" | "REVIEW";
  entityId: string;
  entityName: string;
  tripId?: string;
  details?: Record<string, unknown>;
  
  // Social
  createdAt: string;
};

export type Collaboration = {
  id: string;
  tripId: string;
  userId: string; // The collaborator
  role: "VIEWER" | "EDITOR" | "ORGANIZER";
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canInvite: boolean;
    canManageBudget: boolean;
  };
  
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  invitedAt: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Attachment = {
  id: string;
  fileName: string;
  fileType: string; // MIME type
  fileSize: number;
  fileUrl: string;
  uploadedBy: string; // User ID
  uploadedAt: string;
  isPublic: boolean;
};

export type Message = {
  id: string;
  tripId: string;
  authorId: string;
  content: string;
  attachments?: Attachment[];
  likes: number;
  createdAt: string;
  updatedAt: string;
};

export type Checklist = {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  items: ChecklistItem[];
  createdBy: string;
  sharedWith?: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
};

export type ChecklistItem = {
  id: string;
  checklistId: string;
  text: string;
  completed: boolean;
  assignedTo?: string; // User ID
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export type PackingListCategory = 
  | "DOCUMENTS"
  | "CLOTHING"
  | "TOILETRIES"
  | "ELECTRONICS"
  | "HEALTH"
  | "RECREATION"
  | "OTHER";

export type PackingListItem = {
  id: string;
  checklistId: string;
  item: string;
  category: PackingListCategory;
  quantity: number;
  packed: boolean;
  weight?: number; // kg
};
