"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { StatTile } from "@/components/shared/StatTile";
import { EventCard } from "@/components/shared/EventCard";
import { SessionCard } from "@/components/shared/SessionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  mockDashboardStats,
  mockPractices,
  mockSessions,
  mockTournaments,
} from "@/lib/mockData";
import {
  Calendar,
  Trophy,
  BookOpen,
  CheckCircle,
  CreditCard,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useUserRole();
  const {
    isAdmin,
    isCoach,
    isParent,
    isWrestler,
    canViewEvents,
    canEnrollSessions,
    canShowTournamentInterest,
  } = useRoleAccess();

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

  const stats = mockDashboardStats[user.id] || {
    totalPractices: 0,
    checkedInToday: 0,
    unpaidCount: 0,
    upcomingTournaments: 0,
    mySessions: 0,
    myEnrollments: 0,
  };

  // Get upcoming practices (next 7 days)
  const upcomingPractices = mockPractices
    .filter((practice) => {
      const practiceDate = new Date(practice.date);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return practiceDate >= today && practiceDate <= nextWeek;
    })
    .slice(0, 3);

  // Get user's enrolled sessions
  const userSessions = mockSessions.slice(0, 2);

  // Get upcoming tournaments
  const upcomingTournaments = mockTournaments
    .filter((tournament) => {
      const tournamentDate = new Date(tournament.date);
      const today = new Date();
      return tournamentDate >= today;
    })
    .slice(0, 2);

  const getWelcomeMessage = () => {
    if (isAdmin()) return "Welcome back, Administrator";
    if (isCoach()) return "Welcome back, Coach";
    if (isParent()) return "Welcome back";
    if (isWrestler()) return "Ready to train?";
    return "Welcome back";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {getWelcomeMessage()}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your wrestling club today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatTile
          title="Today's Practices"
          value={stats.totalPractices}
          description="Scheduled for today"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatTile
          title="Checked In"
          value={stats.checkedInToday}
          description="Members checked in"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        {!isCoach() && (
          <StatTile
            title="Unpaid"
            value={stats.unpaidCount}
            description="Outstanding payments"
            icon={<CreditCard className="h-4 w-4" />}
          />
        )}
        <StatTile
          title="Upcoming Tournaments"
          value={stats.upcomingTournaments}
          description="In the next month"
          icon={<Trophy className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Practice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Next Practice
            </h2>
            <Link href="/schedule">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {upcomingPractices.length > 0 ? (
            <EventCard
              id={upcomingPractices[0].id}
              title={upcomingPractices[0].name}
              description={upcomingPractices[0].description}
              date={new Date(upcomingPractices[0].date)}
              startTime={upcomingPractices[0].startTime}
              endTime={upcomingPractices[0].endTime}
              location={upcomingPractices[0].location}
              type="practice"
              status="active"
              maxCapacity={upcomingPractices[0].maxCapacity}
              currentCapacity={0}
              onAction={() => {}}
              actionLabel="Check In"
            />
          ) : (
            <EmptyState
              title="No upcoming practices"
              description="No practices scheduled for the next 7 days"
              icon={<Calendar className="h-12 w-12" />}
            />
          )}
        </div>

        {/* My Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Sessions</h2>
            <Link href="/sessions">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {userSessions.length > 0 ? (
            <div className="space-y-3">
              {userSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  name={session.name}
                  description={session.description}
                  startDate={new Date(session.startDate)}
                  endDate={new Date(session.endDate)}
                  repeatPattern={session.repeatPattern}
                  pricePerSession={session.pricePerSession}
                  pricePerPractice={session.pricePerPractice}
                  maxEnrollments={session.maxEnrollments}
                  currentEnrollments={session.enrollments.length}
                  isActive={session.isActive}
                  enrollmentStatus="enrolled"
                  onEnroll={() => {}}
                  onViewDetails={() => {}}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No enrolled sessions"
              description="You haven't enrolled in any sessions yet"
              icon={<BookOpen className="h-12 w-12" />}
              action={
                canEnrollSessions()
                  ? {
                      label: "Browse Sessions",
                      onClick: () => {},
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>

      {/* Upcoming Tournaments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Tournaments
          </h2>
          <Link href="/tournaments">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {upcomingTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingTournaments.map((tournament) => (
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
                onAction={canShowTournamentInterest() ? () => {} : undefined}
                actionLabel="Show Interest"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming tournaments"
            description="No tournaments scheduled in the near future"
            icon={<Trophy className="h-12 w-12" />}
          />
        )}
      </div>

      {/* Quick Actions for Coaches/Admins */}
      {(isCoach() || isAdmin()) && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {canViewEvents() && (
              <Link href="/events">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Activity className="h-6 w-6" />
                  <span>Manage Events</span>
                </Button>
              </Link>
            )}
            <Link href="/check-in">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <CheckCircle className="h-6 w-6" />
                <span>Check-In Members</span>
              </Button>
            </Link>
            <Link href="/relationships">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Users className="h-6 w-6" />
                <span>Manage Members</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
