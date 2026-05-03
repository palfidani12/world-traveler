import { redirect } from "next/navigation";
import { verifyServerSession } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const sessionUser = await verifyServerSession();

  if (sessionUser) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
