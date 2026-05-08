import type {
  Activity,
  Checklist,
  Collaboration,
  Message,
  Notification,
} from "@/types/app";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const notificationsBase = createCrudRepository<Notification>(COLLECTIONS.notifications);
const collaborationsBase = createCrudRepository<Collaboration>(COLLECTIONS.collaborations);
const activitiesBase = createCrudRepository<Activity>(COLLECTIONS.activities);
const messagesBase = createCrudRepository<Message>(COLLECTIONS.messages);
const checklistsBase = createCrudRepository<Checklist>(COLLECTIONS.checklists);

export const notificationsRepository = {
  ...notificationsBase,
  listByUserId(userId: string) {
    return notificationsBase.findByField("userId", userId);
  },
};

export const collaborationsRepository = {
  ...collaborationsBase,
  listByTripId(tripId: string) {
    return collaborationsBase.findByField("tripId", tripId);
  },
  listByUserId(userId: string) {
    return collaborationsBase.findByField("userId", userId);
  },
};

export const activitiesRepository = {
  ...activitiesBase,
  listByUserId(userId: string) {
    return activitiesBase.findByField("userId", userId);
  },
  listByTripId(tripId: string) {
    return activitiesBase.findByField("tripId", tripId);
  },
};

export const messagesRepository = {
  ...messagesBase,
  listByTripId(tripId: string) {
    return messagesBase.findByField("tripId", tripId);
  },
  listByAuthor(authorId: string) {
    return messagesBase.findByField("authorId", authorId);
  },
};

export const checklistsRepository = {
  ...checklistsBase,
  listByTripId(tripId: string) {
    return checklistsBase.findByField("tripId", tripId);
  },
  listByCreator(createdBy: string) {
    return checklistsBase.findByField("createdBy", createdBy);
  },
};
