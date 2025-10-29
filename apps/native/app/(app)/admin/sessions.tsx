import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/shared/AppHeader";
import { SessionCard } from "@/components/shared/SessionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useUserRole } from "@/hooks/useUserRole";
import { mockSessions } from "@/lib/mockData";

export default function AdminSessionsScreen() {
  const { permissions } = useUserRole();

  if (!permissions.canManageSessions) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader title="Manage Sessions" />
        <EmptyState
          title="Access Denied"
          description="You don't have permission to manage sessions."
          icon="exclamationmark.triangle"
        />
      </View>
    );
  }

  const handleCreateSession = () => {
    // TODO: Implement create session modal/form
    console.log("Create session pressed");
  };

  const handleEditSession = (sessionId: string) => {
    // TODO: Implement edit session
    console.log("Edit session:", sessionId);
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Manage Sessions" />

      <View className="flex-1 p-4">
        {/* Header Actions */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-foreground">
            All Sessions
          </Text>
          <Button onPress={handleCreateSession} className="bg-primary">
            <Text className="text-primary-foreground font-medium">
              Create Session
            </Text>
          </Button>
        </View>

        {/* Sessions List */}
        <ScrollView className="flex-1">
          {mockSessions.length === 0 ? (
            <EmptyState
              title="No Sessions Created"
              description="Create your first wrestling session to get started."
              icon="person.3"
              actionLabel="Create Session"
              onAction={handleCreateSession}
            />
          ) : (
            mockSessions.map((session) => (
              <View key={session.id} className="mb-3">
                <SessionCard
                  session={session}
                  isEnrolled={false}
                  showEnrollButton={false}
                  onPress={() => handleEditSession(session.id)}
                />
                <View className="flex-row space-x-2 mt-2">
                  <Button
                    onPress={() => handleEditSession(session.id)}
                    className="flex-1 bg-primary"
                  >
                    <Text className="text-primary-foreground text-sm">
                      Edit
                    </Text>
                  </Button>
                  <Button
                    onPress={() => console.log("Delete session:", session.id)}
                    className="flex-1 bg-destructive"
                  >
                    <Text className="text-destructive-foreground text-sm">
                      Delete
                    </Text>
                  </Button>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Stats Summary */}
        <Card className="p-4 mt-4">
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                {mockSessions.length}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Total Sessions
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                {mockSessions.reduce(
                  (sum, session) => sum + session.enrolledUserIds.length,
                  0,
                )}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Total Enrollments
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                $
                {mockSessions.reduce(
                  (sum, session) => sum + session.pricePerSession,
                  0,
                )}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Total Revenue
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}
