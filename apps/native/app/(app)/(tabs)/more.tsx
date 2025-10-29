import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { AppHeader } from "@/components/shared/AppHeader";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

interface MenuItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  show?: boolean;
  destructive?: boolean;
}

function MenuItem({
  title,
  icon,
  onPress,
  show = true,
  destructive = false,
}: MenuItemProps) {
  if (!show) return null;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card className="p-4 mb-2">
        <View className="flex-row items-center">
          <Icon
            name={icon}
            size={24}
            className={
              destructive ? "text-destructive mr-3" : "text-primary mr-3"
            }
          />
          <Text
            className={`flex-1 text-base ${destructive ? "text-destructive" : "text-foreground"}`}
          >
            {title}
          </Text>
          <Icon
            name="chevron.right"
            size={16}
            className="text-muted-foreground"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  const { user, permissions } = useUserRole();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const menuItems: MenuItemProps[] = [
    {
      title: "Relationships",
      icon: "person.2",
      onPress: () => router.push("/(app)/relationships"),
      show: permissions.canEnroll,
    },
    {
      title: "Check In",
      icon: "checkmark.circle",
      onPress: () => router.push("/(app)/check-in"),
      show: permissions.canCheckIn,
    },
    {
      title: "Payments",
      icon: "creditcard",
      onPress: () => router.push("/(app)/payments"),
      show: true,
    },
    {
      title: "Events",
      icon: "calendar",
      onPress: () => router.push("/(app)/events"),
      show: permissions.canAccessCoach,
    },
    {
      title: "Manage Sessions",
      icon: "person.3",
      onPress: () => router.push("/(app)/admin/sessions"),
      show: permissions.canManageSessions,
    },
    {
      title: "Manage Tournaments",
      icon: "trophy",
      onPress: () => router.push("/(app)/admin/tournaments"),
      show: permissions.canManageTournaments,
    },
    {
      title: "Manage Members",
      icon: "person.crop.circle",
      onPress: () => router.push("/(app)/admin/members"),
      show: permissions.canManageMembers,
    },
    {
      title: "Payment Overview",
      icon: "chart.bar",
      onPress: () => router.push("/(app)/admin/payments"),
      show: permissions.canViewAllPayments,
    },
  ];

  const settingsItems: MenuItemProps[] = [
    {
      title: "Settings",
      icon: "gear",
      onPress: () => {
        // TODO: Implement settings screen
        console.log("Settings pressed");
      },
      show: true,
    },
    {
      title: "Help & Support",
      icon: "questionmark.circle",
      onPress: () => {
        // TODO: Implement help screen
        console.log("Help pressed");
      },
      show: true,
    },
  ];

  const accountItems: MenuItemProps[] = [
    {
      title: "Sign Out",
      icon: "arrow.right.square",
      onPress: handleSignOut,
      show: true,
      destructive: true,
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="More" />

      <ScrollView className="flex-1 p-4">
        {/* User Info */}
        <Card className="p-4 mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-primary rounded-full items-center justify-center mr-4">
              <Text className="text-primary-foreground text-lg font-semibold">
                {user?.name?.charAt(0) || "U"}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                {user?.name || "User"}
              </Text>
              <Text className="text-muted-foreground">
                {user?.email || "user@example.com"}
              </Text>
            </View>
          </View>
        </Card>

        {/* Main Menu */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Features
          </Text>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </View>

        {/* Settings */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Settings
          </Text>
          {settingsItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </View>

        {/* Account */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Account
          </Text>
          {accountItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </View>

        {/* App Info */}
        <View className="items-center py-4">
          <Text className="text-xs text-muted-foreground">
            Wrestling Club App v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
