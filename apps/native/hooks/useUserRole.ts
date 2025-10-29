import { useAuth } from "@/contexts/AuthContext";
import { useRoleStore } from "@/lib/stores/roleStore";
import { getRolePermissions } from "@/lib/roleUtils";
import { UserRole, RolePermissions } from "@/types";

export function useUserRole() {
  const { user } = useAuth();
  const { activeRole, setActiveRole } = useRoleStore();

  const hasRole = (role: UserRole): boolean => {
    return user?.roles.includes(role) ?? false;
  };

  const canAccessRole = (role: UserRole): boolean => {
    return hasRole(role);
  };

  const switchRole = (role: UserRole) => {
    if (canAccessRole(role)) {
      setActiveRole(role);
    }
  };

  const availableRoles: UserRole[] = user?.roles ?? [];
  const permissions: RolePermissions = user
    ? getRolePermissions(user)
    : {
        canAccessAdmin: false,
        canAccessCoach: false,
        canManageSessions: false,
        canManageTournaments: false,
        canManageMembers: false,
        canViewAllPayments: false,
        canCheckIn: false,
        canEnroll: false,
        canShowInterest: false,
      };

  return {
    user,
    activeRole,
    hasRole,
    canAccessRole,
    switchRole,
    availableRoles,
    permissions,
  };
}
