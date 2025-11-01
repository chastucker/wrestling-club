import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Feather } from "@expo/vector-icons";
import { AppHeader } from "@/components/shared/AppHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { getUpcomingPractices, mockSessions } from "@/lib/mockData";
import { formatDate, formatTime, getRelativeTime } from "@/lib/dateUtils";

export default function CheckInScreen() {
  const { user } = useAuth();
  const { notifyCheckInSuccess } = useNotifications();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentPractice, setCurrentPractice] = useState<any>(null);

  useEffect(() => {
    // Find the next upcoming practice
    const upcomingPractices = getUpcomingPractices();
    if (upcomingPractices.length > 0) {
      const practice = upcomingPractices[0];
      const session = mockSessions.find((s) => s.id === practice.sessionId);
      setCurrentPractice({
        ...practice,
        sessionName: session?.name || "Practice",
      });

      // Check if user is already checked in
      setIsCheckedIn(practice.checkIns.includes(user?.id || ""));
    }
  }, [user]);

  const handleCheckIn = async () => {
    if (!currentPractice || !user) return;

    try {
      // In a real app, this would make an API call
      // For now, we'll just simulate the check-in
      setIsCheckedIn(true);

      // Add user to check-ins (in real app, this would be server-side)
      const practiceIndex = mockSessions
        .find((s) => s.id === currentPractice.sessionId)
        ?.practices.findIndex((p) => p.id === currentPractice.id);

      if (practiceIndex !== undefined && practiceIndex >= 0) {
        const session = mockSessions.find(
          (s) => s.id === currentPractice.sessionId,
        );
        if (session) {
          session.practices[practiceIndex].checkIns.push(user.id);
        }
      }

      // Send notification
      await notifyCheckInSuccess(currentPractice.sessionName);

      Alert.alert(
        "Check-in Successful!",
        `You've been checked in to ${currentPractice.sessionName}`,
        [{ text: "OK" }],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to check in. Please try again.");
    }
  };

  if (!currentPractice) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader title="Check In" />
        <EmptyState
          title="No Practice Available"
          description="There are no upcoming practices to check in to."
          icon="calendar"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Check In" />

      <View className="flex-1 p-4">
        {/* Practice Info */}
        <Card className="p-6 mb-6">
          <View className="items-center">
            <View className={isCheckedIn ? "mb-4" : "mb-4"}>
              <Feather name={isCheckedIn ? "check-circle" : "calendar"} size={64} />
            </View>
            <Text className="text-2xl font-bold text-foreground mb-2">
              {currentPractice.sessionName}
            </Text>
            <Text className="text-lg text-muted-foreground mb-4">
              {formatDate(currentPractice.date)} •{" "}
              {formatTime(currentPractice.time)}
            </Text>
            <Text className="text-sm text-muted-foreground mb-2">
              {currentPractice.location}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {getRelativeTime(currentPractice.date)}
            </Text>
          </View>
        </Card>

        {/* Check-in Status */}
        <Card className="p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-foreground">
                Check-in Status
              </Text>
              <Text className="text-muted-foreground">
                {isCheckedIn ? "You are checked in" : "Not checked in yet"}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${
                isCheckedIn ? "bg-success" : "bg-muted"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isCheckedIn ? "text-white" : "text-muted-foreground"
                }`}
              >
                {isCheckedIn ? "Checked In" : "Pending"}
              </Text>
            </View>
          </View>
        </Card>

        {/* Check-in Button */}
        <View className="flex-1 justify-end">
          <Button
            onPress={handleCheckIn}
            disabled={isCheckedIn}
            className={`py-4 ${isCheckedIn ? "bg-muted" : "bg-primary"}`}
          >
            <View className="flex-row items-center">
              <View className="mr-2">
                <Feather name={isCheckedIn ? "check" : "arrow-right-circle"} size={24} />
              </View>
              <Text
                className={`text-lg font-semibold ${
                  isCheckedIn
                    ? "text-muted-foreground"
                    : "text-primary-foreground"
                }`}
              >
                {isCheckedIn ? "Already Checked In" : "Check In Now"}
              </Text>
            </View>
          </Button>
        </View>

        {/* Additional Info */}
        {!isCheckedIn && (
          <View className="mt-4 p-4 bg-muted rounded-lg">
            <Text className="text-sm text-muted-foreground text-center">
              Make sure to arrive on time for practice. Check-in is available 30
              minutes before start time.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
