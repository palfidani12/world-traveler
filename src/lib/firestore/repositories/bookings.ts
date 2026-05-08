import type { Booking, BookingStatus, BookingType } from "@/features/bookings/types";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const base = createCrudRepository<Booking>(COLLECTIONS.bookings);

export const bookingsRepository = {
  ...base,
  listByTripId(tripId: string) {
    return base.findByField("tripId", tripId);
  },
  listByType(type: BookingType) {
    return base.findByField("type", type);
  },
  listByStatus(status: BookingStatus) {
    return base.findByField("status", status);
  },
};
