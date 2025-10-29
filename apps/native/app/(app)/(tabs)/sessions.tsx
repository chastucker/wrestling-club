import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { SessionCard } from "@/components/shared/SessionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { AppHeader } from "@/components/shared/AppHeader";
import { useAuth } from "@/contexts/AuthContext";
import { mockSessions } from "@/lib/mockData";
import { router } from "expo-router";

export default function SessionsScreen() {
  const { user } = useAuth();

  const handleSessionPress = (sessionId: string) => {
    router.push(`/(app)/sessions/${sessionId}`);
  };

  const handleEnroll = (sessionId: string) => {
    router.push(`/(app)/sessions/${sessionId}/enroll`);
  };

  const isEnrolled = (session: (typeof mockSessions)[0]) => {
    return session.enrolledUserIds.includes(user?.id || "");
  };

  if (mockSessions.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader title="Sessions" />
        <EmptyState
          title="No Sessions Available"
          description="Check back later for new wrestling sessions."
          icon="person.3"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Sessions" />

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold text-foreground mb-4">
          Available Sessions
        </Text>

        {mockSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            isEnrolled={isEnrolled(session)}
            showEnrollButton={true}
            onPress={() => handleSessionPress(session.id)}
            onEnroll={() => handleEnroll(session.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
