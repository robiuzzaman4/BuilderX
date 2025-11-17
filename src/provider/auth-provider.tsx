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
  AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

type AuthPayload = {
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
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

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
    const firebaseError = err as AuthError;
    // Clean up the error message for display
    const cleanMessage =
      firebaseError.message
        .replace(/Firebase: /, "")
        .replace(/\([\s\S]*\)/, "")
        .trim() || "Authentication Failed.";

    toast.error(cleanMessage, {
      description: "Please check your credentials or network connection.",
      duration: 4000,
    });

    // Re-throw the error so the calling component can still catch it
    throw firebaseError;
  };

  const signIn = async (payload: AuthPayload): Promise<AuthResponse> => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      toast.success(`Sign In Successful!`);
      return { user: userCredential.user };
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
    // This line is needed to satisfy TypeScript's Promise return type in the catch block
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

      toast.success(
        `Sign Up Successful! Welcome, ${userCredential.user.email}.`
      );
      return { user: userCredential.user };
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
    // This line is needed to satisfy TypeScript's Promise return type in the catch block
    return Promise.reject(new Error("Sign up failed and error was thrown."));
  };

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      signIn, // Now using the direct functions
      signUp, // Now using the direct functions
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
