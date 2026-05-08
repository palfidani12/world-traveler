export type UserRole = "user" | "admin" | "moderator";
export type UserPlan = "free" | "pro" | "premium";

export type UserProfile = {
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  dateOfBirth?: string; // ISO 8601
  country?: string;
  timezone?: string;
};

export type UserPreferences = {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: "public" | "friends" | "private";
    showActivity: boolean;
    allowMessages: boolean;
  };
};

export type UserSettings = {
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
  sessionTimeout?: number; // Minutes
  defaultCurrency?: string;
  defaultLanguage?: string;
};

export type User = {
  // Authentication
  id: string;
  email: string;
  emailVerified: boolean;
  
  // Profile
  profile: UserProfile;
  
  // Account
  role: UserRole;
  plan: UserPlan;
  
  // Relationships
  friendIds?: string[];
  blockedUserIds?: string[];
  
  // Preferences & Settings
  preferences?: UserPreferences;
  settings?: UserSettings;
  
  // Metadata
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  lastLoginAt?: string; // ISO 8601
  
  // Legacy fields (for backward compatibility)
  age?: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};
