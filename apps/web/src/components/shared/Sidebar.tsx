"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  BookOpen,
  Trophy,
  Users,
  CheckCircle,
  CreditCard,
  UserPlus,
  BarChart3,
  Shield,
  Activity,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Home",
    href: "/dashboard",
    icon: Home,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "schedule",
    label: "Schedule",
    href: "/schedule",
    icon: Calendar,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "sessions",
    label: "Sessions",
    href: "/sessions",
    icon: BookOpen,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "tournaments",
    label: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "relationships",
    label: "Relationships",
    href: "/relationships",
    icon: Users,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "check-in",
    label: "Check-In",
    href: "/check-in",
    icon: CheckCircle,
    roles: ["admin", "coach", "parent", "wrestler"] as const,
  },
  {
    id: "payments",
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
    roles: ["admin", "parent", "wrestler"] as const, // Coaches don't see payments
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    icon: Activity,
    roles: ["admin", "coach"] as const,
  },
  {
    id: "admin",
    label: "Admin",
    href: "/admin",
    icon: Shield,
    roles: ["admin"] as const,
    children: [
      {
        id: "admin-sessions",
        label: "Sessions & Practices",
        href: "/admin/sessions",
        icon: BookOpen,
      },
      {
        id: "admin-tournaments",
        label: "Tournaments",
        href: "/admin/tournaments",
        icon: Trophy,
      },
      {
        id: "admin-members",
        label: "Members & Roles",
        href: "/admin/members",
        icon: UserPlus,
      },
      {
        id: "admin-payments",
        label: "Payment Status",
        href: "/admin/payments",
        icon: BarChart3,
      },
    ],
  },
];

export const Sidebar = ({ className = "" }: SidebarProps) => {
  const { user } = useUserRole();
  const { canViewPayments } = useRoleAccess();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname.startsWith("/admin");
    }
    return pathname === href;
  };

  const canAccessItem = (item: (typeof navigationItems)[0]) => {
    if (item.id === "payments") {
      return canViewPayments();
    }
    return item.roles.includes(user.currentRole as any);
  };

  const renderNavItem = (item: (typeof navigationItems)[0], level = 0) => {
    if (!canAccessItem(item)) {
      return null;
    }

    const isItemActive = isActive(item.href);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <Link
          href={item.href}
          className={cn(
            "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            level > 0 && "ml-6",
            isItemActive
              ? "bg-wrestling-primary text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <Icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>

        {/* Render children if they exist and parent is active */}
        {item.children && isItemActive && (
          <div className="mt-2 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = pathname === child.href;

              return (
                <Link
                  key={child.id}
                  href={child.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ml-6",
                    isChildActive
                      ? "bg-wrestling-primary/10 text-wrestling-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <ChildIcon className="h-4 w-4" />
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-white border-r border-gray-200",
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
};
