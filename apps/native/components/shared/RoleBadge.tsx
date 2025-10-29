import React from "react";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { UserRole, getRoleDisplayName, getRoleColor } from "@/lib/roleUtils";

interface RoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md" | "lg";
}

export function RoleBadge({ role, size = "md" }: RoleBadgeProps) {
  const displayName = getRoleDisplayName(role);
  const colorClass = getRoleColor(role);

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-1.5",
    lg: "px-4 py-2",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Badge className={`${colorClass} ${sizeClasses[size]}`}>
      <Text className={`text-white font-medium ${textSizeClasses[size]}`}>
        {displayName}
      </Text>
    </Badge>
  );
}
