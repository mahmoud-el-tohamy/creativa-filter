"use client";

import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AppUser, getUserProfile } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  // Listen for global toasts (e.g. from hooks like useRequireAuth)
  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(null), 5000);
    };
    window.addEventListener("global-toast", handleToast);
    return () => window.removeEventListener("global-toast", handleToast);
  }, []);

  const signOut = React.useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error("Sign out error", e);
    }
    setFirebaseUser(null);
    setUser(null);
    document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      if (fUser) {
        setFirebaseUser(fUser);
        try {
          const profile = await getUserProfile(fUser.uid);
          if (profile) {
            if (!profile.isActive) {
              setToastMessage("تم تعطيل حسابك");
              setTimeout(() => setToastMessage(null), 5000);
              await signOut();
            } else {
              setUser(profile);
              document.cookie = "auth-session=active; path=/; max-age=86400; samesite=strict";
            }
          } else {
            setUser(null);
            document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
        document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, signOut }}>
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 bg-red-600 text-white transition-all text-center min-w-[200px]">
          {toastMessage}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
