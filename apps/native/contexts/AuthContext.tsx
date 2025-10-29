import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, mockUsers } from "@/lib/mockData";
import { useRoleStore } from "@/lib/stores/roleStore";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phone?: string,
  ) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setActiveRole, reset: resetRole } = useRoleStore();

  // Mock authentication - easily replaceable with Clerk
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user by email (mock validation)
      const foundUser = mockUsers.find((u) => u.email === email);

      if (!foundUser) {
        throw new Error("User not found");
      }

      // Mock password validation (in real app, this would be server-side)
      if (password !== "password123") {
        throw new Error("Invalid password");
      }

      setUser(foundUser);
      setActiveRole(foundUser.activeRole);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phone?: string,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Mock password validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create new user (in real app, this would be server-side)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        roles: [role],
        activeRole: role,
        phone,
      };

      // In a real app, this would be handled by the backend
      // For now, we'll just add to our mock data
      mockUsers.push(newUser);

      setUser(newUser);
      setActiveRole(role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    resetRole();
    setError(null);
  };

  // Auto-login for development (remove in production)
  useEffect(() => {
    const autoLogin = async () => {
      // For development, auto-login as the first user
      if (mockUsers.length > 0) {
        setUser(mockUsers[0]);
        setActiveRole(mockUsers[0].activeRole);
      }
    };

    autoLogin();
  }, [setActiveRole]);

  const value: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
