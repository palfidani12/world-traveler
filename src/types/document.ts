export type DocumentType = "PASSPORT" | "VISA" | "TICKET" | "BOOKING_CONFIRMATION" | "INSURANCE" | "ITINERARY" | "OTHER";
export type DocumentStatus = "ACTIVE" | "EXPIRED" | "EXPIRING_SOON";

export type Document = {
  id: string;
  tripId: string;
  title: string;
  type: DocumentType;
  fileUrl: string;
  fileName: string;
  fileSize: number; // in bytes
  uploadedBy: string; // User ID
  uploadedAt: string; // ISO 8601
  
  // For identification documents
  expiryDate?: string;
  status?: DocumentStatus;
  issueCountry?: string;
  
  // Metadata
  tags?: string[];
  isShared: boolean;
  sharedWith?: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
};

export type DocumentFolder = {
  id: string;
  tripId: string;
  name: string;
  description?: string;
  documents: string[]; // Document IDs
  createdAt: string;
  updatedAt: string;
};
