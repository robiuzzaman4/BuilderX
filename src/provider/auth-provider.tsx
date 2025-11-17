"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  AuthError,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

type AuthPayload = {
  name?: string;
  email: string;
  password: string;
};

type AuthResponse = {
  user: User;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (payload: AuthPayload) => Promise<AuthResponse>;
  signUp: (payload: AuthPayload) => Promise<AuthResponse>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AUTH_ERROR_MAP: Record<string, string> = {
  "auth/user-not-found": "No account exists with this email.",
  "auth/wrong-password": "Incorrect password. Try again.",
  "auth/invalid-email": "Invalid email format.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-disabled":
    "This account has been disabled. Contact support if this is a mistake.",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (err: unknown) => {
    if (err instanceof FirebaseError) {
      const fbErr = err as AuthError;

      // If Firebase error code exists in our map → use friendly message
      const codeMessage = AUTH_ERROR_MAP[fbErr.code];

      // Otherwise, fallback to cleaned Firebase message
      const fallbackMessage =
        fbErr.message
          .replace(/^Firebase:\s*/, "")
          .replace(/\([^)]*\)/g, "")
          .trim() || "Authentication failed.";

      const finalMessage = codeMessage || fallbackMessage;

      toast.error(finalMessage, {
        description: "Please check your information and try again.",
        duration: 4000,
      });

      throw fbErr; // keep the behavior for caller catch blocks
    }

    // Not a Firebase error → rethrow original
    throw err;
  };

  const signIn = async (payload: AuthPayload): Promise<AuthResponse> => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      return { user: userCredential.user };
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
    // Fallback for TypeScript
    return Promise.reject(new Error("Sign in failed and error was thrown."));
  };

  const signUp = async (payload: AuthPayload): Promise<AuthResponse> => {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      if (payload.name) {
        await updateProfile(userCredential.user, {
          displayName: payload.name,
        });
      }

      return { user: userCredential.user };
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
    // Fallback for TypeScript
    return Promise.reject(new Error("Sign up failed and error was thrown."));
  };

  const logOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast.info("You have been signed out.");
    } catch (err) {
      const errorMsg = (err as Error).message || "Failed to sign out.";
      toast.error(`Sign Out Failed: ${errorMsg}`);
      console.error("Sign Out Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      logOut,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
