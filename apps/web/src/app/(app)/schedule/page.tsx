"use client";

import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { EventCard } from "@/components/shared/EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPractices, mockTournaments } from "@/lib/mockData";
import { Calendar, Search } from "lucide-react";

export default function SchedulePage() {
  const { user } = useUserRole();
  const { canViewEvents } = useRoleAccess();
  const [activeTab, setActiveTab] = useState("practices");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter practices
  const filteredPractices = mockPractices.filter((practice) => {
    const matchesSearch =
      practice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = (() => {
      const practiceDate = new Date(practice.date);
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

      switch (dateFilter) {
        case "today":
          return practiceDate.toDateString() === today.toDateString();
        case "tomorrow":
          return practiceDate.toDateString() === tomorrow.toDateString();
        case "week":
          return practiceDate >= today && practiceDate <= nextWeek;
        case "month":
          return practiceDate >= today && practiceDate <= nextMonth;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesDate;
  });

  // Filter tournaments
  const filteredTournaments = mockTournaments.filter((tournament) => {
    const matchesSearch =
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = (() => {
      const tournamentDate = new Date(tournament.date);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

      switch (dateFilter) {
        case "today":
          return tournamentDate.toDateString() === today.toDateString();
        case "tomorrow":
          const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          return tournamentDate.toDateString() === tomorrow.toDateString();
        case "week":
          return tournamentDate >= today && tournamentDate <= nextWeek;
        case "month":
          return tournamentDate >= today && tournamentDate <= nextMonth;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesDate;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const groupByDate = (items: any[], dateKey: string) => {
    return items.reduce(
      (groups, item) => {
        const date = new Date(item[dateKey]);
        const dateStr = formatDate(date);

        if (!groups[dateStr]) {
          groups[dateStr] = [];
        }
        groups[dateStr].push(item);
        return groups;
      },
      {} as Record<string, any[]>,
    );
  };

  const groupedPractices = groupByDate(filteredPractices, "date");
  const groupedTournaments = groupByDate(filteredTournaments, "date");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600 mt-1">
          View upcoming practices and tournaments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search practices or tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="practices">Practices</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
        </TabsList>

        <TabsContent value="practices" className="space-y-6">
          {Object.keys(groupedPractices).length > 0 ? (
            Object.entries(groupedPractices).map(([date, practices]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  {date}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {practices.map((practice) => (
                    <EventCard
                      key={practice.id}
                      id={practice.id}
                      title={practice.name}
                      description={practice.description}
                      date={new Date(practice.date)}
                      startTime={practice.startTime}
                      endTime={practice.endTime}
                      location={practice.location}
                      type="practice"
                      status="active"
                      maxCapacity={practice.maxCapacity}
                      currentCapacity={0}
                      onAction={() => {}}
                      actionLabel="Check In"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No practices found"
              description="No practices match your current filters"
              icon={<Calendar className="h-12 w-12" />}
            />
          )}
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          {Object.keys(groupedTournaments).length > 0 ? (
            Object.entries(groupedTournaments).map(([date, tournaments]) => (
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
                      onAction={() => {}}
                      actionLabel="Show Interest"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No tournaments found"
              description="No tournaments match your current filters"
              icon={<Calendar className="h-12 w-12" />}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
