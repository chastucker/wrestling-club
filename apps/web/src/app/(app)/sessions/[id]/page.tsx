"use client";

import { useParams } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { EventCard } from "@/components/shared/EventCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSessions, mockPractices } from "@/lib/mockData";
import { Calendar, DollarSign, Users, Repeat } from "lucide-react";
import Link from "next/link";

export default function SessionDetailPage() {
  const params = useParams();
  const { user } = useUserRole();
  const { canEnrollSessions, canManageSessions } = useRoleAccess();
  const sessionId = params.id as string;

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

  // Find the session
  const session = mockSessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Session Not Found
          </h1>
          <p className="text-gray-600">
            The session you're looking for doesn't exist.
          </p>
          <Link href="/sessions">
            <Button className="mt-4">Back to Sessions</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get practices for this session
  const sessionPractices = mockPractices.filter(
    (p) => p.sessionId === sessionId,
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRepeatLabel = (pattern: string) => {
    const labels = {
      weekly: "Weekly",
      biweekly: "Bi-weekly",
      monthly: "Monthly",
      none: "One-time",
    };
    return labels[pattern as keyof typeof labels] || pattern;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{session.name}</h1>
          <p className="text-gray-600 mt-1">{session.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={session.isActive ? "default" : "secondary"}>
            {session.isActive ? "Active" : "Inactive"}
          </Badge>
          {canManageSessions() && (
            <Button variant="outline">Edit Session</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date(session.startDate))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date(session.endDate))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Repeat Pattern</p>
                    <p className="text-sm text-muted-foreground">
                      {getRepeatLabel(session.repeatPattern)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Enrollments</p>
                    <p className="text-sm text-muted-foreground">
                      {session.enrollments.length}
                      {session.maxEnrollments && ` / ${session.maxEnrollments}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Per Session</p>
                    <p className="text-2xl font-bold text-wrestling-primary">
                      ${session.pricePerSession}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Per Practice</p>
                    <p className="text-2xl font-bold text-wrestling-primary">
                      ${session.pricePerPractice}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Practices</CardTitle>
            </CardHeader>
            <CardContent>
              {sessionPractices.length > 0 ? (
                <div className="space-y-4">
                  {sessionPractices.map((practice) => (
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
                      actionLabel="View Details"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No practices scheduled for this session.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Actions */}
          {canEnrollSessions() && (
            <Card>
              <CardHeader>
                <CardTitle>Enrollment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to enroll in this session.
                </p>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
                    onClick={() => {
                      window.location.href = `/sessions/${session.id}/enroll?type=per-session`;
                    }}
                  >
                    Enroll Per Session (${session.pricePerSession})
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.location.href = `/sessions/${session.id}/enroll?type=per-practice`;
                    }}
                  >
                    Enroll Per Practice (${session.pricePerPractice})
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Session Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="text-sm font-medium">
                  {Math.ceil(
                    (new Date(session.endDate).getTime() -
                      new Date(session.startDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Practices</span>
                <span className="text-sm font-medium">
                  {sessionPractices.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Enrollments
                </span>
                <span className="text-sm font-medium">
                  {session.enrollments.length}
                </span>
              </div>
              {session.maxEnrollments && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Capacity
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (session.enrollments.length / session.maxEnrollments) *
                        100,
                    )}
                    % full
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
