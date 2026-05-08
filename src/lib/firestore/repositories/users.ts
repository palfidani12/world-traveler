import type { User, UserPlan, UserRole } from "@/types/user";

import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const base = createCrudRepository<User>(COLLECTIONS.users);

export const usersRepository = {
  ...base,
  listByEmail(email: string) {
    return base.findByField("email", email);
  },
  listByRole(role: UserRole) {
    return base.findByField("role", role);
  },
  listByPlan(plan: UserPlan) {
    return base.findByField("plan", plan);
  },
};
