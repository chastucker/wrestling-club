"use client";

import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { EventCard } from "@/components/shared/EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockTournaments } from "@/lib/mockData";
import { Search, Plus, Trophy } from "lucide-react";

export default function TournamentsPage() {
  const { user } = useUserRole();
  const { canManageTournaments, canShowTournamentInterest } = useRoleAccess();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">Please sign in to continue.</p>
        </div>
      </div>
    );
  }

  // Filter tournaments
  const filteredTournaments = mockTournaments.filter((tournament) => {
    const matchesSearch =
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && tournament.isActive) ||
      (statusFilter === "inactive" && !tournament.isActive);

    const matchesDate = (() => {
      const tournamentDate = new Date(tournament.date);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

      switch (dateFilter) {
        case "upcoming":
          return tournamentDate >= today;
        case "this-week":
          return tournamentDate >= today && tournamentDate <= nextWeek;
        case "this-month":
          return tournamentDate >= today && tournamentDate <= nextMonth;
        case "past":
          return tournamentDate < today;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const groupByDate = (tournaments: typeof mockTournaments) => {
    return tournaments.reduce(
      (groups, tournament) => {
        const date = new Date(tournament.date);
        const dateStr = formatDate(date);

        if (!groups[dateStr]) {
          groups[dateStr] = [];
        }
        groups[dateStr].push(tournament);
        return groups;
      },
      {} as Record<string, typeof mockTournaments>,
    );
  };

  const groupedTournaments = groupByDate(filteredTournaments);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
          <p className="text-gray-600 mt-1">
            Browse and show interest in upcoming tournaments
          </p>
        </div>
        {canManageTournaments() && (
          <Button className="bg-wrestling-primary hover:bg-wrestling-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Tournament
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tournaments */}
      {Object.keys(groupedTournaments).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedTournaments).map(([date, tournaments]) => (
            <div key={date} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournaments.map((tournament) => (
                  <EventCard
                    key={tournament.id}
                    id={tournament.id}
                    title={tournament.name}
                    description={tournament.description}
                    date={new Date(tournament.date)}
                    startTime="09:00"
                    endTime="17:00"
                    location={tournament.location}
                    type="tournament"
                    status="active"
                    price={tournament.entryFee}
                    onAction={
                      canShowTournamentInterest()
                        ? () => {
                            window.location.href = `/tournaments/${tournament.id}`;
                          }
                        : undefined
                    }
                    actionLabel="Show Interest"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tournaments found"
          description="No tournaments match your current filters"
          icon={<Trophy className="h-12 w-12" />}
          action={
            canManageTournaments()
              ? {
                  label: "Create First Tournament",
                  onClick: () => {},
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
