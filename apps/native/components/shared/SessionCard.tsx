import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDateRange } from "@/lib/dateUtils";
import { Session } from "@/types";

interface SessionCardProps {
  session: Session;
  onPress?: () => void;
  onEnroll?: () => void;
  isEnrolled?: boolean;
  showEnrollButton?: boolean;
}

export function SessionCard({
  session,
  onPress,
  onEnroll,
  isEnrolled = false,
  showEnrollButton = true,
}: SessionCardProps) {
  const content = (
    <Card className="p-4 mb-3">
      <View className="mb-3">
        <Text className="text-lg font-semibold text-foreground mb-2">
          {session.name}
        </Text>
        <Text className="text-sm text-muted-foreground mb-2">
          {getDateRange(session.startDate, session.endDate)}
        </Text>
        {session.description && (
          <Text className="text-sm text-muted-foreground mb-2">
            {session.description}
          </Text>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row space-x-2">
          <Badge className="bg-blue-500">
            <Text className="text-white text-xs font-medium">
              {session.repeatPattern === "weekly" ? "Weekly" : "Bi-weekly"}
            </Text>
          </Badge>
          {isEnrolled && (
            <Badge className="bg-success">
              <Text className="text-white text-xs font-medium">Enrolled</Text>
            </Badge>
          )}
        </View>
        <View className="items-end">
          <Text className="text-sm font-medium text-foreground">
            ${session.pricePerSession}/session
          </Text>
          <Text className="text-xs text-muted-foreground">
            ${session.pricePerPractice}/practice
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-muted-foreground">
          {session.practices.length} practices
        </Text>
        <View className="flex-row space-x-2">
          {showEnrollButton && (
            <Button
              onPress={onEnroll}
              className={`px-4 py-2 ${isEnrolled ? "bg-muted" : "bg-primary"}`}
              disabled={isEnrolled}
            >
              <Text
                className={`text-sm font-medium ${
                  isEnrolled
                    ? "text-muted-foreground"
                    : "text-primary-foreground"
                }`}
              >
                {isEnrolled ? "Enrolled" : "Enroll"}
              </Text>
            </Button>
          )}
          {onPress && (
            <TouchableOpacity onPress={onPress}>
              <Text className="text-primary text-sm font-medium">
                View Details
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );

  if (onPress && !showEnrollButton) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
}
