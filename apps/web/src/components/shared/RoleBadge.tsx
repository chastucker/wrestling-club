"use client";

import { UserRole } from "@/types";
import { getRoleDisplayName, getRoleColor, getRoleIcon } from "@/lib/roleUtils";
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RoleBadge = ({
  role,
  showIcon = true,
  size = "md",
  className = "",
}: RoleBadgeProps) => {
  const displayName = getRoleDisplayName(role);
  const colorClass = getRoleColor(role);
  const icon = getRoleIcon(role);

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      className={`${colorClass} ${sizeClasses[size]} ${className}`}
      variant="default"
    >
      {showIcon && <span className="mr-1">{icon}</span>}
      {displayName}
    </Badge>
  );
};
