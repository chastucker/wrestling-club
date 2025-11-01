import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatTile } from "@/components/shared/StatTile";
import { EventCard } from "@/components/shared/EventCard";
import { SessionCard } from "@/components/shared/SessionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useUserRole } from "@/hooks/useUserRole";
import {
  getUpcomingPractices,
  getUpcomingTournaments,
  mockSessions,
} from "@/lib/mockData";
import { router } from "expo-router";

export default function DashboardScreen() {
  const { user, activeRole, permissions } = useUserRole();
  const upcomingPractices = getUpcomingPractices();
  const upcomingTournaments = getUpcomingTournaments();
  const userSessions = mockSessions.filter((session) =>
    session.enrolledUserIds.includes(user?.id || ""),
  );

  const getRoleSpecificStats = () => {
    switch (activeRole) {
      case "admin":
        return [
          { title: "Total Members", value: "24", subtitle: "Active members" },
          {
            title: "Active Sessions",
            value: "3",
            subtitle: "Currently running",
          },
          { title: "Upcoming Tournaments", value: "2", subtitle: "This month" },
          {
            title: "Pending Payments",
            value: "8",
            subtitle: "Require attention",
          },
        ];
      case "coach":
        return [
          { title: "Today's Practices", value: "2", subtitle: "Scheduled" },
          { title: "Checked In", value: "12", subtitle: "This week" },
          { title: "Unpaid Sessions", value: "3", subtitle: "Need follow-up" },
          { title: "Tournament Interest", value: "15", subtitle: "Responses" },
        ];
      case "parent":
      case "wrestler":
        return [
          {
            title: "My Sessions",
            value: userSessions.length.toString(),
            subtitle: "Enrolled",
          },
          {
            title: "Next Practice",
            value: upcomingPractices.length > 0 ? "1" : "0",
            subtitle: "Scheduled",
          },
          {
            title: "Tournaments",
            value: upcomingTournaments.length.toString(),
            subtitle: "Available",
          },
          { title: "Payments Due", value: "1", subtitle: "Outstanding" },
        ];
      default:
        return [];
    }
  };

  const stats = getRoleSpecificStats();

  const handleSessionPress = (sessionId: string) => {
    router.push(`/(app)/sessions/${sessionId}`);
  };

  const handleTournamentPress = (tournamentId: string) => {
    router.push(`/(app)/tournaments/${tournamentId}`);
  };

  const handlePracticePress = (practiceId: string) => {
    router.push("/(app)/check-in");
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader
        title={`Welcome, ${user?.name || "User"}`}
        showRoleSwitcher={true}
      />

      <ScrollView className="flex-1 p-4">
        {/* Stats Grid */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">
            Overview
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {stats.map((stat, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <StatTile
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  onPress={() => {
                    // Navigate to relevant section based on stat
                    if (stat.title.includes("Members"))
                      router.push("/(app)/admin/members");
                    if (stat.title.includes("Sessions"))
                      router.push("/(app)/sessions");
                    if (stat.title.includes("Tournaments"))
                      router.push("/(app)/tournaments");
                    if (stat.title.includes("Payments"))
                      router.push("/(app)/payments");
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Next Practice (for wrestlers/parents) */}
        {(activeRole === "wrestler" || activeRole === "parent") &&
          upcomingPractices.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-foreground mb-3">
                Next Practice
              </Text>
              <EventCard
                event={upcomingPractices[0]}
                type="practice"
                onPress={() => handlePracticePress(upcomingPractices[0].id)}
                showCheckInStatus={true}
                checkedIn={upcomingPractices[0].checkIns.includes(
                  user?.id || "",
                )}
              />
            </View>
          )}

        {/* My Sessions (for wrestlers/parents) */}
        {(activeRole === "wrestler" || activeRole === "parent") &&
          userSessions.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-foreground mb-3">
                My Sessions
              </Text>
              {userSessions.slice(0, 2).map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isEnrolled={true}
                  showEnrollButton={false}
                  onPress={() => handleSessionPress(session.id)}
                />
              ))}
              {userSessions.length > 2 && (
                <Text
                  className="text-primary text-center py-2"
                  onPress={() => router.push("/(app)/sessions")}
                >
                  View All Sessions
                </Text>
              )}
            </View>
          )}

        {/* Upcoming Tournaments */}
        {upcomingTournaments.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">
              Upcoming Tournaments
            </Text>
            {upcomingTournaments.slice(0, 2).map((tournament) => (
              <EventCard
                key={tournament.id}
                event={tournament}
                type="tournament"
                onPress={() => handleTournamentPress(tournament.id)}
              />
            ))}
            {upcomingTournaments.length > 2 && (
              <Text
                className="text-primary text-center py-2"
                onPress={() => router.push("/(app)/tournaments")}
              >
                View All Tournaments
              </Text>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {permissions.canCheckIn && (
              <View className="w-1/2 px-2 mb-3">
                <StatTile
                  title="Check In"
                  value="Practice"
                  icon="check-circle"
                  onPress={() => router.push("/(app)/check-in")}
                  className="bg-success"
                />
              </View>
            )}
            {permissions.canEnroll && (
              <View className="w-1/2 px-2 mb-3">
                <StatTile
                  title="Enroll"
                  value="Sessions"
                  icon="person.badge.plus"
                  onPress={() => router.push("/(app)/sessions")}
                  className="bg-primary"
                />
              </View>
            )}
            {permissions.canAccessCoach && (
              <View className="w-1/2 px-2 mb-3">
                <StatTile
                  title="Events"
                  value="Manage"
                  icon="calendar"
                  onPress={() => router.push("/(app)/events")}
                  className="bg-blue-500"
                />
              </View>
            )}
            {permissions.canAccessAdmin && (
              <View className="w-1/2 px-2 mb-3">
                <StatTile
                  title="Admin"
                  value="Panel"
                  icon="gear"
                  onPress={() => router.push("/(app)/admin/sessions")}
                  className="bg-warning"
                />
              </View>
            )}
          </View>
        </View>

        {/* Empty state if no data */}
        {stats.length === 0 && (
          <EmptyState
            title="Welcome to Wrestling Club"
            description="Your dashboard will show relevant information based on your role."
            icon="house"
          />
        )}
      </ScrollView>
    </View>
  );
}
