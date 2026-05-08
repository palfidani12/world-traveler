import type { Destination, Review } from "@/types/destination";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const destinationsBase = createCrudRepository<Destination>(COLLECTIONS.destinations);
const reviewsBase = createCrudRepository<Review>(COLLECTIONS.reviews);

export const destinationsRepository = {
  ...destinationsBase,
  listByCountry(country: string) {
    return destinationsBase.findByField("country", country);
  },
};

export const reviewsRepository = {
  ...reviewsBase,
  listByTripId(tripId: string) {
    return reviewsBase.findByField("tripId", tripId);
  },
  listByAuthor(authorId: string) {
    return reviewsBase.findByField("authorId", authorId);
  },
};
