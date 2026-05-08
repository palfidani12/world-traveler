export { COLLECTIONS } from "@/lib/firestore/collections";
export { createCrudRepository } from "@/lib/firestore/crud";

export { usersRepository } from "@/lib/firestore/repositories/users";
export { tripsRepository } from "@/lib/firestore/repositories/trips";
export { bookingsRepository } from "@/lib/firestore/repositories/bookings";
export {
  budgetRepository,
  transactionsRepository,
  budgetAlertsRepository,
  budgetReportsRepository,
} from "@/lib/firestore/repositories/budget";
export { documentsRepository } from "@/lib/firestore/repositories/documents";
export { destinationsRepository, reviewsRepository } from "@/lib/firestore/repositories/destinations";
export {
  notificationsRepository,
  collaborationsRepository,
  activitiesRepository,
  messagesRepository,
  checklistsRepository,
} from "@/lib/firestore/repositories/app";
export {
  itineraryDaysRepository,
  itineraryActivitiesRepository,
  tripSettingsRepository,
} from "@/lib/firestore/repositories/trip-details";
export {
  documentFoldersRepository,
  reviewCommentsRepository,
  notificationPreferencesRepository,
} from "@/lib/firestore/repositories/preferences-and-folders";
