export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: string;
  tripId: string;
  authorId: string; // User ID
  title: string;
  content: string;
  rating: Rating;
  category?: "ACCOMMODATION" | "ACTIVITY" | "RESTAURANT" | "DESTINATION" | "TRANSPORT" | "OTHER";
  subject?: string; // e.g., hotel name, restaurant name
  photos?: string[]; // URLs
  likes: number;
  comments?: ReviewComment[];
  createdAt: string;
  updatedAt: string;
};

export type ReviewComment = {
  id: string;
  reviewId: string;
  authorId: string; // User ID
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Weather = {
  date: string; // ISO 8601
  temperature: {
    min: number;
    max: number;
    current?: number;
  };
  condition: string; // e.g., "Sunny", "Rainy", "Cloudy"
  icon?: string; // Weather icon code or URL
  humidity?: number; // Percentage
  windSpeed?: number; // km/h
  precipitation?: number; // mm
  uvIndex?: number;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  region?: string;
  description?: string;
  
  // Location
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  
  // Travel Info
  bestTimeToVisit?: {
    startMonth: number; // 1-12
    endMonth: number;
  };
  language?: string[];
  currency?: string;
  
  // Practical Info
  visaRequired?: boolean;
  vaccinesRequired?: string[];
  safetyRating?: Rating;
  
  // Media
  images?: string[];
  bannerImage?: string;
  
  // Metadata
  popularity?: number; // 0-100
  createdAt: string;
  updatedAt: string;
};

export type DestinationInfo = {
  destination: Destination;
  weather?: Weather[];
  reviews?: Review[];
  averageRating?: Rating;
  reviewCount: number;
  topAttraction?: string;
  estimatedTravelTime?: {
    from: string; // Previous destination
    duration: string;
    mode: "FLIGHT" | "TRAIN" | "CAR" | "BUS";
  };
};
