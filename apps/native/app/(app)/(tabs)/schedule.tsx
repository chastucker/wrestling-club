import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Tabs } from "@/components/ui/tabs";
import { EventCard } from "@/components/shared/EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { AppHeader } from "@/components/shared/AppHeader";
import { getUpcomingPractices, getUpcomingTournaments } from "@/lib/mockData";
import { groupByDate } from "@/lib/dateUtils";
import { router } from "expo-router";

export default function ScheduleScreen() {
  const [activeTab, setActiveTab] = useState<"practices" | "tournaments">(
    "practices",
  );

  const upcomingPractices = getUpcomingPractices();
  const upcomingTournaments = getUpcomingTournaments();

  const practicesByDate = groupByDate(upcomingPractices, "date");
  const tournamentsByDate = groupByDate(upcomingTournaments, "date");

  const handlePracticePress = (practiceId: string) => {
    router.push("/(app)/check-in");
  };

  const handleTournamentPress = (tournamentId: string) => {
    router.push(`/(app)/tournaments/${tournamentId}`);
  };

  const renderPractices = () => {
    if (upcomingPractices.length === 0) {
      return (
        <EmptyState
          title="No Practices Scheduled"
          description="Check back later for upcoming practice sessions."
          icon="calendar"
        />
      );
    }

    return (
      <ScrollView className="flex-1">
        {Object.entries(practicesByDate)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, practices]) => (
            <View key={date} className="mb-6">
              <Text className="text-lg font-semibold text-foreground mb-3 px-4">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              {practices.map((practice) => (
                <View key={practice.id} className="px-4">
                  <EventCard
                    event={practice}
                    type="practice"
                    onPress={() => handlePracticePress(practice.id)}
                    showCheckInStatus={true}
                  />
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    );
  };

  const renderTournaments = () => {
    if (upcomingTournaments.length === 0) {
      return (
        <EmptyState
          title="No Tournaments Scheduled"
          description="Check back later for upcoming tournaments."
          icon="trophy"
        />
      );
    }

    return (
      <ScrollView className="flex-1">
        {Object.entries(tournamentsByDate)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, tournaments]) => (
            <View key={date} className="mb-6">
              <Text className="text-lg font-semibold text-foreground mb-3 px-4">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              {tournaments.map((tournament) => (
                <View key={tournament.id} className="px-4">
                  <EventCard
                    event={tournament}
                    type="tournament"
                    onPress={() => handleTournamentPress(tournament.id)}
                  />
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Schedule" />

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "practices" | "tournaments")
        }
        className="flex-1"
      >
        <Tabs.List className="px-4 py-2">
          <Tabs.Trigger value="practices" className="flex-1">
            <Text className="text-sm font-medium">Practices</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value="tournaments" className="flex-1">
            <Text className="text-sm font-medium">Tournaments</Text>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="practices" className="flex-1">
          {renderPractices()}
        </Tabs.Content>

        <Tabs.Content value="tournaments" className="flex-1">
          {renderTournaments()}
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
