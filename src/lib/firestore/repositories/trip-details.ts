import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import type { ItineraryActivity, ItineraryDay, TripSettings } from "@/features/trips/types";

import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const itineraryDaysBase = createCrudRepository<ItineraryDay>(COLLECTIONS.itineraryDays);
const itineraryActivitiesBase = createCrudRepository<ItineraryActivity>(COLLECTIONS.itineraryActivities);
const tripSettingsCollectionRef = collection(db, COLLECTIONS.tripSettings);

export const itineraryDaysRepository = {
  ...itineraryDaysBase,
  listByTripId(tripId: string) {
    return itineraryDaysBase.findByField("tripId", tripId);
  },
};

export const itineraryActivitiesRepository = {
  ...itineraryActivitiesBase,
  listByDayId(dayId: string) {
    return itineraryActivitiesBase.findByField("dayId", dayId);
  },
  listByType(type: ItineraryActivity["type"]) {
    return itineraryActivitiesBase.findByField("type", type);
  },
};

export const tripSettingsRepository = {
  async upsertByTripId(settings: TripSettings): Promise<void> {
    await setDoc(doc(tripSettingsCollectionRef, settings.tripId), settings, { merge: true });
  },

  async getByTripId(tripId: string): Promise<TripSettings | null> {
    const snapshot = await getDoc(doc(tripSettingsCollectionRef, tripId));
    if (!snapshot.exists()) return null;
    return snapshot.data() as TripSettings;
  },

  async removeByTripId(tripId: string): Promise<void> {
    await deleteDoc(doc(tripSettingsCollectionRef, tripId));
  },
};
