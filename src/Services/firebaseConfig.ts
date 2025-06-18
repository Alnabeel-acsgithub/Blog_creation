// Firebase configuration and Google Auth setup
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_aBVqV3yvosshhj1XEHypsrfuYxwLvZc",
  authDomain: "blogcraft-1854e.firebaseapp.com",
  projectId: "blogcraft-1854e",
  storageBucket: "blogcraft-1854e.firebasestorage.app",
  messagingSenderId: "6223954936",
  appId: "1:6223954936:web:ef8fad0b2d7ccd13388c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export { auth };
