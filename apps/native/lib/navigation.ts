import { UserRole } from "../types";

export function getTabsForRole(role: UserRole) {
  const baseTabs = [
    { name: "index", title: "Home", icon: "home" },
    { name: "schedule", title: "Schedule", icon: "calendar" },
    { name: "sessions", title: "Sessions", icon: "users" },
    { name: "tournaments", title: "Tournaments", icon: "award" },
    { name: "more", title: "More", icon: "more-horizontal" },
  ];

  // All roles get the same base tabs
  return baseTabs;
}

export function canAccessRoute(route: string, role: UserRole): boolean {
  const adminOnlyRoutes = [
    "admin/sessions",
    "admin/tournaments",
    "admin/members",
    "admin/payments",
  ];

  const coachOnlyRoutes = ["events", "events/[id]/roster"];

  // Admin can access everything
  if (role === "admin") {
    return true;
  }

  // Coach can access coach routes
  if (role === "coach") {
    return !adminOnlyRoutes.some((adminRoute) => route.includes(adminRoute));
  }

  // Parent and wrestler have limited access
  if (role === "parent" || role === "wrestler") {
    return (
      !adminOnlyRoutes.some((adminRoute) => route.includes(adminRoute)) &&
      !coachOnlyRoutes.some((coachRoute) => route.includes(coachRoute))
    );
  }

  return false;
}

export function getRoleBasedNavigation(role: UserRole) {
  const tabs = getTabsForRole(role);

  return {
    tabs: tabs.filter((tab) => canAccessRoute(tab.name, role)),
    canAccessAdmin: role === "admin",
    canAccessCoach: role === "coach" || role === "admin",
    canCheckIn: role === "wrestler" || role === "parent",
    canEnroll: role === "wrestler" || role === "parent",
    canShowInterest: role === "wrestler" || role === "parent",
  };
}
