import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useUserRole } from "@/hooks/useUserRole";
import { UserRole } from "@/types";

interface RoleSwitcherProps {
  onRoleChange?: (role: UserRole) => void;
}

export function RoleSwitcher({ onRoleChange }: RoleSwitcherProps) {
  const { activeRole, availableRoles, switchRole } = useUserRole();

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    onRoleChange?.(role);
  };

  if (availableRoles.length <= 1) {
    return null;
  }

  return (
    <View className="flex-row space-x-2">
      {availableRoles.map((role) => (
        <TouchableOpacity
          key={role}
          onPress={() => handleRoleChange(role)}
          className={`px-3 py-2 rounded-lg border ${
            activeRole === role
              ? "bg-primary border-primary"
              : "bg-card border-border"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              activeRole === role
                ? "text-primary-foreground"
                : "text-foreground"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
