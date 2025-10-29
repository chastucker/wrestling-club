"use client";

import { useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/lib/mockData";

// In a real app, this would come from your auth context/state management
export const useUserRole = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    // In a real app, this would be an API call or auth context
    const loadUser = async () => {
      try {
        // For demo purposes, we'll use the first user (admin)
        // In a real app, this would come from your auth system
        const currentUser = mockUsers[0]; // Change this to test different roles
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const switchRole = (newRole: UserRole) => {
    if (!user) return;

    if (user.roles.includes(newRole)) {
      setUser({ ...user, currentRole: newRole });
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.roles.includes(role) ?? false;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.some((role) => user?.roles.includes(role)) ?? false;
  };

  const canAccessRoute = (path: string): boolean => {
    if (!user) return false;

    // Import roleUtils here to avoid circular dependency
    const { canAccessNavigation } = require("@/lib/roleUtils");
    return canAccessNavigation(user.roles, path);
  };

  const canUseFeature = (feature: string): boolean => {
    if (!user) return false;

    // Import roleUtils here to avoid circular dependency
    const { canUseFeature: checkFeature } = require("@/lib/roleUtils");
    return checkFeature(user.roles, feature as any);
  };

  return {
    user,
    loading,
    switchRole,
    hasRole,
    hasAnyRole,
    canAccessRoute,
    canUseFeature,
  };
};
