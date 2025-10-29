import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { EventCard } from "@/components/shared/EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { AppHeader } from "@/components/shared/AppHeader";
import { getUpcomingTournaments } from "@/lib/mockData";
import { router } from "expo-router";

export default function TournamentsScreen() {
  const upcomingTournaments = getUpcomingTournaments();

  const handleTournamentPress = (tournamentId: string) => {
    router.push(`/(app)/tournaments/${tournamentId}`);
  };

  if (upcomingTournaments.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader title="Tournaments" />
        <EmptyState
          title="No Tournaments Available"
          description="Check back later for upcoming wrestling tournaments."
          icon="trophy"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Tournaments" />

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold text-foreground mb-4">
          Upcoming Tournaments
        </Text>

        {upcomingTournaments.map((tournament) => (
          <EventCard
            key={tournament.id}
            event={tournament}
            type="tournament"
            onPress={() => handleTournamentPress(tournament.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
