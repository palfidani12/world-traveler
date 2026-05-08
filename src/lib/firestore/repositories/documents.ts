import type { Document } from "@/types/document";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const base = createCrudRepository<Document>(COLLECTIONS.documents);

export const documentsRepository = {
  ...base,
  listByTripId(tripId: string) {
    return base.findByField("tripId", tripId);
  },
  listByUploader(userId: string) {
    return base.findByField("uploadedBy", userId);
  },
};
