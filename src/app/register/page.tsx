import { redirect } from "next/navigation";
import { verifyServerSession } from "@/lib/auth/session";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const sessionUser = await verifyServerSession();

  if (sessionUser) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
