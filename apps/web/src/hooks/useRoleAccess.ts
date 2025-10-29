"use client";

import { useUserRole } from "./useUserRole";

export const useRoleAccess = () => {
  const { user, hasRole, hasAnyRole, canAccessRoute, canUseFeature } =
    useUserRole();

  const isAdmin = () => hasRole("admin");
  const isCoach = () => hasRole("coach");
  const isParent = () => hasRole("parent");
  const isWrestler = () => hasRole("wrestler");

  const isCoachOrAdmin = () => hasAnyRole(["coach", "admin"]);
  const isParentOrWrestler = () => hasAnyRole(["parent", "wrestler"]);

  const canManageSessions = () => isAdmin();
  const canManageTournaments = () => isAdmin();
  const canManageMembers = () => isAdmin();
  const canViewAllPayments = () => isAdmin();

  const canViewEvents = () => isCoachOrAdmin();
  const canManageEvents = () => isCoachOrAdmin();
  const canCheckIn = () => isCoachOrAdmin();

  const canEnrollSessions = () => isParentOrWrestler();
  const canShowTournamentInterest = () => isParentOrWrestler();
  const canManageRelationships = () => isParentOrWrestler();

  const canViewPayments = () => {
    // Coaches don't see payments, only admins and parents/wrestlers
    return isAdmin() || isParentOrWrestler();
  };

  return {
    user,
    isAdmin,
    isCoach,
    isParent,
    isWrestler,
    isCoachOrAdmin,
    isParentOrWrestler,
    canManageSessions,
    canManageTournaments,
    canManageMembers,
    canViewAllPayments,
    canViewEvents,
    canManageEvents,
    canCheckIn,
    canEnrollSessions,
    canShowTournamentInterest,
    canManageRelationships,
    canViewPayments,
    canAccessRoute,
    canUseFeature,
  };
};
