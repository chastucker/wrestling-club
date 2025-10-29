"use client";

import { useState, useEffect } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPractices, mockAttendance, mockUsers } from "@/lib/mockData";
import { CheckCircle, Clock, Users, MapPin, Calendar } from "lucide-react";

export default function CheckInPage() {
  const { user } = useUserRole();
  const { canCheckIn } = useRoleAccess();
  const [selectedPractice, setSelectedPractice] = useState("");
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  if (!canCheckIn()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to check in members.
          </p>
        </div>
      </div>
    );
  }

  // Get today's practices
  const today = new Date();
  const todayPractices = mockPractices.filter((practice) => {
    const practiceDate = new Date(practice.date);
    return practiceDate.toDateString() === today.toDateString();
  });

  // Get selected practice
  const practice = selectedPractice
    ? todayPractices.find((p) => p.id === selectedPractice)
    : null;

  // Get attendance for selected practice
  const practiceAttendance = practice
    ? mockAttendance.filter((a) => a.practiceId === practice.id)
    : [];

  const handleCheckIn = async () => {
    if (!practice) return;

    setIsCheckingIn(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsCheckingIn(false);
    setIsCheckedIn(true);
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const attendanceColumns = [
    {
      key: "wrestler",
      label: "Wrestler",
      render: (attendance: any) => {
        const user = mockUsers.find((u) => u.id === attendance.userId);
        return user ? user.name : "Unknown User";
      },
    },
    {
      key: "status",
      label: "Status",
      render: (attendance: any) => (
        <StatusBadge status={attendance.status} size="sm" />
      ),
    },
    {
      key: "checkedInAt",
      label: "Check-in Time",
      render: (attendance: any) =>
        attendance.checkedInAt
          ? new Date(attendance.checkedInAt).toLocaleTimeString()
          : "-",
    },
    {
      key: "notes",
      label: "Notes",
      render: (attendance: any) => attendance.notes || "-",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Check-In</h1>
        <p className="text-gray-600 mt-1">
          Live practice check-in and attendance tracking
        </p>
      </div>

      {/* Live Time */}
      <Card className="bg-wrestling-primary text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live Practice</h2>
              <p className="text-wrestling-primary-foreground/80">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-wrestling-primary-foreground/80">
                Today
              </p>
              <p className="text-lg font-semibold">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Practice Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Select Practice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedPractice}
              onValueChange={setSelectedPractice}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a practice to check in" />
              </SelectTrigger>
              <SelectContent>
                {todayPractices.map((practice) => (
                  <SelectItem key={practice.id} value={practice.id}>
                    {practice.name} - {formatTime(practice.startTime)} to{" "}
                    {formatTime(practice.endTime)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {practice && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg">{practice.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {practice.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatTime(practice.startTime)} -{" "}
                        {formatTime(practice.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{practice.location}</span>
                    </div>
                  </div>
                </div>

                {!isCheckedIn ? (
                  <Button
                    onClick={handleCheckIn}
                    disabled={isCheckingIn}
                    className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90 h-12 text-lg"
                  >
                    {isCheckingIn ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Checking In...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Check In to Practice
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-center p-4 bg-wrestling-success/10 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-wrestling-success mx-auto mb-2" />
                    <p className="font-semibold text-wrestling-success">
                      Successfully Checked In!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Checked in at {currentTime.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Roster */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Attendance Roster</span>
              {practice && (
                <Badge variant="outline">
                  {practiceAttendance.length} members
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {practice ? (
              <DataTable
                data={practiceAttendance}
                columns={attendanceColumns}
                searchable={false}
                filterable={false}
                exportable={true}
                onExport={() =>
                  console.log("Export attendance for", practice.name)
                }
                emptyMessage="No attendance records yet"
              />
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a Practice
                </h3>
                <p className="text-gray-600">
                  Choose a practice to view the attendance roster.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      {practice && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-wrestling-success" />
                <div>
                  <p className="text-sm font-medium">Present</p>
                  <p className="text-2xl font-bold text-wrestling-success">
                    {
                      practiceAttendance.filter((a) => a.status === "present")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-wrestling-warning" />
                <div>
                  <p className="text-sm font-medium">Late</p>
                  <p className="text-2xl font-bold text-wrestling-warning">
                    {
                      practiceAttendance.filter((a) => a.status === "late")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold">
                    {practiceAttendance.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-wrestling-primary" />
                <div>
                  <p className="text-sm font-medium">Attendance Rate</p>
                  <p className="text-2xl font-bold text-wrestling-primary">
                    {practiceAttendance.length > 0
                      ? Math.round(
                          (practiceAttendance.filter(
                            (a) =>
                              a.status === "present" || a.status === "late",
                          ).length /
                            practiceAttendance.length) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
