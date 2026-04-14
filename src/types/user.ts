export type User = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  age?: number;
  avatar?: string;
};
