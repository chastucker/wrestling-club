import { User, UserRole, RolePermissions } from "../types";

export function hasRole(user: User, role: UserRole): boolean {
  return user.roles.includes(role);
}

export function canAccessAdminRoutes(user: User): boolean {
  return hasRole(user, "admin");
}

export function canAccessCoachRoutes(user: User): boolean {
  return hasRole(user, "coach") || hasRole(user, "admin");
}

export function canManageSessions(user: User): boolean {
  return hasRole(user, "admin");
}

export function canManageTournaments(user: User): boolean {
  return hasRole(user, "admin");
}

export function canManageMembers(user: User): boolean {
  return hasRole(user, "admin");
}

export function canViewAllPayments(user: User): boolean {
  return hasRole(user, "admin") || hasRole(user, "coach");
}

export function canCheckIn(user: User): boolean {
  return hasRole(user, "wrestler") || hasRole(user, "parent");
}

export function canEnroll(user: User): boolean {
  return hasRole(user, "wrestler") || hasRole(user, "parent");
}

export function canShowInterest(user: User): boolean {
  return hasRole(user, "wrestler") || hasRole(user, "parent");
}

export function getRolePermissions(user: User): RolePermissions {
  return {
    canAccessAdmin: canAccessAdminRoutes(user),
    canAccessCoach: canAccessCoachRoutes(user),
    canManageSessions: canManageSessions(user),
    canManageTournaments: canManageTournaments(user),
    canManageMembers: canManageMembers(user),
    canViewAllPayments: canViewAllPayments(user),
    canCheckIn: canCheckIn(user),
    canEnroll: canEnroll(user),
    canShowInterest: canShowInterest(user),
  };
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "admin":
      return "Administrator";
    case "coach":
      return "Coach";
    case "parent":
      return "Parent";
    case "wrestler":
      return "Wrestler";
    default:
      return role;
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case "admin":
      return "bg-red-500";
    case "coach":
      return "bg-blue-500";
    case "parent":
      return "bg-green-500";
    case "wrestler":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}
