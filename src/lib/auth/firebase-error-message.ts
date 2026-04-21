import type { FirebaseError } from "firebase/app";

const CONFIGURATION_NOT_FOUND_MESSAGE =
  "Firebase Auth is not configured for this API key/project. In Firebase Console, enable Authentication and at least one sign-in provider (Email/Password), then verify this app uses that project's web API key.";

export function getFirebaseAuthErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? (error as FirebaseError).code
      : null;

  if (code === "auth/configuration-not-found") {
    return CONFIGURATION_NOT_FOUND_MESSAGE;
  }

  if (code === "auth/operation-not-allowed") {
    return "This sign-in method is disabled in Firebase Console. Enable the provider under Authentication > Sign-in method.";
  }

  if (code === "auth/invalid-api-key") {
    return "Invalid Firebase Web API key. Check NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Authentication failed. Please try again.";
}
