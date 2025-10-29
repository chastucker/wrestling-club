"use client";

import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { SessionCard } from "@/components/shared/SessionCard";
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
import { mockSessions } from "@/lib/mockData";
import { Search, Filter, Plus } from "lucide-react";

export default function SessionsPage() {
  const { user } = useUserRole();
  const { canManageSessions, canEnrollSessions } = useRoleAccess();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [enrollmentFilter, setEnrollmentFilter] = useState("all");

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

  // Filter sessions
  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch =
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && session.isActive) ||
      (statusFilter === "inactive" && !session.isActive);

    // For enrollment filter, we'd need to check user's enrollment status
    // For now, we'll just show all sessions
    const matchesEnrollment = enrollmentFilter === "all" || true;

    return matchesSearch && matchesStatus && matchesEnrollment;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-600 mt-1">
            Browse and enroll in wrestling sessions
          </p>
        </div>
        {canManageSessions() && (
          <Button className="bg-wrestling-primary hover:bg-wrestling-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Session
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
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
          {canEnrollSessions() && (
            <Select
              value={enrollmentFilter}
              onValueChange={setEnrollmentFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Enrollment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="not-enrolled">Not Enrolled</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Sessions Grid */}
      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
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
              enrollmentStatus="not-enrolled" // This would be determined by user's enrollment
              onEnroll={() => {
                // Navigate to enrollment page
                window.location.href = `/sessions/${session.id}/enroll`;
              }}
              onViewDetails={() => {
                // Navigate to session details
                window.location.href = `/sessions/${session.id}`;
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No sessions found"
          description="No sessions match your current filters"
          icon={<Filter className="h-12 w-12" />}
          action={
            canManageSessions()
              ? {
                  label: "Create First Session",
                  onClick: () => {},
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
