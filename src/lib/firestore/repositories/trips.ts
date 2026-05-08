import { where } from "firebase/firestore";

import type { Trip, TripStatus, TripVisibility } from "@/features/trips/types";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const base = createCrudRepository<Trip>(COLLECTIONS.trips);

export const tripsRepository = {
  ...base,
  listByCreator(userId: string) {
    return base.findByField("createdBy", userId);
  },
  listByStatus(status: TripStatus) {
    return base.findByField("status", status);
  },
  listByVisibility(visibility: TripVisibility) {
    return base.findByField("visibility", visibility);
  },
  listByParticipant(userId: string) {
    return base.list({
      constraints: [where("participants", "array-contains", userId)],
    });
  },
};
