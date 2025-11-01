import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { RoleSwitcher } from "./RoleSwitcher";

interface AppHeaderProps {
  title?: string;
  showRoleSwitcher?: boolean;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

export function AppHeader({
  title = "Wrestling Club",
  showRoleSwitcher = true,
  onProfilePress,
  onNotificationPress,
}: AppHeaderProps) {
  const { user } = useAuth();
  const { activeRole } = useUserRole();

  return (
    <View className="bg-card border-b border-border px-4 py-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-foreground">{title}</Text>
          {showRoleSwitcher && (
            <View className="mt-1">
              <RoleSwitcher />
            </View>
          )}
        </View>

        <View className="flex-row items-center space-x-3">
          {onNotificationPress && (
            <TouchableOpacity onPress={onNotificationPress}>
              <Feather name="bell" size={24} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onProfilePress}>
            <Avatar className="w-8 h-8">
              <Text className="text-sm font-medium text-primary-foreground">
                {user?.name?.charAt(0) || "U"}
              </Text>
            </Avatar>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
