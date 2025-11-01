import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";

interface StatTileProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  className?: string;
}

export function StatTile({
  title,
  value,
  subtitle,
  icon,
  onPress,
  className = "",
}: StatTileProps) {
  const content = (
    <Card className={`p-4 ${className}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground mb-1">{title}</Text>
          <Text className="text-2xl font-bold text-foreground mb-1">
            {value}
          </Text>
          {subtitle && (
            <Text className="text-xs text-muted-foreground">{subtitle}</Text>
          )}
        </View>
        {icon && (
          <View className="ml-4">
            <Feather name={icon as any} size={24} />
          </View>
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
}
