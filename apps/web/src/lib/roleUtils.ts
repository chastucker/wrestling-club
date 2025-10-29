import { UserRole } from "@/types";

export const ROLES: Record<UserRole, string> = {
  admin: "Administrator",
  coach: "Coach",
  parent: "Parent",
  wrestler: "Wrestler",
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 4,
  coach: 3,
  parent: 2,
  wrestler: 1,
};

export const hasRole = (
  userRoles: UserRole[],
  requiredRole: UserRole,
): boolean => {
  return userRoles.includes(requiredRole);
};

export const hasAnyRole = (
  userRoles: UserRole[],
  requiredRoles: UserRole[],
): boolean => {
  return requiredRoles.some((role) => userRoles.includes(role));
};

export const hasMinimumRole = (
  userRoles: UserRole[],
  minimumRole: UserRole,
): boolean => {
  const userMaxLevel = Math.max(
    ...userRoles.map((role) => ROLE_HIERARCHY[role]),
  );
  return userMaxLevel >= ROLE_HIERARCHY[minimumRole];
};

export const canAccessRoute = (
  userRoles: UserRole[],
  routeRoles: UserRole[],
): boolean => {
  return hasAnyRole(userRoles, routeRoles);
};

export const getRoleDisplayName = (role: UserRole): string => {
  return ROLES[role];
};

export const getRoleColor = (role: UserRole): string => {
  const colors = {
    admin: "bg-wrestling-danger text-white",
    coach: "bg-wrestling-warning text-white",
    parent: "bg-wrestling-primary text-white",
    wrestler: "bg-wrestling-success text-white",
  };
  return colors[role];
};

export const getRoleIcon = (role: UserRole): string => {
  const icons = {
    admin: "👑",
    coach: "🏆",
    parent: "👨‍👩‍👧‍👦",
    wrestler: "🤼",
  };
  return icons[role];
};

// Navigation permissions
export const NAVIGATION_PERMISSIONS: Record<string, UserRole[]> = {
  "/dashboard": ["admin", "coach", "parent", "wrestler"],
  "/schedule": ["admin", "coach", "parent", "wrestler"],
  "/sessions": ["admin", "coach", "parent", "wrestler"],
  "/tournaments": ["admin", "coach", "parent", "wrestler"],
  "/relationships": ["admin", "coach", "parent", "wrestler"],
  "/check-in": ["admin", "coach", "parent", "wrestler"],
  "/payments": ["admin", "parent", "wrestler"], // Coaches don't see payments
  "/events": ["admin", "coach"],
  "/admin": ["admin"],
  "/admin/sessions": ["admin"],
  "/admin/tournaments": ["admin"],
  "/admin/members": ["admin"],
  "/admin/payments": ["admin"],
};

export const canAccessNavigation = (
  userRoles: UserRole[],
  path: string,
): boolean => {
  const allowedRoles = NAVIGATION_PERMISSIONS[path];
  if (!allowedRoles) return false;
  return hasAnyRole(userRoles, allowedRoles);
};

// Feature permissions
export const FEATURE_PERMISSIONS = {
  CREATE_SESSION: ["admin"],
  EDIT_SESSION: ["admin"],
  DELETE_SESSION: ["admin"],
  MANAGE_MEMBERS: ["admin"],
  MANAGE_ROLES: ["admin"],
  VIEW_ALL_PAYMENTS: ["admin"],
  MANAGE_TOURNAMENTS: ["admin"],
  VIEW_EVENTS: ["admin", "coach"],
  MANAGE_EVENTS: ["admin", "coach"],
  CHECK_IN: ["admin", "coach"],
  ENROLL_SESSION: ["parent", "wrestler"],
  SHOW_TOURNAMENT_INTEREST: ["parent", "wrestler"],
  MANAGE_RELATIONSHIPS: ["parent", "wrestler"],
};

export const canUseFeature = (
  userRoles: UserRole[],
  feature: keyof typeof FEATURE_PERMISSIONS,
): boolean => {
  const allowedRoles = FEATURE_PERMISSIONS[feature];
  return hasAnyRole(userRoles, allowedRoles);
};
