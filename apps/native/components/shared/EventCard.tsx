import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { formatDate, formatTime, getRelativeTime } from "@/lib/dateUtils";
import { Practice, Tournament } from "@/types";

interface EventCardProps {
  event: Practice | Tournament;
  type: "practice" | "tournament";
  onPress?: () => void;
  showCheckInStatus?: boolean;
  checkedIn?: boolean;
}

export function EventCard({
  event,
  type,
  onPress,
  showCheckInStatus = false,
  checkedIn = false,
}: EventCardProps) {
  const isPractice = type === "practice";
  const practice = isPractice ? (event as Practice) : null;
  const tournament = !isPractice ? (event as Tournament) : null;

  const eventDate = isPractice ? practice!.date : tournament!.date;
  const eventTime = isPractice ? practice!.time : undefined;
  const eventName = isPractice
    ? `Practice - ${practice!.sessionId}`
    : tournament!.name;
  const eventLocation = isPractice ? practice!.location : tournament!.location;

  const content = (
    <Card className="p-4 mb-3">
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-foreground mb-1">
            {eventName}
          </Text>
          <View className="flex-row items-center mb-1">
            <Icon
              name="calendar"
              size={16}
              className="text-muted-foreground mr-2"
            />
            <Text className="text-sm text-muted-foreground">
              {formatDate(eventDate)}
              {eventTime && ` • ${formatTime(eventTime)}`}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Icon
              name="location"
              size={16}
              className="text-muted-foreground mr-2"
            />
            <Text className="text-sm text-muted-foreground">
              {eventLocation}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Badge className="bg-primary mb-2">
            <Text className="text-primary-foreground text-xs font-medium">
              {type === "practice" ? "Practice" : "Tournament"}
            </Text>
          </Badge>
          {showCheckInStatus && (
            <Badge className={checkedIn ? "bg-success" : "bg-muted"}>
              <Text className="text-white text-xs font-medium">
                {checkedIn ? "Checked In" : "Not Checked In"}
              </Text>
            </Badge>
          )}
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-muted-foreground">
          {getRelativeTime(eventDate)}
        </Text>
        {onPress && (
          <TouchableOpacity onPress={onPress}>
            <Text className="text-primary text-sm font-medium">
              View Details
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
}
