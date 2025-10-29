import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = "exclamationmark.triangle",
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <View className={`flex-1 items-center justify-center p-8 ${className}`}>
      <View className="items-center">
        <Icon name={icon} size={64} className="text-muted-foreground mb-4" />
        <Text className="text-xl font-semibold text-foreground mb-2 text-center">
          {title}
        </Text>
        {description && (
          <Text className="text-muted-foreground text-center mb-6 max-w-sm">
            {description}
          </Text>
        )}
        {actionLabel && onAction && (
          <Button onPress={onAction} className="bg-primary">
            <Text className="text-primary-foreground font-medium">
              {actionLabel}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
}
