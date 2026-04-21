// src/lib/firebase/admin.ts
import * as admin from "firebase-admin";

// 1. Check if an app has already been initialized to prevent duplicate initialization errors
if (!admin.apps.length) {
  
  // 2. Initialize the app with your highly secure service account credentials
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      
      // CRITICAL BUG FIX: 
      // When Vercel or Next.js reads environment variables, it sometimes escapes the newline characters.
      // This replace() function ensures the private key is formatted perfectly.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// 3. Export the admin instances so you can use them in your API Routes and Server Components
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();